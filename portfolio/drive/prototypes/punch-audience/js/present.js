var App = function() {

};

App.prototype = {
    init : function() {
      var obj = this;
      obj.sizePanels();
      obj.maxSlide = 0;
      obj.slideN = 0;
      obj.slideChange = [];
      obj.slideComments = [];
      obj.numFollowing = 248;

      var moveThumb = false;

      $('.comment-icon').live('click', function(e) {
        var sLoc = e.clientX - 15;
        var thumbPercent = sLoc / $('.timeline').width();
        var vid = document.getElementById('camVideo');
        //var endT = vid.seekable.end(0);
        var endT = vid.duration;
        vid.currentTime = endT * thumbPercent;
        vid.play();

      });

      $('.timeline .thumb').on('mousedown', function(e) {
        moveThumb = true;
        var vid = document.getElementById('camVideo');
        vid.pause();
      });

      $('.timeline').on('click', function(e) {
        var nLoc = e.clientX;
        var t = $('.timeline');
        var l = t.offset().left;
        $('.timeline .thumb').css('left', nLoc - l - 5);
      });

      $('.timeline').on('click', function(e) {
        var thumb = $('.timeline .thumb');
        var thumbPercent = (thumb.offset().left) / $('.timeline').width();
        var vid = document.getElementById('camVideo');
        //var endT = vid.seekable.end(0);
        var endT = vid.duration;
        vid.currentTime = endT * thumbPercent;
        vid.play();
      });

      $('.timeline').on('mousemove', function(e) {
        var thumb = $('.timeline .thumb');
        var x = e.clientX;
        $('#slidePreview').css('left', x - 60);
        
        var tlWidth = $('.timeline').width();
        var videoEndTime = 9 * 60 + 45;
        
        var tlLoc = x - 5;
        var scaledLoc = tlLoc * (videoEndTime/tlWidth);
        
        var slideN = obj.getSlideAtTime(Math.round(scaledLoc));
        $('#slidePreview').css('background', 'url(img/slides/' + slideN + '.png)');

      });

      $('.timeline').on('mouseover', function() {
        $('#slidePreview').show();
      });

      $('.timeline').on('mouseout', function() {
        $('#slidePreview').hide();
      });

      $(document).on('mouseup', function(e) {
        if (moveThumb) {
          moveThumb = false;
        }
      });

      $(document).on('mousemove', function(e) {
        if (moveThumb) {
          var t = $('.timeline');
          var l = t.offset().left;
          var nLoc = e.clientX;
          if (nLoc > l && nLoc < t.width() + 6) {
            $('.timeline .thumb').css('left', nLoc - l - 6);
          }
        }
      });

      $('.presentation').css('background', 'url(img/slides/' + obj.slideN + '.png)');

      $('#commentInput').bind('focus', function(e) {
        $('#commentInput').val('');
      });

      $('#commentInput').bind('focusout', function(e) {
        setTimeout(function() {
          $('#commentInput').val('Ask a question or comment.');
        }, 500);
      });

      $('#commentInput').bind('keydown', function(e) {
        if (e.keyCode == 13 && $('#commentInput').val() != '') {
          obj.addComment($('#commentInput').val(), 'Me');
          $('#commentInput').val('');
          return false;
        }
      });

      $('#askBtn').on('click', function(e) {
        if ($('#commentInput').val() != 'Ask a question or comment.') {
          obj.addComment($('#commentInput').val(), 'Me');
          $('#commentInput').val('');
        }
      });

      $('#camVideo').bind('seeked', function() {
        obj.slideChange = [];
        obj.watchTime();
      });

      obj.playWatchInterval;
      $('#camVideo').bind('play', function() {
        obj.slideChange = [];
        if (obj.playWatchInterval)
          clearInterval(obj.playWatchInterval);
        obj.playWatchInterval = setInterval(function() {
          obj.watchTime();
        }, 500);
      });

      $('#camVideo').bind('pause', function() {
        if (obj.playWatchInterval)
          clearInterval(obj.playWatchInterval);
      });

      $('.check, .cross').live('click', function(e) {
        var voteLi = $(e.target).parents('.votes');
        if (voteLi.data('checked') != true) {
          voteLi.data('checked', true);
          var pBar = $(e.target).prev();
          var percent = pBar[0].style.width;
          percent = percent.replace('%', '') * 1;
          percent += 10;
          if (percent > 100) {
            percent = 100;
          }
          pBar.css('width', percent + '%');
        }
      });

      $('.question-dialog .close').on('click', function(e) {
        $('.question-dialog').hide();
      });

      $('.plus-one').bind('click', function(e) {
        $('.plus-one').html('+560');
      });

      $('.question-dialog button').on('click', function(e) {
        $('.question-dialog').addClass('answers');
      });

      $('.mug, .mugs').live('mouseover', function(e) {

        clearTimeout(obj.showGCard);
        obj.showGCard = setTimeout(function() {
          $('.g-card').show();
          var offset = $(e.srcElement).offset();
          var newTop = offset.top + e.srcElement.offsetHeight + 10;

          $('.g-card').css('left', offset.left - 90);

          var gCardHeight = $('.g-card')[0].offsetHeight;
          if ($(window).height() < newTop + gCardHeight) {
            newTop = offset.top - gCardHeight - 15;
            $('.g-card').removeClass('up');
            $('.g-card').addClass('down');
          } else {
            $('.g-card').addClass('up');
            $('.g-card').removeClass('down');
          }
          $('.g-card').css('top', newTop);

          var gCardLeft = $('.g-card')[0].offsetLeft;
          if (gCardLeft < 0) {
            $('.g-card').css('left', 0);
          }

          $('.g-card h4 a').html($($(e.srcElement).find('p')[0]).html());
          $('.g-card .title').html($($(e.srcElement).find('p')[1]).html());

          var leftPos = $(e.srcElement).css('background-position').split(' ')[0].replace('px', '').replace('%', '');
          leftPos *= 2;

          var bg = $(e.srcElement).css('background-image');

          var img = new Image();
          img.src = bg.replace('url(', '').replace(')', '');

          var w = img.width * 2;
          var h = img.height * 2;

          $('.g-card .mug').css('background-image', bg);
          $('.g-card .mug').css('background-size', w + 'px ' + h + 'px');
          $('.g-card .mug').css('background-position', leftPos + 'px ' + 0 + 'px');

        }, 250);
      });

      $('.mug, .mugs').live('mouseout', function(e) {
        clearTimeout(obj.showGCard);
        obj.showGCard = setTimeout(function() {
          $('.g-card').hide();
        }, 250);
      });

      $('.g-card').bind('mouseover', function() {
        clearTimeout(obj.showGCard);
        $('.g-card').show();
      });

      $('.g-card').bind('mouseout', function() {
        clearTimeout(obj.showGCard);
        obj.showGCard = setTimeout(function() {
          $('.g-card').hide();
        }, 250);
      });

      $('#prevSlide').bind('click', function() {
        if (obj.slideN > 0) {
          obj.prevSlide();
        }
        if (obj.slideN == 0) {
          $('#prevSlide').css('opacity', .33);
        }
        if (obj.slideN > 1) {
          $('#prevSlide').css('opacity', 1);
        }
        $('#nextSlide').css('opacity', 1);
      });

      $('#nextSlide').bind('click', function() {
        var totalSlides = 23;
        if (obj.slideN < totalSlides) {
          obj.nextSlide();
        }
        if (obj.slideN == totalSlides) {
          $('#nextSlide').css('opacity', .33);
        }
        if (obj.slideN < totalSlides) {
          $('#nextSlide').css('opacity', 1);
        }
        $('#prevSlide').css('opacity', 1);
      });

      // var t1 = Math.random() * 8000;
      // setTimeout(function() {
      // obj.changeMugs(obj, t1);
      // }, t1);

      var t2 = Math.random() * 5000;
      setTimeout(function() {
        obj.changePosVotes(obj, t2);
      }, Math.random() * t2);

      var t3 = Math.random() * 8000;
      setTimeout(function() {
        obj.changeNegVotes(obj, t3);
      }, Math.random() * t3);

      obj.addCommentIcons();
    },
    addCommentIcons : function() {

      var commentTimes = [
          90, 134, 198,
          // 252,
          // 270,
          300, 334, 388, 413, 459, 481, 494, 554, 607, 718, 821, 863
      ];

      var tWidth = 882;
      var timeW = $('.timeline').width();

      for ( var i = 0; i < commentTimes.length; i++) {
        var c = $('<div class="comment-icon"></div>');
        c.css('left', timeW * (commentTimes[i] / tWidth));
        // if (i % 2 == 0) {
        // c.css('top', 65);
        // }
        $('.timeline-panel .content').append(c);
      }
    },
    changeMugs : function(obj, time) {
      var mugs = $('.following-panel .mugs, .following-panel .mug');
      var m = $(mugs[Math.round(Math.random() * 10)]);
      m.animate({
        opacity : 0,
      }, 500, function() {
        m.css('opacity', 1);
        var rand = Math.random() * 10;
        if (rand > 3) {
          obj.numFollowing--;
        } else {
          obj.numFollowing++;
        }
        $('.following-panel .content').append(m);
        $('#numFollowingCount').html(obj.numFollowing);
      });
      var t1 = Math.random() * 8000;
      setTimeout(function() {
        obj.changeMugs(obj, t1);
      }, t1);
    },
    changePosVotes : function(obj, time) {
      var comments = $('.comments-panel .comment');
      var comment = $(comments[Math.round(Math.random() * comments.length)]);
      var bars = comment.find('.bar .percentage');
      if (bars.length > 0) {
        var bar = $(bars[0]);
        var percent = bar[0].style.width.replace('%', '') * 1;
        percent += 15 * Math.random();
        if (percent > 100) {
          percent = 100;
        }
        bar[0].style.width = percent + '%';
      }
      var t1 = Math.random() * 5000;
      setTimeout(function() {
        obj.changePosVotes(obj, t1);
      }, Math.random() * t1);
    },
    changeNegVotes : function(obj, time) {
      var comments = $('.comments-panel .comment');
      var comment = $(comments[Math.round(Math.random() * comments.length)]);
      var bars = comment.find('.bar .percentage');
      if (bars.length > 0) {
        var bar = $(bars[1]);
        var percent = bar[0].style.width.replace('%', '') * 1;
        percent += 10 * Math.random();
        if (percent > 100) {
          percent = 100;
        }
        bar[0].style.width = percent + '%';
      }
      var t1 = Math.random() * 8000;
      setTimeout(function() {
        obj.changeNegVotes(obj, t1);
      }, Math.random() * t1);
    },
    addComment : function(comment, name, photo, posPercent, negPercent) {
      if (posPercent == null) {
        posPercent = 0;
        negPercent = 0;
      }
      var li = $('<li class="comment clear"> \
        <div class="mug" style="' + photo + '"></div> \
        <div class="text"><h4 class="name">' + name + '</h4>' + comment + '</div> \
        <div class="votes"> \
        <div class="bar"> \
          <div class="percentage" style="width: ' + posPercent + '%"></div> \
          <div class="check"></div> \
        </div> \
        <div class="bar"> \
          <div class="percentage" style="width: ' + negPercent + '%"></div> \
          <div class="cross"></div> \
        </div> \
      </div> \
      </li>');
      li.css('opacity', 0);
      li.animate({
        opacity : 1,
      }, 500);

      var cs = $('#commentStream');
      cs.append(li);

    },
    sizePanels : function() {
      var obj = this;

      obj.winHeight = $(window).height();
      obj.winWidth = $(window).width();
      obj.docHeight = $(document).height();
      obj.docWidth = $(document).width();

      obj.slideWidth = obj.winWidth - 390;
      obj.slideHeight = obj.slideWidth * .75;

      $('.presentation').css('width', obj.slideWidth);
      $('.presentation').css('height', obj.slideHeight);
      $('.presentation-panel .controls').css('width', obj.slideWidth);

      // $('.comments-panel .content').css('height', obj.winHeight);
      $('.comments-panel .content').css('height', obj.winHeight - 230);

      $('.timeline').css('width', obj.slideWidth);

    },
    getSlideAtTime : function(time) {
      var n = 0;
      if (time < 48) {
        // intro
        n = 0;
      } else if (time < 60 + 5) {
        // Is this it?
        n = 1;
      } else if (time < 60 + 40) {
        // A nomadic adventure
        n = 2;
      } else if (time < 2 * 60 + 25) {
        // 1 year traveling while working
        n = 3;
      } else if (time < 2 * 60 + 34) {
        // Those 12 months looked like this
        n = 4;
      } else if (time < 2 * 60 + 38) {
        // Flew into South Africa
        n = 5;
      } else if (time < 2 * 60 + 42) {
        // Moved on to Thailand
        n = 6;
      } else if (time < 2 * 60 + 48) {
        // And travel to Argentina
        n = 7;
      } else if (time < 2 * 60 + 55) {
        // We set foot in 10 countries
        n = 8;
      } else if (time < 3 * 60 + 15) {
        // We found ourselves a home
        n = 9;
      } else if (time < 3 * 60 + 22) {
        // And a car
        n = 10;
      } else if (time < 4 * 60) {
        // Made new friends
        n = 11;
      } else if (time < 4 * 60 + 25) {
        // We worked a lot
        n = 12;
      } else if (time < 4 * 60 + 35) {
        // Game watching in Kruger
        n = 13;
      } else if (time < 4 * 60 + 44) {
        // Africa burn in the desert
        n = 14;
      } else if (time < 4 * 60 + 56) {
        // Surfing
        n = 15;
      } else if (time < 5 * 60 + 14) {
        // Meditation retreat
        n = 16;
      } else if (time < 5 * 60 + 20) {
        // Went horseback riding in Patagonia
        n = 17;
      } else if (time < 5 * 60 + 30) {
        // Walked on a gletsjer
        n = 18;
      } else if (time < 6 * 60 + 30) {
        // We made it
        n = 19;
      } else if (time < 6 * 60 + 50) {
        // The concept of being a millionaire has changed
        n = 20;
      } else if (time < 8 * 60 + 45) {
        // In fact it's a brave new world we live in
        n = 21;
      } else if (time < 9 * 60 + 20) {
        // Lifestyle design is the new black
        n = 22;
      } else {
        // End slide
        n = 23;
      }
      return n;
    },
    watchTime : function() {
      var obj = this;
      obj.videoTime = document.getElementById('camVideo').currentTime;

      clearTimeout(obj.watchThumbTimeout);
      obj.watchThumbTimeout = setTimeout(function() {
        var thumb = $('.timeline .thumb');
        var vid = document.getElementById('camVideo');
        //var endT = vid.seekable.end(0);
        var endT = vid.duration;
        var vidLocPercent = vid.currentTime / endT;
        var vidWidth = $('.timeline').width();
        $('.timeline .thumb').css('left', vidLocPercent * vidWidth);
      }, 250);

      var sec = Math.round(obj.videoTime);

      var n = 0;
      if (obj.videoTime < 48) {
        // intro
        n = 0;
      } else if (obj.videoTime < 60 + 5) {
        // Is this it?
        n = 1;
      } else if (obj.videoTime < 60 + 40) {
        // A nomadic adventure
        n = 2;
      } else if (obj.videoTime < 2 * 60 + 25) {
        // 1 year traveling while working
        n = 3;
      } else if (obj.videoTime < 2 * 60 + 34) {
        // Those 12 months looked like this
        n = 4;
      } else if (obj.videoTime < 2 * 60 + 38) {
        // Flew into South Africa
        n = 5;
      } else if (obj.videoTime < 2 * 60 + 42) {
        // Moved on to Thailand
        n = 6;
      } else if (obj.videoTime < 2 * 60 + 48) {
        // And travel to Argentina
        n = 7;
      } else if (obj.videoTime < 2 * 60 + 55) {
        // We set foot in 10 countries
        n = 8;
      } else if (obj.videoTime < 3 * 60 + 15) {
        // We found ourselves a home
        n = 9;
      } else if (obj.videoTime < 3 * 60 + 22) {
        // And a car
        n = 10;
      } else if (obj.videoTime < 4 * 60) {
        // Made new friends
        n = 11;
      } else if (obj.videoTime < 4 * 60 + 25) {
        // We worked a lot
        n = 12;
      } else if (obj.videoTime < 4 * 60 + 35) {
        // Game watching in Kruger
        n = 13;
      } else if (obj.videoTime < 4 * 60 + 44) {
        // Africa burn in the desert
        n = 14;
      } else if (obj.videoTime < 4 * 60 + 56) {
        // Surfing
        n = 15;
      } else if (obj.videoTime < 5 * 60 + 14) {
        // Meditation retreat
        n = 16;
      } else if (obj.videoTime < 5 * 60 + 20) {
        // Went horseback riding in Patagonia
        n = 17;
      } else if (obj.videoTime < 5 * 60 + 30) {
        // Walked on a gletsjer
        n = 18;
      } else if (obj.videoTime < 6 * 60 + 30) {
        // We made it
        n = 19;
      } else if (obj.videoTime < 6 * 60 + 50) {
        // The concept of being a millionaire has changed
        n = 20;
      } else if (obj.videoTime < 8 * 60 + 45) {
        // In fact it's a brave new world we live in
        n = 21;
      } else if (obj.videoTime < 9 * 60 + 20) {
        // Lifestyle design is the new black
        n = 22;
      } else {
        // End slide
        n = 23;
      }
      obj.maxSlide = n;

      if (obj.slideChange[n + ''] == null) {
        obj.slideChange[n + ''] = true;
        $('.presentation').css('background', 'url(img/slides/' + n + '.png)');

        // var firstLi = $('.comments li:first-child');
        $('#commentStream').html('');
        // $('.comments').append(firstLi);

        obj.slideN = n;

        if (n == 0) {
          $('#prevSlide').css('opacity', .33);
        }
        if (n > 0) {
          $('#prevSlide').css('opacity', 1);
        }
        //$('#nextSlide').css('opacity', .33);

        if (n == 12) {
          var d = $('.question-dialog');
          d.show();
          d.css('bottom', -300);

          d.animate({
            bottom : 200,
          }, 500);
        } else {
          $('.question-dialog').hide();
        }

        switch (n) {
          case 0:

            // name = 'Sam';
            // comment = 'I agree.';
            // photo = 'background: url(img/mugs.png) -147px 0';
            // obj.addComment(comment, name, photo);
            //
            // name = 'Patrik';
            // comment = 'This is more about finding happiness, not the costs
            // involved in finding that happiness.';
            // photo = 'background: url(img/mugs.png) -98px 0';
            // obj.addComment(comment, name, photo);
            //
            // name = 'Mike';
            // comment = 'I don\'t think this lifestyle is for everyone. It\'s
            // an expensive lifestyle to say the least.';
            // photo = 'background: url(img/mugs.png) -49px 0';
            // obj.addComment(comment, name, photo);
            //
            // name = 'Antonella';
            // comment = 'This is an interesting perspective about how to
            // approach work.';
            // photo = 'background: url(img/mugs.png) 0 0';
            // obj.addComment(comment, name, photo);

            break;
          case 1:

            // Is this it?

            name = 'Mandy Simpson';
            comment = 'I wonder if this is really it all the time';
            photo = 'background: url(img/mugs.png) -685px 0';
            obj.addComment(comment, name, photo);

            name = 'Simon Hamsmith';
            comment = 'I think this speaker has something to say about life philosophy.';
            photo = 'background: url(img/mugs.png) -440px 0';
            obj.addComment(comment, name, photo);

            break;
          case 2:
            // A nomadic adventure

            name = 'Catherine Van Holder';
            comment = 'This is in Iceland.';
            photo = 'background: url(img/vanholder.png)';
            obj.addComment(comment, name, photo);

            name = 'Varnali Krishnan';
            comment = "I love penguins. Where was this picture taken?";
            photo = 'background: url(img/mugs.png) -195px 0';
            obj.addComment(comment, name, photo);

            break;
          case 3:
            // 1 year traveling while working

            name = 'Olga Konokova';
            comment = "Looks like they are pretty extensive travelers, and if you're working online it doesn't matter where you are.";
            photo = 'background: url(img/mugs.png) -587px 0';
            obj.addComment(comment, name, photo);

          case 4:
            // Those 12 months looked like this

            // name = 'Olga Konokova';
            // comment = "Looks like they are pretty extensive travelers.";
            // photo = 'background: url(img/mugs.png) -587px 0';
            // obj.addComment(comment, name, photo);

            break;
          case 5:
            // Flew into South Africa

            // name = 'Olga Konokova';
            // comment = "Looks like they are pretty extensive travelers.";
            // photo = 'background: url(img/mugs.png) -587px 0';
            // obj.addComment(comment, name, photo);

            break;
          case 6:
            // Moved on to Thailand

            // name = 'Olga Konokova';
            // comment = 'South Africa to Thailand?! Wow!';
            // photo = 'background: url(img/mugs.png) -587px 0';
            // obj.addComment(comment, name, photo);

            break;
          case 7:
            // And travel to Argentina
            break;
          case 8:
            // We set foot in 10 countries

            name = 'Simon Hamsmith';
            comment = '10 countries in a year is pretty impressive.';
            photo = 'background: url(img/mugs.png) -440px 0';
            obj.addComment(comment, name, photo);

            break;
          case 9:
            // We found ourselves a home

            // name = 'Simon Hamsmith';
            // comment = '10 countries in a year is pretty impressive.';
            // photo = 'background: url(img/mugs.png) -440px 0';
            // obj.addComment(comment, name, photo);

            break;
          case 10:
            // And a car

            name = 'Catherine Van Holder';
            comment = 'Our European drivers license worked in most places.';
            photo = 'background: url(img/vanholder.png)';
            obj.addComment(comment, name, photo);

            name = 'Hendrik Bamberg';
            comment = "Did you have to get a drivers license in every country?";
            photo = 'background: url(img/mugs.png) -488px 0px';
            obj.addComment(comment, name, photo);

            break;
          case 11:
            // Made new friends

            name = 'Fred Armisen';
            comment = 'Couchsurfing.com is great.';
            photo = 'background: url(img/mugs.png) -244px 0px';
            obj.addComment(comment, name, photo);

            break;
          case 12:
            // We worked a lot
            name = 'Olga Konokova';
            comment = 'Is it a vacation if you\'re working the whole time?';
            photo = 'background: url(img/mugs.png) -587px 0';
            obj.addComment(comment, name, photo);

            break;
          case 13:
            // Game watching in Kruger

            name = 'Catherine Van Holder';
            comment = 'Kruger National Park is one of the largest game reserves in Africa.';
            photo = 'background: url(img/vanholder.png)';
            obj.addComment(comment, name, photo);

            name = 'Dave Clark';
            comment = 'Where is Kruger?';
            photo = 'background: url(img/mugs.png) -390px 0px';
            obj.addComment(comment, name, photo);

            break;
          case 14:
            // Africa burn in the desert
            break;
          case 15:
            // Surfing
            break;
          case 16:
            // Meditation retreat

            name = 'Max Rocker';
            comment = 'It is so hard to completely disconnect these days.';
            photo = 'background: url(img/mugs.png) -930px 0px';
            obj.addComment(comment, name, photo);

            break;
          case 17:
            // Went horseback riding in Patagonia

            name = 'Catherine Van Holder';
            comment = 'Yes it is!';
            photo = 'background: url(img/vanholder.png)';
            obj.addComment(comment, name, photo);

            name = 'Simon Hamsmith';
            comment = 'Is it even possible to go horseback riding with all the mountains and snow?';
            photo = 'background: url(img/mugs.png) -440px 0';
            obj.addComment(comment, name, photo);

            break;
          case 18:
            // Walked on a gletsjer

            name = 'Tjeed van de Hoek';
            comment = 'Gletsjer is glacier in Dutch. They speak Dutch, French and German in Belgium.';
            photo = 'background: url(img/mugs.png) -147px 0';
            obj.addComment(comment, name, photo);

            break;
          case 19:
            // We made it

            name = 'Max Rocker';
            comment = 'Interesting photo. Do you feel they conquered something? Maybe it was more of a struggle than fun.';
            photo = 'background: url(img/mugs.png)-930px 0';
            obj.addComment(comment, name, photo);

            name = 'Simon Hamsmith';
            comment = 'I think it would be fun for a while but you always need somewhere to call home. I bet they were glad to be back.';
            photo = 'background: url(img/mugs.png) -440px 0';
            obj.addComment(comment, name, photo);

            name = 'Anonymous';
            comment = 'Very cool life experiment.';
            photo = 'background: url(img/mug.png)';
            obj.addComment(comment, name, photo);

            break;
          case 20:
            // The concept of being a millionaire has changed

            name = 'Jared Anderson';
            comment = 'They are effectively saying measure life by quality not by net worth.';
            photo = 'background: url(img/mug.png)';
            obj.addComment(comment, name, photo);

            break;
          case 21:
            // In fact it's a brave new world we live in

            name = 'Jennifer Hedge';
            comment = 'Technology is enabling us to take work anywhere. That is both good and bad.';
            photo = 'background: url(img/mugs.png) -831px 0';
            obj.addComment(comment, name, photo);

            name = 'Rishi Joshi';
            comment = 'Kind of a weird reference to Brave New World by Aldous Huxley.';
            photo = 'background: url(img/mug.png)';
            obj.addComment(comment, name, photo);

            break;
          case 22:
            // Lifestyle design is the new black

            name = 'Kevin Lee';
            comment = 'That\'s quite the fashion statement.';
            photo = 'background: url(img/mugs.png) -881px 0';
            obj.addComment(comment, name, photo);

            break;
          case 23:

            name = 'Catherine Van Holder';
            comment = 'Traveling with kids when they\'re young can give them a great perspective and a very unique childhood. Don\'t let it hold you back.';
            photo = 'background: url(img/vanholder.png)';
            obj.addComment(comment, name, photo);

            name = 'Corina Kim';
            comment = 'Something I\'d like to when I retire, but not sure I could do this with kids! But maybe they\'d like it?';
            photo = 'background: url(img/mugs.png) -734px 0';
            obj.addComment(comment, name, photo);

            name = 'Jake Sleip';
            comment = 'Again, I see this as more of a quality of life statement rather than measuring yourself by the size of your bank account.';
            photo = 'background: url(img/mugs.png) -783px 0';
            obj.addComment(comment, name, photo);

            // End slide
            break;
        }

      }

      var comment = '';
      var name = '';
      var photo = '';
      var addComment = false;
      var delay = 100;

      if (comment != '') {
        addComment = true;
      }
      if (addComment) {
        if (obj.slideComments[sec + ''] == null) {
          obj.slideComments[sec + ''] = true;
          setTimeout(function() {
            obj.addComment(comment, name, photo);
          }, delay);
        }
      }
    },
    prevSlide : function() {
      var obj = this;
      obj.slideN--;
      $('.presentation').css('background', 'url(img/slides/' + obj.slideN + '.png)');
    },
    nextSlide : function() {
      var obj = this;
      obj.slideN++;
      console.log(obj.slideN);
      $('.presentation').css('background', 'url(img/slides/' + obj.slideN + '.png)');
    },
};

$(document).ready(function() {
  app = new App();
  app.init();
  setTimeout(function() {
    // app.nextSlide();
  }, 2000);
  $('#prevSlide').css('opacity', .33);
  // $('#nextSlide').css('opacity', .33);
});

$(window).resize(function() {
  app.sizePanels();
});