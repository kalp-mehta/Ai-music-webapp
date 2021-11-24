try_everything = "";
do_life_big = "";
right_x = 0;
right_y = 0;
left_x = 0;
left_y = 0;
score_leftWrist = 0;
score_rightWrist = 0;
status_t = "";
status_d = "";

function preload(){
   try_everything = loadSound('Song1.mp3');
   do_life_big = loadSound('Song2.mp3');
}

function setup(){
    canvas = createCanvas(500 , 400);
    canvas.position(500 , 310);
    webcam = createCapture(VIDEO);
    webcam.hide();
    posenet = ml5.poseNet(webcam , modelLoaded);
    posenet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        right_x = results[0].pose.rightWrist.x;
        right_y = results[0].pose.rightWrist.y;
        left_x = results[0].pose.leftWrist.x;
        left_y = results[0].pose.leftWrist.y;
        console.log("Right_Wrist -> X- " + right_x + " Y- " + right_y + "Left_Wrist -> X- " + left_x + " Y- " + left_y);


        score_leftWrist = results[0].pose.leftWrist.confidence;
        score_rightWrist = results[0].pose.rightWrist.confidence;

    }
}

function draw(){
    image(webcam , 0 , 0 , 500 , 400);

    status_d = do_life_big.isPlaying();
    status_t = try_everything.isPlaying();

    fill('#42f5b9');
    stroke('#42f5b9');

    if(score_leftWrist > 0.02){

        circle(left_x , left_y , 20);
        try_everything.stop();

        if(status_t == FALSE){

            do_life_big.play();
            document.getElementById("song_name").innerHTML = "Playing Do Life Big";

        }

    } 

    if(score_rightWrist > 0.02){

        circle(right_x , right_y , 20);
        do_life_big.stop();

        if(status_d == false){

            try_everything.play();
            document.getElementById("song_name").innerHTML = "Playing Try Everything";

        }

    } 

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
} 