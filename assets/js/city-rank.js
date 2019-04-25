function CityRank(dbConfig) {
    this.ca = new CountyAffordabiity();
	this.cm = new CityMetrics();
    this.cp = new CountyPolitics();
	this.cpFields = ["rep16_frac", "dem16_frac"];
    this.fb = new Firebase(dbConfig);
}

CityRank.prototype.filterData = function() {
	
	// Populate affordability data from endpoint (synchronously).
	this.ca.getCountyAffordabiityCallback()(); 

	// For each city known to the model, populate filteredData[]
	// with the following attributes:
	//
	// {"cityState": {"happiness": value, "political": {rep:value, dem:value}, "affordability": value}}
	
	let filteredData = [];
	while (this.cm.hasMoreItems()) {
        console.log("CityRank.filterData() filtering data :-)");
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

        // Just select the fields of interest to our app.
        let json = this.cm.cherryPickFields(["happiness", "politics", "affordability"], item);
        let filteredItem = {};
        let normalizedCityST = cityST.replace(/St\. /g, "St ");
		filteredItem[normalizedCityST] = json;
		filteredData.push(filteredItem);
	}
    return filteredData;
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
    let rankedCities = [];
    if (this.fb.dataFromFB.length == this.fb.expectedDbLength) {
        rankedCities = this.fb.dataFromFB;
    } else {
        rankedCities = this.fb.data;
    }

    // TODO: Calculate these dynamically.  For MVP, hardcode is
    //       ok since input data is not changing.  Still, we could
    //       push these to the appropriate sub-model objects.

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
    rankedCities.sort(compareFn);
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
    cr = new CityRank(Firebase.prototype.glennDbConfig);
    if (cr.fb.dataFromFB.length < cr.fb.expectedDbLength) {
        console.log("Publising filtered data to firebase.");
        // If persisted storage has not yet been populated,
        // do so.  Even if this is a race condition, it's benign
        // to republish ... though post MVP, we should double check.
        let filteredData = cr.filterData();
        cr.publishData(filteredData);
    } else {
        console.log("Using persisted data from firebase.");
    }
    let userPrefs = {};
    // userPrefs = {"happiness": 78, "affordability": 500000, "politics": {"rep16_frac": 50.00}};
    userPrefs = {"happiness": 29.19, "affordability": 82500, "politics": {"rep16_frac": 25.00}};
    let rankedCities = cr.cityRank(userPrefs);
    console.log("userPrefs = ", userPrefs);
    console.log("UnitTestCityRank rankedCities = ", rankedCities);
}