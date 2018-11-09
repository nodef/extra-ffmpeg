Decode, encode, transcode, mux, demux, stream, filter, and play media through machine (via ["ffmpeg"]).
> Uses [setup-ffmpeg] to install, if absent.

```javascript
const ffmpeg = require('extra-ffmpeg');
// ffmpeg.sync(<options>): stdout when done
// ffmpeg(<options>)
// -> Promise {stdout, stderr} when done

// <options>: [{ // see ffmpeg -h
//   outfile|o: // name of output file
// }]


ffmpeg.sync([{y: true}, {i: 'concat:0.mp3|1.mp3'}, {acodec: 'copy', o: 'aud.mp3'}]);
// concat 0.mp3, 1.mp3 to aud.mp3

ffmpeg.sync([
  {y: true, err_detect: 'explode'}, {loop: 1, framerate: 1}, {i: 'img.jpg'}, {i: 'aud.mp3'},
  {vcodec: 'libx264', crf: 0, preset: 'veryfast', tune: 'stillimage',
    vf: 'scale=trunc(iw/2)*2:trunc(ih/2)*2', acodec: 'copy', shortest: true, o: 'vid.mp4'}
]);
// get video vid.mp4 from still image img.jpg and audio aud.mp4
```


[![Merferry](https://i.imgur.com/HS08T0y.jpg)](https://merferry.github.io)

["ffmpeg"]: https://ffmpeg.org
[setup-ffmpeg]: https://www.npmjs.com/package/setup-ffmpeg
