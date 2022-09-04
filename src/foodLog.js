// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLYJTGB4TC5CWuUYNS4GcnyIevmz4HRKw",
  authDomain: "biologicalwellbeing.firebaseapp.com",
  databaseURL: "https://biologicalwellbeing-default-rtdb.firebaseio.com",
  projectId: "biologicalwellbeing",
  storageBucket: "biologicalwellbeing.appspot.com",
  messagingSenderId: "52645826415",
  appId: "1:52645826415:web:df3e22e25307066cdce29a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(getDatabase());

function fillFood() {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  var a;
  var b;
  get(child(dbRef, "/")).then((snapshot) => {
    var cards = snapshot.val()["cards"];
    var food = snapshot.val()["users"]["sindhu"];
    //console.log(food)
    var htmlstring = "";
    var today = new Date();
    var monthYr =
      String(today.getMonth() + 1) + "-" + String(today.getFullYear());
    var day = String(today.getDate());
    console.log(monthYr, day);
    for (var entity in food[monthYr][day]) {
      //console.log(entity, food[month][day][entity])
      var name = cards[food[monthYr][day][entity]]["name"];
      //console.log(name)
      htmlstring += '<tr> <th scope="row">' + "&emsp;" + name + "</th> <td>";
      htmlstring += cards[food[monthYr][day][entity]]["calories"] + "</td><td>";
      htmlstring += cards[food[monthYr][day][entity]]["proteins"] + "</td><td>";
      htmlstring += cards[food[monthYr][day][entity]]["fat"] + "</td><td>";
      htmlstring += cards[food[monthYr][day][entity]]["fatsat"] + "</td><td>";
      htmlstring += cards[food[monthYr][day][entity]]["sugar"] + "</td><td>";
      htmlstring += entity + "</td></tr>";
    }
    //console.log(htmlstring)
    document.getElementById("table").innerHTML = htmlstring;
  });
}

fillFood();
