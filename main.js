(function() {
  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  };

  if (hasGetUserMedia()) {
    var recordButton = document.querySelector('#recordToggle');
    var streams = {
      length: 0
    };

    //Cross browser functionality
    navigator.getUserMedia =  navigator.getUserMedia || navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || navigator.msGetUserMedia;

    recordButton.addEventListener('click', function (e) {
      if (this.dataset.state === 'notRecording') {
        this.dataset.state = 'recording';
        this.textContent = 'Stop';
      } else {
        this.dataset.state = 'notRecording';
        this.textContent = 'Record';
      }
    });

    var errCallback = function (err) {
      console.log('Hold onto your butts', err);
    };

    navigator.getUserMedia({
      video: false,
      audio: true
    }, function (stream) {
      var audioCtx = new AudioContext();
      var thisStream = audioCtx.createMediaStreamSource(stream);
      // var thisStream = window.URL.createObjectURL(stream);
      setTimeout(function() {
        streams[streams.length] = thisStream;
        streams.length++;
        console.log(streams);
        document.querySelector('audio').src = window.URL.createObjectURL(streams[0].context.destination);
      }, 10000);
      // var video = document.querySelector('video');
      // video.src = window.URL.createObjectURL(stream);

      // video.onloadedmetadata = function (e) {

      // };
    }, errCallback);

  } else {
    alert('This is not supported in your browser');
  }
}());