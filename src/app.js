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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dbRef = ref(getDatabase());

function drawWeekly() {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  get(child(dbRef, "/")).then((snapshot) => {
	var rows = [];
    var stuff = snapshot.val();
    var data = stuff["users"]["sindhu"];
    var curDate = new Date();
    //console.log(curDate)

    // console.log("a", curDate.valueOf())

    // console.log("b", new Date(1662212590000 - 3*24*60*60*1000))

    for (let i = 6; i >= 0; i--) {
      var tempDate = new Date(curDate.valueOf() - i * 24 * 60 * 60 * 1000);
      console.log(tempDate.getDate(), tempDate.getMonth() + 1);

      var month_year = tempDate.getMonth() + 1 + "-" + tempDate.getFullYear();
      var date = tempDate.getDate();

      //console.log(month_year, date)

      for (var hour_min in data[month_year][date]) {
        var hour = hour_min.split("-")[0];
        var min = hour_min.split("-")[1];
        console.log(hour, min);
        var foodNum = data[month_year][date][hour_min];
        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        //console.log(days[tempDate.getDay()], stuff["cards"][foodNum]["name"], tempDate.getHours(), tempDate.getHours());
        rows[rows.length] = [
          days[tempDate.getDay()],
          stuff["cards"][foodNum]["name"],
		  new Date(0,0,0,hour,min,0,0),
		  new Date(0,0,0,hour,min,3600,0),
        ];
        //console.log(rows);
      }
    }

    //console.log(data[month_year])
    //console.log(data[month_year][date])
	console.log(rows)
	drawChart(rows);
});
}
//drawWeekly();

const main = async () => {
  drawWeekly();
};
google.charts.load("current", { packages: ["timeline"], callback: main }); //calls main after loading chart library
