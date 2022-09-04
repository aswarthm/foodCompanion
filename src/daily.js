  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
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
   appId: "1:52645826415:web:df3e22e25307066cdce29a"
 };


 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);

 const dbRef = ref(getDatabase());
//  get(child(dbRef, '/volunteer')).then((snapshot) => {
// 	console.log(snapshot.val());
//  });


 function getDailyData(){

  const db = getDatabase();
  const dbRef = ref(getDatabase());
	get(child(dbRef, "/")).then((snapshot) => {
	var stuff = snapshot.val()
	var data = stuff["users"]["sindhu"]
	var curDate = new Date()

	var month_year = (curDate.getMonth() + 1) + "-"+ curDate.getFullYear()
	var date = curDate.getDate()
	

	var dailyCalories = 0
	var dailyProtein = 0
	var dailyTotFat = 0
	var dailySatFat = 0
	var dailySugar = 0 
	
	//console.log(data[month_year][date])
	
	
	for (var hour_min in data[month_year][date]){		
		
		var foodNum = data[month_year][date][hour_min]
		//console.log(hour_min, foodNum)
		console.log(foodNum,stuff["cards"][foodNum]["fat"])

		dailyCalories +=  parseFloat(stuff["cards"][foodNum]["calories"])
		dailyProtein +=  parseFloat(stuff["cards"][foodNum]["proteins"])
		dailyTotFat +=  parseFloat(stuff["cards"][foodNum]["fat"])
		dailySatFat +=  parseFloat(stuff["cards"][foodNum]["fatsat"])
		dailySugar +=  parseFloat(stuff["cards"][foodNum]["sugar"])
		
	}

	var bigdata = {"Calorie": {"max":2500, "today":dailyCalories}, "Protein":{"max":56, "today":dailyProtein}, "Total Fat":{"max":100,"today":dailyTotFat}, "Saturated Fat": {"max":10,"today":dailySatFat}, "Sugar": {"max":36,"today": dailySugar}}
	for (var smaldata in bigdata){
		drawTitleSubtitle(smaldata, bigdata[smaldata]["max"], bigdata[smaldata]["today"])

		
	}
 });
}
// getDailyData()


google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(getDailyData);

function drawTitleSubtitle(nutname,nutmax, nuttod) {
	

      var data = google.visualization.arrayToDataTable([
        ['Nutrient', 'Recommended amount', 'Consumed amount'],
        [nutname, nutmax, nuttod]
        

      ]);

      var materialOptions = {
        chart: {
          title: nutname,
          subtitle: ''
        },
        hAxis: {
          title: 'Total Population',
          minValue: 0,
        },
        vAxis: {
          title: 'City'
        },
        bars: 'horizontal',
      
      };
      var materialChart = new google.charts.Bar(document.getElementById(nutname));
      materialChart.draw(data, materialOptions);
    }

		//0611