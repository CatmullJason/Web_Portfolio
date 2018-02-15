var recordedAudioArray = new Array();
var masterpieceName = new String();
var tempSoundArrayID;
var isRecording = false;
var context = new AudioContext();

function keyDown(event) {
    //identifies which piano keys was selected
    var number = event.id;
    playAudio(number);
}

function playAudio(sound) {
    var tempSound = sound;
    var soundArray = new Array("media/deep_trouble.wav", "media/erased.wav",
            "media/mother_talk.wav", "media/police.wav",
            "media/whats_the_matter.wav", "media/why_not.wav",
            "media/t1_be_back.wav", "media/quickbass.wav", "media/quickvoice.wav",
            "media/operatenor.wav", "media/malesolidnote.wav", "media/loud.wav",
            "media/wierd.wav", "media/noidea.wav");

    var audio = new Audio();
    audio.src = soundArray[sound];
    audio.load();
    audio.play();

    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();


    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);
    var barHeight;

    function renderFrame() {
        requestAnimationFrame(renderFrame);
        analyser.getByteFrequencyData(dataArray);
        barHeight = dataArray[9];
        moveMouthDown(barHeight);
    }

    audio.play();
    if (isRecording) {
        recordedAudioArray.push(audio);
        
        //also add to a simple integer array for storage in case user closes page
        tempSoundArrayID.push(tempSound);
        localStorage.setItem('savedAudio', JSON.stringify(tempSoundArrayID));
    }
    renderFrame();
}

function convertToAudio(sound) {
    var soundArray = new Array("media/deep_trouble.wav", "media/erased.wav",
            "media/mother_talk.wav", "media/police.wav",
            "media/whats_the_matter.wav", "media/why_not.wav",
            "media/t1_be_back.wav", "media/quickbass.wav", "media/quickvoice.wav",
            "media/operatenor.wav", "media/malesolidnote.wav", "media/loud.wav",
            "media/wierd.wav", "media/noidea.wav");

    var audio = new Audio();
    audio.src = soundArray[sound];
    audio.load();

    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    
    //add to our audio array
    recordedAudioArray.push(audio);
}

function playAudioFile(i) {
    //formats and plays our recorded audio
    var duration = (recordedAudioArray[i].duration * 1000);
    recordedAudioArray[i].play();
    setTimeout(function () {
        //noteSound[x].play();
        console.log(recordedAudioArray[i]);
        if (i < recordedAudioArray.length - 1) {
            i++;
            playAudioFile(i);
        }
    }, duration);
}


function toggleRecord() {
    //toggle the recording switch an trigger alerts
    if (isRecording) {
        isRecording = false;
        document.getElementById('recordingStopped').style.display = "block";
        document.getElementById('recording').style.display = "none";
        document.getElementById('recordbtn').innerHTML = "Record";
        document.getElementById('recordbtn2').innerHTML = "Record";
        document.getElementById('green1').style.transform = "scale(1.2, 1.2)";
        document.getElementById('green2').style.transform = "scale(1.2, 1.2)";
        clearAlerts();
    } else {
        isRecording = true;
        document.getElementById('recording').style.display = "block";
        document.getElementById('recordbtn').innerHTML = "Stop";
        document.getElementById('recordbtn2').innerHTML = "Stop";
        
    }
}

function clearData() {
    //clear local storage, alerts, etc.
    document.getElementById('dataCleared').style.display = "block";
    recordedAudioArray = new Array();
    document.getElementById('green1').style.transform = "none";
    document.getElementById('green1').style.transform = "none";
    deleteLocalStorage();
    clearAlerts();
}

function clearAlerts() {
    setTimeout(function () {
        document.getElementById('dataCleared').style.display = "none";
        document.getElementById('recordingStopped').style.display = "none";
    }, 3000);
}

var mouth;

function moveMouthDown(amount) {
    //makes our talking mouth magic happen
    var pixel = (amount / 20);
    mouth = document.getElementById('arnMouth');
    mouth.style.padding = pixel + "px 0px 0px 0px";
}

function toggleIT() {
    //causes our card flip animation
    var x = document.getElementById('cardContainer');
    x.classList.toggle('hover');
}

function toggleBodyBackground() {
    //while recording background flashes red
    var bodyElement = document.getElementById("mainBody");
    if (bodyElement.classList.contains('changeBackground')) {
        bodyElement.classList.remove("changeBackground");
    } else {
        bodyElement.classList.add("changeBackground");
    }
}

function saveMasterpiece() {
    //saves the user's name and removes the popup
    masterpieceName = document.getElementById('name').value;
    localStorage.setItem('currentMasterpiece', masterpieceName);
    
    //make sure they enter something valid
    var nameValid = /^[a-z ,.'-]+$/i
    if (nameValid.test(masterpieceName))
    {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('masterpiece').style.display = 'none';
    }
}

function deleteLocalStorage() {
    //delete user's name and the current saved audio
    localStorage.removeItem('currentMasterpiece');
    localStorage.removeItem('savedAudio');
    if (tempSoundArrayID) {
        tempSoundArrayID.length = 0;
    }
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('masterpiece').style.display = 'block';
}

function pageLoad() {
    
    //bring everything out of local storage that was saved previously
    var storedMasterpiece = localStorage.getItem('currentMasterpiece');
    tempSoundArrayID = (JSON.parse(localStorage.getItem('savedAudio')));

    if (!tempSoundArrayID) {
        tempSoundArrayID = new Array();
    } else if (tempSoundArrayID) {
        for (i = 0; i < tempSoundArrayID.length; i++) {
            var item = tempSoundArrayID[i];
            
            //take stored array of identifiers and convert to real audio array
            convertToAudio(item);
        }
    }
    if (storedMasterpiece) {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('masterpiece').style.display = 'none';
        document.getElementById('name').value = storedMasterpiece;
    }
}

function giveComments() {
    
    //asynchronously gather a list of random comments to encourage user
    var data = "encouragement.json";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var obj = JSON.parse(this.responseText);
            var complimentsArray = new Array;
            for (i in obj.compliments) {
                complimentsArray.push(obj.compliments[i]);
            }
            var compliment = complimentsArray[Math.floor(Math.random() * complimentsArray.length)];
            var usersName = document.getElementById("name").value;
            var complimentWithName = compliment.replace("name", usersName);

            document.getElementById("arnoldsComment").innerHTML = complimentWithName;
            document.getElementById("arnoldsComment").style.display = "block";
            clearComment();
        }
    };
    xhttp.open("GET", data, true);
    xhttp.send();
}

function clearComment() {
    
    //clear comments after a while
    setTimeout(function () {
        document.getElementById("arnoldsComment").style.display = "none";
    }, 10000);
}
