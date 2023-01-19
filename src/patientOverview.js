import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
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


let auth0Client = null;
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
console.log(userData)

get(child(dbRef, "/healthCare/patients/"+userData )).then((snapshot) => {
  console.log(snapshot.val())
  document.getElementById("volName").innerHTML="Name: "+snapshot.val().name
  document.getElementById("Weight").innerHTML="Weight: "+snapshot.val().weight
  document.getElementById("Height").innerHTML="Height: "+snapshot.val().height
  var remarks = ["Allergic to Penicillin", "Previous history of Asthma", "Diagnosed from Diabetes"]
  var htmlString = ""
  for(let i=0; i< remarks.length; i++ ){
    htmlString += '<li>' + remarks[i] + '</li>'
  }

  if(snapshot.val().name != null){
    document.getElementById("remarks-list").innerHTML = htmlString
  }

  set(ref(database, "/healthCare/patients/" + userData +"/"), null)

 }) 



