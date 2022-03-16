// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const KennethVisualizer = new Visualizer(
  'kennethchuson2',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    let arr_colors:string[] = ['rgb(0,255,0)', 'rgb(195,4,4)', 'rgb(42,13,191)', 'rgba(0,234,242)']

    p5.background('#4F1B77');

    p5.strokeWeight(dim * 0.03);
    //p5.stroke(255, 204, 100);
    //p5.noFill();

    for (let i = arr_colors.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * (i + 1))
      let temp = arr_colors[i] 
      arr_colors[i] = arr_colors[random]
      arr_colors[random] = temp 
      p5.stroke(arr_colors[i])
    }


    const values = analyzer.getValue();


    p5.translate(width / 2, height / 2) 
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const r = values[i] as number

      const x = r * Math.cos(i) * width / 1.150
      const y = r * Math.sin(i) * height / 1.150
      // Place vertex
      p5.point(x, y);
    }
    p5.endShape();
  },
);
