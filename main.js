prediction_1 = "";
prediction_2= "";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera"); 

function take_snapshot() {
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';

});
}

console.log("ml5 version=",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/EF7k6WFzv/model.json',modelLoaded);
function modelLoaded() {
    console.log("modelloaded");

}

function speak() {
    var synth=window.speechSynthesis;
    speak_data_1 = "the first prediction is" + prediction_1;
    speak_data_2 = "and the second prediction is" + prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
    
}


function check() {
img= document.getElementById("capture_image");
classifier.classify(img,gotResults);

}

function gotResults(error,results) {
if (error) {
    console.error(error);

}

else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();

    if (results[0].label=="normal happy") {
document.getElementById("update_emoji").innerHTML="&#128522";
 }
 if (results[0].label=="sad") {
 document.getElementById("update_emoji").innerHTML="&#128532";
 }
 if (results[0].label=="normal angry") {
document.getElementById("update_emoji").innerHTML="&#128548";
}
if (results[0].label=="totally fake happy") {
    document.getElementById("update_emoji").innerHTML="&#128522";
     }
     if (results[0].label=="totally fake sad") {
     document.getElementById("update_emoji").innerHTML="&#128532";
     }
     if (results[0].label=="totally fake angry") {
    document.getElementById("update_emoji").innerHTML="&#128548";
    }
        
    

if (results[1].label=="normal happy") {
 document.getElementById("update_emoji2").innerHTML="&#128522";
}
if (results[1].label=="sad") {
    document.getElementById("update_emoji2").innerHTML="&#128532";
    }
    if (results[1].label=="normal angry") {
        document.getElementById("update_emoji2").innerHTML="&#128548";
        }

        if (results[1].label=="totally fake happy") {
            document.getElementById("update_emoji2").innerHTML="&#128522";
           }
           if (results[1].label=="totally fake sad") {
               document.getElementById("update_emoji2").innerHTML="&#128532";
               }
               if (results[1].label=="totally fake angry") {
                   document.getElementById("update_emoji2").innerHTML="&#128548";
                   }
}

}