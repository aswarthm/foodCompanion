#include "FirebaseESP8266.h"  // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "biologicalwellbeing-default-rtdb.firebaseio.com/" //Without http:// or https:// schemes
#define FIREBASE_AUTH "nO5sVCe10g20uKUdgMN4NlDfYinvJVv6HwyEv5to"
#define WIFI_SSID "test"
#define WIFI_PASSWORD "12345678"

FirebaseData firebaseData;
FirebaseData Data;

FirebaseJson json;

void setup()
{

  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

}
void loop() {
  if(Serial.available()){
    Serial.println(Serial.readString());
  }
}
