let capture;
let posenet;
let singlePose, skeleton;

function setup() {
    let canvas = createCanvas(1138, 600); // Adjust the canvas size to fit better on the page
    canvas.parent('canvas-container'); // Attach the canvas to the container
    capture = createCapture(VIDEO);
    capture.size(1138, 600); // Match the size of the canvas
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    console.log(poses);

    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() {
    // Display the video feed from the webcam
    image(capture, 0, 0, width, height);
    fill(255, 0, 0);

    if (singlePose) {
        // Draw ellipses for each keypoint
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 20);
        }
        // Draw skeleton
        stroke(255, 255, 255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
    }
}
