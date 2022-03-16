// 3rd party library imports
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Tone from 'tone';
import { Music32 } from '@carbon/icons-react';
import Popup from 'reactjs-popup';

// project imports
import { InstrumentContainer } from './Instruments';
import { AppState } from './State';
import { DispatchAction } from './Reducer';
import { SideNav } from './SideNav';
import { VisualizerContainer } from './Visualizers';
import "./css/recording_popup.css";
import { addSong } from './utils/apiCreators';

type PanelProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

/** ------------------------------------------------------------------------ **
 * Instrument and visualizer component
 ** ------------------------------------------------------------------------ */

function InstrumentPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the instrument.
   */
  const instrument = state.get('instrument');

  return (
    <div>
      {instrument && (
        <InstrumentContainer
          state={state}
          dispatch={dispatch}
          instrument={instrument}
        />
      )}
    </div>
  );
}

function VisualizerPanel({ state }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the visualizer.
   */
  const visualizer = state.get('visualizer');

  return (
    <div>
      {visualizer && (
        <VisualizerContainer key={visualizer.name} visualizer={visualizer} />
      )}
    </div>
  );
}

function InstrumentAndVisualizer({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles the instrument panel and visualizer panel together.
   */

  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column"
      style={{ left: '16rem' }}
    >
      <InstrumentPanel state={state} dispatch={dispatch} />
      <VisualizerPanel state={state} dispatch={dispatch} />
      <RecordingPopup state={state} dispatch={dispatch} />
    </div>
  );
}

function RecordingPopup({state, dispatch}: PanelProps): JSX.Element {
  /**
   * This React component will be displayed after a song has been finished recording.
   */

  const openPopup: boolean = state.get('openPopup');

  const closeModal = () => dispatch(new DispatchAction('TRIGGER_RECORDING_POPUP', {
    openPopup: openPopup
  }));

  return (
    <Popup open={openPopup} closeOnDocumentClick>
      <div className="modal">
        <button className="close close-modal" onClick={closeModal}>
          &times;
        </button>
        <RecordingForm state={state} dispatch={dispatch}/>
      </div>
    </Popup>
  );
}

function RecordingForm({state, dispatch}: PanelProps): JSX.Element {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // submit value entered into form input to state to finalize creation of song 
    await addSong(dispatch, input, state.get('song'));

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setInput('');
      }, 3000);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  return (
    <form className="recording-form" onSubmit={handleSubmit}>
      <fieldset className="form-fieldset">
        <label className="form-fieldset-label">
          <h3> You're almost done! </h3>
          <p> As a last step, enter a title for your song recording. </p>
          <input value={input} onChange={handleInputChange} placeholder="Enter a song title"/>
        </label>
      </fieldset>
      <button className="form-button" type="submit"> Submit </button>
      <div className="form-submission-message">
        {submitting && <p> Submitting form... </p>}
        {submitted && <p> Your song has been submitted! </p>}
      </div>
    </form>
  );
}

function ShowWelcome(): JSX.Element {
  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column items-center justify-center"
      style={{ left: '16rem' }}
    >
      <div className="mw6 lh-copy mb4">
        <Music32 />
        <div className="f3 fw7 mb2">Welcome to the case study.</div>
        <div className="f4 mb3">
          Select an instrument and a visualizer on the left to serve some fresh
          beats.
        </div>
        <div className="f5">The UI is yours to design. Express yourself.</div>
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------------ **
 * Main page component
 ** ------------------------------------------------------------------------ */

export function MainPage({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles together the entire main page.
   */

  const location = useLocation();
  const isWelcome = !state.get('instrument');
  console.log('INSTRUMENT', isWelcome);

  useEffect(() => {
    dispatch(new DispatchAction('SET_LOCATION', { location }));
  }, [dispatch, location]);

  return (
    <div
      className="fixed top-0 left-0 h-100 w-100 bg-white"
      onClick={() => Tone.start()}
    >
      <SideNav state={state} dispatch={dispatch} />
      {isWelcome ? (
        <ShowWelcome />
      ) : (
        <InstrumentAndVisualizer state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
