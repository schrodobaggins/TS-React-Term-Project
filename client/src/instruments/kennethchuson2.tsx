// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { DispatchAction } from '../Reducer';
import { AppState } from '../State';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface KulimbaKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  identity: string; 
  octave: number;
  index: number; // octave + index together give a location for the piano key
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

const Polysynth = new Tone.PolySynth().toDestination();


Polysynth.set({
  detune: -1200
})


export function PianoKey({
  note,
  // synth,
  // minor,
  // index,
  identity,
  state,
  dispatch
}: KulimbaKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */

  
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    // <div
    //   onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
    //   onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
    //   className={classNames('ba pointer absolute dim', {
    //     'bg-black black h3': minor, // minor keys are black
    //     'black bg-white h4': !minor, // major keys are white
    //   })}
    //   style={{
    //     // CSS
    //     top: 0,
    //     left: `${index * 2}rem`,
    //     zIndex: minor ? 1 : 0,
    //     width: minor ? '1.5rem' : '2rem',
    //     marginLeft: minor ? '0.25rem' : 0,
    //   }}
    // ></div>
    <div>
      <button 
        onMouseDown={() => {
          Polysynth?.triggerAttack(`${note}`);

          // only add the note into a new song if recording button has been clicked
          if(state.get('isRecording')) {
            dispatch(new DispatchAction('ADD_NOTE_TO_SONG', {
              note: note
            }));
          }
        }} 
        onMouseUp={() => Polysynth?.triggerRelease(`${note}`,'+0.19')}
        style={{
              // CSS
              // top: 0,
              // left: `${index * 2}rem`,
              // zIndex: minor ? 1 : 0,
              // width: minor ? '1.5rem' : '2rem',
              // marginLeft: minor ? '0.25rem' : 0,
        }}>{identity}</button>
    </div>
  );
}

// eslint-disable-next-line
function PianoKeyWithoutJSX({
  note,
  synth,
  minor,
  index,
}: KulimbaKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      },
    },
    [],
  );
}

/*function PianoType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}*/

function Kalimba({ state, dispatch, synth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: "G5", idx: 0 },
    { note: "F5", idx: 0.5 },
    { note: "E5", idx: 1 },
    { note: "D5", idx: 1.5 },
    { note: "B4", idx: 2 },
    { note: "C5", idx: 0 },
    { note: "D5", idx: 0.5 },
    { note: "E5", idx: 1 },
    { note: "F5", idx: 1.5 },
    // { note: 'E', idx: 2 },
    // { note: 'F', idx: 3 },
    // { note: 'Gb', idx: 3.5 },
    // { note: 'G', idx: 4 },
    // { note: 'Ab', idx: 4.5 },
    // { note: 'A', idx: 5 },
    // { note: 'Bb', idx: 5.5 },
    // { note: 'B', idx: 6 },
  ]);


  // const setOscillator = (newType: Tone.ToneOscillatorType) => {
  //   setSynth(oldSynth => {
  //     oldSynth.disconnect();

  //     return new Tone.Synth({
  //       //oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        
  //     }).toDestination();


  //   });
  // };

  /*const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;*/

  return (
    <div className="pv5">
      <div className={'pl4 pt4 flex'}>
        {/* {oscillators.map(o => (
          <PianoType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))} */}
      </div>
      <div className="Kalimba_main">
        <div style={{backgroundImage: 'url("https://cdn-icons-png.flaticon.com/512/3100/3100511.png")', backgroundRepeat: 'no-repeat', right: '50px'}}>
          <div style={{height: '500px', width: '320px'}}>
            <div className="keys" style={{margin: 'auto', width: '60%', padding: '30px', display: "flex"}}>

             
              {Range(1, 2).map(octave =>
                keys.map(key => {
                  const note = `${key.note}`;
                  return (
                    <PianoKey
                      key={note} //react key
                      note={note}
                      synth={synth}
                      octave={octave}
                      identity={key.note}
                      index={(octave - 2) * 7 + key.idx}
                      state={state}
                      dispatch={dispatch}
                    />
                  );
                })
              )} 

            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export const KalimbaInstrument = new Instrument('kennethchuson2', Kalimba);


