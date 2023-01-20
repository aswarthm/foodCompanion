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
let auth0Client = null;
const app = initializeApp(firebaseConfig);
  
  const database = getDatabase(app);


  const dbRef = ref(getDatabase());
// ..

const fetchAuthConfig = () => fetch("/auth_config.json");
// ..

console.log("ok")
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  
  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });
};
// ..


window.onload = async () => {
  await configureClient();
  // NEW - update the UI state
  updateUI();
  const isAuthenticated = await auth0Client.isAuthenticated();
    console.log(isAuthenticated)
  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // // NEW - check for the code and state parameters
  // const query = window.location.search;
  // if (query.includes("code=") && query.includes("state=")) {

  //   // Process the login state
  //   await auth0Client.handleRedirectCallback();

  //   updateUI();

  //   // Use replaceState to redirect the user away and remove the querystring parameters
  //   window.history.replaceState({}, document.title, "/");
  // }
};

document.getElementById("logout").addEventListener("click",function(){
  console.log("clicccc")
  logout();
})


const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
};
const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.replace("./register.html")
    }
  });
};
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    // document.getElementById("gated-content").classList.remove("hidden");

    // document.getElementById(
    //   "ipt-access-token"
    // ).innerHTML = await auth0Client.getTokenSilently();
    // const userData = await auth0Client.getUser()
    // //console.log(userData.sub)
    // const snapshot = await get(child(dbRef, '/temp/users'+ userData.sub))
    // if(snapshot.val()){
        
    // }
    // else{
    //     window.location.replace("http://127.0.0.1:5500/register.html")
    // }
    // document.getElementById("ipt-user-profile").textContent = userData.sub

  } else {
    // document.getElementById("gated-content").classList.add("hidden");
  }
};
var url_string = (window.location.href);
var url = new URL(url_string);
var userData = String(url.searchParams.get("id"))
const snapshot = await get(child(dbRef, '/healthCare/doctors/'+ userData))
console.log(snapshot.val())
document.getElementById("docName").innerHTML="Doctor: "+snapshot.val().name
document.getElementById("numKids").innerHTML="Qualification: "+snapshot.val().quali
//doctor = snapshot.val().name
drawWeekly(snapshot.val().name)

// document.getElementById("weight").innerHTML=snapshot.val().weight
// document.getElementById("height").innerHTML=snapshot.val()  .height

var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

var appointmentMins = 15;

// Initialize Firebase


var doctor = "Sindhu"

function fillDoctorInfo(doctorData){
  //document.getElementById("docName").innerHTML = "Doctor: " + doctor 
  document.getElementById("appPerDay").innerHTML = "Appointments per day: " + doctorData["appointmentsPerDay"]
}


function drawWeekly(doctor) {
  get(child(dbRef, "/healthCare")).then((snapshot) => {
    var rows = [];
    var data = snapshot.val()
    var doctorData = data["doctors"][doctor];
    fillDoctorInfo(doctorData)
    console.log(doctorData)
    var curDate = new Date();

    for(let i=0; i<7; i++){
      var tempDate = new Date(curDate.valueOf() + i * 24 * 60 * 60 * 1000);
      //console.log(tempDate.getDate(), tempDate.getMonth() + 1);
      var month_year = String(tempDate.getMonth() + 1).padStart(2, '0') + "-" + String(tempDate.getFullYear()).padStart(2, '0');
      var date = tempDate.getDate();
      //console.log(month_year, date, doctorData[month_year][date])
      if (doctorData[month_year] == undefined){
        continue;
      }
      if (doctorData[month_year][date] == undefined){
        continue;
      }

      for (var t in doctorData[month_year][date]){
        t = parseInt(t)
        var patientID = doctorData[month_year][date][t]["patientID"]
        //console.log(patientID)
        console.log(days[tempDate.getDay()])
        console.log(data["patients"][patientID]["name"])
        console.log(parseInt(t/60), t%60)
        console.log(parseInt((t+appointmentMins)/60), (t+appointmentMins)%60)

        rows[rows.length] = [
            days[tempDate.getDay()],
            data["patients"][patientID]["name"],
            new Date(0,0,0, parseInt(t/60), t%60, 0),
            new Date(0,0,0, parseInt((t+appointmentMins)/60), (t+appointmentMins)%60, 0)
        ]
      }
    }
    console.log(rows)

    drawChart(rows)

    })
}



const main = async () => {
  //drawWeekly(doctor);
  


  
};
google.charts.load("current", { packages: ["timeline"], callback: main }); //calls main after loading chart library












// function testig(){
//     console.log(doctor)
// }
// testig()











function drawChart(rows) {
    var container = document.getElementById("timeline");
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
  
    dataTable.addColumn({ type: "string", id: "day" });
    dataTable.addColumn({ type: "string", id: "foodName" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
  
    for (let i = 0; i < rows.length; i++) {
      dataTable.addRow(rows[i]);
    }
    //console.log(rows)
    //dataTable.addRows(rows);
  
    google.visualization.events.addListener(chart, "ready", changeBorderRadius);
    google.visualization.events.addListener(chart, "select", changeBorderRadius);
    google.visualization.events.addListener(chart, "onmouseover", changeBorderRadius);
    google.visualization.events.addListener( chart, "onmouseout", changeBorderRadius);
  
    function changeBorderRadius() {
      var borderRadius = 4;
      var chartColumns = container.getElementsByTagName("rect");
      Array.prototype.forEach.call(chartColumns, function (column) {
        if (
          column.getAttribute("fill") != "none" &&
          column.getAttribute("stroke") != "1"
        ) {
          column.setAttribute("rx", borderRadius);
          column.setAttribute("ry", borderRadius);
        }
      });
    }
  
    var options = {
      backgroundColor: "#f7f7f7",
      alternatingRowStyle: false,
    };
  
    chart.draw(dataTable, options);
    //chart.draw(dataTable);
  }