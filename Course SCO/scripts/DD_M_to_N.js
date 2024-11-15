// JavaScript Document
// NOTE:
// This works for any number of dragable objects and place them in proper order
// override funcs defined within the Lib

function my_PickFunc()
{
    //if (dd.obj.name == 'drag1') alert('Image1 is selected.');
	//alert("object = " + dd.obj.name + "; below = " + dd.elements.img5.getEltBelow().name);
}


function my_DropFunc()
{
	
	//alert(strCorrect.indexOf(dd.obj.name) +", "+dd.obj.getEltBelow().name)
	if ( strCorrect.indexOf(dd.obj.name) >= 0 && dd.obj.getEltBelow().name.indexOf("target") >=0 ) {
		switch (dd.obj.getEltBelow().name) {
		//slops object to a target
		case 'target1':
			dd.obj.moveTo(dd.elements.target1.defx , dd.elements.target1.defy);
			break;
		case 'target2':
			dd.obj.moveTo(dd.elements.target2.defx, dd.elements.target2.defy);
			break;
		case 'target3':
			dd.obj.moveTo(dd.elements.target3.defx, dd.elements.target3.defy);
			break;
		case 'target4':
			dd.obj.moveTo(dd.elements.target4.defx, dd.elements.target4.defy);
			break;
		case 'target5':
			dd.obj.moveTo(dd.elements.target5.defx, dd.elements.target5.defy);
			break;
		case 'target6':
			dd.obj.moveTo(dd.elements.target6.defx, dd.elements.target6.defy);
			break;
		case 'target7':
			dd.obj.moveTo(dd.elements.target7.defx, dd.elements.target7.defy);
			break;
		case 'target8':
			dd.obj.moveTo(dd.elements.target8.defx, dd.elements.target8.defy);
			break;
		case 'target9':
			dd.obj.moveTo(dd.elements.target9.defx, dd.elements.target9.defy);
			break;
		case 'target10':
			dd.obj.moveTo(dd.elements.target10.defx, dd.elements.target10.defy);
			break;
		}
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
		show_popup(1);
	}
}



function disableDrag() {
	for (var i=0; i<nObj; i++) {
		if (i<9) {
			eval("dd.elements.drag"+(i+1)+".setDraggable(false)");
		} else {
			charTemp = String.fromCharCode(88+i);
			eval("dd.elements.drag" + charTemp + ".setDraggable(false)");
		}
	}
}



