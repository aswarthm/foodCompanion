#include "FirebaseESP8266.h"  // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>


#define FIREBASE_HOST "pico-esp01-default-rtdb.firebaseio.com/" //Without http:// or https:// schemes
#define FIREBASE_AUTH "Eq2wW2vUi1PRfVSVxKVbx4mqzB4d7hgFE3OKBNFy"
#define WIFI_SSID "test"
#define WIFI_PASSWORD "12345678"

FirebaseData firebaseData;
FirebaseData Data;

FirebaseJson json;


String cur = "";
String prev = "";
void setup()
{

  Serial.begin(115200);
  
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
  
  Firebase.getString(Data, "/status");
  cur = Data.stringData();
  if(cur != prev){
  //Serial.println(cur);
  prev = cur;
  }
  else{
  }
  
  String msg = "";
  while(Serial.available()){
    msg = (char)Serial.read();
    //Serial.println(msg);
    if(msg == "1"){
      Serial.println(cur);
    }
  }
}


//Firebase.setInt(firebaseData, "temp", temp);
