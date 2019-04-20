// The following data is taken from:
//
//	https://maps.googleapis.com/maps/api/geocode/json?address=Chicago IL&language=en&sensor=true&key=AIzaSyD4-iShS_FXpTaYoz6LjgU7Yosbu_cxjsU
//
//	It converts a US City into a County.
//
//	The fields of interest are: 
//
//		cityToCounty.results[i].address_components[1].long_name = "Cook County"
//
//		cityToCounty.results[i].address_components[0].long_name = "Chicago"
//		cityToCounty.results[i].address_components[2].short_name = "IL"
//
//	It appears that multi-county cities are simplified down to one predominant county.
//

function CityToCounty() {}
CityToCounty.prototype.apiMethod = "GET";
CityToCounty.prototype.url = "https://maps.googleapis.com/maps/api/geocode/json";
CityToCounty.prototype.params = "&language=en&sensor=true";
CityToCounty.prototype.key = "&key=AIzaSyD4-iShS_FXpTaYoz6LjgU7Yosbu_cxjsU";
CityToCounty.prototype.cityState = ""; // "Chicago IL"
CityToCounty.prototype.county = "";
CityToCounty.prototype.getQueryUrl = function(strCityState) {
    let results = `${this.url}?address=${this.cityState}${this.params}${this.key}`;
    console.log("CityToCounty.getQueryUrl() results = ", results);
    return results;
}
CityToCounty.prototype.setCityState = function(strCityState) {
    this.cityState = strCityState;
}
CityToCounty.prototype.getCountyCallback = function(strCityState = this.cityState) {
    let queryUrl = this.getQueryUrl(strCityState);
    let that = this;
    function innerCallback() {
        console.log("click");
        $.ajax({
            url: queryUrl,
            method: this.apiMethod
        }).done(function(response) {
            // Verify we're getting reasonable data back from the endpoint.
            var nLength = (response.status == "OK") ? response.results[0].address_components.length : 0;
            console.log("CityToCounty.getCountyCallback() nLength = ", nLength);
            if (nLength > 2) {
                that.county = response.results[0].address_components[1].long_name;
                if (!that.county) {
                    console.log("CityToCounty.getCountyCallback() county field empty");
                } else {
                    console.log("Mode.getCountyCallback() city_and_state = ", strCityState, "county = ", that.county);
                }
            }
        }).fail(function(err) {
            throw err;
        });
        return false;   
    }
    return innerCallback;
}

// let cityToCounty = {
//     "results": [
//         {
//             "address_components": [
//                 {
//                     "long_name": "Chicago",
//                     "short_name": "Chicago",
//                     "types": [
//                         "locality",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "Cook County",
//                     "short_name": "Cook County",
//                     "types": [
//                         "administrative_area_level_2",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "Illinois",
//                     "short_name": "IL",
//                     "types": [
//                         "administrative_area_level_1",
//                         "political"
//                     ]
//                 },
//                 {
//                     "long_name": "United States",
//                     "short_name": "US",
//                     "types": [
//                         "country",
//                         "political"
//                     ]
//                 }
//             ],
//             "formatted_address": "Chicago, IL, USA",
//             "geometry": {
//                 "bounds": {
//                     "northeast": {
//                         "lat": 42.023131,
//                         "lng": -87.52366099999999
//                     },
//                     "southwest": {
//                         "lat": 41.6443349,
//                         "lng": -87.9402669
//                     }
//                 },
//                 "location": {
//                     "lat": 41.8781136,
//                     "lng": -87.6297982
//                 },
//                 "location_type": "APPROXIMATE",
//                 "viewport": {
//                     "northeast": {
//                         "lat": 42.023131,
//                         "lng": -87.52366099999999
//                     },
//                     "southwest": {
//                         "lat": 41.6443349,
//                         "lng": -87.9402669
//                     }
//                 }
//             },
//             "place_id": "ChIJ7cv00DwsDogRAMDACa2m4K8",
//             "types": [
//                 "locality",
//                 "political"
//             ]
//         }
//     ],
//     "status": "OK"
// }
