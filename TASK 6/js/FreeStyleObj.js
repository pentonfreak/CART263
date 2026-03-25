class FreeStyleObj {
    constructor(x, y, length, f_color, s_color,context) {
      // We write instructions to set up a Flower here
      // Position and size information
      this.x = x;
      this.y = y;
      this.fill_color = f_color;
      this.stroke_color = s_color;
      this.theta = 0;
      this.length = length;
      this.yOffset = 20;
      this.angularSpeed = .07;
      this.context =context;

      // original values
    this.baseX = x;
    this.baseY = y;
    this.baseLength = length;
    this.baseYOffset = 20;
    this.baseAngularSpeed = 0.07;

    // animation + microphone
    this.waveDrift = 0;
    this.micLevel = 0;
    }
  
    display() {
      this.theta =0; //reset everytime
      this.context.fillStyle = this.fill_color; // change the color we are using
      this.context.strokeStyle = this.stroke_color; // change the color we are using
      this.context.beginPath();
      this.context.moveTo(this.x,this.y)

      for(let i =this.x; i< this.x+this.length; i++){
      this.context.lineTo(i,(Math.sin(this.theta)*5)+this.y)
      this.context.lineTo(i,(Math.sin(this.theta)*5)+this.y+this.yOffset)
      this.theta+=this.angularSpeed;
      }
      this.context.stroke(); //set the stroke
    }

    update() {
  this.waveDrift += 0.04;
  this.y = this.baseY + Math.sin(this.waveDrift) * 20;

  this.yOffset = this.baseYOffset + this.micLevel * 0.6;
  this.length = this.baseLength + this.micLevel * 1.5;
}
  }
  