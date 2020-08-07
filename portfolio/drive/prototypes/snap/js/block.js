var Block = function() {
  var obj = this;
  var block = $('<div class="block"><div class="handle top"></div><div class="handle right"></div><div class="handle bottom"></div><div class="handle left"></div><div class="handle center"></div><div class="content"></div></div>');
  obj.jqObj = block;
  block.data('obj', obj);

  block.resizable({
      start : function(e) {
        $('.page').addClass('show-grid');
      },
      stop : function(e) {
        $('.page').removeClass('show-grid');
        Global.page.refreshBlocks();
      },
      handles : 'n, s, e, w, ne, nw, se, sw',
      grid : [
          75, 1
      ]
  });

};
Block.prototype = {
    isSelected : function() {
      var obj = this;
      if (obj.jqObj.hasClass('selected')) {
        return true;
      } else {
        return false;
      }
    },
    setSelected : function(select) {
      var obj = this;
      if (select) {
        Global.page.selectedBlock = obj;
        console.log(Global.page.selectedBlock);
        obj.jqObj.addClass('selected');
        if (obj.type == 'HTMLBlock') {
          Global.editor.showHTMLEditor();
          Global.editor.updateHTMLEditor();
        } else {
          Global.editor.showHTMLEditor(false);
        }
      } else {
        obj.jqObj.removeClass('selected');
      }
    }
};

var InsertBlock = function() {
  Block.apply(this, arguments);
  var obj = this;
  var block = obj.jqObj;
  block.addClass('insert');
};
InsertBlock.prototype = new Block();

var ImageBlock = function(config) {
  Block.apply(this, arguments);
  var obj = this;
  var block = obj.jqObj;
  block.data('obj', obj);
  block.addClass('image');

  var content = obj.jqObj.find('.content');

  block.bind('mousedown', function(e) {

    // if (block.hasClass('selected')) {
    //
    // content.css('background-repeat', 'no-repeat');
    // obj.oldPosition = content.css('background-position').replace(/px/g,
    // '').split(' ');
    //
    // var xCenter = (obj.boxWidth - obj.scaleWidth) / 2;
    // var yCenter = (obj.boxHeight - obj.scaleHeight) / 2;
    //
    // if (content.css('background-position') == "50% 50%") {
    // content.css('background-position', xCenter + 'px' + ' ' + yCenter +
    // 'px');
    // }
    //
    // obj.moveBackground = true;
    // obj.dragStartX = e.clientX;
    // obj.dragStartY = e.clientY;
    // }

  });

  block.bind('mouseup', function(e) {
    // obj.moveBackground = false;
  });

  block.bind('mouseout', function(e) {
    // obj.moveBackground = false;
  });

  block.bind('mousemove', function(e) {
    if (obj.moveBackground) {
      var dragOffsetX = -(obj.dragStartX - e.clientX - obj.oldPosition[0]);
      var dragOffsetY = -(obj.dragStartY - e.clientY - obj.oldPosition[1]);

      if (dragOffsetX > 0)
        dragOffsetX = 0;
      if (dragOffsetY > 0)
        dragOffsetY = 0;

      var rightBound = obj.boxWidth - obj.scaleWidth;
      var bottomBound = obj.boxHeight - obj.scaleHeight;

      if (dragOffsetX < rightBound)
        dragOffsetX = rightBound;

      if (dragOffsetY < bottomBound)
        dragOffsetY = bottomBound;

      content.css('background-position', dragOffsetX + 'px ' + dragOffsetY + 'px');
    }
  });

  block.resizable({
      start : function(e) {
        $('.page').addClass('show-grid');
      },
      stop : function(e) {
        $('.page').removeClass('show-grid');
        Global.page.refreshBlocks();
      },
      resize : function(e) {
        obj.scaleImage();
      },
      handles : 'ne, nw, se, sw',
      grid : [
          75, 1
      ]
  });

  obj.setAspectRatio = function() {
    var content = obj.jqObj.find('.content');
    var cw = content[0].imageProperties.width;
    var ch = content[0].imageProperties.height;
    var suggestedHeight = Math.round((ch / cw * content.width()) / 15) * 15;
    block.css('height', suggestedHeight);
  };

  obj.scaleImage = function() {

    var placeHolder = obj.jqObj.find('.content');

    if (placeHolder) {

      var plHeight = placeHolder.height();
      var plWidth = placeHolder.width();

      if (plHeight == 0) {
        var plHeight = obj.containerHeight;
        var plWidth = obj.containerWidth;
      }

      var w = placeHolder[0].imageProperties.width;
      var h = placeHolder[0].imageProperties.height;

      var plRatio = plWidth / plHeight;
      var imRatio = w / h;

      var xScale = 100;
      var yScale = 100;

      if (plRatio >= 1 && imRatio <= 1) {
        var yScale = (plWidth / plHeight) * (h / w) * 100;
        placeHolder.css('-webkit-background-size', '100% ' + yScale + '%');

      } else if (plRatio <= 1 && imRatio <= 1) {
        xScale = (plHeight / plWidth) * (w / h) * 100;
        yScale = 100;
        if (xScale < 100) {
          yScale = (100 - xScale) + 100;
          xScale = 100;
        }
        placeHolder.css('-webkit-background-size', xScale + '% ' + yScale + '%');

      }

      if (plRatio >= 1 && imRatio >= 1) {
        xScale = 100;
        yScale = 100 * (plWidth / plHeight) / (w / h);

        if (yScale < 100) {
          xScale = 100 * (plHeight / plWidth) * (w / h);
          yScale = 100;
        }
        placeHolder.css('-webkit-background-size', xScale + '% ' + yScale + '%');

      } else if (plRatio < 1 && imRatio > 1) {
        xScale = 100 * (plHeight / plWidth) * (w / h);
        yScale = 100;
        placeHolder.css('-webkit-background-size', xScale + '% ' + yScale + '%');
      }

      placeHolder.css('background-position', 'center');

      obj.xScale = xScale;
      obj.yScale = yScale;

      obj.scaleWidth = (xScale / 100) * plWidth;
      obj.scaleHeight = (yScale / 100) * plHeight;

      obj.boxWidth = plWidth;
      obj.boxHeight = plHeight;

    }

    obj.rotatedDegrees = 0;
    obj.rotate = function() {
      obj.rotatedDegrees += 90;
      var imgHolder = obj.jqObj.find('.content');
      imgHolder.css('-webkit-transform', 'rotate(' + obj.rotatedDegrees + 'deg)');
    };

  };
};
ImageBlock.prototype = new Block();

var TextBlock = function(config) {
  Block.apply(this, arguments);
  var obj = this;
  if (config) {
    obj.content = config.content;
    var block = obj.jqObj;
    block.addClass('text');
    block.find('.content').append($('<span class="text">' + obj.content + '</span>'));
  }
};
TextBlock.prototype = new Block();

var HTMLBlock = function(config) {
  TextBlock.apply(this, arguments);
  var obj = this;
  obj.type = "HTMLBlock";
  obj.jqObj.find('.content').html($(obj.content));
};
HTMLBlock.prototype = new TextBlock();

var BoxBlock = function(config) {
  TextBlock.apply(this, arguments);
  var obj = this;
  obj.type = "BoxBlock";
  // obj.jqObj.find('.content').html($(obj.content));
  obj.jqObj.css('height', 200);
  obj.jqObj.css('background', '#ccc');
  obj.jqObj.css('padding', '10px');
  obj.jqObj.css('width', '265px');
};
BoxBlock.prototype = new TextBlock();
