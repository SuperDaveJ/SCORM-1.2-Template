// JavaScript Document
var btnLocation = "down";
var triesUser = 0;
var triesLimit = 2;
var letters = "A,B,C,D,E,F,G,H,I"
var blnmultiP = false;
fdbkWrong0 = "<p>You have not made any selections.  Please try again.</p>";

var triesUser = 0;
//var qStatus = 0;	//question status. 1=correct, 0=incorrect

arrLetters = new Array(nItems);
arrLetters = letters.split(",");
arrCorrectAns = new Array(nItems);
arrCorrectAns = strCorrectAns.split(",")
userAns = new Array(nItems);
 
//feedbacks.
var choiceFirstPrompt = "Please select an answer."

function judgeInteraction() {
	if (triesUser < triesLimit) {
		var strTemp, strFeedbackText
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
			
			if ((arrCorrectAns[i] == 1) && (userAns[i] == arrCorrectAns[i]))
				nChecksMatched += 1
		}
		if (unChecked == nItems) {
			//No answer selected
			strFeedbackText = fdbkWrong0;
		} else {
			triesUser += 1;
			if (nCorrect == nItems) {
				for (i=0; i<nItems; i++) {
					if (arrCorrectAns [i]==1) {
						fmDistracter[i].checked = true
					}else{
						fmDistracter[i].checked = false
						//eval("document.getElementById('cr" + (i+1) + "').className = 'distracter_dis'")
						//eval("document.getElementById('Letter" + (i+1) + "').className = 'distracter_dis'")
					}
					fmDistracter[i].disabled = "disabled"
				}
					
				//Correct answers
				if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
				strFeedbackText = "<p><strong>Correct!</strong></p><p>" + fdbkCorrect + "</p><p>Close this window, and then select NEXT to continue.</p>";
				triesUser = triesLimit;
				document.forms[0].Done.disabled = "disabled"
			} else {
				//second try
				if (triesUser == triesLimit) {
					for (i=0; i<nItems; i++) {
						if (arrCorrectAns [i]==1) {
							fmDistracter[i].checked = true
						}else{
							fmDistracter[i].checked = false
						}
						fmDistracter[i].disabled = "disabled"
					}
					strFeedbackText = "<p><strong>Sorry, that's still not right. </strong></p><p>" + fdbkWrong2 + "</p><p>Close this window, and then select NEXT to continue.</p>";
					//eval("document.getElementById('disTable').style.cursor = 'text'")
					//MM_showHideLayers('Next','','show')
					document.forms[0].Done.disabled = "disabled"
				} else  { //1st try wrong
					strFeedbackText = "<p><strong>Incorrect.</strong></p><p>" + fdbkWrong1 + "</p><p>Close this window, and then try again.</p>";
				}	
			}
		}
		showFeedback(strFeedbackText);
	}
}
 
function showCorrect() {
	document.getElementById("next").style.visibility = "visible";
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
	var strHTML;
	strHTML = "<table id='qTable' border='0' width='" + widthTable + "%' cellspacing='0' cellpadding='8'>";
	for (i=0; i<nItems; i++) {
		strHTML += "<tr><td width='25' valign='top'><input id='radio"+(i+1)+"' type='checkbox' name='fmDistracter' tabindex="+(i+1)+" alt='"+arrLetters[i]+". "+distracters[i]+"' /></td>";
		strHTML  += "<td width='20'  valign='top'> <p id='Letter"+(i+1)+"' class='distrText'>"+arrLetters[i]+".</p></td>";
		strHTML  += "<td valign='center'><label for='radio"+(i+1)+"' <p id='cr"+(i+1)+"' class='distrText'>"+distracters[i]+"</p></label></td>";
		strHTML  += "</tr>";
	}
	if (btnLocation == "down")	//change it to "up" in question page if needed
		strHTML += "<tr><td colspan='3' align='top'>&nbsp;</td></tr>"
	strHTML += "<tr><td colspan='3' align='center'><div id='done' style='visibility:visible; width:100px;'>";
	strHTML += "<a href='javascript:judgeInteraction()' >";
	strHTML += "<img src='../sysimages/done_0.png' onmouseover='this.src=&quot;../sysimages/done_2.png&quot;' onmouseout='this.src=&quot;../sysimages/done_0.png&quot;' alt='DONE button' id='Done' name='Done' width='90' height='36' border='0' />";
	strHTML += "</a></div></td></tr></table>";
	
	document.write(strHTML);
	document.close();
}

function showFeedback (fromfdbk) {
	var strTemp = "";	
	if (triesUser == triesLimit) {
		showNextButton();
		document.getElementById("done").style.visibility = "hidden"
	}

	positionTop = (screen.height - 499)/2 - 25;
	positionLeft = (screen.width - 595)/2 - 5;
	newWin = window.open ("","Feedback","toolbar=no,width=595,height=499,menubar=no,resizable=yes,status=no,scrollbars=no,top="+positionTop+",left="+positionLeft+"");
	newWin.focus(); //openWinCentered(fdbcname, "Feedback", 630, 600, "no" );
	if (newWin != null)
	{
	if (newWin.opener == null) {newWin.opener = window};
	  strTemp	= strTemp + "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>";
	  strTemp	= strTemp + "<html xmlns='http://www.w3.org/1999/xhtml'>";
	  strTemp	= strTemp + "<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"
	  strTemp	= strTemp + "<title>Knowledge Check Feedback</title>"
	  strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../styles/popup.css' />"
	  strTemp	= strTemp + "</head><body><div id='popBar'><div id='popTitle'><h1 class='popupH'>Knowledge Check Feedback</h1></div></div>"
	  strTemp	= strTemp + "<div id='popText'>" + fromfdbk + "</div>";
	  strTemp	= strTemp + "<div id='popClose'><a href='javascript:window.close();'>Close this window</a></div>"
	  strTemp	= strTemp + "</body></html>"
	  strTemp	= strTemp + ""
	
	  newWin.document.write(strTemp);
	  newWin.document.close();
	}
}
