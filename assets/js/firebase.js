function Firebase(dbConfig) {
    this.expectedDbLength = 182;
    this.dbConfig = dbConfig;
    this.dbInit();
    this.dbRef = this.getDbRef();
    this.addDbListener('child_added');
}
Firebase.prototype.data = ["testing"];
Firebase.prototype.dbConfig = {};

Firebase.prototype.jakeDbConfig = {
    apiKey: "AIzaSyDjRdLIPTMyLiDV4IhEb73nwA4pRGk0pRc",
    authDomain: "project-jjtg.firebaseapp.com",
    databaseURL: "https://project-jjtg.firebaseio.com",
    projectId: "project-jjtg",
    storageBucket: "project-jjtg.appspot.com",
    messagingSenderId: "944126494599"
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

Firebase.prototype.dbPushData = function() {
    console.log("Adding data to firebase", this.name);
    if (this.validInputData()) {
        this.dbRef.push(this.data);
    } else {
        console.log(`Firebase.dbPushData: Invalid input data length.  Expecting ${this.expectedDbLength} entries. Ignoring`);
    }
}

Firebase.prototype.validInputData = function() {
    return (this.data.length == this.expectedDbLength);
}

Firebase.prototype.addDbListener = function(dbEvent = 'child_added') {
    let that = this;
    this.dbRef.on(dbEvent, function(childSnapshot) {
        console.log("Firebase.addDbListener(): child_added, you could update the view here");
        that.data = childSnapshot.val();
        console.log("data = ", that.data);
        // that.updateView();
    });
}

Firebase.prototype.updateView = function() {
    // $("#selectorGoHere").append();
}