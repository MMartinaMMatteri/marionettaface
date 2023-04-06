import { initCamera } from "./camera.js"



// Configurazione dell’elemento video
const videoConfig = {
	 width: 640*3, height: 480*2, fps: 60
}

// Configurazione Media Pipe
// https://google.github.io/mediapipe/solutions/hands
const mediaPipeConfig = {
	runtime: "mediapipe",
	modelType: "full",
	maxHands: 1,
	solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands`,
}

const video = document.querySelector("video")

const canvas = document.querySelector("canvas")
canvas.width = videoConfig.width
canvas.height = videoConfig.height
const ctx = canvas.getContext("2d")

let sopracciglioSx;
let sopracciglioDx;


console.log("Inizializzo camera.")
initCamera(
	document.querySelector("video"),
	videoConfig.width,
	videoConfig.height,
	videoConfig.fps
).then(video => {
	video.play()
	video.addEventListener("loadeddata", event => {
		console.log("Camera inizializzata.")
		boot()
	})
})

async function createDetector() {
	return window.handPoseDetection.createDetector( window.handPoseDetection.SupportedModels.MediaPipeHands, mediaPipeConfig )
}

const landmarkColors = {
	thumb:  'black',
	index:  'black',
	middle: 'black',
	ring:   'black',
	pinky:  'black',
	wrist:  'black'
}






async function boot() {

	// Carica modello handpose
	console.log("Carico modello mediaPose...")
	const detector = await createDetector()
	console.log("Modello caricato.")

	requestAnimationFrame(loop)

	async function loop() {

		requestAnimationFrame(loop)

		// Stima mani (ogni due frames)

		const hands = await detector.estimateHands(video, {
			flipHorizontal: true
		})

		ctx.fillStyle = '#2a52be' //colore sfondo
        ctx.fillRect(0, 0, canvas.width, canvas.height)


		

		// Mappa dei landmarks della mano:
		// https://developers.google.com/mediapipe/solutions/vision/hand_landmarker
		for (const hand of hands) {
			const handedness = hand.handedness // Left : Right
             



			 // Trova la posizione centrale dei keypoint
			const keypoints = hand.keypoints.map(kp => [kp.x, kp.y]);
			const xs = keypoints.map(kp => kp[0]);
			const ys = keypoints.map(kp => kp[1]);
			const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
			const centerY = (Math.min(...ys) + Math.max(...ys)) / 2;





			// Disegna il cerchio attorno ai keypoint
			const radius = Math.max(...keypoints.map(kp => Math.sqrt((kp[0]-centerX)**2 + (kp[1]-centerY)**2)));
			
			ctx.fillStyle = '#fff';
			ctx.strokeStyle = '#ccc'
			ctx.lineWidth = 5;

			ctx.beginPath();
			ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
			//ctx.stroke();
			ctx.fill();
			ctx.closePath(); 

			





	

				// Disegna la semicirconferenza come sorriso
			//const startAngle = Math.PI;
			//const endAngle = Math.PI * 2;
			//const smileCenterX = centerX;
			//const smileCenterY = centerY + radius / 2; // sposta il centro verso il basso di metà raggio
			//const smileRadius = radius / 4; // dimezza il raggio (e quindi il diametro)
			//ctx.strokeStyle = 'black';
			//ctx.lineWidth = 5;
			//ctx.beginPath();
			//ctx.arc(smileCenterX, smileCenterY, smileRadius, endAngle, startAngle);
			//ctx.stroke();







			// Disegna una linea retta come sorriso
const smileCenterX = centerX;
const smileCenterY = centerY + radius / 2; // sposta il centro verso il basso di metà raggio
const smileLength = radius / 2; // lunghezza della linea pari al raggio del cerchio originale
const smileStartX = smileCenterX - smileLength / 2;
const smileEndX = smileCenterX + smileLength / 2;
const smileY = smileCenterY;
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(smileStartX, smileY);
ctx.lineTo(smileEndX, smileY);
ctx.stroke();






		



     for (const [idx, keypoint] of hand.keypoints.entries()) {
				if (idx === 8 || idx === 12 || idx === 16 || idx === 20) {
				  const name = keypoint.name.split('_')[0].toString().toLowerCase() 
				  const color = landmarkColors[name]



                   


				  if (idx === 16) {
				     const nextKeypoint = hand.keypoints[idx + 4]; // KeyPoint 20 è 4 posizioni più avanti
					 ctx.beginPath();
					 ctx.moveTo(keypoint.x, keypoint.y);
					 ctx.lineTo(nextKeypoint.x, nextKeypoint.y);
					 ctx.strokeStyle = 'black';
					 ctx.lineWidth = 25;
					 ctx.stroke();




					  // Cerchio nel punto medio tra i keypoint 20 e 16, spostato verso il basso di 50 pixel
					  const middleX = (keypoint.x + nextKeypoint.x) / 2;
					  const middleY = (keypoint.y + nextKeypoint.y) / 2 + 30;
					  ctx.beginPath();
					  ctx.arc(middleX, middleY, 6, 0, 2 * Math.PI);
					  ctx.fillStyle = 'black';
					  ctx.fill()

				    }


                     point(ctx, keypoint.x, keypoint.y, 12, color)
				     ctx.textAlign = 'center'
				     ctx.fillStyle = 'black'
				     ctx.fillText(idx,  keypoint.x, keypoint.y + 3)

					 if (idx === 8) {
						  const nextKeypoint = hand.keypoints[12];
						  ctx.beginPath();
						  ctx.moveTo(keypoint.x, keypoint.y);
						  ctx.lineTo(nextKeypoint.x, nextKeypoint.y);
						  ctx.strokeStyle = 'black';
						  ctx.lineWidth = 25;
						  ctx.stroke(); 


						  // Calcola il punto medio tra i keypoint 8 e 12
                          const midpointX = (keypoint.x + nextKeypoint.x) / 2;
                          const midpointY = (keypoint.y + nextKeypoint.y) / 2 + 30; // Sposta il cerchio di 50 pixel verso il basso
                          point(ctx, midpointX, midpointY, 6, 'black');


						}
			}    }   
		} 
	} 
}

function point(ctx, x, y, r, color) {
	ctx.beginPath()
	ctx.arc(x, y, r, 0, 2 * Math.PI)
	ctx.fillStyle = color
	ctx.fill()
}
