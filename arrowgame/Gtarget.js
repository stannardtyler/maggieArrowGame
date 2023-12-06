// green circle target class
class GreenTarget {
    constructor(tempX, tempY, tempR, tempSpeedX) {
      this.x = tempX;
      this.y = tempY;
      this.r = tempR;
      this.speedX = tempSpeedX;
      this.speedY = random(1, 2);
      
      this.mouseOver = function() {
        return dist(this.x, this.y, mouseX, mouseY) < this.r;
      }
    }
  
  
    move() {
      this.x = this.x + random(-1, 1);
      this.x = this.x + this.speedX;
      this.y = this.y + random(-1, 1);
      this.y = this.y + this.speedY;
    }
  
    show() {
      this.col = color(0, 200, 0);
      stroke(0);
      strokeWeight(1);
      fill(this.col);
      ellipse(this.x, this.y, this.r * 2);
      stroke(255);
      fill(237, 242, 128);
      ellipse(this.x, this.y, this.r * 1);
    }
  
      bounce() {
        if (this.x >= width) {
          this.speedX = -2;
        }
        if (this.x <= 0) {
          this.speedX = +2;
        }
        this.x = this.x + this.speedX;
        
        if (this.y >= 400) {
          this.speedY = -2;
        }
        if (this.y <= 20) {
          this.speedY = +1;
        }
        this.y = this.y + this.speedY;
      }
  }