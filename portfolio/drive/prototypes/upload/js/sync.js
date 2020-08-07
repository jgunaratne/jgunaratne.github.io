var n = 56;
var items = [];
var biggestI = 0;
var currentProgress = 0;
var totalProgress = 0;
var worker1Item = 0;
var worker2Item = 0;
var worker3Item = 0;
var lowestWorkerItem = 0;
var fileIcons = [ 'word', 'excel', 'ppt', 'pdf' ];
var doneStack = [];

var lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit Maecenas et quam dolor Integer rhoncus enim vel augue pulvinar et auctor augue cursus Duis suscipit justo sapien nec rutrum sem tincidunt nec Cras sodales metus et luctus semper est nisl molestie augue vitae bibendum dui mauris id arcu Donec sagittis urna a quam rhoncus vulputate Donec sit amet elit quis lectus tincidunt auctor quis a ligula Pellentesque eget quam ligula Integer ultrices adipiscing lorem at tempus Phasellus molestie turpis eu ligula molestie sit amet ultricies justo tempor Nunc pharetra imperdiet ante sed ullamcorper Nulla luctus lectus et facilisis interdum Aliquam sed mollis arcu Sed aliquet magna ac fringilla condimentum purus sem accumsan diam eu viverra lorem tellus et lectus";

$(document).ready(function() {

  populateItems();

  var waitSum = 0;
  var waitTimes = [];

  var progressInd = $('.complete');

  for ( var i = 0; i < n; i++) {
    (function(j) {
      var wait = Math.round(Math.random() * 8000);
      var currInd = $(progressInd[j]);
      if (j != 0 && j % 10 == 0) {
        wait += 5000;
      }
      if (j == 2) {
        wait += 60000;
      }
      totalProgress += wait;
      items.push({
        li : currInd,
        done : false,
        time : wait,
        working : false,
        i : j
      });

    })(i);
  }

  setTimeout(function() {
    startWorker(1);
  }, 0);
  setTimeout(function() {
    startWorker(2);
  }, 250);
  setTimeout(function() {
    startWorker(3);
  }, 500);
  addMenuEvents();

});

function startWorker(n) {
  var workerTime = 0;
  var item = getNextItem();
  if (item) {
    workOnItem(item, n);
  }
}

var lastLowestItem = 0;

function workOnItem(item, workerN) {
  if (item) {
    item.working = true;
    item.workerN = workerN;
    item.li.parents('li').show();

    if (workerN == 1) {
      worker1Item = item.i;
    } else if (workerN == 2) {
      worker2Item = item.i;
    } else if (workerN == 3) {
      worker3Item = item.i;
    }

    var lowestWorkerItemArr = [ worker1Item, worker2Item, worker3Item ]
        .sort(function(a, b) {
          return a - b
        });
    lowestWorkerItem = lowestWorkerItemArr[0];

    // console.log(lowestWorkerItemArr, item.i, lowestWorkerItem < item.i - 4);
    if (lowestWorkerItem < item.i - 4) {
      if (lastLowestItem != lowestWorkerItem) {
        $('.activity-container.pinned').show();
        var liClone = items[lowestWorkerItem].li.parents('li').clone();
        liClone.find('.syncing').addClass('sync');
        $('.activity-container.pinned .activity').append(liClone);
      }
      lastLowestItem = lowestWorkerItem;
    } else {
      $('.activity-container.pinned').hide();
    }

    lowestWorkerItem = item.i;

    item.li.animate({
      width : '100%'
    }, {
      duration : item.time,
      step : function(now, fx) {
        var data = fx.elem.id + " " + fx.prop + ": " + now;
        var size = Math.round((item.time / 8) / 100) / 10 + 'MB';
        var time = Math.round(now) + '% of ' + size;
        var str = 'Downloading ' + size;

        item.li.parents('li').find('.file-count-under, .file-count-over').text(
            time);

        if (item.time > 5000) {
          // item.li.parents('li').find('.text-complete').text(time);
          var str = 'Uploading ' + size;
          item.li.parents('li').find('.menu-status').removeClass('down')
              .addClass('up');
        }
        var textComplete = item.li.parents('li').find('.text-complete');
        textComplete.html('');
        textComplete.text(str);
      },
      complete : function() {
        var cText = item.li.parents('li').find('.text-complete');
        item.li.parents('li').find('.menu-status').removeClass('down')
            .removeClass('up');
        cText.text('Uploaded recently');
        setTimeout(function() {
          cText.text('Uploaded 1 min ago');
        }, 10000);
        setTimeout(function() {
          cText.text('Uploaded 2 min ago');
        }, 2 * 60000);
        doneStack.push(item);
        $('#totalProgress .file-count-over, #totalProgress .file-count-under')
            .text(doneStack.length + ' of ' + n + ' items');

      }
    })

    $('.activity-container').animate({
      scrollTop : (lowestWorkerItem) * 50
    }, 1000, 'easeInOutCubic');

    item.li.parents('li').find('.menu-icon.syncing').addClass('sync');

    setTimeout(function() {
      item.done = true;
      item.working = false;
      var syncIcon = item.li.parents('li').find('.menu-icon.syncing');
      syncIcon.removeClass('sync').addClass('check');
      syncIcon.parent('li').find('.progress').hide();
      setTimeout(function() {
        // syncIcon.addClass('gray');
      }, 2500);

      var nextItem = getNextItem();
      if (nextItem) {
        workOnItem(nextItem, workerN);
      }
      currentProgress += item.time;
      percentDone = Math.round((currentProgress / totalProgress) * 100);
      updateProgress(percentDone);

      if (items[items.length - 1].done == true) {
        lowestWorkerItem = items.length - 1;
        $('.activity-container').animate({
          scrollTop : (lowestWorkerItem - 4) * 50
        }, {
          duration : 1000,
          easing : 'easeInOutCubic',
          complete : function() {
            setTimeout(function() {
              $('#statusIcon').removeClass('sync').addClass('check');
              $('.menu-bottom .menu-status').text('Complete');
              $('#totalProgress').fadeOut();
              $('.share-btn').show();
              $('.activity-container.pinned').hide();
              // $('.menu').fadeOut();
            }, 2500);
          }
        });
      }
    }, item.time);
  }
}

function updateProgress(percentDone) {
  $('#totalProgress .complete').animate({
    width : percentDone + '%'
  }, 100);
}

function getNextItem() {
  for ( var i = 0; i < items.length; i++) {
    if (items[i].working == false && items[i].done == false) {
      return items[i];
    }
  }
};

function populateItems() {
  var loremArr = lorem.split(' ');
  for ( var i = 0; i < n; i++) {
    var name = loremArr[Math.floor(Math.random() * loremArr.length)] + ' '
        + loremArr[Math.floor(Math.random() * loremArr.length)];
    var html = '<li><div class="file-icon"></div><div class="title">'
        + name
        + ' '
        + '</div>\
        <div class="progress"><div class="complete-container">\
        <div class="file-count-under">x</div>\
        <div class="complete"><div class="file-count-over"></div></div></div>\
      </div>\
      <div class="menu-status down"><div class="load-arrow-container"><div class="load-arrow"></div></div><div class="text-complete">Waiting to sync</div></div>\
      <div class="menu-icon syncing"></div>\
      <div class="share-btn">Share</div>\
      </li>';
    var li = $(html);
    li.hide();
    var fileIcon = fileIcons[Math.floor(Math.random() * fileIcons.length)];
    li.find('.file-icon').addClass(fileIcon);
    $('.activity').append(li);
  }
}

function addMenuEvents() {
  $('.minimize').on('click', function() {
    $('.menu-head, .activity-container').hide();
    $('.menu-bottom').css('border-top', 'none');
    $('#statusIcon').css('margin-right', '8px');
    $('.maximize').show();
  });
  
  $('.maximize').on('click', function() {
    $('.menu-head, .activity-container').show();
    $('.menu-bottom').css('border-top', '1px solid #cccccc');
    $('#statusIcon').css('margin-right', '1px');
    $('.maximize').hide();
  });
  
}