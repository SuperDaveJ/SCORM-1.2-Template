// JavaScript Document
// override funcs defined within the Lib
/********************** Examples: AFIT_LCRM 31050.html, 61030.html **************************/
function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
	//alert("object = " + dd.obj.name + "; below = " + dd.elements.img5.getEltBelow().name);
}

function my_DragFunc()
{
}

function my_DropFunc()
{
	//strTemp = arrCorrect.join();
	//there is one target only
	//alert(dd.obj.getEltBelow())
	if ( strCorrect.indexOf(dd.obj.name) >= 0 && dd.obj.getEltBelow().name == "target" ) {
		dd.obj.moveTo(dd.elements.target.defx, dd.elements.target.defy);
		dd.obj.hide();
		uCorrect += 1;
		//dd.obj.parent.hide();
	} else {
		dd.obj.moveTo(dd.obj.defx, dd.obj.defy);
	}
	if ( uCorrect == nCorrect ) {
		//Correct
		if (parent.inQuiz) parent.quiz[qID] = 1;	//set question status
		disableDrag();
		showNextButton();
		showFdback(fdbkCorrect);
	}
}

function disableDrag() {
	for (var i=0; i<nObj; i++) {
		eval("dd.elements.img"+(i+1)+".setDraggable(false)");
	}
}


function showFdback (fromfdbk) {
	var strTemp = "";	

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
	strTemp	= strTemp + "<title>Knowledge Check Feedback</title>"
	strTemp	= strTemp + "<link rel='stylesheet' type='text/css' href='../styles/popup.css'/>"
	strTemp	= strTemp + "</head><body><div id='popBar'><div id='popTitle'><h1 class='popupH'>Knowledge Check Feedback</h1></div></div>"
	strTemp	= strTemp + "<div id='popText'>" + fromfdbk + "</div>";
	strTemp	= strTemp + "<div id='popClose'><a href=javascript:window.close();>Close this window</a></div>"
	strTemp	= strTemp + "</body></html>"
	
		//newWin.document.getElementById("pText").innerHTML = arrPopup[fromfdbk];
		newWin.document.write(strTemp);
		newWin.document.close();
	}
}

