var Picker = function(config) {
  var obj = this;
  if (config) {
    obj.jqObj = config.jqObj;
  }
  obj.show = function() {
    obj.jqObj.show();
  };
  obj.hide = function() {
    obj.jqObj.hide();
  };
  if (obj.jqObj) {
    obj.jqObj.find('.kd-button').click(function() {
      obj.jqObj.hide();
    });
  }
};

var ImagePicker = function(config) {
  Picker.apply(this, arguments);
  var obj = this;
  obj.doc = config.doc;
  obj.jqObj = config.jqObj;
  obj.images = [];

  var imgs = [
      'cat.png',
      'happycats.png',
      'kiss.png',
      'logo.png',
      'applepie.jpg',
      'cook.png',
      'pumpkinpie.png',
      'barista.png',
      'fork.png',
      'server.png',
      'cherrypie.png',
      'knife.png',
      'pies.png',
      'strawberrypie.png',
      'Hooray.png',
      'Coffee.png',
      'OpeningDay.png',
      'PieCherry2.jpg',
      'Team.png',
      'Outside.png',
      'PieCherry3.jpg',
      'WineList.jpg',
      'Girls.png',
      'Pancakes.png',
      'PieLemonMeringue.jpg',
      'PieMixedBerry2.jpg'
  ];

  var imgs2 = [
      'cat.png', 'happycats.png', 'kiss.png', 'logo.png'
  ];
  obj.addImageThumbs = function() {
    var thumbObj = $("#thumbs");
    for ( var i = 0; i < imgs.length; i++) {
      var imgURL = 'img/photos/' + imgs[i];
      var img = new Image();
      img.src = imgURL;
      img.i = i;
      img.name = imgs[i];
      img.onload = function() {

        var imgObj = this;
        var thumb = $('<div class="image-thumb"></div>');
        thumb.css('background-image', 'url(' + imgObj.src + ')');
        var w = imgObj.width;
        var h = imgObj.height;

        if (w > h) {
          thumb.css('-webkit-background-size', (w / h * 100) + '%' + ' 100%');
        } else {
          thumb.css('-webkit-background-size', '100% ' + (h / w * 100) + '%');
        }
        thumbObj.append(thumb);

        var imageProperties = {
            width : w,
            height : h
        }
        thumb[0].imageProperties = imageProperties;

      };
    }
  };
  
  obj.insertImage = function () {
    var page = $('.page');
    var b = new ImageBlock();
    var block = b.jqObj;

    var content = block.find('.content');
    content.css('background-image', $(obj.selectedImage).css('background-image'));
    content[0].imageProperties = obj.selectedImage.imageProperties;

    Global.editor.newBlock = b;
    Global.editor.setMode('insert');
    
    Global.editor.selectedToolType = 'Image';
  };
  
  obj.deselectAllImageThumbs = function() {
    var thumbs = $('#thumbs .image-thumb');
    thumbs.removeClass('selected');
  };
  obj.addThumbEvents = function() {
    var thumbs = $('#thumbs .image-thumb');
    thumbs.live('click', function() {
      var thumb = $(this);
      obj.deselectAllImageThumbs();
      thumb.addClass('selected');
      obj.selectedImage = this;
      // obj.doc.selectedImage = this;
    });
    thumbs.live('dblclick', function() {
      $('#imagePicker').hide();
      obj.insertImage();
    });
  };
  obj.init = function() {
    obj.addImageThumbs();
    obj.addThumbEvents();

    $('#imagePicker .insert').bind('click', function() {
      obj.insertImage();
    });

  };
  obj.init();
};
ImagePicker.prototype = new Picker();

var DocPicker = function(config) {
  Picker.apply(this, arguments);
  var obj = this;
  obj.jqObj = config.jqObj;

  $('#docPicker .insert').bind('click', function() {

    var docID = obj.selectedDocID; // '11nT-ossY3lKuN88jHrYSXHDSiPIehEMNeG36zjyJrK0';
    var docURL = 'https://docs.google.com/feeds/download/documents/Export?docID=' + docID + '&access_token=' + Global.docsList.accessToken + '&exportFormat=html&format=html';

    // console.log(Global.docsList.accessToken);
    // console.log(docURL);

    $.ajax({
        url : '/proxy.php?url=' + encodeURIComponent(docURL),
        success : function(data) {

          var html = data.replace(/<head>(?:.|\n|\r)+?<\/head>/, '').replace('<html>', '').replace('</html>', '');
          html = html.replace(/<body\/?[^>]+(>|$)/g, '').replace('</body>', '');
          html = html.replace(/<span><\/span>/g, '');
          html = html.replace(/<p\/?[^>]+(>|$)<\/p>/g, '');

          Global.editor.insertText(html);
        }
    });

  });

  $('#docPicker li').live('click', function() {
    $('#docPicker li').removeClass('selected');
    obj.selectedDocID = $(this).data('docID');
    $(this).addClass('selected');
  });

};
DocPicker.prototype = new Picker();

var ColorPicker = function(config) {
  var obj = this;
  var picker = $('#colorPicker');
  obj.tool = 'TextColor';

  picker.bind('mouseover', function() {
    if (obj.displayTimeout) {
      clearTimeout(obj.displayTimeout);
    }
    obj.displayTimeout = setTimeout(function() {
      picker.show();
    }, 250);
  });
  picker.bind('mouseout', function() {
    if (obj.displayTimeout) {
      clearTimeout(obj.displayTimeout);
    }
    obj.displayTimeout = setTimeout(function() {
      picker.hide();
    }, 250);
  });
  picker.bind('click', function(e) {
    obj.color = $(e.srcElement).css('background-color');
    picker.hide();
    obj.setColor();
  });

  obj.setColor = function() {
    switch (obj.tool) {
      case 'TextColor':
        var styleElem = $('<span/>');
        styleElem.css('color', obj.color);
        Global.editor.addStyle(styleElem);
        break;
      case 'Bucket':
        var block = Global.page.selectedBlock.jqObj;
        if (block) {
          block.css('background', obj.color);
          if (block.css('padding-left') == '0px') {
            block.css('padding', '10px');
            var currWidth = block.css('width').replace('px', '');
            block.css('width', currWidth - 20);
          }
        }
        break;
      case 'Pen':
        if (Global.page.selectedBlock) {
          Global.page.selectedBlock.jqObj.css('outline', '1px solid ' + obj.color);
        }
        break;
    }
  };
};

var Overlay = function(config) {
  var obj = this;
  if (config) {
    obj.jqObj = config.jqObj;
  }
  obj.show = function() {
    obj.jqObj.show();
  };
  obj.hide = function() {
    obj.jqObj.hide();
  };

  if (obj.jqObj) {
    obj.jqObj.bind('mouseover', function() {
      if (obj.displayTimeout) {
        clearTimeout(obj.displayTimeout);
      }
      obj.displayTimeout = setTimeout(function() {
        obj.show();
      }, 250);
    });
    obj.jqObj.bind('mouseout', function() {
      if (obj.displayTimeout) {
        clearTimeout(obj.displayTimeout);
      }
      obj.displayTimeout = setTimeout(function() {
        obj.hide();
      }, 250);
    });
    obj.jqObj.bind('click', function() {
      obj.hide();
    });
  }

};

var AddOverlay = function(config) {
  var obj = this;
  obj.jqObj = $('#addOverlay');

  Overlay.apply(this, arguments);

  $('.tools .add').bind('click', function() {
    obj.show();
  });

  $('#addOverlay a').bind('click', function(e) {
    var itemText = $(this).text();

    switch (itemText) {

      case 'Image':
        $('#imagePicker').show();
        break;
      case 'Text':
        Global.editor.insertText();
        break;
      case 'HTML':
        Global.editor.insertHTML();
        break;
      case 'Box':
        Global.editor.insertBox();
        break;
      case 'Google Doc':
        $('#docPicker').show();
        break;
      case 'More':
        $('#addOverlay .item-group').show();
        $(this).html('<span class="icon" style="background-position: -480px -192px"></span>Less');
        e.stopPropagation();
        break;
      case 'Less':
        $('#addOverlay .item-group').hide();
        $(this).html('<span class="icon" style="background-position: -480px -216px"></span>More');
        e.stopPropagation();
        break;
    }

  });

};
AddOverlay.prototype = new Overlay();

var FontSizeOverlay = function(config) {
  var obj = this;
  obj.jqObj = $('#fontSizeOverlay');

  Overlay.apply(this, arguments);

  $('#fontSizeOverlay a').bind('click', function(e) {
    $('#fontSizeLabel').html($(this).text());
    var itemText = $(this).text().replace(/ /g, '');
    var styleElem = $('<span/>');
    styleElem.css('font-size', itemText);
    styleElem.css('line-height', itemText);
    Global.editor.addStyle(styleElem);
  });

};
FontSizeOverlay.prototype = new Overlay();
