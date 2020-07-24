const cp = require('child_process');


// Run a command, return true if success.
function cpRun(txt) {
  try { cp.execSync(txt, {stdio: []}); }
  catch(e) { return false; }
  return true;
}

// Setup "ffmpeg".
function setup() {
  if(cpRun('ffmpeg -version')) {
    console.log('extra: ffmpeg already exists.');
    return;
  }
  console.log('extra: Using setup-ffmpeg');
  cp.execSync('npm install -g setup-ffmpeg', {stdio: [0, 1, 2]});
}
setup();
