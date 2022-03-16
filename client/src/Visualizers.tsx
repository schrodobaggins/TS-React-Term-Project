// 3rd party library imports
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5 from 'p5';
import { useEffect, useMemo, useCallback } from 'react';
//import mandelbrot_set from './img/mandelbrot_set.png';

type VisualizerDrawer = (p5: P5, analyzer: Tone.Analyser) => void;

interface VisualizerContainerProps {
  visualizer: Visualizer;
}

export class Visualizer {
  public readonly name: string;
  public readonly draw: VisualizerDrawer;

  constructor(name: string, draw: VisualizerDrawer) {
    this.name = name;
    this.draw = draw;
  }
}

export function VisualizerContainer({ visualizer }: VisualizerContainerProps) {

  const { name, draw } = visualizer;

  let setCircumference = (name === "Circumference") ? true : false;

  const analyzer: Tone.Analyser = useMemo(
    () => new Tone.Analyser('waveform', 256),
    [],
  );

  const onResize = useCallback((p5: P5) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.resizeCanvas(width, height, false);
  }, []);

  useEffect(() => {
    Tone.getDestination().volume.value = -5;
    Tone.getDestination().connect(analyzer);
    return () => {
      Tone.getDestination().disconnect(analyzer);
    };
  }, [analyzer]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    const width = (setCircumference) ? window.innerWidth / 2 : window.innerWidth;
    const height = (setCircumference) ? window.innerHeight : window.innerHeight / 2; 
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
  };

  return (
    <div className={setCircumference ? 'bg-grey absolute right-0 h-100 w-50' : 'bg-black absolute bottom-0 right-0 left-0 h-50'}>
      <div className={'z-1 absolute left-0 top-0 pa4 white f5'}>{name}</div>
      <Sketch
        setup={setup}
        draw={p5 => draw(p5, analyzer)}
        windowResized={onResize}
        className={setCircumference ? 'circumference-visualizer' : ''}
      />
    </div>
  );
}
