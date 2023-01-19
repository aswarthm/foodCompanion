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
const form= document.querySelector(".form")
var list_names=["username","password","name","dob","weight","height"]
var list_values=[]
if(form){
    const fields=["username","password","name","dob","weight","height"]
    console.log(form,fields);
    check(form,fields);
}
function check(form,fields){
    form.addEventListener("submit",function(e){
        e.preventDefault();
        var error=0;
        fields.forEach((field)=>{
            const input=document.getElementById(field);
            //checkHcase(input)
            if(checkHcase(input)== false){
                error++;
            }
        })
        if(error==0){
            console.log("success");
            const db= getDatabase();
            var url_string = (window.location.href);
            var url = new URL(url_string);
            var userData = String(url.searchParams.get("id"))
            console.log(url);

            set(ref(db,'/healthCare/patients/'+ userData),{
                "email":list_values[0],
                "password":list_values[1],
                "name":list_values[2],
                "dob":list_values[3],
                "weight":list_values[4],
                "height":list_values[5]
            })
            window.location.replace("./index_login1.html?id="+userData);
            //form.submit()
        }
    })
}
function checkHcase(field){
    if(field.value.trim()==""){
        const errormessage=field.parentElement.querySelector(".error-message")
        console.log(errormessage)
        const a= field;
        console.log(a)
        console.log(field.previousElementSibling.innerText);
        errormessage.innerText=field.previousElementSibling.innerText +" cannot be blank"
        field.classList.add("input-error");
        list_values=[]
        return false;
    }
    else{
        const length= field.value.length
        console.log(length)
        console.log(field)
        if(field.type==="password"){
            if(field.value.length<8){
                console.log("yes")
                const errormessage=field.parentElement.querySelector(".error-message")
                errormessage.innerText=field.previousElementSibling.innerText +" cannot be less than 8 characters"
                field.classList.add("input-error");
                list_values=[]
                return false;
            }
            else{
                const errormessage=field.parentElement.querySelector(".error-message")
                errormessage.innerText=""
                field.classList.remove("input-error")
                list_values.push(field.value)
                return true
            }
            
        }
        else{
            const errormessage=field.parentElement.querySelector(".error-message")
            errormessage.innerText=""
            field.classList.remove("input-error")
            list_values.push(field.value)
            
            
            return true
        }
    }
}
