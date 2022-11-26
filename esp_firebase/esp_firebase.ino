//#include "FirebaseESP8266.h"  // Install Firebase ESP8266 library
//#include <ESP8266WiFi.h>
//#include <SPI.h>
//#include <MFRC522.h>
//#include <NTPClient.h>
//#include <WiFiUdp.h>
////#include <Wire.h>
////#include <LiquidCrystal_I2C.h>
////
////LiquidCrystal_I2C lcd(0x27, 20, 4); // set the LCD address to 0x27 for a 16 chars and 2 line display
////
//
//#define FIREBASE_HOST "biologicalwellbeing-default-rtdb.firebaseio.com/" //Without http:// or https:// schemes
//#define FIREBASE_AUTH "nO5sVCe10g20uKUdgMN4NlDfYinvJVv6HwyEv5to"
//#define WIFI_SSID "test"
//#define WIFI_PASSWORD "12345678"
//
//FirebaseData firebaseData;
//FirebaseData Data;
//
//FirebaseJson json;
//
//
//#define SS_PIN D4
//#define RST_PIN D3
//
//MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
//
//MFRC522::MIFARE_Key key;
//
//// Init array that will store new NUID
//byte nuidPICC[4];
//
//String a = "";
//String allowedIds[] = {" 87 86 05 214",
//                       " 99 185 100 011",
//                       " 250 167 90 47"
//                      };
//boolean cardPresent = false;
//
//
//String cur = "";
//String prev = "";
//
//
//WiFiUDP ntpUDP;
//NTPClient timeClient(ntpUDP, "pool.ntp.org");
//String hrMin = "", curDay = "", monthYr = "";
//
//void setup()
//{
//  
////  Wire.begin(D1, D2);
////  lcd.init();
////  // Print a message to the LCD.
////  lcd.backlight();
////  lcd.setCursor(3, 0);
////  lcd.print("Hello, world!");
////  lcd.setCursor(2, 1);
////  lcd.print("Ywrobot Arduino!");
////  lcd.setCursor(0, 2);
////  lcd.print("Arduino LCM IIC 2004");
////  lcd.setCursor(2, 3);
////  lcd.print("Power By Ec-yuan!");
//
//  Serial.begin(115200);
//
//  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//  Serial.print("Connecting to Wi-Fi");
//  while (WiFi.status() != WL_CONNECTED)
//  {
//    Serial.print(".");
//    delay(300);
//  }
//  Serial.println();
//  Serial.print("Connected with IP: ");
//  Serial.println(WiFi.localIP());
//  Serial.println();
//
//  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
//  Firebase.reconnectWiFi(true);
//
//
//  SPI.begin(); // Init SPI bus
//  rfid.PCD_Init(); // Init MFRC522
//
//  for (byte i = 0; i < 6; i++) {
//    key.keyByte[i] = 0xFF;
//  }
//
//
//  timeClient.begin();
//  timeClient.setTimeOffset((5 * 60 + 30) * 60);
//}
//void loop() {
//  readNewCard();
//  if (cardPresent) {
//    Serial.println("New card detected, processing...");
//    int id = getID(a) + 1; //because 0 based indexing
//    //show on lcd led(id);
//    Serial.println("Card ID: " + String(id));
//    getTime();
//    Firebase.set(firebaseData, "/users/sindhu/" + monthYr + "/" + curDay + "/" + hrMin, id);
//    Serial.println(a);
//    //show on lcd led(-1);
//    cardPresent = false;
//  }
//}
//
//
//
//void readNewCard() {
//  // Look for new cards
//  if ( ! rfid.PICC_IsNewCardPresent())
//    return;
//
//  if ( ! rfid.PICC_ReadCardSerial())
//    return;
//
//
//
//  for (byte i = 0; i < 4; i++) {
//    nuidPICC[i] = rfid.uid.uidByte[i];
//  }
//
//  printHex(rfid.uid.uidByte, rfid.uid.size);
//  //Serial.println();
//  rfid.PICC_HaltA();
//
//
//  rfid.PCD_StopCrypto1();
//}
//
//int getID(String str) {
//  int id = -1;
//  for (int i = 0; i < 3; i++) {
//    if (a == allowedIds[i]) {
//      id = i;
//      break;
//    }
//  }
//  return id;
//}
//
//
//void printHex(byte *buffer, byte bufferSize) {
//  cardPresent = true;
//  a = "";
//  for (byte i = 0; i < bufferSize; i++) {
//    //Serial.print(buffer[i] < 0x10 ? " 0" : " ");
//    a += buffer[i] < 0x10 ? " 0" : " ";
//    //Serial.print(buffer[i], HEX);
//    a += buffer[i];
//  }
//  //Serial.println(a);
//
//}
//
//
//void getTime() {
//
//  timeClient.update();
//
//  int currentHour = timeClient.getHours();
//
//  int currentMinute = timeClient.getMinutes();
//
//  time_t epochTime = timeClient.getEpochTime();
//  struct tm *ptm = gmtime ((time_t *)&epochTime);
//
//  int monthDay = ptm->tm_mday;
//
//  int currentMonth = ptm->tm_mon + 1;
//
//  int currentYear = ptm->tm_year + 1900;
//
//  monthYr = String(currentMonth) + "-" + String(currentYear);
//  curDay = String(monthDay);
//  hrMin = String(currentHour) + "-" + String(currentMinute);
//  //Serial.println(monthYr + "\n" + curDay + "\n" + hrMin);
//
//
//  return;
//}
////
////void led(int id) {
////  if (id == -1) {
////    digitalWrite(redPin, HIGH);
////    digitalWrite(greenPin, HIGH);
////    digitalWrite(bluePin, HIGH);
////  }
////  else if (id == 1) {
////    digitalWrite(redPin, LOW);
////    digitalWrite(greenPin, HIGH);
////    digitalWrite(bluePin, HIGH);
////  }
////  else if (id == 2) {
////    digitalWrite(redPin, HIGH);
////    digitalWrite(greenPin, LOW);
////    digitalWrite(bluePin, HIGH);
////  }
////  else if (id == 3) {
////    digitalWrite(redPin, HIGH);
////    digitalWrite(greenPin, HIGH);
////    digitalWrite(bluePin, LOW);
////  }
////
////}
////
////
//////Firebase.setInt(firebaseData, "temp", temp);


#include "FirebaseESP8266.h"  // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>
#include <SPI.h>
#include <MFRC522.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

int redPin = D0;
int greenPin = D1;
int bluePin = D2;


#define FIREBASE_HOST "biologicalwellbeing-default-rtdb.firebaseio.com/" //Without http:// or https:// schemes
#define FIREBASE_AUTH "nO5sVCe10g20uKUdgMN4NlDfYinvJVv6HwyEv5to"
#define WIFI_SSID "test"
#define WIFI_PASSWORD "12345678"

FirebaseData firebaseData;
FirebaseData Data;

FirebaseJson json;


#define SS_PIN D4
#define RST_PIN D3

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class

MFRC522::MIFARE_Key key;

// Init array that will store new NUID
byte nuidPICC[4];

String a = "";
String allowedIds[] = {" 87 86 05 214",
                       " 99 185 100 011",
                       " 250 167 90 47"
                      };
boolean cardPresent = false;


String cur = "";
String prev = "";


WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");
String hrMin = "", curDay = "", monthYr = "";

void setup()
{

  Serial.begin(115200);
  
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  led(-1);

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


  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }


  timeClient.begin();
  timeClient.setTimeOffset((5 * 60 + 30) * 60);
}
void loop() {

  readNewCard();
  if (cardPresent) {
    Serial.println("New card detected, processing...");
    int id = getID(a) + 1; //because 0 based indexing
    led(id);
    Serial.println("Card ID: " + String(id));
    getTime();
    Firebase.set(firebaseData, "/users/sindhu/" + monthYr + "/" + curDay + "/" + hrMin, id);
    Serial.println(a);
    led(-1);
    cardPresent = false;
  }
}



void readNewCard() {
  // Look for new cards
  if ( ! rfid.PICC_IsNewCardPresent())
    return;

  if ( ! rfid.PICC_ReadCardSerial())
    return;



  for (byte i = 0; i < 4; i++) {
    nuidPICC[i] = rfid.uid.uidByte[i];
  }

  printHex(rfid.uid.uidByte, rfid.uid.size);
  //Serial.println();
  rfid.PICC_HaltA();


  rfid.PCD_StopCrypto1();
}

int getID(String str) {
  int id = -1;
  for (int i = 0; i < 3; i++) {
    if (a == allowedIds[i]) {
      id = i;
      break;
    }
  }
  return id;
}


void printHex(byte *buffer, byte bufferSize) {
  cardPresent = true;
  a = "";
  for (byte i = 0; i < bufferSize; i++) {
    //Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    a += buffer[i] < 0x10 ? " 0" : " ";
    //Serial.print(buffer[i], HEX);
    a += buffer[i];
  }
  //Serial.println(a);

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
  hrMin = String(currentHour) + "-" + String(currentMinute);
  //Serial.println(monthYr + "\n" + curDay + "\n" + hrMin);


  return;
}

void led(int id) {
  if (id == -1) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, HIGH);
  }
  else if (id == 1) {
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, HIGH);
  }
  else if (id == 2) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, LOW);
    digitalWrite(bluePin, HIGH);
  }
  else if (id == 3) {
    digitalWrite(redPin, HIGH);
    digitalWrite(greenPin, HIGH);
    digitalWrite(bluePin, LOW);
  }

}


//Firebase.setInt(firebaseData, "temp", temp);
