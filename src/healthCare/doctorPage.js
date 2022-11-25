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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(getDatabase());


var doctor = "Sindhu"

function fillDoctorInfo(doctorData){
  document.getElementById("docName").innerHTML = "Doctor: " + doctor 
  document.getElementById("appPerDay").innerHTML = "Appointments per day: " + doctorData["appointmentsPerDay"]
}



function drawWeekly() {
  get(child(dbRef, "/healthCare")).then((snapshot) => {
    var rows = [];
    var data = snapshot.val()
    var doctorData = data["doctors"][doctor];
    fillDoctorInfo(doctorData)
    //console.log(doctorData)
    var curDate = new Date();

    for(let i=0; i<7; i++){
      var tempDate = new Date(curDate.valueOf() + i * 24 * 60 * 60 * 1000);
      //console.log(tempDate.getDate(), tempDate.getMonth() + 1);
      var month_year = tempDate.getMonth() + 1 + "-" + tempDate.getFullYear();
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
  drawWeekly();
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