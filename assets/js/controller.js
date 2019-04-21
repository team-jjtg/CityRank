function Controller() {
    this.cityToCounty = new CityToCounty();
    this.cityToCounty.setCityState("Chicago IL");

    this.countyToPolitics = new CountyToPolitics();
    this.addButtonListeners();
    console.log(this.countyToPolitics.data);

    // Example of iterating across all cities in cityMetrics

    let cityKeys = Object.keys(cityMetrics);
    for (let cityKey of cityKeys) {
        console.log("cityKey = ", cityKey);
        console.log("happiness = ", cityMetrics[cityKey].happiness);
    }
}

Controller.prototype.addButtonListeners = function() {
    // This should console log "Cook County".
    $("#getCounty").on('click', this.cityToCounty.getCountyCallback());
    // For some reason, this is only sending back 10
    // counties worth of data :-/
    $("#getPolitics").on('click', this.countyToPolitics.getPoliticsCallback());
}
