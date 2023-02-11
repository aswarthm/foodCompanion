var image = document.getElementById("image")
var submit = document.getElementById("submit")
var apiKey = "52fce398340b7ba911804680bfca8e404f89ae95"
var myHeaders = new Headers();

var formdata = new FormData();
myHeaders.append("Authorization", "Bearer "+apiKey);

document.getElementById("upload").onchange = function (e) {
    var file = document.getElementById("upload").files[0];
    var reader = new FileReader();
    reader.onload = function () {
        var blob = dataURLtoBlob(reader.result);
        document.getElementById("imgShow").src=reader.result
        document.getElementById("imgShow").style = "width: 40vw;padding: 20px;border-radius: 10px;"
        //document.getElementById("imgShow").style = "width:40vw; border-radius: 10px;"
        //console.log(reader.result);
        //console.log(blob, new File([blob], "image.png", {type: "image/png"}));
        var formdata = new FormData();
        formdata.append("image", blob, "/C:/Users/Bharath Reddy/Desktop/ICHACK/masala-dosa-2.jpg");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.logmeal.es/v2/image/segmentation/complete", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                var js=JSON.parse(result)
                console.log(js["imageId"]);
                getCal(js["imageId"])


            })
            .catch(error => console.log('error', error));


    };
    reader.readAsDataURL(file);
};

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}


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

var nameInput = document.getElementById('get_portion');
var fraction;

  console.log(nameInput.value);

 function writeToFirebase(dataapi){               //////////

  const db = getDatabase();
  var curDate = new Date()
  var month_year = (curDate.getMonth() + 1) + "-"+ curDate.getFullYear()
	var date = curDate.getDate()
    var hour_min = curDate.getHours() + "-" + curDate.getMinutes()

    document.getElementById("calories").innerHTML = "Calories : " + parseFloat(dataapi["calories"]*fraction).toFixed(1)
    document.getElementById("proteins").innerHTML = "Protein : " + parseFloat(dataapi["proteins"]*fraction).toFixed(1)
    document.getElementById("fats").innerHTML = "Total Fats : " + parseFloat(dataapi["total_fat"]*fraction).toFixed(1)
    document.getElementById("fatsat").innerHTML = "Saturated Fats : " + parseFloat(dataapi["sat_fat"]*fraction).toFixed(1)
    document.getElementById("sugar").innerHTML = "Sugars : " + parseFloat(dataapi["sugar"]*fraction).toFixed(1)

    set(ref(db, "cards/" + dataapi["food_id"]), {
        "calories": parseFloat(dataapi["calories"]*fraction).toFixed(1),
        "fat" : parseFloat(dataapi["total_fat"]*fraction).toFixed(1),
        "fatsat" : parseFloat(dataapi["sat_fat"]*fraction).toFixed(1),
        "name" : dataapi["name"],
        "proteins": parseFloat(dataapi["proteins"]*fraction).toFixed(1),
        "sugar" : parseFloat(dataapi["sugar"]*fraction).toFixed(1)

    })

    set(ref(db, "users/sindhu/" + month_year + "/" + date + "/" + hour_min), dataapi["food_id"])
 }

function getCal(imageId){
    fraction=nameInput.value;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+apiKey);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "imageId": imageId
    });

    var dataapi = {}

    console.log(raw)
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo", requestOptions)
      .then(response => response.text())
      .then(result =>{
        console.log(result)
        var js=JSON.parse(result)
        console.log(js["foodName"])
        dataapi["name"]=js["foodName"][0]
        dataapi["food_id"]=js["imageId"]
        dataapi["calories"]=js["nutritional_info"]["calories"]
        dataapi["proteins"]=js["nutritional_info"]["totalNutrients"]["PROCNT"]["quantity"]
        dataapi["sat_fat"]=js["nutritional_info"]["totalNutrients"]["FASAT"]["quantity"]
        dataapi["total_fat"]=js["nutritional_info"]["totalNutrients"]["FAT"]["quantity"]
        dataapi["sugar"]=js["nutritional_info"]["totalNutrients"]["SUGAR"]["quantity"]
        

        writeToFirebase(dataapi)
        beep_beep()
        
        console.log(dataapi)
      })
      .catch(error => console.log('error', error));

             ////////
}

function beep_beep(){
  const db = getDatabase();
  const dbRef = ref(getDatabase());
	get(child(dbRef, "/")).then((snapshot) => {
	var stuff = snapshot.val()
	var data = stuff["users"]["sindhu"]
	var curDate = new Date()

	var month_year = (curDate.getMonth() + 1) + "-"+ curDate.getFullYear()
	var date = curDate.getDate()

  var dailyCalories = 0;
  for (var hour_min in data[month_year][date]){		
		var foodNum = data[month_year][date][hour_min]
		dailyCalories +=  parseFloat(stuff["cards"][foodNum]["calories"])
}
if (dailyCalories>=2500){
  set(ref(db, "/beep-beep"), 1)
  alert("Too many calories")

}

})
}
