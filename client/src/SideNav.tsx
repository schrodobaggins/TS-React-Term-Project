// 3rd party library imports
import classNames from 'classnames';
import { List, Map } from 'immutable';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
  TrashCan20,
  OverflowMenuHorizontal20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';
import './css/ud-menu.css';
import './css/recording_button.css';
import { getSong, updateSong, deleteSong, getSongs } from './utils/apiCreators';

/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  isShowingUD?: boolean;
  songId?: number;
  song?: Map<any, any>; 
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm?: string;
}

interface SearchProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-25 bb b--light-gray pa3">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto overflow-auto">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
}

// isActive will change the text contained in the record button
// onClick will dispatch to redux action in Reducer.tsx
interface RecordingButtonProps {
  isRecording: boolean,
  onClick: () => void
}

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f7 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}

function RecordingButton({ isRecording, onClick }: RecordingButtonProps): JSX.Element {
  return (
    <div className="recording-buttons">
      <button className="recording-button" onClick={onClick}>
        {isRecording ? "Stop" : "Record"}
      </button>
    </div>
  );
}

function UpdateAndDeleteButton({state, dispatch, songId, isShowingUD}: SideNavProps): JSX.Element {

  const [newTitle, setNewTitle] = React.useState('');

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(songId)
      await updateSong(dispatch, newTitle, songId);

    setNewTitle('');
  };

  const handleDelete = async () => {
    if(songId)
      await deleteSong(dispatch, songId);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value);

  return (
    <div className="ud-menu">
      { isShowingUD && (
        <div className="ud-menu-content">
          <form className="update-form" onSubmit={handleSubmit}>
            <fieldset className="update-form-fieldset">
              <label>
                <input
                    value={newTitle}
                    onChange={handleTitleChange}
                    type="text"
                    placeholder="Edit the song title"
                />
                <input type="submit" hidden /> 
              </label>
            </fieldset>
          </form>
          <TrashCan20 
            className="delete-icon dim"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function Search({handleSearchChange}: SearchProps): JSX.Element {
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-fieldset">
        <label>
          <input 
            type="text"
            name="search"
            onChange={handleSearchChange}
            placeholder="Search"
            autoComplete="off"
          />
          <input type="submit" hidden />
        </label>
      </fieldset>
    </form>
  );
}

function Song({state, dispatch, songId, song}: SideNavProps): JSX.Element {

  // UD is an abbreviation for update/delete 
  const [isShowingUD, setIsShowingUD] = React.useState(false);  

  return ( 
    (song !== undefined) ? 
      <div className="song-wrapper">
        <div className="inline-flex w-100">
          <div
            key={song.get('id')}
            className="f7 pointer song underline no-underline i"
            onClick={() =>
              dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
            }
          >
            <div className="song-content dim">
              <Music20 className="mr1" />
              {song.get('songTitle')}
            </div>
          </div>
          <div className="overflow-menu">
            <OverflowMenuHorizontal20 
              onClick={() => setIsShowingUD(!isShowingUD)}
              className="dim"
            />
          </div>
        </div>
        
        <UpdateAndDeleteButton state={state} dispatch={dispatch} songId={songId} isShowingUD={isShowingUD}/>
      </div> 
      : <> </>
  );
}

function Songs({ state, dispatch, searchTerm }: SideNavProps): JSX.Element {
  const songs: List<any> = state.get('songs', List());

  return (
    <Section title="Playlist">
      {songs
        .filter(song => song.get('songTitle').includes(searchTerm))
        .map(song => {
        const songId: number = song.get('id');

        return (
          <Song state={state} dispatch={dispatch} song={song} songId={songId}/>
        );
      })}
    </Section>
  );
}

function RecordingButtons({ state, dispatch }: SideNavProps): JSX.Element {
  const isRecording: boolean = state.get('isRecording');
  const openPopup: boolean = state.get('openPopup');
  const [startRecording, setStartRecording] = React.useState(false);
  const [stopRecording, setStopRecording] = React.useState(false);

  return (
    <Section title="Record a Song">
      <RecordingButton
        onClick={() => {
          // notify redux and update state for whether the user is recording or not 
          dispatch(new DispatchAction('TRIGGER_RECORDING', {
            isRecording: isRecording
          }));

          // create some sort of condition here if isRecording is set to true
          if(!state.get('isRecording')) {
            setStartRecording(true);

            // notify redux that a new song should be created
            // a song should simply hold a list of the notes clicked by the user 
            dispatch(new DispatchAction('RECORD_A_SONG', {
              song: []
            }));
          }
          else {
            // stop recording a song and add song to db
            setStartRecording(false);
            setStopRecording(true);

            setTimeout(() => {
              setStopRecording(false);
            }, 3000);

            // if a recording is stopped, then open the popup menu where the song title will be input
            dispatch(new DispatchAction('TRIGGER_RECORDING_POPUP', {
              openPopup: openPopup
            }));
          }
        }}
        isRecording={isRecording}
      />
      <div className="recording-button-message-wrapper">
        {startRecording && 
          <div className="recording-button-message">
            <div className="blinking-record-icon">  </div>
            <p> Your recording is live </p>
          </div>
        }
        {stopRecording && <p> Your recording has stopped </p>}
      </div>
    </Section>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === '') {
      // clear searched songs from state
      await getSongs(dispatch);
      setSearchTerm('');
      return;
    }

    if(searchTerm.includes(e.target.value)) {
      // if the new search value is already in search term, another API is not necessary
      setSearchTerm(e.target.value);
      return;
    }

    await getSong(dispatch, e.target.value);
    setSearchTerm('');
  };
  
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        Quadtuplets
      </div>
      <div className="flex-auto">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Search handleSearchChange={handleSearchChange}/>
        <Songs state={state} dispatch={dispatch} searchTerm={searchTerm}/>
        <RecordingButtons state={state} dispatch={dispatch}/>
      </div>
    </div>
  );
}
