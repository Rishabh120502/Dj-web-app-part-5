function preload(){
song = loadSound("music.mp3");
}

song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scoreRightWrist = 0;


function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO)
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}


function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("score left wrist = " + scoreleftWrist + "score right wrist ="+ scoreRightWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log('Left wrist X = ' + leftWristX+ "left wrist y =" + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log('right wrist x ='+ rightWristX + "right wrist y = "+ rightWristY);
}
}

function modelLoaded(){
    console.log("POSENET IS INITIALISED")
}

function draw(){
image(video,0,0,600,500);
fill(247, 24, 20);
stroke(247, 24, 20);

if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,20);

    if(rightWristY>=0 && rightWristY<=100){
    document.getElementById("speed").innerHTML="speed=0.5x";
    song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="speed = 2.5x";
        song.rate(2.5);
    }
}


if(scoreleftWrist>0.2){
    circle(leftWristX,leftWristY,20);

numberLeftWristY = Number(leftWristY);
removeDecimal = floor(numberLeftWristY);
volume = removeDecimal/500;
song.setVolume(volume);
document.getElementById("volume").innerHTML = "volume = " + volume;
}

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop(){
    song.stop();
}

function pause(){
    song.pause();
}