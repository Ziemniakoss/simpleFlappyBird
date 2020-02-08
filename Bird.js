class Bird extends GameObject {
	constructor(x, y) {
		super(x, y, 2, 2);
		this.verticalSpeed = 15;
	}

	update(delta) {
		this.verticalSpeed -= gravity * delta;
		this.y += this.verticalSpeed * delta;
		if (this.y > worldHeight - 0.5 * this.height) {
			this.y = worldHeight - 0.5 * this.height;
			this.verticalSpeed = 0;
		}
		if (this.y <= 0.5 * this.height) {
			this.y = 0.5 * this.height;
			this.verticalSpeed = 0;
		}
	}

	render(canvas) {
		ctx.fillStyle = "white";
		let scale = canvas.width / worldLength;
		let x = scale * this.x;
		let y = (worldHeight - this.y) * scale;
		let size = scale * this.height;
		ctx.fillRect(x - 0.5 * size, y - 0.5 * size, size, size)
	}
}