function CityRank(dbConfig) {
    this.ca = new CountyAffordabiity();
	this.cm = new CityMetrics();
    this.cp = new CountyPolitics();
	this.cpFields = ["rep16_frac", "dem16_frac"];
    this.fb = new Firebase(dbConfig);
}

CityRank.prototype.normalizeData = function() {
	
	// Populate affordability data from endpoint (synchronously).
	this.ca.getCountyAffordabiityCallback()(); 

	// For each city known to the model, populate normalizedData[]
	// with the following attributes:
	//
	// {"cityState": {"happiness": value, "political": {rep:value, dem:value}, "affordability": value}}
	
	let normalizedData = [];
	while (this.cm.hasMoreItems()) {
		let index = this.cm.index;
		 
	 	let item = this.cm.getNextItem();
		let cityST = JSON.stringify(this.cm.getCityST(item));
		let county = this.cm.getCounty(item);
		let happiness = this.cm.getHappiness(item);
		let affordability = this.ca.getAffordability(this.cm.getCountyState(item));

		this.cm.setAffordabilityAtIndex(affordability, index);

		let countyState = this.cm.getCountyStateForCountyPolitics(item);
		politicalJson = this.cp.cherryPickFields(this.cpFields, countyState);
		this.cm.setPoliticsJsonAtIndex(politicalJson, index);

        let json = this.cm.cherryPickFields(["happiness", "politics", "affordability"], item);
        let normalizedItem = {};
        let normalizedCityST = cityST.replace(/St\. /g, "St ");
		normalizedItem[normalizedCityST] = json;
		normalizedData.push(normalizedItem);
	}
    console.log(normalizedData);
    return normalizedData;
}

CityRank.prototype.publishData = function(data) {
    this.fb.dbSetData(data);
}

CityRank.prototype.distance = function(v, w) {
    let squaredDiffs = 0;
    let distance = NaN;
    if (v.length == w.length) {
        for (let i = 0; i < v.length; i++) {
            squaredDiffs += Math.pow(v[i] - w[i], 2);
        }
        distance = Math.sqrt(squaredDiffs);
    } else {
        console.log("CityRank.distance() error: input vectors are different lengths.");
    }
    return distance;
}

CityRank.prototype.isEmpty = function(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
CityRank.prototype.cityRank = function(userPrefs) {
    // userPrefs = {"happiness": value,
    //              "affordability": value,
    //              "politics": {"rep16_frac": val, "dem16_frac": val}}

    if (this.isEmpty(userPrefs)) {
        console.log("CityRank.cityRank() Error: empty userPrefs");
        return [];
    }
    let rankedCities = this.fb.data;
    console.log(typeof(rankedCities));
    console.log("CityRank.cityRank() userPrefs = ", userPrefs);

    let minHappiness = 29.19;
    let maxHappiness = 72.30;
    let happinessRange = maxHappiness - minHappiness;

    let minAffordability = 82500;
    let maxAffordability = 927400;
    let affordabilityRange = maxAffordability - minAffordability;

    let scaledHappines = (userPrefs.happiness - minHappiness) * (100 / happinessRange);
    let scaledAffordability = (userPrefs.affordability - minAffordability) * (100 / affordabilityRange);

    let v = [scaledHappines, scaledAffordability, userPrefs.politics.rep16_frac];

    for (let i = 0; i < rankedCities.length; i++) {
        let item = rankedCities[i];
        // IMPORTANT: Order of picked fields must match order of fields in v.
        let cityAttr = Object.values(this.cm.cherryPickFields(["happiness", "affordability", "politics"], item));
        scaledHappiness = (cityAttr[0] - minHappiness) * (100 / happinessRange);
        scaledAffordability = (cityAttr[1] - minAffordability) * (100 / affordabilityRange);

        let w = [scaledHappiness, scaledAffordability, cityAttr[2].rep16_frac];
        let distance = this.distance(v, w);
        rankedCities["distance"] = distance;
        let key = Object.keys(item)[0];
        rankedCities[i][key]["distance"] = distance;
    }
    let compareFn = this.getCompareDistance();
    // console.log("is array(rankedCities) = ", Array.isArray(rankedCities));
    rankedCities.sort(compareFn);
    console.log("rankedCities = ", rankedCities);
    return rankedCities;
}

CityRank.prototype.getCompareDistance = function() {
	function compareDistance(a, b) {
        let aKey = Object.keys(a)[0];
        let bKey = Object.keys(b)[0];
        let aDistance = a[aKey].distance;
        let bDistance = b[bKey].distance;
        if (aDistance > bDistance) return 1;
        if (aDistance == bDistance) return 0;
        if (aDistance < bDistance) return -1;
	}
	return compareDistance;
}

function UnitTestCityRank() {
    cr = new CityRank(Firebase.prototype.jacksonDbConfig);
    let normalizedData = cr.normalizeData();
    cr.publishData(normalizedData);
    let userPrefs = {"happiness": 29.19, "affordability": 82500, "politics": {"rep16_frac": 25.00}};
    userPrefs = {"happiness": 78, "affordability": 500000, "politics": {"rep16_frac": 50.00}};
    let rankedCities = cr.cityRank(userPrefs);
    console.log("ranked cities = ", rankedCities);
    console.log("userPrefs = ", userPrefs);
}