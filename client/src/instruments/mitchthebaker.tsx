
   // 3rd party library imports
import * as Tone from 'tone';
import { List } from 'immutable';
import React from 'react';
import "../css/ukulele.css";

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { DispatchAction } from '../Reducer';
import { AppState } from '../State';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface UkuleleFretProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  index: number; // octave + index together give a location for the piano key
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

export function UkuleleFret({
  note,
  synth,
  index,
  state, 
  dispatch
}: UkuleleFretProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div 
      className="ukulele-fret"
      onMouseDown={() => {
        console.log(note);
        synth?.triggerAttack(`${note}`);

        // only add the note into a new song if recording button has been clicked
        if(state.get('isRecording')) {
          dispatch(new DispatchAction('ADD_NOTE_TO_SONG', {
            note: note
          }));
        }
      }}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
    >
    </div>
  );
}

function Ukulele({ state, dispatch, synth, setSynth }: InstrumentProps): JSX.Element {

  const standard_tuning_1frets = List([
    // strings 
    [{ note: 'G', octave: 4, idx: 49}, { note: 'C', octave: 4, idx: 50}, { note: 'E', octave: 4, idx: 51}, { note: 'A', octave: 4, idx: 52}],
    // 1 - 4th frets
    [{ note: 'Ab', octave: 5, idx: 0 }, { note: 'Db', octave: 5, idx: 1 }, { note: 'F', octave: 5, idx: 2 }, { note: 'Bb', octave: 5, idx: 3 }],
    [{ note: 'A', octave: 5, idx: 4 }, { note: 'D', octave: 5, idx: 5 }, { note: 'Gb', octave: 5, idx: 6 }, { note: 'B', octave: 5, idx: 7 }],
    [{ note: 'Bb', octave: 5, idx: 8 }, { note: 'Eb', octave: 5, idx: 9 }, { note: 'G', octave: 5, idx: 10 }, { note: 'C', octave: 6, idx: 11 }],
    [{ note: 'B', octave: 5, idx: 12}, { note: 'E', octave: 5, idx: 13}, { note: 'Ab', octave: 5, idx: 14}, { note: 'Db', octave: 6, idx: 15}],
    // 5th fret
    [{ note: 'C', octave: 6, idx: 16}, { note: 'F', octave: 5, idx: 17}, { note: 'A', octave: 5, idx: 18}, { note: 'D', octave: 6, idx: 19}],
    [{ note: 'Db', octave: 6, idx: 20}, { note: 'Gb', octave: 5, idx: 21}, { note: 'Bb', octave: 5, idx: 22}, { note: 'Eb', octave: 6, idx: 23}],
    // 7th fret
    [{ note: 'D', octave: 6, idx: 24}, { note: 'G', octave: 5, idx: 25}, { note: 'B', octave: 5, idx: 26}, { note: 'E', octave: 6, idx: 27}],
    [{ note: 'Eb', octave: 6, idx: 28}, { note: 'Ab', octave: 5, idx: 29}, { note: 'C', octave: 6, idx: 30}, { note: 'F', octave: 6, idx: 31}],
    [{ note: 'E', octave: 6, idx: 32}, { note: 'A', octave: 5, idx: 33}, { note: 'Db', octave: 6, idx: 34}, { note: 'Gb', octave: 6, idx: 35}],
    // 10th fret
    [{ note: 'F', octave: 6, idx: 36}, { note: 'Bb', octave: 5, idx: 37}, { note: 'D', octave: 6, idx: 38}, { note: 'G', octave: 6, idx: 39}],
    [{ note: 'Gb', octave: 6, idx: 40}, { note: 'B', octave: 5, idx: 42}, { note: 'Eb', octave: 6, idx: 43}, { note: 'Ab', octave: 6, idx: 44}],
    [{ note: 'G', octave: 6, idx: 45}, { note: 'C', octave: 6, idx: 46}, { note: 'E', octave: 6, idx: 47}, { note: 'A', octave: 6, idx: 48}]
  ]);

  /*const standard_tuning_2frets = List([
    [{ note: 'Eb', octave: 3, idx: 0 }, { note: 'Ab', octave: 3, idx: 1 }, { note: 'C', octave: 3, idx: 2 }, { note: 'F', octave: 3, idx: 3 }],
    [{ note: 'E', octave: 5, idx: 4 }, { note: 'A', octave: 5, idx: 5 }, { note: 'Db', octave: 5, idx: 6 }, { note: 'Gb', octave: 5, idx: 7 }],
    [{ note: 'F', octave: 5, idx: 8 }, { note: 'Bb', octave: 5, idx: 9 }, { note: 'D', octave: 5, idx: 10 }, { note: 'G', octave: 5, idx: 11 }],
    [{ note: 'Gb', octave: 5, idx: 12}, { note: 'B', octave: 5, idx: 13}, { note: 'Eb', octave: 5, idx: 14}, { note: 'Ab', octave: 5, idx: 15}],
    [{ note: 'G', octave: 5, idx: 16}, { note: 'C', octave: 5, idx: 17}, { note: 'E', octave: 5, idx: 18}, { note: 'A', octave: 5, idx: 19}],
    [{ note: 'Ab', octave: 5, idx: 20}, { note: 'Db', octave: 5, idx: 21}, { note: 'F', octave: 5, idx: 22}, { note: 'Bb', octave: 5, idx: 23}],
    [{ note: 'A', octave: 5, idx: 24}, { note: 'D', octave: 5, idx: 25}, { note: 'Gb', octave: 5, idx: 26}, { note: 'B', octave: 5, idx: 27}],
    [{ note: 'Bb', octave: 5, idx: 28}, { note: 'Eb', octave: 5, idx: 29}, { note: 'G', octave: 5, idx: 30}, { note: 'C', octave: 5, idx: 31}],
    [{ note: 'B', octave: 5, idx: 32}, { note: 'E', octave: 5, idx: 33}, { note: 'Ab', octave: 5, idx: 34}, { note: 'Db', octave: 5, idx: 35}],
    [{ note: 'C', octave: 5, idx: 36}, { note: 'F', octave: 5, idx: 37}, { note: 'A', octave: 5, idx: 38}, { note: 'D', octave: 5, idx: 39}],
    [{ note: 'Db', octave: 5, idx: 40}, { note: 'Gb', octave: 5, idx: 42}, { note: 'Bb', octave: 5, idx: 43}, { note: 'Eb', octave: 5, idx: 44}],
    [{ note: 'D', octave: 5, idx: 45}, { note: 'G', octave: 5, idx: 46}, { note: 'B', octave: 5, idx: 47}, { note: 'E', octave: 5, idx: 48}]
  ]);*/

  /*const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };*/

  return (
    <div className="pv4">
      <div className="relative dib h4 w-50">
        <div className="ukulele">
          {standard_tuning_1frets.map((fret, idx) => {
            const marker = (idx === 5 || idx === 7 || idx === 10) ? true : false;
            
            return (
              <div className={idx === 0 ? "fret-strings" : "fret"}>
                {marker && <span className="fret-marker"></span>}
                
                {fret.map(aFret => {
                    const note = `${aFret.note}${aFret.octave}`;

                    return (
                      <UkuleleFret 
                        note={note}
                        synth={synth}
                        index={idx}
                        state={state}
                        dispatch={dispatch}
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const mitchthebakerInstrument = new Instrument('mitchthebaker', Ukulele);