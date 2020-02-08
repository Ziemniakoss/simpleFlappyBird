let id = 0;
class GameObject {
	constructor(x, y, height, width) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.id = id++;
	}

	/**
	 *
	 * @param delta czas od ostatniej zmiany w sekundach
	 */
	update(delta) {
	}

	render(canvas) {
	}
}
