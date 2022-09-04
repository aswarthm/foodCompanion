var image = document.getElementById("image")
var submit = document.getElementById("submit")
var myHeaders = new Headers();

var formdata = new FormData();
myHeaders.append("Authorization", "Bearer d7e98fde426ad83a871363ff7daa5669b1e5000a");

document.getElementById("upload").onchange = function (e) {
    var file = document.getElementById("upload").files[0];
    var reader = new FileReader();
    reader.onload = function () {
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

function getCal(imageId){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer d7e98fde426ad83a871363ff7daa5669b1e5000a  ");
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
        dataapi["time"]=new Date().valueOf();
        console.log(dataapi)
      })
      .catch(error => console.log('error', error));
}

