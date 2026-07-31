// Across — client config.
// Same pattern as Boys Pushup Bonanza: these two constants point at your
// deployed Worker. APP_KEY is a casual deterrent only (it's visible in this
// public source), not real auth — see worker/index.js and the README.
//
// Must be assigned onto `window` explicitly — top-level `const`/`let` in a
// plain (non-module) script does NOT become a window property the way `var`
// does, and app.js reads these off `window`.
window.WORKER_URL = "https://across-worker.jhenningbuchholz.workers.dev";
window.APP_KEY = "make-up-any-random-string";
