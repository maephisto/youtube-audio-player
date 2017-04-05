'use strict';

/**
 * This module will play the audio for a youtube video
 */

var youtubeStream = require('youtube-audio-stream');
var lame = require('lame');
var Speaker = require('speaker');
var url = require('url');
var decoder = new lame.Decoder();
var speaker, audioStream, isPlaying = false;

/**
 * Will create a new audio stream and start playing it
 * options: url: a YouTube url
 */
module.exports.play = function (options) {

  if (!options || !options.url) {
    throw new Error('A URL was not provided');
  }
  var providedUrl = {};
  try {
    providedUrl = url.parse(options.url);


  } catch (error) {
    throw new Error('Invalid URL');
  }

  if (providedUrl.hostname && providedUrl.hostname.indexOf('youtube') < 0) {
    throw new Error('This is not a YouTube URL: ' + options.url);
  }

  var requestUrl = options.url;

  try {
    audioStream = youtubeStream(requestUrl).pipe(decoder);

    audioStream.on('format', function (format) {
      speaker = new Speaker(format);
      isPlaying = true;
      this.pipe(speaker);
    });

    audioStream.on('error', function (error) {
      console.log('Failed to play YouTube video', error.toString());
    });
    audioStream.on('close', function (error) {
      console.log('Closing audio stream on request', error.toString());
    });

  } catch (exception) {
    throw exception;
  }
};

/**
 * Stop the audio stream
 */
module.exports.stop = function () {
  if (speaker && audioStream && isPlaying) {
    speaker.end();
    audioStream.end();
    isPlaying = false;
  } else {
    console.log("Can't stop what's not playing");
  }
}