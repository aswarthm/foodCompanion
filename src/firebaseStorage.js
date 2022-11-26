  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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

  const storage = getStorage(app)
  //const storageRef = ref(storage)

var uploader = document.getElementById("uploader")
var fileButton = document.getElementById("fileButton")
fileButton.addEventListener("change", function(e){
  var file = e.target.files[0]
  var storageRef = ref(storage, file.name)
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("uploaded")
    var downloadURL = getDownloadURL(snapshot.ref).then((downloadURL) =>{
        console.log(downloadURL)
    })
  },
  () => {
    getDownloadURL()
  })
})