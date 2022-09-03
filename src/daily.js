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
 get(child(dbRef, '/volunteer')).then((snapshot) => {
	console.log(snapshot.val());
 });

 

 function drawWeekly(){

	const db = getDatabase();
  const dbRef = ref(getDatabase());
	get(child(dbRef, "/")).then((snapshot) => {
	var stuff = snapshot.val()
	var data = stuff["users"]["sindhu"]
	var curDate = new Date()
	//console.log(curDate)
	
	// console.log("a", curDate.valueOf())


	// console.log("b", new Date(1662212590000 - 3*24*60*60*1000))



	var month_year = (curDate.getMonth() + 1) + "-"+ curDate.getFullYear()
	var date = curDate.getDate()

	//console.log(month_year, date)

	for (var hour_min in data[month_year][date]){
		
		var hour = hour_min.split("-")[0]
		var min = hour_min.split("-")[1]
		console.log(hour,min)
		var foodNum = data[month_year][date][hour_min]
		console.log(stuff["cards"][foodNum]["name"])



	}

	


	//console.log(data[month_year])
	//console.log(data[month_year][date])

	





 });
}
drawWeekly()