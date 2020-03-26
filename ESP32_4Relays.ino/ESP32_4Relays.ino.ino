#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Supply two ssid's, first and second options, and related passwords
const char* SSID1 = "SSID_1";
const char* PASSWORD1 = "PWD1";

const char* SSID2 = "SSID_2";
const char* PASSWORD2 = "PWD2";

// Webservice endpoints
// URL for retrieving relays' statuses
const char* ENDPOINT_STATUS_GET = "https://myServer.cloudfunctions.net/esp32";
// URL for sending assigned IP
const char* ENDPOINT_IP_SET = "https://myServer.cloudfunctions.net/esp32/ip";

// Set number of relays
#define NUM_RELAYS 4

// Assign each GPIO to a relay
int relayGPIOs[NUM_RELAYS] = {27, 26, 25, 33};

// Relay types: NO (normally open = true) or NC (normally closed = false)
bool relayNO[NUM_RELAYS] = {false, true, true, false};

// Parameters sent to webservice
const char* PARAM_INPUT_1 = "relay";  
const char* PARAM_INPUT_2 = "state";

// Interval time between requests to get relay statuses
const long interval = 5000;
unsigned long previousMillis = 0;

// Relays' statuses
int relayStatus[4] = {0, 0, 0, 0};

// Counter for wi-fi connection attempts
int countAttempts = 0;
int TOTAL_ATTEMPTS = 5;

String outputsState;

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(SSID1, PASSWORD1);
  Serial.println("Connecting - First Option");
  while(WiFi.status() != WL_CONNECTED && countAttempts <= TOTAL_ATTEMPTS) { 
    delay(500);
    Serial.print(".");
    ++countAttempts;
  }

  if(WiFi.status() != WL_CONNECTED)
  {
    WiFi.begin(SSID2, PASSWORD2);
    Serial.println("Connecting - Second Option");
    while(WiFi.status() != WL_CONNECTED) { 
      delay(500);
      Serial.print(".");
    }
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  httpPOSTRequest(WiFi.localIP().toString());
}

void loop() {
  unsigned long currentMillis = millis();
  
  if(currentMillis - previousMillis >= interval) {
     // Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED ){ 
      outputsState = httpGETRequest();
      Serial.println(outputsState);

      if(outputsState!="error")
      {
        StaticJsonDocument<256> doc;
        deserializeJson(doc, outputsState);
  
        for(int i;i<4;i++)
        {
          relayStatus[i]=doc["relay"+String(i+1)];
          Serial.println("Relay"+ String(i+1) + "= " + String(relayStatus[i]));
        }
  
        setStatus();
     }
      previousMillis = currentMillis;
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
}

void setStatus()
{
  for(int i=0; i<4; i++){
    pinMode(relayGPIOs[i], OUTPUT);
    if(relayNO[i]){
      digitalWrite(relayGPIOs[i], !relayStatus[i]);
    }
    else{
      digitalWrite(relayGPIOs[i], relayStatus[i]);
    }
  }
}

// Send http get request to retrieve realys' statuses
String httpGETRequest() {
  HTTPClient http;
    
  // Your IP address with path or Domain name with URL path 
  http.begin(ENDPOINT_STATUS_GET);
  
  // Send HTTP POST request
  int httpResponseCode = http.GET();
  
  String payload = "{}"; 
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    payload = http.getString();
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
    return "error";
  }
  // Free resources
  http.end();

  return payload;
}

void httpPOSTRequest(String ip)
{
  HTTPClient http;

  http.begin(ENDPOINT_IP_SET + String("?ip=") + ip);      
  http.addHeader("Content-Type", "text/plain");
  
  // Send HTTP POST request
  int httpResponseCode = http.POST("{}");
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    Serial.println(http.getString());
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();
}
