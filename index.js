'use strict';

/**
 * This module will play the audio for a youtube video
 */

var youtubeStream = require('youtube-audio-stream');
var lame = require('lame');
var speaker = require('speaker');
var url = require('url');
var decoder = new lame.Decoder();

var self = module.exports = {
  isPlaying: false,
  speaker: false,
  audioStream: false,
  /**
   * Will create a new audio stream and start playing it
   * options: url: a YouTube url
   */
  play: function (options) {
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
      self.audioStream = youtubeStream(requestUrl).pipe(decoder);
  
      self.audioStream.on('format', function (format) {
        self.speaker = new speaker(format);
        self.isPlaying = true;
        this.pipe(self.speaker);
      });
  
      self.audioStream.on('error', function (error) {
        console.log('Failed to play YouTube video', error.toString());
      });
      self.audioStream.on('close', function (error) {
        console.log('Closing audio stream on request', error.toString());
      });
  
    } catch (exception) {
      throw exception;
    }
  },
  /**
   * Stop the audio stream
   */
  stop: function () {
    if (self.speaker && self.audioStream && self.isPlaying) {
      self.speaker.end();
      self.audioStream.end();
      self.isPlaying = false;
    } else {
      console.log("Can't stop what's not playing");
    }
  }
}
