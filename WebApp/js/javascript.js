ENDPOINT_STATUS = "https://myServer.cloudfunctions.net/esp32";
ENDPOINT_IP_GET = "https://myServer.cloudfunctions.net/esp32/ip";

function toggleCheckbox(element) {
	var xhr = new XMLHttpRequest();
	if(element.checked){ xhr.open("POST", ENDPOINT_STATUS+"?relay"+element.id+"=1", true); }
	else { xhr.open("POST", ENDPOINT_STATUS+"?relay"+element.id+"=0", true); }
	xhr.send();
}
function getStatuses() {
setTimeout(function () {
  document.getElementById('loading').style.visibility='visible';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", ENDPOINT_STATUS, true);
  xhr.onload = function () {
	var response = JSON.parse(xhr.response);
	var status = [0,0,0,0];
	for(i=0;i<4;i++)
	{
	  var status = response["relay"+(i+1)];
	  var input = document.getElementById(i+1);
	  if (status == 0) {
		input.checked = false;
	  } else {
		input.checked = true;
	  }
	}
  }
  xhr.send(null); 
  document.getElementById('loading').style.visibility='hidden';
  getStatuses()     
},5000);
}
function getIpValue() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", ENDPOINT_IP_GET, true);
  xhr.onload = function () {
	var ipValue = xhr.response;
	var input = document.getElementById("ipValue");
	input.innerHTML = ipValue;
  }
  xhr.send(null);        

}
