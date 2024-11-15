// JavaScript Document

var triesUser = 0;
var triesLimit = 2;
var letters = "A,B,C,D,E,F,"
var qStatus = 0;	//question status. 1=correct, 0=incorrect

arrLetters = new Array(nItems);
arrLetters = letters.split(",");
arrCorrectAns = new Array(nItems);
arrCorrectAns = strCorrectAns.split(",")
userAns = new Array(nItems);
 
var arrPopup = new Array();
for (var i=0; i<4; i++) {
	arrPopup[i] = "";
}
//Nothing is done
arrPopup[0]  = "<p>You have not made any selections.  Please try again.</p>"
 
//first incorrect
arrPopup[1]  = "<p><strong>Incorrect.</strong></p>"
 

arrPopup[2]  = "<p><strong>Sorry, that's still not right.</strong></p> <p>"+lastWFdbk+"</p> <p>Close this window, and then select NEXT to continue.</p>"
 
//correct
arrPopup[3]  = "<p><strong>Correct!</strong></p> <p>" + lastCFdbk +"</p> <p>Close this window, and then select NEXT to continue.</p>"


 
function judgeInteraction() {
	if (triesUser < triesLimit ) { 
		var strTemp
		strTemp = ""
		fmDistracter=document.forms[0].fmDistracter
		for (var i=0; i<nItems; i++) {
			if(fmDistracter[i].checked) {
				strTemp = strTemp + "1,";
			} else {
				strTemp = strTemp + "0,";
			}
		}
		userAns = strTemp.split(",")
 
		var unChecked = 0;
		var nCorrect = 0;
		var nIncorrect = 0;
		var nChecksMatched = 0;
		for (i=0; i<nItems; i++) {
			if (userAns[i] == 0) unChecked += 1;
			if (userAns[i] == arrCorrectAns[i]) nCorrect += 1
		}
		if (unChecked == nItems) {
			//No answer selected
			strTemp = arrPopup[0];
		} else {
			triesUser += 1;
			if (nCorrect == nItems) { //correct selection
				for (i=0; i<nItems; i++) {
					if (arrCorrectAns [i]==1) {
						fmDistracter[i].checked = true
						//eval("document.getElementById('cr" + i + "').className = 'distracter'")
					} else {
						fmDistracter[i].checked = false
						//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
						//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
					}
					fmDistracter[i].disabled = "disabled"
				}		
				//Correct answers
				if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
				strTemp = arrPopup[3];
				triesUser = triesLimit;
				//eval("document.getElementById('disTable').style.cursor = 'text'");
				//Enable Next button and lock Done button
				//MM_showHideLayers('Next','','show')
				document.Done.disabled = "disabled"
			} else {
				//second try
				if (triesUser == triesLimit) {
					for (i=0; i<nItems; i++) {
						if (arrCorrectAns [i]==1) {
							fmDistracter[i].checked = true
							//eval("document.getElementById('cr" + i + "').className = 'distracter'")
						}else{
							fmDistracter[i].checked = false
							//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
							//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
						}
						fmDistracter[i].disabled = "disabled"
					}
					strTemp = arrPopup[2];
					if (triesLimit==1) strTemp = "<p><strong>Incorrect.</strong></p> <p>"+ lastWFdbk+"</p> <p>Close this window, and then select NEXT to continue.</p>"
					//eval("document.getElementById('disTable').style.cursor = 'text'");
					//MM_showHideLayers('Next','','show')
					document.Done.disabled = "disabled"
				} else  { //1st try wrong
					for (i=0; i<nItems; i++) {
						if (userAns[i] == 1) strTemp = arrPopup[1]+"<p>"+arrFdbk[i]+"</p><p>Close this window, and then try again.</p>"
					}
				}
			}
		}
// popup feedback
			//alert(strTemp);
			//transTerm(strTemp);
			showFeedback(strTemp);
			//MM_showHideLayers('Next','','show');
 
	}
}

 
function showCorrect() {
	
	for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			if (arrCorrectAns[i][j] == 1) {
				eval('document.forms[0].row' + (i+1) + '[' + j + '].checked = true')
			} else {
				eval('document.forms[0].row' + (i+1) + '[' + j + '].checked = false')
			}
			eval('document.forms[0].row' + (i+1) + '[' + j + '].disabled = "disabled"')
		}
	}		
	eval("document.getElementById('qTable').style.cursor = 'text'");
	
	changeCursor('text');
}
 
function changeCursor(strCursorName) {
	//cursor for radio buttons
	for (i=0; i<nItems; i++) {
		document.forms[0].elements[i].style.cursor = strCursorName;
	}
	//cursor for Done button
	if (strCursorName != "pointer")
		document.links[0].style.cursor = "default";	
	else
		document.links[0].style.cursor = strCursorName;
}
 
function writeQuestion() {
	var strHTML, chrTemp, strTemp
	strHTML = "<table id='qTable' border='0' width='" + widthTable + "%' cellspacing='0' cellpadding='8'>"
	for (i=0; i<nItems; i++) {
		strHTML += "<tr><td width='3%' align='center' valign='top'><input id='radio"+(i+1)+"' type='radio' name='fmDistracter' tabindex="+(i+1)+" alt='"+arrLetters[i]+". "+distracters[i]+"' /></td>"
		strHTML  += "<td width='3%' align='center' valign='top'> <p id='Letter"+(i+1)+"' class='distrText'>"+arrLetters[i]+".</p></td>"
		strHTML  += "<td valign='top'><label for='radio"+(i+1)+"' <p id='cr"+(i+1)+"' class='distrText'>"+distracters[i]+"</p></label></td>"
		strHTML  += "</tr>"
	}
	strHTML += "<tr><td colspan='3' align='top'>&nbsp;</td></tr>"
	strHTML += "<tr><td colspan='3' align='center'><div id='done' style='visibility:visible; width:100px;'>"
	strHTML += "<a href='javascript:judgeInteraction()' >"
	strHTML += "<img src='../module1/sysimages/submit_0.png' alt='DONE button' id='Done' name='Done' onmouseover='this.src=&quot;../sysimages/submit_2.png&quot;' onmouseout='this.src=&quot;../sysimages/submit_0.png&quot;' width='90' height='36' border='0' />"
	strHTML += "</a></div></td></tr></table>"
	document.write(strHTML);
}

function showFeedback (fromfdbk) {
	var strTemp = "";	
	if (triesUser == triesLimit) {
		showNextButton();
		document.getElementById("done").style.visibility = "hidden"
	}

	positionTop = (screen.height - 499)/2 - 25;
	positionLeft = (screen.width - 600)/2 - 5;
	newWin = window.open ("","Feedback","toolbar=no,width=600,height=499,menubar=no,resizable=yes,status=no,scrollbars=no,top="+positionTop+",left="+positionLeft+"");
	newWin.focus(); //openWinCentered(fdbcname, "Feedback", 630, 600, "no" );
	if (newWin != null)
	{
	if (newWin.opener == null) {newWin.opener = window};
	  strTemp	= strTemp + "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>";
	  strTemp	= strTemp + "<html xmlns='http://www.w3.org/1999/xhtml'>";
	  strTemp	= strTemp + "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"
	  strTemp	= strTemp + "<title>Self-Check Feedback</title>"
	  strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../styles/popup.css' />"
	  strTemp	= strTemp + "</head><body><div id='popBar'><div id='popTitle'><h1 class='popupH'>Self-Check Feedback</h1></div></div>"
	  strTemp	= strTemp + "<div id='popText'>" + fromfdbk + "</div>";
	  strTemp	= strTemp + "<div id='popClose'><a href=javascript:window.close();>Close this window</a></div>"
	  strTemp	= strTemp + "</body></html>"
	  strTemp	= strTemp + ""
	
	  newWin.document.write(strTemp);
	  newWin.document.close();
	}
}
