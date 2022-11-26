#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char* ssid = "test";
const char* password =  "12345678";
String url = "https://healthcompanion.azurewebsites.net/api/HttpTrigger1?code=NZOWxfE0gPFpASaZBqd_i7DI0Z0nUb5mZ3jQU_hluNLcAzFuSjNf3A==";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");
  Serial.print("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}


void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
client.setInsecure();
    
    HTTPClient https;
    String fullUrl = url;
    Serial.println("Requesting " + fullUrl);
    if (https.begin(client, fullUrl)) {
      int httpCode = https.GET();
      Serial.println("============== Response code: " + String(httpCode));
      if (httpCode > 0) {
        Serial.println(https.getString());
      }
      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  }
  delay(5000);
}
