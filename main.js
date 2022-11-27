song1_hp = "";
song2_pp = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
status = "";

function preload() {
    song1_hp = loadSound("music.mp3")
    song2_pp = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log('Posenet is Initialized')
}

function draw() {
    image(video, 0, 0, 600, 500)
    fill("#FF0000")
    stroke("FF0000")

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2_pp.stop()

        if(song1_hp.isPlaying()=false) {
          song1_hp.play()
          document.getElementById("song").innerHTML = "Song Name : Peter Pan Song"
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9]

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
    }