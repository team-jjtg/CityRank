// Define an object model for storing and manipulating data associated with
// the 182 cities known to our application.  Over time the data can be joined
// with other metrics of interest (such as political affiliation and 
// affordability).
//
// See the unit tests at the bottom of this file for examples on how to use this
// object and its methods.
//
// The base-level 'city happiness rating' data come from: 
//
//      https://wallethub.com/edu/happiest-places-to-live
//
// Schema Description
// ------------------
// happiness:                 range [29.19 to 72.30] higher == better
// wellbeing:                 range [1 to 182] lower == better
// income_and_employment:     range [1 to 182] lower == better
// community_and_environment: range [1 to 182] lower == better

let cityMetrics = [
	{"Plano, TX": { "county": "Collin County", "happiness": 72.30, "wellbeing": 7, "income_and_employment": 6, "community_and_environment": 8 }},
	{"Irvine, CA": { "county": "Orange County", "happiness": 71.86, "wellbeing": 14, "income_and_employment": 11, "community_and_environment": 5 }},
	{"Madison, WI": { "county": "Dane County", "happiness": 71.81, "wellbeing": 3, "income_and_employment": 14, "community_and_environment": 7 }},
	{"Fremont, CA": { "county": "Alameda County", "happiness": 71.17, "wellbeing": 10, "income_and_employment": 37, "community_and_environment": 1 }},
	{"Huntington Beach, CA": { "county": "Orange County", "happiness": 69.74, "wellbeing": 6, "income_and_employment": 46, "community_and_environment": 28 }},
	{"Fargo, ND": { "county": "Cass County", "happiness": 69.57, "wellbeing": 17, "income_and_employment": 20, "community_and_environment": 24 }},
	{"Grand Prairie, TX": { "county": "Dallas County", "happiness": 69.30, "wellbeing": 20, "income_and_employment": 35, "community_and_environment": 6 }},
	{"San Jose, CA": { "county": "Santa Clara County", "happiness": 68.90, "wellbeing": 1, "income_and_employment": 18, "community_and_environment": 44 }},
	{"Scottsdale, AZ": { "county": "Maricopa County", "happiness": 68.24, "wellbeing": 46, "income_and_employment": 13, "community_and_environment": 2 }},
	{"San Francisco, CA": { "county": "San Francisco County", "happiness": 67.53, "wellbeing": 4, "income_and_employment": 2, "community_and_environment": 125 }},
	{"Bismarck, ND": { "county": "Burleigh County", "happiness": 67.38, "wellbeing": 25, "income_and_employment": 4, "community_and_environment": 45 }},
	{"Overland Park, KS": { "county": "Johnson County", "happiness": 67.37, "wellbeing": 22, "income_and_employment": 56, "community_and_environment": 26 }},
	{"Santa Rosa, CA": { "county": "Sonoma County", "happiness": 67.18, "wellbeing": 23, "income_and_employment": 53, "community_and_environment": 9 }},
	{"Austin, TX": { "county": "Travis County", "happiness": 67.16, "wellbeing": 15, "income_and_employment": 8, "community_and_environment": 80 }},
	{"Sioux Falls, SD": { "county": "Minnehaha County", "happiness": 66.97, "wellbeing": 11, "income_and_employment": 67, "community_and_environment": 95 }},
	{"Pearl City, HI": { "county": "Honolulu County", "happiness": 66.77, "wellbeing": 2, "income_and_employment": 147, "community_and_environment": 15 }},
	{"Glendale, CA": { "county": "Los Angeles County", "happiness": 66.25, "wellbeing": 27, "income_and_employment": 102, "community_and_environment": 12 }},
	{"San Diego, CA": { "county": "San Diego County", "happiness": 66.01, "wellbeing": 8, "income_and_employment": 36, "community_and_environment": 46 }},
	{"St. Paul, MN": { "county": "Ramsey County", "happiness": 65.79, "wellbeing": 18, "income_and_employment": 70, "community_and_environment": 66 }},
	{"Charleston, SC": { "county": "Charleston County", "happiness": 65.48, "wellbeing": 74, "income_and_employment": 5, "community_and_environment": 4 }},
	{"Gilbert, AZ": { "county": "Maricopa County", "happiness": 65.07, "wellbeing": 54, "income_and_employment": 48, "community_and_environment": 10 }},
	{"Anaheim, CA": { "county": "Orange County", "happiness": 65.02, "wellbeing": 29, "income_and_employment": 79, "community_and_environment": 34 }},
	{"Raleigh, NC": { "county": "Durham County", "happiness": 64.99, "wellbeing": 13, "income_and_employment": 41, "community_and_environment": 87 }},
	{"Cape Coral, FL": { "county": "Lee County", "happiness": 64.96, "wellbeing": 51, "income_and_employment": 87, "community_and_environment": 3 }},
	{"Cedar Rapids, IA": { "county": "Linn County", "happiness": 64.90, "wellbeing": 41, "income_and_employment": 58, "community_and_environment": 20 }},
	{"Minneapolis, MN": { "county": "Hennepin County", "happiness": 64.82, "wellbeing": 5, "income_and_employment": 26, "community_and_environment": 137 }},
	{"Chula Vista, CA": { "county": "San Diego County", "happiness": 64.54, "wellbeing": 19, "income_and_employment": 117, "community_and_environment": 25 }},
	{"Pembroke Pines, FL": { "county": "Broward County", "happiness": 64.51, "wellbeing": 47, "income_and_employment": 89, "community_and_environment": 14 }},
	{"Honolulu, HI": { "county": "Honolulu County", "happiness": 64.21, "wellbeing": 55, "income_and_employment": 34, "community_and_environment": 17 }},
	{"Des Moines, IA": { "county": "Polk County", "happiness": 64.17, "wellbeing": 39, "income_and_employment": 85, "community_and_environment": 37 }},
	{"Irving, TX": { "county": "Dallas County", "happiness": 64.07, "wellbeing": 28, "income_and_employment": 17, "community_and_environment": 119 }},
	{"Santa Clarita, CA": { "county": "Los Angeles County", "happiness": 64.00, "wellbeing": 24, "income_and_employment": 112, "community_and_environment": 77 }},
	{"Chandler, AZ": { "county": "Maricopa County", "happiness": 63.83, "wellbeing": 62, "income_and_employment": 55, "community_and_environment": 16 }},
	{"Oceanside, CA": { "county": "San Diego County", "happiness": 63.82, "wellbeing": 16, "income_and_employment": 156, "community_and_environment": 29 }},
	{"Omaha, NE": { "county": "Douglas County", "happiness": 63.50, "wellbeing": 56, "income_and_employment": 80, "community_and_environment": 19 }},
	{"Lincoln, NE": { "county": "Lancaster County", "happiness": 63.43, "wellbeing": 32, "income_and_employment": 86, "community_and_environment": 62 }},
	{"Oakland, CA": { "county": "Alameda County", "happiness": 63.16, "wellbeing": 12, "income_and_employment": 75, "community_and_environment": 131 }},
	{"Billings, MT": { "county": "Yellowstone County", "happiness": 62.82, "wellbeing": 61, "income_and_employment": 33, "community_and_environment": 51 }},
	{"Tempe, AZ": { "county": "Maricopa County", "happiness": 62.80, "wellbeing": 66, "income_and_employment": 54, "community_and_environment": 21 }},
	{"Garden Grove, CA": { "county": "Orange County", "happiness": 62.70, "wellbeing": 37, "income_and_employment": 107, "community_and_environment": 67 }},
	{"Denver, CO": { "county": "Denver County", "happiness": 62.41, "wellbeing": 21, "income_and_employment": 64, "community_and_environment": 116 }},
	{"Fort Worth, TX": { "county": "Tarrant County", "happiness": 62.35, "wellbeing": 44, "income_and_employment": 90, "community_and_environment": 54 }},
	{"Burlington, VT": { "county": "Chittenden County", "happiness": 62.31, "wellbeing": 53, "income_and_employment": 10, "community_and_environment": 120 }},
	{"Peoria, AZ": { "county": "Maricopa County", "happiness": 62.30, "wellbeing": 65, "income_and_employment": 77, "community_and_environment": 23 }},
	{"Port St. Lucie, FL": { "county": "Lucie County", "happiness": 61.96, "wellbeing": 76, "income_and_employment": 73, "community_and_environment": 13 }},
	{"Boise, ID": { "county": "Ada County", "happiness": 61.94, "wellbeing": 68, "income_and_employment": 19, "community_and_environment": 48 }},
	{"Garland, TX": { "county": "Dallas County", "happiness": 61.86, "wellbeing": 31, "income_and_employment": 120, "community_and_environment": 103 }},
	{"Aurora, CO": { "county": "Arapahoe County", "happiness": 61.83, "wellbeing": 26, "income_and_employment": 121, "community_and_environment": 104 }},
	{"El Paso, TX": { "county": "El Paso County", "happiness": 61.73, "wellbeing": 58, "income_and_employment": 98, "community_and_environment": 39 }},
	{"Arlington, TX": { "county": "Tarrant County", "happiness": 61.73, "wellbeing": 40, "income_and_employment": 128, "community_and_environment": 59 }},
	{"Washington, DC": { "county": "District of Columbia", "happiness": 61.68, "wellbeing": 9, "income_and_employment": 40, "community_and_environment": 167 }},
	{"Charlotte, NC": { "county": "Mecklenburg County", "happiness": 61.22, "wellbeing": 52, "income_and_employment": 92, "community_and_environment": 57 }},
	{"Fort Lauderdale, FL": { "county": "Broward County", "happiness": 61.16, "wellbeing": 59, "income_and_employment": 60, "community_and_environment": 92 }},
	{"Seattle, WA": { "county": "King County", "happiness": 61.11, "wellbeing": 36, "income_and_employment": 1, "community_and_environment": 171 }},
	{"Aurora, IL": { "county": "Kane County", "happiness": 61.05, "wellbeing": 38, "income_and_employment": 164, "community_and_environment": 56 }},
	{"Missoula, MT": { "county": "Missoula County", "happiness": 60.99, "wellbeing": 57, "income_and_employment": 52, "community_and_environment": 91 }},
	{"Santa Ana, CA": { "county": "Orange County", "happiness": 60.96, "wellbeing": 50, "income_and_employment": 103, "community_and_environment": 73 }},
	{"Boston, MA": { "county": "Suffolk County", "happiness": 60.96, "wellbeing": 34, "income_and_employment": 12, "community_and_environment": 152 }},
	{"Colorado Springs, CO": { "county": "El Paso County", "happiness": 60.96, "wellbeing": 72, "income_and_employment": 69, "community_and_environment": 36 }},
	{"Durham, NC": { "county": "Durham County", "happiness": 60.90, "wellbeing": 30, "income_and_employment": 28, "community_and_environment": 113 }},
	{"Portland, ME": { "county": "Cumberland County", "happiness": 60.83, "wellbeing": 48, "income_and_employment": 49, "community_and_environment": 149 }},
	{"Grand Rapids, MI": { "county": "Kent County", "happiness": 60.33, "wellbeing": 83, "income_and_employment": 31, "community_and_environment": 49 }},
	{"Rancho Cucamonga, CA": { "county": "San Bernardino County", "happiness": 60.14, "wellbeing": 79, "income_and_employment": 32, "community_and_environment": 68 }},
	{"Salt Lake City, UT": { "county": "Salt Lake County", "happiness": 60.11, "wellbeing": 80, "income_and_employment": 9, "community_and_environment": 82 }},
	{"Yonkers, NY": { "county": "Westchester County", "happiness": 60.10, "wellbeing": 45, "income_and_employment": 157, "community_and_environment": 79 }},
	{"Las Cruces, NM": { "county": "Doqa Ana County", "happiness": 60.08, "wellbeing": 33, "income_and_employment": 123, "community_and_environment": 69 }},
	{"Rapid City, SD": { "county": "Pennington County", "happiness": 60.07, "wellbeing": 86, "income_and_employment": 30, "community_and_environment": 64 }},
	{"Dallas, TX": { "county": "Dallas County", "happiness": 59.82, "wellbeing": 35, "income_and_employment": 109, "community_and_environment": 123 }},
	{"South Burlington, VT": { "county": "Chittenden County", "happiness": 59.81, "wellbeing": 90, "income_and_employment": 63, "community_and_environment": 31 }},
	{"Virginia Beach, VA": { "county": "Virginia Beach city", "happiness": 59.71, "wellbeing": 73, "income_and_employment": 105, "community_and_environment": 43 }},
	{"Long Beach, CA": { "county": "Los Angeles County", "happiness": 59.58, "wellbeing": 42, "income_and_employment": 138, "community_and_environment": 108 }},
	{"Anchorage, AK": { "county": "Anchorage Municipality", "happiness": 59.53, "wellbeing": 84, "income_and_employment": 82, "community_and_environment": 41 }},
	{"Cheyenne, WY": { "county": "Laramie County", "happiness": 59.51, "wellbeing": 78, "income_and_employment": 23, "community_and_environment": 127 }},
	{"Columbia, MD": { "county": "Howard County", "happiness": 59.47, "wellbeing": 49, "income_and_employment": 101, "community_and_environment": 138 }},
	{"Mesa, AZ": { "county": "Maricopa County", "happiness": 59.25, "wellbeing": 77, "income_and_employment": 116, "community_and_environment": 47 }},
	{"Chesapeake, VA": { "county": "Chesapeake city", "happiness": 58.63, "wellbeing": 94, "income_and_employment": 122, "community_and_environment": 27 }},
	{"Reno, NV": { "county": "Washoe County", "happiness": 58.58, "wellbeing": 98, "income_and_employment": 50, "community_and_environment": 52 }},
	{"Tallahassee, FL": { "county": "Leon County", "happiness": 58.54, "wellbeing": 91, "income_and_employment": 42, "community_and_environment": 85 }},
	{"Atlanta, GA": { "county": "Fulton County", "happiness": 58.46, "wellbeing": 64, "income_and_employment": 88, "community_and_environment": 100 }},
	{"Oxnard, CA": { "county": "Ventura County", "happiness": 58.36, "wellbeing": 71, "income_and_employment": 151, "community_and_environment": 30 }},
	{"Nampa, ID": { "county": "Canyon County", "happiness": 58.20, "wellbeing": 102, "income_and_employment": 137, "community_and_environment": 11 }},
	{"Los Angeles, CA": { "county": "Los Angeles County", "happiness": 58.12, "wellbeing": 43, "income_and_employment": 104, "community_and_environment": 146 }},
	{"Orlando, FL": { "county": "Orange County", "happiness": 58.04, "wellbeing": 85, "income_and_employment": 24, "community_and_environment": 107 }},
	{"Portland, OR": { "county": "Multnomah County", "happiness": 57.72, "wellbeing": 92, "income_and_employment": 27, "community_and_environment": 102 }},
	{"Salem, OR": { "county": "Marion County", "happiness": 57.71, "wellbeing": 101, "income_and_employment": 29, "community_and_environment": 90 }},
	{"Brownsville, TX": { "county": "Cameron County", "happiness": 57.55, "wellbeing": 95, "income_and_employment": 68, "community_and_environment": 88 }},
	{"Pittsburgh, PA": { "county": "Allegheny County", "happiness": 57.45, "wellbeing": 112, "income_and_employment": 21, "community_and_environment": 60 }},
	{"Riverside, CA": { "county": "Riverside County", "happiness": 57.25, "wellbeing": 100, "income_and_employment": 22, "community_and_environment": 105 }},
	{"Fontana, CA": { "county": "San Bernardino County", "happiness": 57.23, "wellbeing": 106, "income_and_employment": 72, "community_and_environment": 50 }},
	{"New York, NY": { "county": "Kings County", "happiness": 57.10, "wellbeing": 70, "income_and_employment": 152, "community_and_environment": 74 }},
	{"Nashua, NH": { "county": "Hillsborough County", "happiness": 57.09, "wellbeing": 82, "income_and_employment": 100, "community_and_environment": 96 }},
	{"Huntsville, AL": { "county": "Madison County", "happiness": 57.00, "wellbeing": 130, "income_and_employment": 47, "community_and_environment": 22 }},
	{"Jersey City, NJ": { "county": "Hudson County", "happiness": 56.85, "wellbeing": 93, "income_and_employment": 168, "community_and_environment": 33 }},
	{"West Valley City, UT": { "county": "Salt Lake County", "happiness": 56.83, "wellbeing": 103, "income_and_employment": 78, "community_and_environment": 81 }},
	{"Manchester, NH": { "county": "Hillsborough County", "happiness": 56.49, "wellbeing": 96, "income_and_employment": 113, "community_and_environment": 63 }},
	{"Ontario, CA": { "county": "San Bernardino County", "happiness": 56.35, "wellbeing": 107, "income_and_employment": 84, "community_and_environment": 70 }},
	{"San Antonio, TX": { "county": "Bexar County", "happiness": 56.34, "wellbeing": 115, "income_and_employment": 57, "community_and_environment": 55 }},
	{"Amarillo, TX": { "county": "Potter County", "happiness": 56.21, "wellbeing": 119, "income_and_employment": 45, "community_and_environment": 78 }},
	{"Vancouver, WA": { "county": "Clark County", "happiness": 56.17, "wellbeing": 108, "income_and_employment": 97, "community_and_environment": 61 }},
	{"Tampa, FL": { "county": "Hillsborough County", "happiness": 56.02, "wellbeing": 121, "income_and_employment": 38, "community_and_environment": 58 }},
	{"Miami, FL": { "county": "Miami-Dade County", "happiness": 55.97, "wellbeing": 63, "income_and_employment": 39, "community_and_environment": 179 }},
	{"Dover, DE": { "county": "Kent County", "happiness": 55.94, "wellbeing": 81, "income_and_employment": 61, "community_and_environment": 145 }},
	{"Moreno Valley, CA": { "county": "Riverside County", "happiness": 55.61, "wellbeing": 111, "income_and_employment": 108, "community_and_environment": 65 }},
	{"Glendale, AZ": { "county": "Maricopa County", "happiness": 55.36, "wellbeing": 89, "income_and_employment": 159, "community_and_environment": 86 }},
	{"Nashville, TN": { "county": "Davidson County", "happiness": 55.34, "wellbeing": 126, "income_and_employment": 96, "community_and_environment": 35 }},
	{"Houston, TX": { "county": "Harris County", "happiness": 55.33, "wellbeing": 69, "income_and_employment": 132, "community_and_environment": 139 }},
	{"Chicago, IL": { "county": "Cook County", "happiness": 55.20, "wellbeing": 60, "income_and_employment": 175, "community_and_environment": 114 }},
	{"Columbia, SC": { "county": "Richland County", "happiness": 54.93, "wellbeing": 137, "income_and_employment": 7, "community_and_environment": 83 }},
	{"Greensboro, NC": { "county": "Guilford County", "happiness": 54.90, "wellbeing": 97, "income_and_employment": 94, "community_and_environment": 98 }},
	{"Lewiston, ME": { "county": "Androscoggin County", "happiness": 54.55, "wellbeing": 151, "income_and_employment": 43, "community_and_environment": 84 }},
	{"Laredo, TX": { "county": "Webb County", "happiness": 54.40, "wellbeing": 75, "income_and_employment": 66, "community_and_environment": 173 }},
	{"Hialeah, FL": { "county": "Miami-Dade County", "happiness": 54.33, "wellbeing": 67, "income_and_employment": 160, "community_and_environment": 169 }},
	{"Lexington-Fayette, KY": { "county": "Fayette County", "happiness": 54.13, "wellbeing": 113, "income_and_employment": 76, "community_and_environment": 112 }},
	{"Henderson, NV": { "county": "Clark County", "happiness": 54.13, "wellbeing": 120, "income_and_employment": 125, "community_and_environment": 53 }},
	{"Sacramento, CA": { "county": "Sacramento County", "happiness": 53.96, "wellbeing": 114, "income_and_employment": 59, "community_and_environment": 118 }},
	{"Modesto, CA": { "county": "Stanislaus County", "happiness": 53.50, "wellbeing": 117, "income_and_employment": 81, "community_and_environment": 121 }},
	{"Newport News, VA": { "county": "Newport News city", "happiness": 53.29, "wellbeing": 105, "income_and_employment": 155, "community_and_environment": 128 }},
	{"Tucson, AZ": { "county": "Pima County", "happiness": 53.19, "wellbeing": 99, "income_and_employment": 114, "community_and_environment": 134 }},
	{"Springfield, MO": { "county": "Greene County", "happiness": 53.03, "wellbeing": 132, "income_and_employment": 106, "community_and_environment": 71 }},
	{"St. Petersburg, FL": { "county": "Pinellas County", "happiness": 52.76, "wellbeing": 135, "income_and_employment": 25, "community_and_environment": 133 }},
	{"Richmond, VA": { "county": "Richmond city", "happiness": 52.66, "wellbeing": 104, "income_and_employment": 139, "community_and_environment": 157 }},
	{"Tacoma, WA": { "county": "Pierce County", "happiness": 52.59, "wellbeing": 109, "income_and_employment": 140, "community_and_environment": 153 }},
	{"Warwick, RI": { "county": "Kent County", "happiness": 52.41, "wellbeing": 136, "income_and_employment": 44, "community_and_environment": 151 }},
	{"Lubbock, TX": { "county": "Lubbock County", "happiness": 52.29, "wellbeing": 133, "income_and_employment": 16, "community_and_environment": 142 }},
	{"Casper, WY": { "county": "Natrona County", "happiness": 51.99, "wellbeing": 161, "income_and_employment": 71, "community_and_environment": 97 }},
	{"Kansas City, MO": { "county": "Jackson County", "happiness": 51.96, "wellbeing": 110, "income_and_employment": 148, "community_and_environment": 129 }},
	{"Phoenix, AZ": { "county": "Maricopa County", "happiness": 51.94, "wellbeing": 87, "income_and_employment": 136, "community_and_environment": 172 }},
	{"Oklahoma City, OK": { "county": "Oklahoma County", "happiness": 51.59, "wellbeing": 155, "income_and_employment": 110, "community_and_environment": 38 }},
	{"Corpus Christi, TX": { "county": "Nueces County", "happiness": 51.50, "wellbeing": 145, "income_and_employment": 15, "community_and_environment": 124 }},
	{"Winston-Salem, NC": { "county": "Forsyth County", "happiness": 51.44, "wellbeing": 116, "income_and_employment": 118, "community_and_environment": 141 }},
	{"Juneau, AK": { "county": "Juneau City and Borough", "happiness": 51.21, "wellbeing": 160, "income_and_employment": 3, "community_and_environment": 175 }},
	{"Albuquerque, NM": { "county": "Bernalillo County", "happiness": 51.15, "wellbeing": 123, "income_and_employment": 111, "community_and_environment": 150 }},
	{"Columbus, OH": { "county": "Franklin County", "happiness": 51.14, "wellbeing": 128, "income_and_employment": 133, "community_and_environment": 111 }},
	{"Bakersfield, CA": { "county": "Kern County", "happiness": 50.98, "wellbeing": 139, "income_and_employment": 74, "community_and_environment": 126 }},
	{"Bridgeport, CT": { "county": "Fairfield County", "happiness": 50.92, "wellbeing": 88, "income_and_employment": 169, "community_and_environment": 161 }},
	{"Jacksonville, FL": { "county": "Duval County", "happiness": 50.55, "wellbeing": 153, "income_and_employment": 95, "community_and_environment": 72 }},
	{"Knoxville, TN": { "county": "Knox County", "happiness": 50.43, "wellbeing": 166, "income_and_employment": 62, "community_and_environment": 32 }},
	{"Louisville, KY": { "county": "Jefferson County", "happiness": 50.31, "wellbeing": 158, "income_and_employment": 124, "community_and_environment": 42 }},
	{"Norfolk, VA": { "county": "Norfolk city", "happiness": 49.97, "wellbeing": 129, "income_and_employment": 129, "community_and_environment": 143 }},
	{"Chattanooga, TN": { "county": "Hamilton County", "happiness": 49.94, "wellbeing": 167, "income_and_employment": 99, "community_and_environment": 40 }},
	{"Wichita, KS": { "county": "Sedgwick County", "happiness": 49.79, "wellbeing": 138, "income_and_employment": 131, "community_and_environment": 130 }},
	{"Worcester, MA": { "county": "Worcester County", "happiness": 49.77, "wellbeing": 125, "income_and_employment": 149, "community_and_environment": 159 }},
	{"Rochester, NY": { "county": "Monroe County", "happiness": 49.76, "wellbeing": 134, "income_and_employment": 142, "community_and_environment": 140 }},
	{"San Bernardino, CA": { "county": "San Bernardino County", "happiness": 49.56, "wellbeing": 124, "income_and_employment": 134, "community_and_environment": 166 }},
	{"Buffalo, NY": { "county": "Erie County", "happiness": 49.22, "wellbeing": 144, "income_and_employment": 126, "community_and_environment": 117 }},
	{"Fresno, CA": { "county": "Fresno County", "happiness": 48.86, "wellbeing": 127, "income_and_employment": 119, "community_and_environment": 158 }},
	{"Milwaukee, WI": { "county": "Milwaukee County", "happiness": 48.75, "wellbeing": 122, "income_and_employment": 172, "community_and_environment": 147 }},
	{"Baton Rouge, LA": { "county": "East Baton Rouge Parish", "happiness": 48.56, "wellbeing": 140, "income_and_employment": 93, "community_and_environment": 168 }},
	{"Stockton, CA": { "county": "San Joaquin County", "happiness": 48.35, "wellbeing": 118, "income_and_employment": 150, "community_and_environment": 165 }},
	{"Spokane, WA": { "county": "Spokane County", "happiness": 48.08, "wellbeing": 142, "income_and_employment": 91, "community_and_environment": 176 }},
	{"Indianapolis, IN": { "county": "Marion County", "happiness": 47.83, "wellbeing": 147, "income_and_employment": 177, "community_and_environment": 89 }},
	{"Fort Wayne, IN": { "county": "Allen County", "happiness": 47.63, "wellbeing": 152, "income_and_employment": 143, "community_and_environment": 132 }},
	{"New Orleans, LA": { "county": "Orleans Parish", "happiness": 47.57, "wellbeing": 164, "income_and_employment": 127, "community_and_environment": 76 }},
	{"North Las Vegas, NV": { "county": "Clark County", "happiness": 47.19, "wellbeing": 157, "income_and_employment": 158, "community_and_environment": 99 }},
	{"Las Vegas, NV": { "county": "Clark County", "happiness": 47.02, "wellbeing": 149, "income_and_employment": 146, "community_and_environment": 144 }},
	{"Tulsa, OK": { "county": "Tulsa County", "happiness": 46.50, "wellbeing": 170, "income_and_employment": 83, "community_and_environment": 110 }},
	{"Wilmington, DE": { "county": "New Castle County", "happiness": 46.32, "wellbeing": 156, "income_and_employment": 144, "community_and_environment": 154 }},
	{"Providence, RI": { "county": "Providence County", "happiness": 45.81, "wellbeing": 169, "income_and_employment": 115, "community_and_environment": 122 }},
	{"New Haven, CT": { "county": "New Haven County", "happiness": 45.56, "wellbeing": 131, "income_and_employment": 141, "community_and_environment": 182 }},
	{"Montgomery, AL": { "county": "Montgomery County", "happiness": 45.48, "wellbeing": 143, "income_and_employment": 176, "community_and_environment": 155 }},
	{"Baltimore, MD": { "county": "Baltimore city", "happiness": 44.75, "wellbeing": 148, "income_and_employment": 161, "community_and_environment": 177 }},
	{"Jackson, MS": { "county": "Hinds County", "happiness": 44.70, "wellbeing": 150, "income_and_employment": 178, "community_and_environment": 178 }},
	{"Shreveport, LA": { "county": "Caddo Parish", "happiness": 44.59, "wellbeing": 171, "income_and_employment": 173, "community_and_environment": 75 }},
	{"Memphis, TN": { "county": "Shelby County", "happiness": 44.45, "wellbeing": 146, "income_and_employment": 179, "community_and_environment": 156 }},
	{"Philadelphia, PA": { "county": "Philadelphia County", "happiness": 44.27, "wellbeing": 168, "income_and_employment": 165, "community_and_environment": 115 }},
	{"Columbus, GA": { "county": "Muscogee County", "happiness": 44.27, "wellbeing": 174, "income_and_employment": 154, "community_and_environment": 109 }},
	{"Fayetteville, NC": { "county": "Cumberland County", "happiness": 44.17, "wellbeing": 159, "income_and_employment": 153, "community_and_environment": 170 }},
	{"Akron, OH": { "county": "Summit County", "happiness": 44.05, "wellbeing": 154, "income_and_employment": 166, "community_and_environment": 174 }},
	{"Cincinnati, OH": { "county": "Hamilton County", "happiness": 43.50, "wellbeing": 165, "income_and_employment": 145, "community_and_environment": 162 }},
	{"Fort Smith, AR": { "county": "Sebastian County", "happiness": 43.33, "wellbeing": 176, "income_and_employment": 135, "community_and_environment": 136 }},
	{"St. Louis, MO": { "county": "St. Louis city", "happiness": 42.85, "wellbeing": 162, "income_and_employment": 170, "community_and_environment": 160 }},
	{"Augusta, GA": { "county": "Richmond County", "happiness": 42.38, "wellbeing": 175, "income_and_employment": 163, "community_and_environment": 106 }},
	{"Mobile, AL": { "county": "Mobile County", "happiness": 42.22, "wellbeing": 172, "income_and_employment": 174, "community_and_environment": 135 }},
	{"Newark, NJ": { "county": "Essex County", "happiness": 41.86, "wellbeing": 141, "income_and_employment": 182, "community_and_environment": 180 }},
	{"Huntington, WV": { "county": "Cabell County", "happiness": 41.58, "wellbeing": 182, "income_and_employment": 51, "community_and_environment": 18 }},
	{"Little Rock, AR": { "county": "Pulaski County", "happiness": 41.40, "wellbeing": 178, "income_and_employment": 130, "community_and_environment": 101 }},
	{"Gulfport, MS": { "county": "Harrison County", "happiness": 41.06, "wellbeing": 179, "income_and_employment": 162, "community_and_environment": 94 }},
	{"Cleveland, OH": { "county": "Cuyahoga County", "happiness": 40.81, "wellbeing": 163, "income_and_employment": 180, "community_and_environment": 164 }},
	{"Birmingham, AL": { "county": "Jefferson County", "happiness": 40.78, "wellbeing": 173, "income_and_employment": 167, "community_and_environment": 163 }},
	{"Charleston, WV": { "county": "Kanawha County", "happiness": 39.68, "wellbeing": 180, "income_and_employment": 65, "community_and_environment": 93 }},
	{"Toledo, OH": { "county": "Lucas County", "happiness": 39.48, "wellbeing": 177, "income_and_employment": 171, "community_and_environment": 148 }},
	{"Detroit, MI": { "county": "Monroe County", "happiness": 29.19, "wellbeing": 181, "income_and_employment": 181, "community_and_environment": 181 }}
];

let stateToST = {
	"Alabama": "AL",
	"Alaska": "AK",
	"Arizona": "AZ",
	"Arkansas": "AR",
	"California": "CA",
	"Colorado": "CO",
	"Connecticut": "CT",
	"Delaware": "DE",
	"District of Columbia": "DC",
	"Florida": "FL",
	"Georgia": "GA",
	"Hawaii": "HI",
	"Idaho": "ID",
	"Illinois": "IL",
	"Indiana": "IN",
	"Iowa": "IA",
	"Kansas": "KS",
	"Kentucky": "KY",
	"Louisiana": "LA",
	"Maine": "ME",
	"Maryland": "MD",
	"Massachusetts": "MA",
	"Michigan": "MI",
	"Minnesota": "MN",
	"Mississippi": "MS",
	"Missouri": "MO",
	"Montana": "MT",
	"Nebraska": "NE",
	"Nevada": "NV",
	"New Hampshire": "NH",
	"New Jersey": "NJ",
	"New Mexico": "NM",
	"New York": "NY",
	"North Carolina": "NC",
	"North Dakota": "ND",
	"Ohio": "OH",
	"Oklahoma": "OK",
	"Oregon": "OR",
	"Pennsylvania": "PA",
	"Rhode Island": "RI",
	"South Carolina": "SC",
	"South Dakota": "SD",
	"Tennessee": "TN",
	"Texas": "TX",
	"Utah": "UT",
	"Vermont": "VT",
	"Virginia": "VA",
	"Washington": "WA",
	"West Virginia": "WV",
	"Wisconsin": "WI",
	"Wyoming": "WY"
};

let STtoState = {
	"AL": "Alabama",
	"AK": "Alaska",
	"AZ": "Arizona",
	"AR": "Arkansas",
	"CA": "California",
	"CO": "Colorado",
	"CT": "Connecticut",
	"DE": "Delaware",
	"DC": "District of Columbia",
	"FL": "Florida",
	"GA": "Georgia",
	"HI": "Hawaii",
	"ID": "Idaho",
	"IL": "Illinois",
	"IN": "Indiana",
	"IA": "Iowa",
	"KS": "Kansas",
	"KY": "Kentucky",
	"LA": "Louisiana",
	"ME": "Maine",
	"MD": "Maryland",
	"MA": "Massachusetts",
	"MI": "Michigan",
	"MN": "Minnesota",
	"MS": "Mississippi",
	"MO": "Missouri",
	"MT": "Montana",
	"NE": "Nebraska",
	"NV": "Nevada",
	"NH": "New Hampshire",
	"NJ": "New Jersey",
	"NM": "New Mexico",
	"NY": "New York",
	"NC": "North Carolina",
	"ND": "North Dakota",
	"OH": "Ohio",
	"OK": "Oklahoma",
	"OR": "Oregon",
	"PA": "Pennsylvania",
	"RI": "Rhode Island",
	"SC": "South Carolina",
	"SD": "South Dakota",
	"TN": "Tennessee",
	"TX": "Texas",
	"UT": "Utah",
	"VT": "Vermont",
	"VA": "Virginia",
	"WA": "Washington",
	"WV": "West Virginia",
	"WI": "Wisconsin",
	"WY": "Wyoming"
};

function CityMetrics() {
	this.index = 0;
};
CityMetrics.prototype.data = cityMetrics;
CityMetrics.prototype.hasMoreItems = function() {
	return this.index < this.data.length;
}
CityMetrics.prototype.getNextItem = function() {
	return this.data[this.index++];
}
CityMetrics.prototype.getItem = function(index) {
	return this.data[index];
}
CityMetrics.prototype.reset = function() {
	this.index = 0;
}
CityMetrics.prototype.stateToST = stateToST;
CityMetrics.prototype.STtoState = STtoState;
CityMetrics.prototype.getST = function(state) {
	console.log("CityMetrics.getST() = state >" + state + "<");
	return this.stateToST[state];
}
CityMetrics.prototype.getState = function(ST) {
	return this.STtoState[ST];
}
CityMetrics.prototype.getCityST = function(item) {
	return Object.keys(item).join();
}
CityMetrics.prototype.getCounty = function(item) {
	let key = this.getCityST(item);
	return item[key].county
}
CityMetrics.prototype.getCountyST = function(item) {
	let cityST = this.getCityST(item);
	let county = this.getCounty(item);
	let parts = cityST.split(", ");
	parts[0] = county;
	let countyST = parts.join(", ");
	return countyST;
}
CityMetrics.prototype.getCountyState = function(item) {
	let cityST = this.getCityST(item);
	let county = this.getCounty(item);
	let parts = cityST.split(", ");
	parts[0] = county;
	parts[1] = this.getState(parts[1]);
	let countyState = parts.join(", ");
	return countyState;
}
CityMetrics.prototype.getCountyStateForCountyPolitics = function(item) {
	let cityST = this.getCityST(item);
	let county = this.getCounty(item);
	let parts = cityST.split(", ");
	if (county == "Lucie County") {
		county = "St. Lucie County"
	}
	parts[0] = county;
	parts[1] = this.getState(parts[1]);
	let countyState = parts.join(", ");
	return countyState;
}
CityMetrics.prototype.getHappiness = function(item) {
	let key = this.getCityST(item);
	return item[key].happiness
}
CityMetrics.prototype.getPolitics = function(item) {
	let key = this.getCityST(item);
	return item[key].politics
}
CityMetrics.prototype.getPoliticalColor = function(item) {
	let politics = this.getPolitics(item);
	console.log("TODO: finish CityMetrics.getPoliticalColor()!");
	throw new Error("Finish CityMetrics.getPoliticalColor()");
}
CityMetrics.prototype.getAffordability = function(item) {
	let key = this.getCityST(item);
	return item[key].affordability
}
CityMetrics.prototype.getAffordabilityAtIndex = function(index) {
	let key = this.getCityST(this.getItem(index));
	if (!this.data[index][key]["politics"]) console.log("CityMetrics.getPolitics(): no affordability field for ", key);
	return this.data[index][key].affordability;
}
CityMetrics.prototype.setAffordabilityAtIndex = function(affordability, index) {
	let key = this.getCityST(this.getItem(index));
	console.log("setAffordability key = ", key);
	this.data[index][key].affordability = affordability;
}
CityMetrics.prototype.getPoliticsAtIndex = function(index) {
	let key = this.getCityST(this.getItem(index));
	if (!this.data[index][key]["politics"]) console.log("CityMetrics.getPolitics(): no politics field for ", key);
	return this.data[index][key].politics;
}
CityMetrics.prototype.setPoliticsJsonAtIndex = function(politicsJson, index) {
	let key = this.getCityST(this.getItem(index));
	this.data[index][key].politics = politicsJson;
}
CityMetrics.prototype.setPoliticsAtIndex = function(demFraction, repFraction, index) {
	let results = {};
	let key = this.getCityST(this.getItem(index));
	results.demFraction = demFraction;
	results.repFraction = repFraction;
	this.data[index][key].politics = results;
}
CityMetrics.prototype.getCompareHappinessFunctionAscending = function() {
	let that = this;
	function compareHappiness(a, b) {
		let aHappiness = that.getHappiness(a);
		let bHappiness = that.getHappiness(b);
		// console.log("comparing happiness a b = ", aHappiness, bHappiness);
		if (aHappiness > bHappiness) return 1;
		if (aHappiness == bHappiness) return 0;
		if (aHappiness < bHappiness) return -1;
	}
	return compareHappiness;
}
CityMetrics.prototype.getCompareHappinessFunctionDescending = function() {
	let that = this;
	function compareHappiness(a, b) {
		let aHappiness = that.getHappiness(a);
		let bHappiness = that.getHappiness(b);
		// console.log("comparing happiness a b = ", aHappiness, bHappiness);
		if (aHappiness < bHappiness) return 1;
		if (aHappiness == bHappiness) return 0;
		if (aHappiness > bHappiness) return -1;
	}
	return compareHappiness;
}
CityMetrics.prototype.cherryPickFields = function(arrayOfFields, item) {
	results = {};
	for (let fieldName of arrayOfFields) {
		let key = this.getCityST(item);
		results[fieldName] = item[key][fieldName];
	}
	return results;
}
CityMetrics.prototype.normalizeToCityST = function(cityState) {
	let cityST = "";
	let parts = cityState.split(", ")
	let state = parts[1];
	parts[1] = this.getST(state);
	cityST = parts.join(", ");
	return cityST;
}
CityMetrics.prototype.normalizeToCityState = function(cityST) {
	let cityState = "";
	let parts = cityST.split(", ")
	let st = parts[1];
	parts[1] = this.getState(st);
	cityState= parts.join(", ");
	return cityState;
}

function UnitTestCityMetrics() {
	cp = new CountyPolitics();
	let cpFields = ["rep16_frac", "dem16_frac"];
	cm = new CityMetrics();
	let normalizedData = [];
	while (cm.hasMoreItems()) {
		let index = cm.index;
		let item = cm.getNextItem();
		let cityState = cm.getCityST(item);
		let county = cm.getCounty(item);
		let happiness = cm.getHappiness(item);
		console.log(`${cityState} = happiness: ${happiness}  county: ${county}`);

		console.log("setting affordability to 100000");
		cm.setAffordabilityAtIndex(100000, index);

		let politicalCountyState = cm.getCountyStateForCountyPolitics(item);
		console.log("setting politics for ", cityState, county, politicalCountyState);
		politicalJson = cp.cherryPickFields(cpFields, politicalCountyState);
		cm.setPoliticsJsonAtIndex(politicalJson, index);

		let politics = JSON.stringify(cm.getPoliticsAtIndex(index));
		let affordability = cm.getAffordabilityAtIndex(index);
		console.log(`${cityState} = affordability: ${affordability}  politics: ${politics}`)

		// This next method for extracting just the subset of fields used by
		// our application. :-)

		let json = cm.cherryPickFields(["happiness", "politics"], item);
		console.log("cherry picking ", cityState, "json = ", json);
		let normalizedItem = {};
		normalizedItem[cityState] = json;
		normalizedData.push(normalizedItem);

		let countyST = cm.getCountyST(item);
		console.log(`countyST = ${countyST}`);
		console.log(`politicalCountyState = ${politicalCountyState}`);
	}
	console.log("This is our normalized data ready to upload to firebase-ish");
	console.log(normalizedData);
	
	// IMPORTANT: You must call this method if you iterate over the list of
	//            cities multiple times (i.e., between iterations)
	//            otherwise the internally maintained index will not be reset.
	//            and cm.hasMoreItems() will always return false.
	cm.reset();

	// Examples of how to sort data in ascending or descending order by happiness.
	cm.data.sort(cm.getCompareHappinessFunctionAscending());
	console.log("City data sorted by happiness (ascending): ", cm.data);

	cm.data.sort(cm.getCompareHappinessFunctionDescending());
	console.log("City data sorted by happiness (descending): ", cm.data);

	let st = cm.getST("Alabama");
	console.log("State abbreviation for Alabama is >" + st + "<");

	let state = cm.getState("AL");
	console.log("Elaborated state from AL is >" + state + "<");

	let cityST = cm.normalizeToCityST("Jackson, Mississippi");
	console.log("Normalizing 'Jackson, Mississippi' to", cityST);

	let cityState = cm.normalizeToCityState(cityST);
	console.log("Normalizing 'Jackson, MS' to", cityState);
}