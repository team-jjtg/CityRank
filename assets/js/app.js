// rankedList = [
//     { "Plano, TX": { "county": "Collin County", "happiness": 72.30, "affordability": 200000, "wellbeing": 7, "income_and_employment": 6, "community_and_environment": 8 } },
//     { "Irvine, CA": { "county": "Orange County", "happiness": 71.86, "affordability": 200000, "wellbeing": 14, "income_and_employment": 11, "community_and_environment": 5 } },
//     { "Madison, WI": { "county": "Dane County", "happiness": 71.81, "affordability": 200000, "wellbeing": 3, "income_and_employment": 14, "community_and_environment": 7 } },
//     { "Fremont, CA": { "county": "Alameda County", "happiness": 71.17, "affordability": 200000, "wellbeing": 10, "income_and_employment": 37, "community_and_environment": 1 } },
//     { "Huntington Beach, CA": { "county": "Orange County", "happiness": 69.74, "affordability": 200000, "wellbeing": 6, "income_and_employment": 46, "community_and_environment": 28 } },
//     { "Fargo, ND": { "county": "Cass County", "happiness": 69.57, "affordability": 200000, "wellbeing": 17, "income_and_employment": 20, "community_and_environment": 24 } },
//     { "Grand Prairie, TX": { "county": "Dallas County", "happiness": 69.30, "affordability": 200000, "wellbeing": 20, "income_and_employment": 35, "community_and_environment": 6 } },
//     { "San Jose, CA": { "county": "Santa Clara County", "happiness": 68.90, "affordability": 200000, "wellbeing": 1, "income_and_employment": 18, "community_and_environment": 44 } },
//     { "Scottsdale, AZ": { "county": "Maricopa County", "happiness": 68.24, "affordability": 200000, "wellbeing": 46, "income_and_employment": 13, "community_and_environment": 2 } },
//     { "San Francisco, CA": { "county": "San Francisco County", "happiness": 67.53, "affordability": 200000, "wellbeing": 4, "income_and_employment": 2, "community_and_environment": 125 } }];

function Controller() {
    this.cr = new CityRank(Firebase.prototype.glennDbConfig);
    if (this.cr.fb.dataFromFB.length < this.cr.fb.expectedDbLength) {
        console.log("Controller: Filtering and publishing city data to firebase.")
        this.filteredData = this.cr.filterData();
        this.cr.publishData(this.filteredData);
    } else {
        console.log("Controller: Using persisted data from firebase.");
    }
    this.resetView();
    this.setClickHandlers();
    this.writeResults = this.getWriteResultsCallback();
    this.userPrefs = {"happiness": this.hapVal, "affordability": this.colVal, "politics": this.polVal};
}
// Default slider values.
Controller.prototype.colVal = 496501; // mid-point of median home price range
Controller.prototype.hapVal = 50;     // mid-point on 100 point scale
Controller.prototype.polVal = {"rep16_frac": 50, "dem16_frac": 50};
Controller.prototype.rankedList = [];

Controller.prototype.resetView = function() {
    $("#landing-window").show();    //show landing page
    $("#result-page").hide();       //results page hidden
    $("#slider-page").hide();       //slider page hidden
    $("#hap-slider-status").hide(); //hiding slider values
    $("#pol-slider-status").hide();
    $("#col-slider-status").hide();
}

Controller.prototype.setClickHandlers = function() {
    $("#start").on("click", function () {
        $("#slider-page").show();
        $("#landing-window").hide();
        $("#result-page").hide();
    });

    $("#results-button").on("click", function () {
        $("#result-page").show();
        $("#landing-window").hide();
        $("#slider-page").hide();
    });

    $("#back-btn1").on("click", function () {
        $("#result-page").hide();
        $("#landing-window").show();
        $("#slider-page").hide();
    });

    $("#back-btn2").on("click", function () {
        $("#result-page").hide();
        $("#landing-window").hide();
        $("#slider-page").show();
    });

    $("#results-button").on("click", this.getRankCitiesCallback());

    $("#happiness").on("change", this.getHappinessSliderCallback());
    $("#political-affiliation").on("change", this.getPoliticalSliderCallback());
    $("#cost-of-living").on("change", this.getCostOfLivingSliderCallback());
}

Controller.prototype.getWriteResultsCallback = function() {
    let that = this;
    function innerWriteResults() {
        $("#ranked-container").empty();
        for (var i = 0; i < that.rankedList.length; i++) {
            var cityProperties = Object.values(that.rankedList[i]);
            var cityName = Object.keys(that.rankedList[i])[0];
            var cityHappiness = cityProperties[0].happiness;
            var cityAfford = cityProperties[0].affordability;
            var newRow = $(`<p> ${i+1}. ${cityName} </br> Happiness:  ${cityHappiness} </br> Median Home Price:  ${cityAfford} </p>`);
            $("#ranked-container").append(newRow);
        }
    }
    return innerWriteResults;
}

Controller.prototype.getRankCitiesCallback = function() {
    let that = this;
    function innerRankCities() {
        that.rankedList = that.cr.cityRank(that.userPrefs);
        that.rankedList.length = 10;
        that.writeResults();
    }
    return innerRankCities;
}

Controller.prototype.getPoliticalSliderCallback = function() {
    let that = this;
    function polSliderChange(event) {
        let value = $(this)[0].value;
        document.getElementById("pol-slider-status").innerHTML = value;
        republicanVal = Number(value);
        democratVal = (100 - republicanVal);
        console.log("Democrat Value = ", democratVal);
        console.log("Republican Value = ", republicanVal);
        that.userPrefs.politics = {"rep16_frac": republicanVal, "dem16_frac": democratVal};
    }
    return polSliderChange;
}

Controller.prototype.getHappinessSliderCallback = function() {
    let that = this;
    function hapSliderChange(event) {
        let value = $(this)[0].value;
        document.getElementById("hap-slider-status").innerHTML = value;
        that.userPrefs.happiness = value;
        console.log("Happy slider value = ", value);
    }
    return hapSliderChange;
}

Controller.prototype.getCostOfLivingSliderCallback = function() {
    let that = this;
    function colSliderChange(event) {
        let value = $(this)[0].value;
        document.getElementById("col-slider-status").innerHTML = value;
        console.log("Cost of Living Slider Value = ", value);
        that.userPrefs.affordability = value;
    }
    return colSliderChange;
}
