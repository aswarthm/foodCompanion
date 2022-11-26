#include "FirebaseESP8266.h"  // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>


int leds[3] = {D0, D1, D2};
int buzzer = D3;
int sw = D5;


#define FIREBASE_HOST "biologicalwellbeing-default-rtdb.firebaseio.com/" //Without http:// or https:// schemes
#define FIREBASE_AUTH "nO5sVCe10g20uKUdgMN4NlDfYinvJVv6HwyEv5to"
#define WIFI_SSID "test"
#define WIFI_PASSWORD "12345678"

FirebaseData firebaseData;
FirebaseData Data;

FirebaseJson json;


WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
String hrMin = "", curDay = "", monthYr = "";

String tabTimes[3] = {};
String prevTime = "";
bool disabled = 0;

void setup()
{

  Serial.begin(9600);

  for (int i = 0; i < 3; i++) {
    pinMode(leds[i], OUTPUT);
  }
  pinMode(buzzer, OUTPUT);
  pinMode(sw, INPUT);

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

  timeClient.begin();
  timeClient.setTimeOffset((5 * 60 + 30) * 60);
}
void loop() {
  //Firebase.set(firebaseData, "/users/sindhu/" + monthYr + "/" + curDay + "/" + hrMin, id);

  getTime();
  if (!hrMin.equals(prevTime)) {
    prevTime = hrMin;
    Serial.println(hrMin);
    Serial.println();
    for (int i = 0; i < 3; i++) {
      Firebase.getString(firebaseData, "/lmao/" + String(i));
      String temp = firebaseData.stringData();
      tabTimes[i] = temp;
    }
    for (int i = 0; i < 3; i++) {
      Serial.println(tabTimes[i]);
      if (tabTimes[i] == hrMin) {
        disabled = 0;
        if (!disabled) {
          alert(i);
        }
      }
    }
  }
    //Serial.println(digitalRead(sw));
  if (digitalRead(sw)) {
    disabled = 1;
    for (int i = 0; i < 3; i++) {
      digitalWrite(leds[i], LOW);
    }
  }
}




void getTime() {

  timeClient.update();

  int currentHour = timeClient.getHours();

  int currentMinute = timeClient.getMinutes();

  time_t epochTime = timeClient.getEpochTime();
  struct tm *ptm = gmtime ((time_t *)&epochTime);

  int monthDay = ptm->tm_mday;

  int currentMonth = ptm->tm_mon + 1;

  int currentYear = ptm->tm_year + 1900;

  monthYr = String(currentMonth) + "-" + String(currentYear);
  curDay = String(monthDay);
  hrMin = String(currentHour) + String(currentMinute);
  //Serial.println(monthYr + "\n" + curDay + "\n" + hrMin);


  return;
}

void alert(int i) {
  digitalWrite(leds[i], HIGH);
  buzz();
  buzz();
}

void buzz() {
  int del = 70;
  digitalWrite(buzzer, HIGH);
  delay(del);
  digitalWrite(buzzer, LOW);
  delay(del);
}


//Firebase.setInt(firebaseData, "temp", temp);
