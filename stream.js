var Stream = require('node-rtsp-stream');
stream = new Stream({
    name: 'name',
    streamUrl: 'rtsp://:@195.155.190.119:1234/1.ch',
    wsPort: 9999
});
