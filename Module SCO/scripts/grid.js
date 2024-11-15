// JavaScript Document

var triesUser = 0;
var triesLimit = 2;
var fdbkWrong0 = "<p>You have not made any selections.  Please try again.</p>";

//Where is the DONE button located
donePath = "../sysimages/done_0.png";	

//final incorrect
var strC="";
for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			if (arrCorrectAns[i][j] == 1) {
				strC =  strC +  "<li>"+ arrRowTitle[i+1] + " matches " + arrColTitle[j+1] +". </li>"
			}
		}
}

//********************* NO change is needed below this line. *************************
function judgeInteraction() {
	if (triesUser < triesLimit ) { 
		var strTemp, thisRow;
		for (var i=0; i<nRows; i++) {
			strTemp = ""
			thisRow = eval('document.forms[0].row' + (i+1))
			for (var j=0; j<nCols; j++) {
				if(thisRow[j].checked) {
					strTemp = strTemp + "1,";
				} else {
					strTemp = strTemp + "0,";
				}
			}
			arrUserAns[i] = strTemp.split(",")
		}
		
		var unChecked = 0;
		var nCorrect = 0;
		var nIncorrect = 0;
		for (i=0; i<nRows; i++) {
			for (j=0; j<nCols; j++) {
				if (arrUserAns[i][j] == 0) unChecked += 1;
				if (arrUserAns[i][j] == arrCorrectAns[i][j]) nCorrect += 1
			}
		}
		if (unChecked == nRows*nCols) {
			//No answer selected
			strFeedback = fdbkWrong0;
		} else {
			triesUser += 1;
			if (nCorrect == nRows*nCols) {
				//Correct answers
				if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
				strFeedback = "<p><strong>Correct!</strong></p><p>"+fdbkCorrect+"</p><p>Close this window, and then select NEXT to continue.</p>";
				didcorrect = true;
				triesUser = triesLimit;
				showCorrect();
			} else {
				//Incorrect
				if (triesUser == triesLimit) {
					//Second incorrect
					strFeedback = "<p><strong>Sorry, that's still not right.</strong></p><p>"+fdbkWrong2+"</p><p>Close this window, and then select NEXT to continue.</p>";
					showCorrect();
				} else  { //1st Incorrect
					strFeedback = "<p><strong>Incorrect.</strong></p><p>"+fdbkWrong1+"</p><p>Close this window, and then try again.</p>";
				}
			}
		}
		showFeedback(strFeedback);
	}
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
	  strTemp	= strTemp + "<title>Self-Check Feedback</title>"
	  strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../styles/popup.css' />"
	  strTemp	= strTemp + "</head><body><div id='popBar'><div id='popTitle'><h1 class='popupH'>Self-Check Feedback</h1></div></div>"
	  strTemp	= strTemp + "<div id='popText'>" + fromfdbk + "</div>";
	  strTemp	= strTemp + "<div id='popClose'><a href='javascript:window.close();'>Close this window</a></div>"
	  strTemp	= strTemp + "</body></html>"
	  strTemp	= strTemp + ""
	
	  newWin.document.write(strTemp);
	  newWin.document.close();
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
	//Enable Next button and lock Done button
	//MM_showHideLayers('Next','','show')
	//document.Done.disabled = "disabled"
	changeCursor('text');
}
 
function changeCursor(strCursorName) {
	//cursor for radio buttons
	for (i=0; i<nRows; i++) {
		for (j=0; j<nCols; j++) {
			document.forms[0].elements[i*nCols+j].style.cursor = strCursorName;
		}
	}
	//cursor for Done button
	if (strCursorName != "pointer")
		document.links[0].style.cursor = "default";	
	else
		document.links[0].style.cursor = strCursorName;
}
 
function writeQuestion() {
	var strHTML, chrTemp, strTemp
	strHTML = "<table id='qTable' width='" + widthTable + "px' cellspacing='0' cellpadding='8'>"
	strHTML += "<tr><td width='" + widthCol0 + "px' class='gridFirstCell' align='center'>" + arrColTitle[0] + "</td>"
	for (j=1; j<=nCols; j++) {
		//write column titles
		strHTML += "<td width='" + arrColWidth[j-1] + "' align='center' class='gridTop'>" + arrColTitle[j] + "</td>"
	}
	strHTML += "</tr>"
	for (i=1; i<=nRows; i++) {
		//write row titles
		strHTML += "<tr><td class='gridLeft'>" + arrRowTitle[i] + "</td>"
		//get rid of the punctuation at the end if there is one
		chrTemp = arrRowTitle[i].substr(arrRowTitle[i].length-1,1);
		if ( (chrTemp == ".") || (chrTemp == "!") || (chrTemp == "?") ) 
			strTemp = arrRowTitle[i].substring(0, arrRowTitle[i].length-1)
		else strTemp = arrRowTitle[i]
		for (j=1; j<=nCols; j++) {
			strHTML += "<td align='center' class='gridStyle'><input name='row" + i + "' type='radio' title='Match " + strTemp + " with " + arrColTitle[j] + "."
			strHTML += "' tabindex='" + ((i-1)*nCols + j) + "' /></td>"
			
		}
		strHTML += "</tr>"
		
	}

	strHTML += "<tr><td colspan='" + (nCols+1) + "' align='center' height='100px'>"
	strHTML += "<div id='done' style='visibility:visible; width:100px;'><a href='javascript:judgeInteraction()'  >";
	strHTML += "<img id='submit_' src='../module1/scripts/" + donePath + "' onmouseover = 'this.src=\"../sysimages/done_2.png\"' onmouseout='this.src=\"../sysimages/done_0.png\"'  alt='DONE button'  width='90' height='36' border='0' /></a></div>"
	strHTML += "</td></tr></table>"
	
	document.write(strHTML);
}

