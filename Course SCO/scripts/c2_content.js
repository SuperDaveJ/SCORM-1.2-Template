// JavaScript Document
var vpPath = "http://www.c2survey.com/virtualPilot/";	//path to Virtual Pilot site
var courseID = "1862_FAA_DAR";
var userID = "NA";
var blnLastPage = false;
var audioOn = false;

function getInternetExplorerVersion()
{
  // Returns the version of Internet Explorer or a -1 (indicating the use of another browser).
  var iev = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      iev = parseFloat( RegExp.$1 );
  }
  return iev;
}

function exitConfirm(){
	if (confirm("Do you wish to exit the lesson?")==true) parent.exitCourse();
}

function refresh() {
	window.location.reload();
}

/***************************************** Preload images *************************************************/
function MM_preloadImages() {
  var d=document; 
  if(d.images){ 
  	if(!d.MM_p) d.MM_p=new Array();
    var i, j=d.MM_p.length, a=MM_preloadImages.arguments; 
	for(i=0; i<a.length; i++)
    	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}
  }
}

MM_preloadImages('sysimages/menu_glossary_0.png','sysimages/menu_glossary_2.png','sysimages/menu_help.png','sysimages/menu_help.png','sysimages/back_0.png','sysimages/back_2.png','sysimages/next_0.png','sysimages/next_2.png','sysimages/exit_0.jpg','sysimages/exit_2.jpg','sysimages/menu_resources_0.png','sysimages/menu_resources_2.png','sysimages/menu_close_0.png','sysimages/menu_close_2.png', 'sysimages/options_0.png','sysimages/options_2.png', 'sysimages/menu_0.png','sysimages/menu_2.png');
/**************************************** End of Preload images *********************************************/

/********************** Audio Conttrol Functions ************************/
function getFlashMovie(movieName) { 
	if (window.document[movieName]) {	//IE
		return window.document[movieName];
	}
	if (navigator.appName.indexOf("Microsoft Internet") == -1) { 	//Not IE
		if (document.embeds && document.embeds[movieName]) {	//Firefox, Opera, etc.
      		return document.embeds[movieName]; 
  		} else {	//
    		return document.getElementById(movieName);
		}
  	}
	
	//var isIE = navigator.appName.indexOf("Microsoft") != -1;   
	//return (isIE) ? window[movieName] : document[movieName];  
}  

function pause() {
	getFlashMovie("FlashID").StopPlay();
}

function play() {
	getFlashMovie("FlashID").Play();
}

function replay() {
	getFlashMovie("FlashID").StopPlay();
	getFlashMovie("FlashID").Rewind();
	getFlashMovie("FlashID").Play();
}

function stop() {
	getFlashMovie("FlashID").StopPlay();
	getFlashMovie("FlashID").Rewind();
}

function toggleAudio() {
	//New for FAA-APT
	if (audioOn) {
		document.getElementById("audio").src = "../sysimages/HangarTalk_0.png";
		//document.getElementById("audio").title = "Turn audio on.";
		pause();
		audioOn = false;
	} else {
		document.getElementById("audio").src = "../sysimages/HangarTalk_2.png";
		//document.getElementById("audio").title = "Turn audio off.";
		play();
		audioOn = true;
	}
}
/********************** End of Audio Conttrol Functions ************************/

/*********************** Open Popup Functions **********************************/
function openWinCentered(myUrl, myTitle, myWidth, myHeight, scrollbar, resize ) {
	// open the window
	positionTop = (screen.height - myHeight)/2 - 25;
	positionLeft = (screen.width - myWidth)/2 - 5;
	newWin = window.open (myUrl,myTitle,"toolbar=no,location=no,width="+myWidth+",height="+myHeight+",menubar=no,resizable="+scrollbar+",status=no,scrollbars="+resize+",top="+positionTop+",left="+positionLeft+"");
	if (window.focus) newWin.focus();
}

function openGlossary() {
	openWinCentered("../glossary.htm", "Glossary",  615, 530, "yes", "no" );
}

function openResources() {
	openWinCentered("../resources.htm", "Resources",  615, 530, "no", "no" );
}

function openHelp() {
	openWinCentered("../help.htm", "Help",  615, 530, "yes", "no" );
	
}

function show_popup(iTerm) {
	filename = parent.getPage() + "_pop.htm?popterm=" + iTerm;
	openWinCentered( filename, "Popup", 595, 499, "no", "no" );
	checkStatus(iTerm)
}

function show_cc() {
	filename = parent.getPage() + "_cc.htm?popterm=1";
	openWinCentered( filename, "Popup", 595, 499, "no", "no" );
}

function show508(){
	filename = parent.getPage() + "_508.htm";
	openWinCentered( filename, "alternative", 595, 499, "no" );
}

/*********************** End of Open Popup Functions **********************************/

/************* Progress Bar Function *****************************/
var maxWid = 385;	//this must match the bar_border width defined in stylesheet
function updateBar(thisPg, totalPg) {
	perPg = thisPg / totalPg;
	barPos = Math.floor(perPg * maxWid);
	document.getElementById('bar_fill').style.width = eval("'" + barPos + "px'");
	document.getElementById('bar_pointer').style.left = eval("'" + (barPos - 5) + "px'");	//5 = (pointer width - 1)/2
}

/***************************************************** Query Functions ***************************************************/
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; } 
}

function getQueryValue(key){
	var page = new PageQuery(window.location.search); 
	return unescape(page.getValue(key)); 
}

/*********************** Mouse Over and Out functions *********************************/
var itemsViewed;	//Number of terms.

function checkStatus( iTerm ) {
	//iTerm start from 1
	itemsViewed = itemsViewed.substring(0,iTerm-1) + iTerm + itemsViewed.substring(iTerm);
	if ( itemsViewed.indexOf('0') == -1 ) showNextButton();
}

function jpgOut(iTerm, buttonID) {
	if (itemsViewed.substr(iTerm-1, 1) != "0") {
		document.getElementById(buttonID).src = "images/" + buttonID + "2.jpg";
	} else {
		document.getElementById(buttonID).src = "images/" + buttonID + "0.jpg";
	}
}

function pngOut(iTerm, buttonID) {
	if (itemsViewed.substr(iTerm-1, 1) != "0") {
		document.getElementById(buttonID).src = "images/" + buttonID + "1.png";
	} else {
		document.getElementById(buttonID).src = "images/" + buttonID + "0.png";
	}
}

/***************************************************** Comments Functions ***************************************************/
function addComment() {
	comWin = window.open(vpPath + 'addComment.asp?uID='+userID+'&cID='+courseID+'&mID='+parent.modNumber+'&lID='+parent.getLesson()+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=no");
}

function viewComment() {
	viewWin = window.open(vpPath + 'reviewComments.asp?uID='+userID+'&cID='+courseID+'&mID='+parent.modNumber+'&lID='+parent.getLesson()+'&pID='+parent.getPage(), "Comments", "width=800,height=600,scrollbars=yes");
}