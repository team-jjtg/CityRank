function CountyAffordabiity() {}
CountyAffordabiity.prototype.affordabilityByCounty = {};
CountyAffordabiity.prototype.apiMethod = "GET";
CountyAffordabiity.prototype.queryUrl = "https://api.census.gov/data/2017/acs/acs5/profile?get=DP04_0089E,NAME&for=county:*";
CountyAffordabiity.prototype.getQueryUrl = function() {
	return this.queryUrl;
}
CountyAffordabiity.prototype.getAffordability = function(countyState) {
	return this.affordabilityByCounty[countyState];
}
CountyAffordabiity.prototype.getCountyAffordabiityCallback = function(electionDataset = this.electionDataset) {
    let queryUrl = this.getQueryUrl();
    let that = this;
    function innerCallback() {
        $.ajax({
            url: queryUrl,
            method: this.apiMethod,
            async: false	// This call happens once, so performance hit is nominal with synchronous call.
        }).done(function(response) {
			that.affordabilityByCounty = {};

			// I know, I should be more functional here. ;-)
			// Spidey-sense says I should use an accumulator and reduction to distill
			// all these array entries into a single object.

            for (let i = 0; i < response.length; i++) {
				let medianHomeprice = response[i][0];	// Using median home price as proxy for affordabiltiy.
				let countyState = response[i][1];
				// Allow affordability to be looked-up by 'county, state' key.
                that.affordabilityByCounty[countyState] = medianHomeprice;
			}
        }).fail(function(err) {
            throw err;
        });
        return false;   
    }
    return innerCallback;
}

function UnitTestCountyAffordabiity() {
	let ca = new CountyAffordabiity();
	let cm = new CityMetrics();
    let cp = new CountyPolitics();
	let cpFields = ["rep16_frac", "dem16_frac"];
	
	// Populate affordability data from endpoint (synchronously).

	ca.getCountyAffordabiityCallback()(); 

	// For each city known to the model, populate normalizedData[]
	// with the following attributes:
	//
	// {"cityState": {"happiness": value, "political": {rep:value, dem:value}, "affordability": value}}
	
	let normalizedData = [];
	while (cm.hasMoreItems()) {
		let index = cm.index;
		 
	 	let item = cm.getNextItem();
		let cityST = cm.getCityST(item);
		let county = cm.getCounty(item);
		let happiness = cm.getHappiness(item);
		let affordability = ca.getAffordability(cm.getCountyState(item));

		cm.setCountyAffordabiityAtIndex(affordability, index);

		let politicalCountyState = cm.getCountyStateForCountyPolitics(item);
		politicalJson = cp.cherryPickFields(cpFields, politicalCountyState);
		cm.setPoliticsJsonAtIndex(politicalJson, index);

		let json = cm.cherryPickFields(["happiness", "politics", "affordability"], item);
		let normalizedItem = {};
		normalizedItem[cityST] = json;
		normalizedData.push(normalizedItem);
	}

	console.log("This is our normalized data ready to upload to firebase-ish");
	console.log(normalizedData);
}
