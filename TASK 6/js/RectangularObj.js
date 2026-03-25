class RectangularObj {
  constructor(x, y, w, h, f_color, s_color, context) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.context = context;

    // keep base values
    this.baseX = x;
    this.baseY = y;
    this.baseWidth = w;
    this.baseHeight = h;

    // animation + mic
    this.waveAngle = 0;
    this.micLevel = 0;
  }

  display() {
    this.context.fillStyle = this.fill_color;
    this.context.fillRect(this.x, this.y, this.width, this.height);

    this.context.strokeStyle = this.stroke_color;
    this.context.lineWidth = 2;
    this.context.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    // arbitrary animation: move left/right
    this.waveAngle += 0.05;
    this.x = this.baseX + Math.sin(this.waveAngle) * 40;

    // microphone affects size
    this.width = this.baseWidth + this.micLevel * 1.2;
    this.height = this.baseHeight + this.micLevel * 1.2;

    // microphone affects color
    let red = Math.min(255, 80 + this.micLevel * 2);
    let green = Math.max(50, 120 - this.micLevel * 0.5);
    let blue = Math.max(50, 180 - this.micLevel * 0.8);

    this.fill_color = "rgb(" + red + "," + green + "," + blue + ")";
  }
}