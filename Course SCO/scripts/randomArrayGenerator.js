// JavaScript Document
/************** Tested.  The function work great! ***************************/
function getRandom(topLimit) {   
	return Math.floor(Math.random()*topLimit)
}

//This function returns a set of n random numbers from 0 to n-1.
function getRandomSet(n) {
	arrTemp = new Array(n);
		
	for (i=0; i<n; i++) arrTemp[i] = -1;
		
	for (i=0; i<n; i++) {
		for (j=0; j<100000; j++) {
			blnFound = false;
			intTemp = getRandom(n);
			for (k=0; k<n; k++) {
				if (arrTemp[k] == intTemp) {
					blnFound = true;
					break;
				}
			}
			if (!blnFound) {
				arrTemp[i] = intTemp;
				break;
			}
		}
	}
	//choose one of the 2 return format based on your need
	return arrTemp;				//returns an array of n elements.
	//return arrTemp.join(',');	//returns a string like "4,1,0,3,2" for n=5 without a trailing comma.
}
