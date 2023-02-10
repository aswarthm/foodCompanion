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
var patient = 15

function populateDropdown(){
    //id is doct name
    get(child(dbRef, "/healthCare/doctors")).then((snapshot) => {
        var data = snapshot.val()
        
        var htmlString = '<option value="0">'+ 'Select Doctor' +'</option>'

        for (var doctorName in data){
            htmlString += '<option value="' + data[doctorName]["name"] + '">'+ data[doctorName]["name"] +'</option>'
        }
        document.getElementById("dropDown").innerHTML = htmlString
        makeDropdownWork()
    })
}

function makeDropdownWork(){
  document.getElementById("dropDown").addEventListener("change", function(){
    //console.log(document.getElementById("dropDown").value)

    drawWeekly(document.getElementById("dropDown").value)
    document.getElementById("btnSearch").addEventListener("click", function(){
      bookAppointment()
    })               //Time input is taken only after doctor is chosen
  })
}

function bookAppointment(){
  var doctor = document.getElementById("dropDown").value  //supposed to be name

  var timeArr = document.getElementById("timeInput").value.split(":")
  var time = timeArr[0]*60 + parseInt(timeArr[1])

  var dateArr = document.getElementById("dateInput").value.split("-")
  var month_year = dateArr[1] + "-" + dateArr[0]
  var date = dateArr[2]

  if(new Date(dateArr[0], dateArr[1] - 1, dateArr[2] , timeArr[0], timeArr[1],0 ).valueOf() < new Date().valueOf()){
    alert("Time travel is forbidden");
    return;
  }

  //give alert and return
  console.log(doctor, month_year, date, time)
  


  var flag = 1;
  get(child(dbRef, "/healthCare/doctors")).then((snapshot) => {
    
    var data = snapshot.val()

    for (var idkwhat in data){
      if (data[idkwhat]["name"] == doctor)
      { //doctor = idkwhat
        var doctorData = data[idkwhat]
        break;
      }
    }
    //var doctorData = snapshot.val()[doctor]

    if (doctorData[month_year] == undefined){
      doctorData[month_year] = {}   ///ends with a /

    }
    if (doctorData[month_year][date] == undefined){
      doctorData[month_year][date] = {}
    }

    else{
      for (var t in doctorData[month_year][date] ){
        if ( Math.abs(t-time)<=appointmentMins ){
          alert("Slot Unavailable")
          break;
        }
      }
    }
    doctorData[month_year][date][time] = {"patientID": patient}
    console.log(doctorData)

    set(ref(database, "/healthCare/doctors/" + idkwhat +"/"), doctorData)
    drawWeekly(doctor)

    document.getElementById("getQR").addEventListener("click", function(){
      get(child(dbRef, "/healthCare/patients/"+patient )).then((snapshot) => {  
        var param = parseInt(Math.random()*100000);
        console.log(param)
        
        set(ref(database, "/healthCare/patients/" + param +"/"), snapshot.val())
  
        var url = window.location.origin+'/src/patientOverview.html?id=' + param
        //window.open(url)
        document.getElementById("qrimg").src='https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=' + url

    })
    
    


      //twilio send param
      //make qr with param?

  })

  //convert time to proper format
  //take date
  //Check if slot is available in firebase
  //If not give alert
  //If available give alert
  //Change firebase

  //ALSO CHECK num of appmts
})}



function drawWeekly(doctor) { ///////pass doct name
  console.log(doctor)

  get(child(dbRef, "/healthCare")).then((snapshot) => {
    var rows = [];
    var data = snapshot.val()
    
    for (var idkwhat in data["doctors"]){
      if (data["doctors"][idkwhat]["name"] == doctor)
      { doctor = idkwhat
        break;
      }
    }

    var doctorData = data["doctors"][doctor];

    //console.log(doctorData)
    var curDate = new Date();

    for(var i=0; i<7; i++){
      var tempDate = new Date(curDate.valueOf() + i * 24 * 60 * 60 * 1000);
      //console.log(tempDate.getDate(), tempDate.getMonth() + 1);
      var month_year = (tempDate.getMonth() + 1).toString().padStart(2, '0') + "-" + tempDate.getFullYear();
      var date = tempDate.getDate().toString().padStart(2, '0');
      //console.log(month_year, date, doctorData[month_year][date])

      if (doctorData[month_year] == undefined){
        continue;
      }
      if (doctorData[month_year][date] == undefined){
        continue;
      }
      console.log(doctorData[month_year][date])
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
            "",
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
  console.log(parseInt(Math.random()*100000))

  document.getElementById("dateInput").value = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth())+1).toString().padStart(2, '0')  + "-" + new Date().getDate().toString().padStart(2, '0')
  var hour = new Date().toTimeString().split(' ')[0].split(':')[0]
  document.getElementById("timeInput").value = ((parseInt(hour) + 1) +":"+ "00").padStart(5,'0')

  console.log(document.getElementById("dateInput").value)

  populateDropdown()
  //makeDropdownWork()
  //drawWeekly();
  
};
google.charts.load("current", { packages: ["timeline"], callback: main }); //calls main after loading chart library










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