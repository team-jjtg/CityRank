// https://public.opendatasoft.com/api/records/1.0/search/?dataset=usa-2016-presidential-election-by-county&facet=county&rows=11
//
// The key fields of interest for our application are:
//
// preElectionByCount.records[i].county: "Cherokee County, Alabama"
//                              .rep16_frac: 83.87127487384556
//                              .dem16_frac: 14.510139960011426
//                              .libert16_frac: 1.3805579358278588
//                              .green16_frac: 0.23802723031514805
//
//                              .rep12_frac: 76.65441176470588
//                              .dem12_frac: 21.772875816993466
//
//                              .rep08_frac: 74.88968701898409
//                              .dem08_frac: 23.66341713699333
//
// It looks like we get three election years worth of data, good for making
// trending statements.
//

function CountyToPolitics() {}
CountyToPolitics.prototype.apiMethod = "GET";
CountyToPolitics.prototype.url = "https://public.opendatasoft.com/api/records/1.0/search/";
// CountyToPolitics.prototype.params = "&facet=county&rows=3143"; // This represents 100 MB of data :-) since it's every county in the country.
CountyToPolitics.prototype.params = "&facet=county&rows=10";	// Limit the data during test.
CountyToPolitics.prototype.key = "";
CountyToPolitics.prototype.electionDataset = "usa-2016-presidential-election-by-county";
//CountyToPolitics.prototype.data = [];
    // "Cherokee County, Alabama": {
    //     "rep16_frac": 0,
    //     "dem16_frac": 0,
    //     "libert16_frac": 0,
    //     "green16_frac": 0,
    //     "rep12_frac": 0,
    //     "dem12_frac": 0,
    //     "libert12_frac": 0,
    //     "green12_frac": 0,
    //     "rep08_frac": 0,
    //     "dem08_frac": 0,
    //     "libert08_frac": 0,
    //     "green08_frac": 0
    // },
    // ..
CountyToPolitics.prototype.rawJson = [];
CountyToPolitics.prototype.getQueryUrl = function() {
    let results = `${this.url}?dataset=${this.electionDataset}${this.params}${this.key}`;
    console.log("CountyToPolitics.getQueryUrl() results = ", results);
    return results;
}
CountyToPolitics.prototype.setElectionDataset = function(electionDataset) {
    this.electionDataset = electionDataset;
}
CountyToPolitics.prototype.getPoliticsCallback = function(electionDataset = this.electionDataset) {
    let queryUrl = this.getQueryUrl(electionDataset);
    let that = this;
    function innerCallback() {
        console.log("click");
        $.ajax({
            url: queryUrl,
            method: this.apiMethod
        }).done(function(response) {
            // Verify we're getting reasonable data back from the endpoint.
            var nLength = response.nhits;
            console.log("CountyToPolitics.getPoliticsCallback() nLength = ", nLength);
            if (nLength > 0) {
                that.rawJson = response.records;
                if (!that.rawJson) {
                    console.log("CountyToPolitics.getPoliticsCallback() new records came back");
                } else {
                    console.log("CountToPolitics.getPoliticsCallback() got data.");
                    console.log("CountToPolitics.getPoliticsCallback() raw political json = ", that.rawJson);
                }
            }
        }).fail(function(err) {
            throw err;
        });
        return false;   
    }
    return innerCallback;
}


// This just shows two counties worth of data:
//
// let presElectionByCounty = {
//     "nhits": 3143,
//     "parameters": {
//         "dataset": [
//             "usa-2016-presidential-election-by-county"
//         ],
//         "facet": [
//             "county"
//         ],
//         "format": "json",
//         "rows": 10,
//         "timezone": "UTC"
//     },
//     "records": [
//         {
//             "datasetid": "usa-2016-presidential-election-by-county",
//             "fields": {
//                 "acfs": 3.57426199260047e-05,
//                 "adult_obesity": 0.314,
//                 "adult_smoking": 0.244,
//                 "adults_65_and_older_living_in_poverty": 10.45,
//                 "african_american_population": 5.1,
//                 "amerindian": 0.55,
//                 "annual_prcp": 5203.5,
//                 "asian": 0.15,
//                 "asian_american_population": 0.15,
//                 "at_least_bachelor_s_degree": 10.5,
//                 "at_least_high_school_diploma": 73.4,
//                 "autumn_prcp": 1148,
//                 "black": 5.1,
//                 "ca": -1.44594830766189,
//                 "cfs": 3.57426199260047e-05,
//                 "child_poverty_living_in_families_below_the_poverty_line": 24.2,
//                 "children_in_single_parent_households": 0.258,
//                 "children_under_6_living_in_poverty": 20.7,
//                 "construction_extraction_maintenance_and_repair_occupations": 13.25,
//                 "county": "Cherokee County, Alabama",
//                 "dem08": 2306,
//                 "dem08_frac": 23.66341713699333,
//                 "dem08_frac2": 0.24010828821324448,
//                 "dem12": "2132",
//                 "dem12_frac": 21.772875816993466,
//                 "dem12_frac2": 0.22120771944386802,
//                 "dem16_frac": 14.510139960011426,
//                 "dem16_frac2": 0.14748862866544082,
//                 "diabetes": 0.136,
//                 "elevation": 181.35,
//                 "elevation_bins": "(167,216]",
//                 "est_votes_remaining": 0,
//                 "farming_fishing_and_forestry_occupations": 1.4,
//                 "fips": "01019",
//                 "geo_shape": {},
//                 "gini_coefficient": 0.439,
//                 "graduate_degree": 4.2,
//                 "green16_frac": 0.23802723031514805,
//                 "hispanic": 1.2,
//                 "hiv_prevalence_rate": 119.8,
//                 "injury_deaths": 80.9,
//                 "lat": 34.0695153,
//                 "lat_bins": [
//                     34.175924937364535,
//                     -85.60376971296114
//                 ],
//                 "latino_population": 1.2,
//                 "less_than_high_school": 26.6,
//                 "libert16_frac": 1.3805579358278588,
//                 "lon": -85.6542417,
//                 "lon_bins": "(-87.2,-84.5]",
//                 "low_birthweight": 0.09,
//                 "management_professional_and_related_occupations": 24.6,
//                 "mar": 0.752514070700804,
//                 "maxalc": 0.000178411714390203,
//                 "meanalc": 5.83120600733767e-05,
//                 "median_age": 43.9,
//                 "median_earnings_2010_dollars": 26915.90349,
//                 "mixedness": -0.301576558108968,
//                 "name_16": "Cherokee",
//                 "name_prev": "Cherokee",
//                 "native_american_population": 0.55,
//                 "nearest_county": 1019,
//                 "other": 1,
//                 "other08": 141,
//                 "other08_frac": 0.014468958440225757,
//                 "other12": 154,
//                 "other12_frac": 0.015727124183006536,
//                 "other16_frac": 0.013805579358278587,
//                 "poor_mental_health_days": 5.2,
//                 "poor_physical_health_days": 6.1,
//                 "population_some_other_race_or_races": 1,
//                 "poverty_rate_below_federal_poverty_threshold": 16.1,
//                 "precincts": 25,
//                 "precip": 1321.689,
//                 "precip_bins": "(1.27e+03,1.39e+03]",
//                 "preschool_enrollment_ratio_enrolled_ages_3_and_4": 24.2,
//                 "production_transportation_and_material_moving_occupations": 25,
//                 "rep08": 7298,
//                 "rep08_frac": 74.88968701898409,
//                 "rep08_frac2": 0.7598917117867555,
//                 "rep12": 7506,
//                 "rep12_frac": 76.65441176470588,
//                 "rep12_frac2": 0.778792280556132,
//                 "rep16_frac": 83.87127487384556,
//                 "rep16_frac2": 0.8525113713345592,
//                 "reporting": 25,
//                 "s": -0.78557900435343,
//                 "sales_and_office_occupations": 20.25,
//                 "school_enrollment": 68.8,
//                 "service_occupations": 15.55,
//                 "sexually_transmitted_infections": 268.6,
//                 "sire_homogeneity": 0.8492775,
//                 "spring_prcp": 1325,
//                 "st": "AL",
//                 "state": "Alabama",
//                 "statecode_prev": "01",
//                 "summer_prcp": 1260.5,
//                 "teen_births": 52.2,
//                 "total08": 9745,
//                 "total12": 9792,
//                 "total16": 10503,
//                 "total_population": 25208,
//                 "unemployment": 0.071,
//                 "uninsured": 0.172,
//                 "violent_crime": 335.88,
//                 "votes": 10503,
//                 "votes16_clintonh": 1524,
//                 "votes16_johnsong": 145,
//                 "votes16_steinj": 25,
//                 "votes16_trumpd": 8809,
//                 "white": 92,
//                 "white_asian": 92.15,
//                 "white_not_latino_population": 92,
//                 "winter_prcp": 1470
//             },
//             "geometry": {
//                 "coordinates": [
//                     -85.60376971296114,
//                     34.175924937364535
//                 ],
//                 "type": "Point"
//             },
//             "record_timestamp": "2019-02-19T15:39:55+00:00",
//             "recordid": "2e2bf82e1119af4fff8b6c11cccc51a9cd4e169e"
//         },
//         {
//             "datasetid": "usa-2016-presidential-election-by-county",
//             "fields": {
//                 "acfs": 7.79354869278048e-05,
//                 "adult_obesity": 0.353,
//                 "adult_smoking": 0.192,
//                 "adults_65_and_older_living_in_poverty": 11.15,
//                 "african_american_population": 53.6,
//                 "amerindian": 0.2,
//                 "annual_prcp": 5293.5,
//                 "annual_tavg": 648,
//                 "annual_tmax": 764,
//                 "annual_tmin": 532.5,
//                 "asian": 1.75,
//                 "asian_american_population": 1.75,
//                 "at_least_bachelor_s_degree": 30.5,
//                 "at_least_high_school_diploma": 84.7,
//                 "autumn_prcp": 1143,
//                 "autumn_tavg": 657.5,
//                 "autumn_tmax": 778.5,
//                 "autumn_tmin": 536.5,
//                 "black": 53.6,
//                 "ca": -1.81128586436503,
//                 "cfs": 7.79354869278048e-05,
//                 "child_poverty_living_in_families_below_the_poverty_line": 28.05,
//                 "children_in_single_parent_households": 0.49,
//                 "children_under_6_living_in_poverty": 33.65,
//                 "construction_extraction_maintenance_and_repair_occupations": 6.85,
//                 "county": "Montgomery County, Alabama",
//                 "dem08": 62166,
//                 "dem08_frac": 59.350982881910966,
//                 "dem08_frac2": 0.5966198642955172,
//                 "dem12": "63085",
//                 "dem12_frac": 61.807440210841904,
//                 "dem12_frac2": 0.6220357533746808,
//                 "dem16_frac": 62.03633210675464,
//                 "dem16_frac2": 0.6335950408760543,
//                 "diabetes": 0.143,
//                 "elevation": 65.1,
//                 "elevation_bins": "(38.9,105]",
//                 "est_votes_remaining": 0,
//                 "farming_fishing_and_forestry_occupations": 0.3,
//                 "fips": "01101",
//                 "geo_shape": {},
//                 "gini_coefficient": 0.473,
//                 "graduate_degree": 12.3,
//                 "green16_frac": 0.5170663621367847,
//                 "hispanic": 2.75,
//                 "hiv_prevalence_rate": 755.5,
//                 "homicide_rate": 14.06,
//                 "infant_mortality": 10.1,
//                 "injury_deaths": 58.7,
//                 "lat": 32.2036505,
//                 "lat_bins": [
//                     32.220261926170856,
//                     -86.20761529449058
//                 ],
//                 "latino_population": 2.75,
//                 "less_than_high_school": 15.3,
//                 "libert16_frac": 1.5712895994586136,
//                 "lon": -86.2038308,
//                 "lon_bins": "(-87.2,-84.5]",
//                 "low_birthweight": 0.12,
//                 "management_professional_and_related_occupations": 35.6,
//                 "mar": 1.10839063803946,
//                 "maxalc": 0.000760769795895566,
//                 "meanalc": 0.000177840771005834,
//                 "median_age": 34.6,
//                 "median_earnings_2010_dollars": 26278.649205,
//                 "mixedness": 0.638891967395174,
//                 "name_16": "Montgomery",
//                 "name_prev": "Montgomery",
//                 "native_american_population": 0.2,
//                 "nearest_county": 1101,
//                 "other": 1.1,
//                 "other08": 546,
//                 "other08_frac": 0.0052127588478466345,
//                 "other12": 650,
//                 "other12_frac": 0.0063683658773158805,
//                 "other16_frac": 0.015712895994586137,
//                 "poor_mental_health_days": 3.8,
//                 "poor_physical_health_days": 4,
//                 "population_some_other_race_or_races": 1.1,
//                 "poverty_rate_below_federal_poverty_threshold": 18.35,
//                 "precincts": 130,
//                 "precip": 1344.549,
//                 "precip_bins": "(1.27e+03,1.39e+03]",
//                 "preschool_enrollment_ratio_enrolled_ages_3_and_4": 46.4,
//                 "production_transportation_and_material_moving_occupations": 13.3,
//                 "rep08": 42031,
//                 "rep08_frac": 40.12774123330438,
//                 "rep08_frac2": 0.40338013570448283,
//                 "rep12": 38332,
//                 "rep12_frac": 37.55572320142652,
//                 "rep12_frac2": 0.37796424662531924,
//                 "rep16_frac": 35.87531193164996,
//                 "rep16_frac2": 0.3664049591239457,
//                 "reporting": 130,
//                 "s": -1.19840074738169,
//                 "sales_and_office_occupations": 26.35,
//                 "school_enrollment": 76.15,
//                 "service_occupations": 17.6,
//                 "sexually_transmitted_infections": 1277.4,
//                 "sire_homogeneity": 0.45291375,
//                 "spring_prcp": 1330,
//                 "spring_tavg": 644,
//                 "spring_tmax": 768,
//                 "spring_tmin": 521,
//                 "st": "AL",
//                 "state": "Alabama",
//                 "statecode_prev": "01",
//                 "summer_prcp": 1369,
//                 "summer_tavg": 804,
//                 "summer_tmax": 910,
//                 "summer_tmin": 697.5,
//                 "teen_births": 55.4,
//                 "temp": 18.2222222222222,
//                 "temp_bins": [
//                     16.6,
//                     18.5
//                 ],
//                 "total08": 104743,
//                 "total12": 102067,
//                 "total16": 94572,
//                 "total_population": 226866,
//                 "unemployment": 0.077,
//                 "uninsured": 0.165,
//                 "violent_crime": 380,
//                 "votes": 94572,
//                 "votes16_clintonh": 58669,
//                 "votes16_johnsong": 1486,
//                 "votes16_steinj": 489,
//                 "votes16_trumpd": 33928,
//                 "white": 40.55,
//                 "white_asian": 42.3,
//                 "white_not_latino_population": 40.55,
//                 "winter_prcp": 1451.5,
//                 "winter_tavg": 484,
//                 "winter_tmax": 596.5,
//                 "winter_tmin": 371
//             },
//             "geometry": {
//                 "coordinates": [
//                     -86.20761529449058,
//                     32.220261926170856
//                 ],
//                 "type": "Point"
//             },
//             "record_timestamp": "2019-02-19T15:39:55+00:00",
//             "recordid": "4d0567b884adf30e7c1fcd32c8c2ddfd01a8a5d5"
//         }
//     ]
// }