$(document).ready(function() {
  channel = new goog.appengine.Channel('token');
  socket = channel.open();
  // socket.onopen = onOpened;
  socket.onmessage = onMessage;
  // socket.onerror = onError;
  // socket.onclose = onClose;
});

onMessage = function(message) {
    alert("got a message!");
}