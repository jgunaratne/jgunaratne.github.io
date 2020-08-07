var items = document.querySelectorAll(".component-list .component-list-item");
for (var i = 0; i < items.length; i++) {
  var item = items[i];
  (function(listItem) {
    item.addEventListener("click", function() {
      var videoItem = document.getElementById('mdcPhone');
      updatePhone(videoItem, listItem);
    })
  })(item);
}

var items2 = document.querySelectorAll(".prototype-list .component-list-item");
for (var i = 0; i < items2.length; i++) {
  var item = items2[i];
  (function(listItem) {
    item.addEventListener("click", function() {
      var videoItem = document.getElementById('protoPhone');
      updatePhone(videoItem, listItem);
    })
  })(item);
}

function updatePhone(video, li) {
  var a = li.getElementsByTagName("a")[0];
  video.setAttribute('src', a.getAttribute("href"));
  event.preventDefault();
  return false;
}
