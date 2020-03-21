# Esp32AndRelay4Channels
Code for Web Application and for ESP32 WiFi/Bluetooth board for controlling remotely a Relay set with 4 channels.

![Web App](WebApp\images\app.png)  
Web Application    

![Circuit](WebApp\images\schema.png)  
Circuit

As initial adjustments, replace the values of the following parameters:
- **javascript.js**: 
    - ENDPOINT_STATUS_SET: Endpoint that sets a relay status
    - ENDPOINT_STATUS_GET: Endpoint that sends back the relays' statuses
    - ENDPOINT_IP_GET: Endpoint that sends back the IP assigned to ESP32.
- **ESP32_4Relays.ino**: 
    - SSID1: SSID of WiFi - first option
    - PASSWORD1: Passord of WiFi - first option
    - SSID2: SSID of WiFi - second option
    - PASSWORD2: Pasword of WiFi - second option
    - ENDPOINT_STATUS_GET - Endpoint that sends back the relays' statuses
    - ENDPOINT_IP_SET - Endpoint that sets the IP assigned to ESP32

## Instructables:
https://www.instructables.com/editInstructable/edit/EGNSCTLK7RRBKNZ
