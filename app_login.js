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
  appId: "1:52645826415:web:df3e22e25307066cdce29a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dbRef = ref(getDatabase());
var userData;
document.getElementById("btn-login-customer").addEventListener("click", async function () {
    localStorage.setItem("auth", "btn-login-customer");
    console.log("clic");
    await login();
  });

document.getElementById("btn-login-doctor").addEventListener("click", async function () {
    localStorage.setItem("auth", "btn-login-doctor");
    await login();
  });

let auth0Client = null;
// ..

const fetchAuthConfig = () => fetch("./auth_config.json");
// ..

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
  });
};
console.log(auth0);
// ..

window.onload = async () => {
  await configureClient();

  // NEW - update the UI state
  updateUI();
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0Client.handleRedirectCallback();

    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      //redirect_uri: window.location.replace("http://localhost:5500/index_login.html")
      redirect_uri: window.location.origin,
    },
  });
};
const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.replace("/"),
    },
  });
};
const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  console.log(isAuthenticated);
  if (localStorage.getItem("auth") == "btn-login-customer") {
    document.getElementById("btn-login-customer").disabled = isAuthenticated;
  } else if (localStorage.getItem("auth") == "btn-login-doctor") {
    document.getElementById("btn-login-doctor").disabled = isAuthenticated;
  }

  // NEW - add logic to show/hide gated content after authentication
  if (isAuthenticated) {
    //document.getElementById("gated-content").classList.remove("hidden");

    // document.getElementById(
    //   "ipt-access-token"
    // ).innerHTML = await auth0Client.getTokenSilently();
    userData = await auth0Client.getUser();
    //console.log(userData.sub)
    if (localStorage.getItem("auth") == "btn-login-customer") {
      const snapshot = await get(
        child(dbRef, "/healthCare/patients/" + userData.sub)
      );
      console.log(userData.sub);
      if (snapshot.val()) {
        window.location.replace(
          "./src/index_login1.html?id=" + userData.sub
        );
      } else {
        window.location.replace(
          "./src/register.html?id=" + userData.sub
        );
      }
      localStorage.removeItem("auth");
    } else if (localStorage.getItem("auth") == "btn-login-doctor") {
      const snapshot = await get(
        child(dbRef, "/healthCare/doctors/" + userData.sub)
      );
      console.log(userData.sub);
      if (snapshot.val()) {
        window.location.replace(
          "./src/healthCare/doctorPage.html?id=" +
            userData.sub
        );
      } else {
        window.location.replace(
          "./src/healthCare/register_doctor.html?id=" +
            userData.sub
        );
      }
      localStorage.removeItem("auth");
    }

    //document.getElementById("ipt-user-profile").textContent = userData.sub
  } else {
    //document.getElementById("gated-content").classList.add("hidden");
  }
};
