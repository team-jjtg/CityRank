function Firebase(dbConfig) {
    this.expectedDbLength = 178;
    this.dbConfig = dbConfig;
    this.dbInit();
    this.dbRef = this.getDbRef();
    this.addDbListener('child_added');
}
Firebase.prototype.data = [""];
Firebase.prototype.dbConfig = {};

Firebase.prototype.jakeDbConfig = {
    apiKey: "AIzaSyDjRdLIPTMyLiDV4IhEb73nwA4pRGk0pRc",
    authDomain: "project-jjtg.firebaseapp.com",
    databaseURL: "https://project-jjtg.firebaseio.com",
    projectId: "project-jjtg",
    storageBucket: "project-jjtg.appspot.com",
    messagingSenderId: "944126494599"
};

Firebase.prototype.glennDbConfig = {
    apiKey: "AIzaSyBLDNTITIfwGXsW1cFiiRFeGeRNi_-h-NM",
    authDomain: "city-rank-7a3a2.firebaseapp.com",
    databaseURL: "https://city-rank-7a3a2.firebaseio.com",
    projectId: "city-rank-7a3a2",
    storageBucket: "city-rank-7a3a2.appspot.com",
    messagingSenderId: "806278411941"
};

Firebase.prototype.jacksonDbConfig = {
    apiKey: "AIzaSyArzRDFqxyangn-k213sd3a71_JezY6EXY",
    authDomain: "city-rank-70929.firebaseapp.com",
    databaseURL: "https://city-rank-70929.firebaseio.com",
    projectId: "city-rank-70929",
    storageBucket: "city-rank-70929.appspot.com",
    messagingSenderId: "1018531085864"
};

Firebase.prototype.setData = function(normalizedCityMetrics) {
    this.data = normalizedCityMetrics;
}

Firebase.prototype.getData = function() {
    return this.data;
}

Firebase.prototype.dbInit = function() {
    console.log(this.dbConfig);
    firebase.initializeApp(this.dbConfig);
}

Firebase.prototype.getDbRef = function(childNode) {
    return firebase.database().ref(childNode);
}

Firebase.prototype.dbPushData = function(data) {
    console.log("Firebase.dbPushData() adding data");
    if (this.validInputData()) {
        this.dbRef.push(data);
    } else {
        console.log(`Firebase.dbPushData: Invalid input data length.  Expecting ${this.expectedDbLength} entries. Ignoring`);
    }
}

Firebase.prototype.dbSetData = function(data) {
    this.setData(data);
    console.log("Firebase.dbSetData()");
    if (this.validInputData(data)) {
        this.dbRef.set(data);
    } else {
        console.log(`Firebase.dbSetData: Invalid input data length.  Expecting ${this.expectedDbLength} entries. Ignoring`);
    }
}

Firebase.prototype.validInputData = function(data) {
    return (data.length == this.expectedDbLength);
}

Firebase.prototype.addDbListener = function(dbEvent = 'child_added') {
    let that = this;
    this.dbRef.on(dbEvent, function(childSnapshot) {
        //console.log("Firebase.addDbListener(): child_added, you could update the view here");
        //that.data = childSnapshot.val();
        //console.log("data = ", that.data);
        // that.updateView();
    });
}

Firebase.prototype.updateView = function() {
    // $("#selectorGoHere").append();
}

function UnitTestFirebase() {
    let fb = new Firebase(Firebase.prototype.glennDbConfig);
    fb.expectedDbLength = 2;
    let data = [{'testing': 3.14159}, {'testing2': 1.618}];
    fb.dbSetData(data);
}