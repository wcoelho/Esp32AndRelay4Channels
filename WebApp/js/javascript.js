ENDPOINT_STATUS_SET = "https://myServer/esp32set";
ENDPOINT_STATUS_GET = "https://myServer/esp32get";
ENDPOINT_IP_GET = "https://myServer/esp32ipget";

function toggleCheckbox(element) {
	var xhr = new XMLHttpRequest();
	if(element.checked){ xhr.open("POST", ENDPOINT_STATUS_SET+"?relay="+element.id+"&state=1", true); }
	else { xhr.open("POST", ENDPOINT_STATUS_SET+"?relay="+element.id+"&state=0", true); }
	xhr.send();
}
function getStatuses() {
setTimeout(function () {
  document.getElementById('loading').style.visibility='visible';
  var xhr = new XMLHttpRequest();
  xhr.open("GET", ENDPOINT_STATUS_GET, true);
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
	var response = JSON.parse(xhr.response);
	var ipValue = response["ip"];
	var input = document.getElementById("ipValue");
	input.innerHTML = ipValue;
  }
  xhr.send(null);        

}