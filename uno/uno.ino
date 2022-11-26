#include <SPI.h>
#include <MFRC522.h>

int redPin = 2;
int greenPin = 3;
int bluePin = 4;

#define SS_PIN 10
#define RST_PIN 9

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

void setup()
{

  Serial.begin(9600);

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  led(-1);

  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522

  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }

}
void loop() {

  readNewCard();
  if (cardPresent) {
    Serial.println("New card detected, processing...");
    int id = getID(a) + 1; //because 0 based indexing
    led(id);
    Serial.println("Card ID: " + String(id));
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
