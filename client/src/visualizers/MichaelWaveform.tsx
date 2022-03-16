// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

var mapMax = 1.0;
//var amplitude;

export const MichaelWaveformVisualizer = new Visualizer(
  'Schrodobaggins',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    //amplitude = new p5.Amplitude();
    p5.background(0);
    p5.fill(255);
    p5.noStroke();
    //p5.Amplitude();

    
    const values = analyzer.getValue();
    p5.text('Amplitude: ' + values, 30, 65);
    p5.text('mapMax: ' + mapMax, 30, 80);
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        //var level = amplitude.getLevel();

        // map ellipse height
        var ellipseHeight = p5.map(amplitude * 1.25, 0.50, values.length / 50, height, width);
        p5.ellipse(width / 2, ellipseHeight, 50, 50);
    }
    p5.endShape();
},
);


