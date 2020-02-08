let canvas;
let ctx;
let worldHeight = 30;//w metrach
let worldLength = 90;//w metrach
let lastUpdate;
let wallsSpeed = 0.005;
let bird;
let spawnFrequency = 1000; //co sekunde
let lastSpawn;
/**
 * Szybkość z jaką ściany sie przesuwają w lewo w m/s
 * @type {number}
 */
let difficulty = 1.0;
/**
 * 10m/s^2
 * @type {number}
 */
const gravity = 50.0;
let gameStates = {
	WAITING_FOR_START: 1,
	PLAYING: 2
};
let gameState = gameStates.WAITING_FOR_START;
let walls = [];

function addWall(wall) {
	walls.push(wall);
}


document.addEventListener("DOMContentLoaded", init);
document.addEventListener("collision", function () {
	console.log("Colided")
	gameState = gameStates.WAITING_FOR_START;
	walls = [];
});
document.addEventListener("scored",function () {
	console.log("Scored!");
});

function init() {
	canvas = document.getElementById("game-canvas");
	ctx = canvas.getContext("2d");
	bird = new Bird(4, worldHeight / 2);
	lastUpdate = new Date().valueOf();
	document.addEventListener("keyup", function (e) {
		if (gameState === gameStates.WAITING_FOR_START) {
			gameState = gameStates.PLAYING;
		}
		if (e.code === "Space") {
			bird.verticalSpeed = 20;
		} else {
			console.log(e.code);
		}
	});
	createNewWall();
	gameLoop();
}

function gameLoop() {
	const delta = new Date().valueOf() - lastUpdate;
	update(delta);
	render();
	lastUpdate = new Date().valueOf();
	requestAnimationFrame(gameLoop)
}

/**
 *
 * @param delta ile upłyneło czasu od ostaatniego updatu w milisekundach
 */
function update(delta) {
	if (gameState === gameStates.WAITING_FOR_START) {
		return;
	}
	let seconds = delta * 1.0 / 1000;
	walls.forEach(function (e) {
		e.update(delta);

	});
	bird.update(seconds);
	if(new Date().valueOf() - lastSpawn > spawnFrequency){
		createNewWall();
	}

}

function render() {
	if (gameState === gameStates.WAITING_FOR_START) {
		bird.render(canvas);
		ctx.fillStyle = "green";
		ctx.font = "25px Arial";
		ctx.fillText("Press space to start", 20, 70, canvas.width / 2)
	} else if (gameState === gameStates.PLAYING) {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		bird.render(canvas);
		walls.forEach(function (e) {
			e.render(canvas)
		})
	}
}


function createNewWall() {
	lastSpawn = new Date().valueOf();
	walls.push(new Wall(15, 15));//todo randomowo
	console.log("Wall spawned")
}