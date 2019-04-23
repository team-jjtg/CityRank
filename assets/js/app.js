$(document).ready(function() {
    $("#category").hide(); //hide category page
    $("#result-page").hide(); //results page hidden


$("#start").on("click", function () {
        $("#landing-window").hide();
        $("#category").show();
        })

// $("#happy").stepDown("input change", function (){
// }) //decrease value

$("#submit").on("click", function () {
    $("#landing-window").hide();
    $("#category").hide();
    $("#result-page").show(); //results displaying page
})

});

