(function() {
  function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  };

  if (hasGetUserMedia()) {
    var recordButton = document.querySelector('#recordToggle');

    //Cross browser functionality
    navigator.getUserMedia =  navigator.getUserMedia || navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia || navigator.msGetUserMedia;

    var errCallback = function (err) {
      console.log('Hold onto your butts', err);
    };

    navigator.getUserMedia({
      video: true,
      audio: true
    }, function (stream) {
      var video = document.querySelector('video');
      video.src = window.URL.createObjectURL(stream);

      video.onloadedmetadata = function (e) {

      };
    }, errCallback);

  } else {
    alert('This is not supported in your browser');
  }
}());