const cp = require('child_process');


// Global variables.
const STDIO = [0, 1, 2];


// Generate command for ffmpeg.
function command(os) {
  var file = 'ffmpeg', args = [];
  for(var o of os||[]) {
    for(var k in o||{}) {
      if(o[k]==null) continue;
      if(k==='stdio') continue;
      if(k==='o' || k==='outfile') args.push(o[k]);
      else if(typeof o[k]==='boolean' && o[k]) args.push('-'+k);
      else args.push('-'+k, ''+o[k]);
    }
  }
  return {file, args};
}

/**
 * Invoke "ffmpeg" synchronously.
 * @param {object} os ffmpeg options.
 */
function sync(os) {
  var stdio = os.stdio===undefined? STDIO:os.stdio;
  var {file, args} = command(os);
  return cp.execFileSync(file, args, {stdio});
}

/**
 * Invoke "ffmpeg" asynchronously.
 * @param {object} os ffmpeg options.
 */
function ffmpeg(os) {
  var stdio = os.stdio===undefined? STDIO:os.stdio;
  var {file, args} = command(os);
  return new Promise((fres, frej) => cp.execFile(file, args, {stdio}, (err, stdout, stderr) => {
    if(err) frej(err);
    else fres({stdout, stderr});
  }));
}
ffmpeg.sync = sync;
module.exports = ffmpeg;
