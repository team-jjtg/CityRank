$(document).ready(function() {
    $("#landing-window").show(); //show landing page
    $("#result-page").hide(); //results page hidden
    $("#slider-page").hide();//slider page hidden
    $("#hap-slider-status").hide();//hiding slider values
    $("#pol-slider-status").hide();
    $("#col-slider-status").hide();


$("#start").on("click", function () {
    $("#slider-page").show();
    $("#landing-window").hide();
    $("#result-page").hide();
        })

$("#submit").on("click", function () {
    $("#result-page").show();
    $("#landing-window").hide();
    $("#slider-page").hide();
})

});

//these three functions are reading the values of the sliders and storing them in a variable
let polVal;
let colVal;
let hapVal;
function polSliderChange(val) {
    document.getElementById("pol-slider-status").innerHTML = val;
    polVal = val;
    console.log("Political Slider Value = ", polVal);
}
function hapSliderChange(val) {
    document.getElementById("hap-slider-status").innerHTML = val;
    hapVal = val;
    console.log("Happiness Slider Value = ", hapVal);
}
function colSliderChange(val) {
    document.getElementById("col-slider-status").innerHTML = val;
    colVal = val;
    console.log("Cost of Living Slider Value = ", colVal);
}




