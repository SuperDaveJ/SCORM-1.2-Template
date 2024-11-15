// JavaScript Document
/***************************************************** jquery Functions ***************************************************/

isMenuOpen = false;
isHelpOpen = false;
isTopicsOpen = false;
isMenuOpen = false;
blnInteraction = false;
$(document).ready( function() {
	if ( $("#dlink").find("a").length == 0 ) $("#dlink").hide();

	if ( !parent.isPageViewed(parent.getPage()) && blnInteraction ) hideNextButton();
	//check if there is narration or animation on the page						
	//if ( $("#noneDisplay").find("#divNarration").length > 0 ) checkAudio();
    //if ( $("#content").find("#divAnimation").length > 0 ) document.getElementById("cc").style.visibility = "visible";

});



function showNextButton() {
	$("#next").show();
}

function hideNextButton() {
	$("#next").hide();
}

function hideBackButton() {
	$("#back").hide();
}

function showMenu() {
	$("#menuContent").animate( {marginTop: "233px"}, 500,'')
}

function closeMenu() {
	$("#menuContent").animate( {marginTop: "-181px"}, 500, '' );
}