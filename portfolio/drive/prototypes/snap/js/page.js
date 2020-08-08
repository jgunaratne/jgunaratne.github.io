var Page = function() {

  var obj = this;
  obj.sizePanels();
  obj.mode = 'drag';
  obj.headerHeight = 120;

  var page = $('.page');
  obj.jqObj = $('.page');
  obj.selectedBlock = null;

  $(window).resize(function() {
    obj.sizePanels();
  });

  obj.setupGrid();
  obj.setCols(3);
  obj.setupGuides();

  $('.stopper').draggable({
      axis : 'y',
      grid : [
          15, 15
      ],
      stop : function(e) {
        obj.positionBlocks();
      }
  });

  $('.stopper').live('mousemove', function(e) {
    $(this).find('.grip').css('left', e.clientX - $(this).offset().left);
  });

//block selection
  
  var activateBlock = function(block) {
    Global.page.selectedBlock = block;
    var blockObj = block.data('obj');
    if (blockObj && !blockObj.isSelected()) {
      obj.deselectAllBlocks();
      block.data('obj').setSelected(true);
      obj.mode = 'edit';
    }
    if (block.hasClass('text')) {
      Global.editor.hideToolBars();
      Global.textToolBar.jqObj.show();
    }
    if (block.hasClass('image')) {
      Global.editor.hideToolBars();
      Global.imageToolBar.jqObj.show();
    }
  };

  $('.block .handle').live('click', function(e) {
    var block = $(this).parents('.block');
    activateBlock(block);
    
    window.getSelection().removeAllRanges();
    e.stopPropagation();
  });

  $('.block').live('click', function(e) {
    var block = $(this);
    activateBlock(block);
    window.getSelection().removeAllRanges();
    e.stopPropagation();
  });
  
  $('.block .content').live('click', function(e) {
    var block = $(this).parents('.block');
    activateBlock(block);
    e.stopPropagation();
  });
  

  /*
   * $('.block.text .handle.center').live('click', function(e) { var block =
   * $(this).parents('.block'); block.find('.content').focus();
   * block.find('.handle.center').hide(); });
   */

  $('.stopper').live('mouseup', function(e) {
    if ($(this).css('top').replace('px', '') < 0) {
      $(this).css('top', 14);
    }
  });

};

Page.prototype = {
    setupGrid : function() {
      var obj = this;
      for ( var i = 0; i < 12; i++) {
        obj.jqObj.append('<div class="col-grid"></div>');
      }
    },
    setCols : function(colNum) {
      var page = $('.page');
      var colWidth = (page[0].offsetWidth - 15) / colNum;
      $('.guide.vertical').remove();
      for ( var i = 0; i < colNum + 1; i++) {
        var guide = $('<div class="guide vertical"></div>');
        guide.css('left', i * colWidth);
        page.append(guide);
        if (i == 0) {
          guide.addClass('first');
        }
        if (i == colNum) {
          guide.addClass('last');
        }
      }
      $('.guide.vertical').draggable({
          axis : 'x',
          stop : function(e) {
            var x = $(this).css('left').replace('px', '');
            if (x < 0) {
              $(this).css('left', 0);
            } else if (x > page[0].offsetWidth) {
              $(this).css('left', page[0].offsetWidth - 15);
            }
          },
          grid : [
              75, 15
          ]
      });
    },
    setupGuides : function() {
      var page = $('.page');
      for ( var i = 0; i < 10; i++) {
        page.append('<div class="stopper"><div class="handle left"></div><div class="grip"></div><div class="handle right"></div></div>');
      }

      for ( var i = 1; i < 2; i++) {
        var stopper = $('<div class="stopper"><div class="handle left"></div><div class="grip"></div><div class="handle right"></div></div>');
        stopper.css('top', i * 375 + 14);
        page.append(stopper);
      }

    },
    disableDrag : function() {
      // $('.block').draggable({
      // disabled : true
      // });
    },
    enableDrag : function() {
      var obj = this;
      // $('.block').draggable(obj.draggableConfig);
    },
    sizePanels : function() {

      var obj = this;

      var header = $('#header');
      var editor = $('#editor');

      header.css('height', obj.headerHeight);
      editor.css('height', $(window).height() - obj.headerHeight);
      editor.css('top', obj.headerHeight);

      if (Global.editor.htmlEditorActive) {
        editor.css('height', $(window).height() - obj.headerHeight - 240);
      }
    },
    positionBlocks : function() {

      var obj = this;
      var blocks = $('.block');

      blocks.each(function() {
        var block = this;
        var y = obj.getNearestStopper(block, block.offsetLeft, block.offsetTop);
        $(block).css('top', y);
      });

    },
    refreshBlocks : function() {
      var obj = this;
      for ( var i = 0; i < 10; i++) {
        obj.positionBlocks();
      }
    },
    getNearestStopper : function(activeBlock, x, y) {

      var closestTop = 15;
      var scrollTop = $('#editor').scrollTop();

      $('.stopper, .block').each(function() {

        var elem = this;
        var elemTop = elem.offsetTop;

        if ($(this).hasClass('block')) {
          if (this != activeBlock) {
            if (activeBlock.offsetLeft <= this.offsetLeft + this.offsetWidth && activeBlock.offsetLeft + activeBlock.offsetWidth >= this.offsetLeft) {
              elemTop += this.offsetHeight;
              if (activeBlock.offsetTop <= this.offsetTop + this.offsetHeight && activeBlock.offsetTop + activeBlock.offsetHeight >= this.offsetTop) {
                if (this.offsetTop <= activeBlock.offsetTop) {
                  closestTop = elemTop + 15;
                }
              }
              if (closestTop < elemTop && elemTop < y) {
                closestTop = elemTop + 15;
              }
            }
          }
        }

        if ($(this).hasClass('stopper')) {
          if (closestTop <= elemTop && elemTop <= y) {
            closestTop = elemTop;
          }
        }

      });
      return closestTop;
    },
    deselectAllBlocks : function() {
      $('.block').removeClass('selected');
      // $('.block').find('.handle.center').show();
    }
};