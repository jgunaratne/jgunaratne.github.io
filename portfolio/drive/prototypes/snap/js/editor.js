var Editor = function(config) {
  var obj = this;
  var editor = $('#editor');
  obj.mode = 'edit';
  obj.dragging = false;

  obj.jqObj = editor;
  $(window).bind('keydown', function(e) {

    if (e.keyCode == 88 && e.ctrlKey) {
      console.log('cut');
      obj.copiedBlock = Global.page.selectedBlock;
      console.log(obj.copiedBlock.jqObj.data('obj'));
      // $(Global.page.selectedBlock).remove();
    }
    if (e.keyCode == 67 && e.ctrlKey) {

      if (Global.page.selectedBlock) {
        console.log('copy');
      }

      // var newCopiedData = clone(obj.copiedBlock);
      // obj.newCopiedObj.data('obj', newCopiedData);
      // console.log(obj.newCopiedObj.data('obj'));

      // obj.copiedBlock = Global.page.selectedBlock;
    }
    if (e.keyCode == 86 && e.ctrlKey) {

    }

    if (e.keyCode == 8 || e.keyCode == 46) {
      var sel = window.getSelection();

      if (sel.focusNode == null || sel.focusNode.length == null) {
        e.preventDefault();
        if (Global.page.selectedBlock) {
          $(Global.page.selectedBlock.jqObj).remove();
          Global.page.refreshBlocks();
        }
      }
    }

  });

  var page = $('.page');
  var editorTop = page.offset().top;
  var editorLeft = page.offset().left;

  editor.bind('click', function(e) {
    if (Global.editor.getMode() == 'insert') {
      Global.editor.setMode('edit');
      obj.insertBlock(Global.editor.newBlock);
    }
  });

  editor.bind('mouseup', function(e) {
    obj.setSelection();
    obj.getSelection();
  });

  obj.insertBlock = function(newBlock) {
    var b = newBlock;

    if (b) {
      var block = b.jqObj;
      page.append(block);

      if (Global.page.insertBlock) {
        block.css('top', Global.page.insertBlock.css('top'));
        block.css('left', Global.page.insertBlock.css('left'));
        Global.page.insertBlock.remove();
        Global.page.insertBlock = null;
      }

      block.draggable(Global.draggableConfig);
      Global.page.refreshBlocks();

      if (block.hasClass('image')) {
        b.setAspectRatio();
        b.scaleImage();
      }
      editor.css('cursor', 'default');
    }
  };

  $(window).bind('mousemove', function(e) {
    if (Global.editor.getMode() == 'insert') {

      editor.css('cursor', 'crosshair');
      if (Global.page.insertBlock == null) {
        var b = new InsertBlock();
        var block = b.jqObj;
        page.append(block);
        Global.page.refreshBlocks();
        Global.page.insertBlock = block;

        var placeText;
        if (Global.editor.selectedToolType == 'Image') {
          placeText = $('<div class="place-text"><div class="arrow-outline"><div class="arrow-bg"></div></div><div class="desc-img">Click to place image</div></div>');
        } else {
          placeText = $('<div class="place-text"><div class="arrow-outline"><div class="arrow-bg"></div></div><div class="desc-img">Click to place</div></div>');
        }
        block.append(placeText);
        
      }

      var newX = e.clientX - editorLeft - Global.page.insertBlock[0].offsetWidth / 2;
      var newY = e.clientY - editorTop;
      
      if (e.target) {
        var hoverBlock = $(e.target).parents('.block');
        if (hoverBlock) {
          var hbOffset = hoverBlock.offset();
          if (hbOffset) {
            var hbTop = hbOffset.top;
            var hbMidpoint = hoverBlock.offset().top + hoverBlock[0].offsetHeight / 2;
            var hbBottom = hoverBlock.offset().top + hoverBlock[0].offsetHeight;
            var yLoc = e.clientY;

            if (yLoc > hbTop && yLoc < hbMidpoint) {
              
              newY = e.clientY - editorTop - 50;
              
              var reposBlockY = hoverBlock.css('top').replace(/px/,'')*1 + 50;
              hoverBlock.css('top', reposBlockY + 'px');              
              
            } else if (yLoc > hbMidpoint && yLoc < hbBottom) {
              
            }
          }
        }
      }

      Global.page.insertBlock.css('left', (Math.round(newX / 75) * 75) + 15);
      Global.page.insertBlock.css('top', newY + 15);
      Global.page.refreshBlocks();
    }
    
    if (obj.dragging == true) {
      var hoverBlock = $(e.target).parents('.block')[0];

      if (obj.dragObj != hoverBlock) {
//        console.log(obj.dragObj);
      }
    }

  });

  // menus

  var menuLi = $('#menu li');
  menuLi.bind('mouseover', function() {
    var li = this;
    if (li.menuLiHoverTimeout) {
      clearTimeout(li.menuLiHoverTimeout);
    }
    li.menuLiHoverTimeout = setTimeout(function() {
      // menuLi.removeClass('hover');
      $(li).addClass('hover');
    }, 50);
  });

  menuLi.bind('mouseout', function() {
    var li = this;
    if (li.menuLiHoverTimeout) {
      clearTimeout(li.menuLiHoverTimeout);
    }
    li.menuLiHoverTimeout = setTimeout(function() {
      $(li).removeClass('hover');
    }, 100);
  });

  // context menus

  obj.contextMenuShown = false;
  obj.contextMenu = $('#contextMenu');
  obj.jqObj.bind('contextmenu', function(e) {

    var rightClickBlock = $(e.srcElement).parents('.block');

    obj.contextMenu.show();
    obj.contextMenuShown = true;
    obj.contextMenu.css('left', e.pageX - 50).css('top', e.pageY - 20);
    obj.contextMenu.click(function(e) {

      var cmdText = $(e.srcElement).text();
      switch (cmdText) {
        case 'Insert Image':
          $('#imagePicker').show();
          break;
        case 'Insert Text':
          obj.insertText();
          break;
        case 'Insert HTML':
          obj.insertHTML();
          break;
        case 'Insert Box':
          obj.insertBox();
          break;
        case 'Insert Google Doc':
          $('#docPicker').show();
          break;
        case 'Delete':
          rightClickBlock.remove();
          break;
      }

      obj.contextMenu.hide();
      obj.contextMenuShown = false;
    });
    return false;
  });

  obj.contextMenu.bind('mouseover', function() {
    var m = this;
    if (m.menuHoverTimeout) {
      clearTimeout(m.menuHoverTimeout);
    }
    m.menuHoverTimeout = setTimeout(function() {
      $(m).show();
    }, 50);
  });

  obj.contextMenu.bind('mouseout', function() {
    var m = this;
    if (m.menuHoverTimeout) {
      clearTimeout(m.menuHoverTimeout);
    }
    m.menuHoverTimeout = setTimeout(function() {
      $(m).hide();
    }, 250);
  });

  $('#menu li li').bind('click', function(e) {

    menuLi.removeClass('hover');
    var menuItem = $(e.srcElement).text().replace(/[^a-zA-Z 0-9]+/g, '');

    switch (menuItem) {
      case 'Page properties':

        break;
      case 'Publish page':
        obj.enablePublishMode();
        break;
      case 'Cut':
        if (Global.page.selectedBlock) {
          $(Global.page.selectedBlock).remove();
          Global.page.refreshBlocks();
        }
        break;
      case 'Delete':
        if (Global.page.selectedBlock) {
          $(Global.page.selectedBlock).remove();
          Global.page.refreshBlocks();
        }
        break;
      case 'Image':
        $('#imagePicker').show();
        break;
      case 'Text':
        obj.insertText();
        break;
      case 'HTML':
        obj.insertHTML();
        break;
      case 'Box':
        obj.insertBox();
        break;
      case 'Google Doc':
        $('#docPicker').show();
        break;
      case 'Clear formatting':

        break;
      case 'Heading H1':

        break;
      case 'Subheading H2':

        break;
      case 'Minor heading H4':

        break;
      case 'Normal paragraph text':

        break;
      case 'Bold':
        console.log('bold');
        break;
      case 'Italic':

        break;
      case 'Underline':

        break;
      case '2':
        Global.page.setCols(2);

        var mCols = $('#menuItemsColumns li a span');
        mCols.removeClass('checked');
        $(mCols[0]).addClass('checked');

        break;
      case '3':
        Global.page.setCols(3);

        var mCols = $('#menuItemsColumns li a span');
        mCols.removeClass('checked');
        $(mCols[1]).addClass('checked');

        break;
      case '4':
        Global.page.setCols(4);

        var mCols = $('#menuItemsColumns li a span');
        mCols.removeClass('checked');
        $(mCols[2]).addClass('checked');

        break;
      case '6':
        Global.page.setCols(6);

        var mCols = $('#menuItemsColumns li a span');
        mCols.removeClass('checked');
        $(mCols[3]).addClass('checked');

        break;
      case 'Terms':
        Global.addDummyContent();
        break;
    }
    e.stopPropagation();
  });

  $('#publishBtn').bind('click', function() {
    obj.enablePublishMode();
  });

  $('#editAction').bind('click', function() {
    obj.enableEditMode();
  });

  // HTML editor

  $('#htmlMarkup').bind('keyup', function(e) {
    var updatedHTML = $('#htmlMarkup').text();
    if (Global.page.selectedBlock) {
      Global.page.selectedBlock.jqObj.find('.content').html(updatedHTML);
    }
  });

  $('#htmlEditor .close.icon').bind('click', function(e) {
    obj.showHTMLEditor(false);
    e.stopPropagation();
  });

  $('#htmlEditor').bind('click', function(e) {
    Global.page.selectedBlock.setSelected(true);
  });

  obj.initEditorEvents();

};
Editor.prototype = {
    enablePublishMode : function() {
      $('body').addClass('published');
      $('#publishedHeader').show();
      Global.page.headerHeight = 20;
      Global.page.sizePanels();
    },
    enableEditMode : function() {
      $('body').removeClass('published');
      $('#publishedHeader').hide();
      Global.page.headerHeight = 120;
      Global.page.sizePanels();
    },
    hideToolBars : function() {
      Global.textToolBar.jqObj.hide();
      Global.imageToolBar.jqObj.hide();
    },
    getSelection : function() {
      var obj = this;
      var currSelection = window.getSelection();
      currSelection.addRange(obj.storedSelection);
    },
    setSelection : function() {
      var obj = this;
      var currSelection = window.getSelection();
      try {
        obj.storedSelection = currSelection.getRangeAt(0);
      } catch (e) {
        obj.storedSelection = null;
      }
    },
    addStyle : function(surroundingTag) {

      var obj = this;

      var selContentCopy = obj.storedSelection.cloneContents();
      var span = document.createElement('span');
      span.appendChild(selContentCopy);

      surroundingTag.html(span.innerHTML);

      var spans = surroundingTag.find('span');
      spans.each(function() {
        $(this).css('font-size', surroundingTag.css('font-size'));
        $(this).css('line-height', surroundingTag.css('line-height'));
        $(this).css('color', surroundingTag.css('color'));
        $(this).css('font-weight', surroundingTag.css('font-weight'));
      });

      obj.storedSelection.deleteContents();
      obj.storedSelection.insertNode(surroundingTag[0]);

      var currSelection = window.getSelection();
      currSelection.removeAllRanges();
      currSelection.addRange(obj.storedSelection);

    },
    insertText : function(newContent) {
      if (newContent == null) {
        newContent = 'Click to edit text';
      }
      var b = new TextBlock({
        content : newContent
      });
      Global.editor.newBlock = b;
      Global.editor.setMode('insert');
      Global.editor.selectedToolType = 'Text';
    },
    insertBox : function(newContent) {
      if (newContent == null) {
        newContent = '';
      }
      var b = new BoxBlock({
        content : newContent
      });
      Global.editor.newBlock = b;
      Global.editor.setMode('insert');
    },
    insertHTML : function(newContent) {
      var obj = this;
      if (newContent == null) {
        newContent = '<b>HTML</b> goes <i>here.</i>';
      }
      var b = new HTMLBlock({
        content : newContent
      });
      obj.newBlock = b;
      obj.setMode('insert');

      obj.showHTMLEditor();
      obj.updateHTMLEditor();
      Global.editor.selectedToolType = 'HTML';
    },
    getMode : function() {
      var obj = this;
      return obj.mode;
    },
    setMode : function(mode) {
      var obj = this;
      obj.mode = mode;
      if (mode == 'insert') {
        $('.page').addClass('show-grid');
      } else {
        $('.page').removeClass('show-grid');
      }
    },
    showHTMLEditor : function(show) {
      var obj = this;
      if (show == null || show == true) {
        obj.htmlEditorActive = true;
        $('#htmlEditor').show();
      } else {
        obj.htmlEditorActive = false;
        $('#htmlEditor').hide();
      }
      Global.page.sizePanels();
    },
    updateHTMLEditor : function() {
      var obj = this;
      if (Global.page.selectedBlock == null) {
        Global.page.selectedBlock = Global.editor.newBlock;
      }
      if (Global.page.selectedBlock && Global.page.selectedBlock.jqObj) {
        var html = Global.page.selectedBlock.jqObj.find('.content').html();
        html = Global.editor.encodeHTML(html);
        $('#htmlMarkup').html(html);
      }
    },
    encodeHTML : function(value) {
      return $('<div/>').text(value).html();
    },
    decodeHTML : function(value) {
      return $('<div/>').html(value).text();
    },
    initEditorEvents : function() {
      var obj = this;
      $('#editor').bind('click', function(e) {
        if (!$(e.srcElement).parents().hasClass('block')) {
          Global.page.deselectAllBlocks();
          // if (obj.newBlock) {
          // obj.newBlock.setSelected(true);
          // }
          Global.editor.hideToolBars();
        }
      });

      $('#editor').bind('mousemove', function(e) {
        if (obj.mode == 'edit') {
          // $('.block').draggable('disable');
        } else if (obj.mode == 'drag') {
          // $('.block').draggable(obj.draggableConfig);
          // $('.block').draggable('enable');
        }
      });
    }
};