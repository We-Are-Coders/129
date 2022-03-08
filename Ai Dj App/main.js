BornforThis="";
Undertale_Sans="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function preload(){
    BornforThis = loadSound("The Score - Born For This.mp3");
    Undertale_Sans = loadSound("Sans.mp3");
}

function draw(){
    image(video,0,0,600,530);

    
    stroke("#FF0000");

    song_name = BornforThis.isPlaying();
    console.log(song_name);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Undertale_Sans.stop();
        if(song_name == false){
            BornforThis.play();
        }
        else{
            console.log("Song Name: Born for This Song");
            document.getElementById("song_id").innerHTML = "Song Name: Born For This Song";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}