const cp = require('child_process');


// Global variables.
const STDIO = [0, 1, 2];


// Generate command for ffmpeg.
function command(os) {
var z = 'ffmpeg';
var os = os||[];
for(var o of os) {
  var o = o||{};
  for(var k in o) {
    if(o[k]==null) continue;
    if(k==='stdio') continue;
    if(k==='o' || k==='outfile') z += ` "${o[k]}"`;
    else if(typeof o[k]==='boolean') z += o[k]? ` -${k}`:'';
    else z += ` -${k} ${JSON.stringify(o[k])}`;
  }
}
return z;
}

/**
 * Invoke "ffmpeg" synchronously.
 * @param {object} os ffmpeg options.
 */
function sync(os) {
  var stdio = os.stdio===undefined? STDIO:os.stdio;
  return cp.execSync(command(os), {stdio});
}

/**
 * Invoke "ffmpeg" asynchronously.
 * @param {object} os ffmpeg options.
 */
function ffmpeg(os) {
  var stdio = os.stdio===undefined? STDIO:os.stdio;
  return new Promise((fres, frej) => cp.exec(command(os), {stdio}, (err, stdout, stderr) => {
    if(err) frej(err);
    else fres({stdout, stderr});
  }));
}
ffmpeg.sync = sync;
module.exports = ffmpeg;
