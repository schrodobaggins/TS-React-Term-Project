"use strict";
exports.__esModule = true;
exports.FluteInstrument = exports.FluteKey = void 0;
// 3rd party library imports
var Tone = require("tone");
var classnames_1 = require("classnames");
var immutable_1 = require("immutable");
var react_1 = require("react");
// project imports
var Instruments_1 = require("../Instruments");
var Reducer_1 = require("../Reducer");
var Monosynth = new Tone.MonoSynth().toDestination();
function FluteKey(_a) {
    var note = _a.note, minor = _a.minor, index = _a.index, state = _a.state, dispatch = _a.dispatch;
    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `PianoKeyWithoutJSX` for the React component without JSX.
     */
    return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    react_1["default"].createElement("div", { onMouseDown: function () {
            Monosynth === null || Monosynth === void 0 ? void 0 : Monosynth.triggerAttack("" + note);
            // only add the note into a new song if recording button has been clicked
            if (state.get('isRecording')) {
                dispatch(new Reducer_1.DispatchAction('ADD_NOTE_TO_SONG', {
                    note: note
                }));
            }
        }, onMouseUp: function () { return Monosynth === null || Monosynth === void 0 ? void 0 : Monosynth.triggerRelease('+0.32'); }, className: classnames_1["default"]('ba pointer absolute dim', {
            'black bg-white h4': !minor
        }), style: {
            // CSS
            top: 6,
            left: index * 5 + "rem",
            zIndex: minor ? 4 : 2,
            width: minor ? '2rem' : '5rem',
            height: minor ? '2rem' : '5rem',
            borderRadius: 88 / 2,
            marginLeft: minor ? '0.25rem' : 25
        } }));
}
exports.FluteKey = FluteKey;
function Flute(_a) {
    var state = _a.state, dispatch = _a.dispatch, synth = _a.synth;
    var flute = immutable_1.List([
        [{ note: 'Ab', octave: 6, idx: 9 },
            { note: 'Db', octave: 6, idx: 1 },
            { note: 'F', octave: 6, idx: 2 },
            { note: 'Bb', octave: 4, idx: 3 }],
        [{ note: 'A', octave: 4, idx: 4 },
            { note: 'D', octave: 4, idx: 5 },
            { note: 'Gb', octave: 6, idx: 6 },
            { note: 'B', octave: 6, idx: 7 }],
        [{ note: 'Bb', octave: 6, idx: 8 },
            { note: 'Eb', octave: 6, idx: 9 },
        ]
    ]);
    return (react_1["default"].createElement("div", { className: "pv4" },
        react_1["default"].createElement("div", { className: "relative dib h4 w-50" },
            react_1["default"].createElement("div", { className: "flute" },
                flute.map(function (blow) { return (react_1["default"].createElement("div", { className: "blow" }, blow.map(function (blow) {
                    var note = "" + blow.note + blow.octave;
                    return (react_1["default"].createElement(FluteKey, { note: note, synth: synth, index: blow.idx, state: state, dispatch: dispatch }));
                }))); }),
                react_1["default"].createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Pan_flute.svg/868px-Pan_flute.svg.png", alt: "Pan", style: {
                        margin: "10px",
                        width: "650px",
                        borderRadius: "30px",
                        objectFit: "scale-down",
                        marginBottom: "15px",
                        alignSelf: 'center'
                    } })),
            react_1["default"].createElement("div", { className: 'pl4 pt4 flex' }))));
}
exports.FluteInstrument = new Instruments_1.Instrument('schrodobaggins', Flute);
