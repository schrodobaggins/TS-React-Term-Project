// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

const particles: Particle[] = [];

class Particle {

  public position;
  public velocity;
  public acc;
  public w; 
  public color: any[];

  constructor(p5: P5) {
    this.position = Object.getPrototypeOf(p5).constructor.Vector.random2D().mult(250);
    this.velocity = p5.createVector(0, 0);
    this.acc = this.position.copy().mult(p5.random(0.001, 0.0001));
    this.w = p5.random(3, 5);
    this.color = [p5.random(200, 255), p5.random(200, 255), p5.random(200, 255)];
  }

  update(): void {
    this.velocity.add(this.acc);
    this.position.add(this.velocity);
  }

  edges(width: number, height: number): boolean {
    if(this.position.x < -width / 2 || this.position.x > width / 2
        || this.position.y < -height / 2 || this.position.y > height / 2) {
          return true;
        }
    else {
      return false;
    }
  }

  show(p5: P5): void {
    p5.noStroke()
    p5.fill(this.color);
    p5.ellipse(this.position.x, this.position.y, this.w);
  }
}

export const mitchthebakerVisualizer = new Visualizer(
  'mitchthebaker',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight;

    p5.background(0);
    p5.stroke(255);
    p5.strokeWeight(3);
    p5.noFill();
    p5.translate(width / 2, height / 2);
    
    const wave = analyzer.getValue();

    for(let t = -1; t <= 1; t += 2) {
      p5.beginShape();

      // Use 180 since this is equal to the radius of a circle
      for(let i = 0; i <= 180; i += 0.5) {
        let index = Math.floor(p5.map(i, 0, 180, 0, wave.length - 1));
        //console.log(values[index]);

        let r = p5.map(Number(wave[index]), -1, 1, 150, 350);

        let x = r * p5.sin(i) * t;
        let y = r * p5.cos(i);
        p5.vertex(x, y);
      }

      p5.endShape();
    }

    let p: Particle = new Particle(p5);
    particles.push(p);

    for(let i = particles.length - 1; i >= 0; i--) {
      if(!particles[i].edges(width, height)) {
        particles[i].update();
        particles[i].show(p5);
      }
      else {
        particles.splice(i, 1);
      }
    }
  },
);
