#include "FirebaseESP8266.h"  // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>


int leds[3] = {D0, D1};
int buzzer = D3;
int sw = D2;


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

  for (int i = 0; i < 2; i++) {
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

  getTime();
  if (!hrMin.equals(prevTime)) {
    prevTime = hrMin;
    Serial.println(hrMin);
    Serial.println();
    Firebase.getString(firebaseData, "/tap0");
    String temp = firebaseData.stringData();
    if (temp == hrMin) {
      digitalWrite(D0, HIGH);
      disabled = false;
    }
    if(!disabled){
      buzz();
    }
  }

  for (int i = 0; i < 2; i++) {
    Firebase.getString(firebaseData, "/glow" + String(i));
    if (firebaseData.stringData().equals("1")) {
      digitalWrite(leds[i], HIGH);
      delay(1000);
      digitalWrite(leds[i], LOW);
      delay(500);
      digitalWrite(leds[i], HIGH);
      delay(1000);
      digitalWrite(leds[i], LOW);
      delay(500);
      digitalWrite(leds[i], HIGH);
      delay(1000);
      digitalWrite(leds[i], LOW);
      delay(500);
      digitalWrite(leds[i], HIGH);
      delay(1000);
      digitalWrite(leds[i], LOW);
      Firebase.setString(firebaseData, "/glow" + String(i), "0");
    }
  }

  //Serial.println(digitalRead(sw));
  if (digitalRead(sw)) {
    Serial.println("hi");
    disabled = 1;
    for (int i = 0; i < 2; i++) {
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
