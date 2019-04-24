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

CityRank.prototype.cityRank = function(userPrefs) {
    // userPrefs = {"happiness": value,
    //              "affordability": value,
    //              "politics": {"rep16_frac": val, "dem16_frac": val}}

    let rankedCities = this.fb.data;
    console.log("CityRank.cityRank() userPrefs = ", userPrefs);
    let v = [userPrefs.happiness, userPrefs.affordability, userPrefs.politics.rep16_frac];

    // TODO:
    //
    // I think for purposes of rank calculation, we need to normalize all
    // values between 0 and 100, so that each dimension of preference contributes
    // equally in the distance calculation.
    //
    // This means we'll need to calculate the range of the input data and
    // scale the smallest item at 0 and largest at 100.

    for (let i = 0; i < rankedCities; i++) {
        let item = rankedCities[i];
        // IMPORTANT: Order of picked fields must match order of fields in v.
        let cityAttr = Object.values(cm.cherryPickFields(["happiness", "affordability", "politics"], item));
        let w = [cityAttr.happiness, cityAttr.affordability, cityAttr.politics.rep16_frac];
        let distance = this.distance(v, w);
        rankedCities["distance"] = distance;
        console.log("rankedCities = ", rankedCities);
    }
    console.log("typeof rankedCities = ", Array.isArray(rankedCities));
    rankedCities.sort(this.compareDistance);
    return rankedCities;
}

CityMetrics.prototype.compareDistance = function(a, b) {
    let aDistance = a[Object.keys(a)].distance;
    let bDistance = b[Object.keys(b)].distance;
    
    if (aDistance > bDistance) return 1;
    if (aDistance == bDistance) return 0;
    if (aDistance < bDistance) return -1;
}

function UnitTestCityRank() {
    cr = new CityRank(Firebase.prototype.glennDbConfig);
    let normalizedData = cr.normalizeData();
    cr.publishData(normalizedData);
    let userPrefs = {"happiness": 50, "affordability": 200000, "politics": {"rep16_frac": 25.00}};
    let rankedCities = cr.cityRank(userPrefs);
    console.log("ranked cities = ", rankedCities);
}