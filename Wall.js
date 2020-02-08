class SingleWall extends GameObject {
	constructor(x, y, height) {
		super(x, y, height, 2);

	}

	update(delta) {
		this.x -= wallsSpeed * delta;
	}

	render(canvas) {
		let scale = canvas.height / worldHeight;
		let x = (this.x - 0.5 * this.width) * scale;
		let y = (worldHeight - this.y - 0.5 * this.height) * scale;
		ctx.fillStyle = "yellow";
		ctx.fillRect(x,y,this.width*scale,this.height* scale)
	}
}

class Wall {
	constructor(gapCentre, gapHeight) {
		this.passed = false;
		let height = gapCentre - (0.5 * gapHeight);
		this.bottom = new SingleWall(worldLength, height / 2, height);

		height = worldHeight - (gapCentre + 0.5 * gapHeight);
		let y = worldHeight - 0.5 * height;
		this.top = new SingleWall(worldLength, y, height);
	}

	update(delta) {
		this.top.update(delta);
		this.bottom.update(delta);
		if (this.bottom.x + 0.5 * this.bottom.width < 0) {
			walls.shift();//todo?
		}
		//sprawdzamy kolizje
		let xB1 = bird.x - (0.5 *bird.width);
		let xB2 = bird.x + (0.5 *bird.width);
		let xW1 = this.bottom.x - this.bottom.width / 2;
		let xW2 = this.bottom.x + this.bottom.width / 2;
		if ((xB2 > xW1 && xB1 < xW1) || (xB1 < xW2 && xB2 > xW2)) {
			//albo kolizja albo punkt
			let yB1 = bird.y - (bird.height / 2);
			let yB2 = bird.y + (bird.height / 2);
			let yWB = this.bottom.y + (this.bottom.height / 2);
			let yWT = this.top.y - (this.top.height / 2);
			if ((yWB > yB1) || (yWT < yB2)) {
				document.dispatchEvent(new Event("collision"))
			} else if (!this.passed) {
				this.passed = true;
				document.dispatchEvent(new Event("scored"))
			}
		}
	}

	render(canvas) {
		this.bottom.render(canvas);
		this.top.render(canvas);
	}

}