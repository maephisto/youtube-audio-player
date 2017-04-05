# Youtube audio player
This module will help you play the audio of a youTube video

## Installation

``` npm install youtube-audio-player ```

You will need to have ```ffmpeg``` and the necessary encoding libraries installed, as well as in your PATH. If you're on OSX, this can be handled easily using Homebrew (```brew install ffmpeg```).
On Windows use https://ffmpeg.org/download.html


## Usage
You can find the example usage in ```test/test-audio-spec.js```

```
var yap = require('../index');

yap.play({ url: 'http://youtube.com/watch?v=XAYhNHhxN0A' });
//... audio starts playing now...

setTimeout(function () {
  yap.stop();
}, 3000);

```

## Contributing
Feel free to improve or add stuff.
Make a pull request and I'll gladly merge and republish

Email me: m at marius dot in