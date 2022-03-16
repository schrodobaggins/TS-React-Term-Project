"use strict";
exports.__esModule = true;
exports.defaultState = void 0;
// 3rd party
var immutable_1 = require("immutable");
// project dependencies
var Piano_1 = require("./instruments/Piano");
var mitchthebaker_1 = require("./instruments/mitchthebaker");
var kennethchuson2_1 = require("./instruments/kennethchuson2");
var schrodobaggins_1 = require("./instruments/schrodobaggins");
var Waveform_1 = require("./visualizers/Waveform");
var mitchthebaker_2 = require("./visualizers/mitchthebaker");
var kennethchuson2_2 = require("./visualizers/kennethchuson2");
var MichaelWaveform_1 = require("./visualizers/MichaelWaveform");
var instruments = immutable_1.List([Piano_1.PianoInstrument, mitchthebaker_1.mitchthebakerInstrument, kennethchuson2_1.KalimbaInstrument, schrodobaggins_1.FluteInstrument]);
var visualizers = immutable_1.List([Waveform_1.WaveformVisualizer, mitchthebaker_2.mitchthebakerVisualizer, kennethchuson2_2.KennethVisualizer, MichaelWaveform_1.MichaelWaveformVisualizer]);
exports.defaultState = immutable_1.Map({
    instruments: instruments,
    visualizers: visualizers,
    isRecording: false,
    openPopup: false,
    songTitle: ''
});
