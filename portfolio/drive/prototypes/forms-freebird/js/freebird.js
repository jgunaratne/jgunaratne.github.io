$(document).ready(function() {

  function renderMenuBar() {
    var fileMenuData = {
        opt_label : 'File',
        menuitems : [
            {
              label : 'Share...'
            }, {
              opt_divider : true
            }, {
              label : 'New'
            }, {
              label : 'Open...'
            }, {
              label : 'Rename...'
            }, {
              label : 'Make a copy...'
            }, {
              opt_divider : true
            }, {
                label : 'See revision history',
                opt_disabled : true
            }, {
              label : 'Language'
            }, {
              opt_divider : true
            }, {
              label : 'Download as'
            }, {
                label : 'Email collaborators...',
                opt_disabled : true
            }, {
              opt_divider : true
            }, {
              label : 'Page setup...'
            }, {
              label : 'Print'
            }
        ]
    };

    var editMenuData = {
        opt_label : 'Edit',
        menuitems : [
            {
              label : 'Undo'
            }, {
              label : 'Redo'
            }, {
              opt_divider : true
            }, {
                label : 'Cut',
                opt_disabled : true
            }, {
                label : 'Copy',
                opt_disabled : true
            }, {
              label : 'Paste'
            }, {
              opt_divider : true
            }, {
              label : 'Select all'
            }, {
              opt_divider : true
            }, {
              label : 'Find and replace...'
            }
        ]
    };
    var editMenu = new dng.Menu(editMenuData);

    var viewMenuData = {
        opt_label : 'View',
        menuitems : [
            {
              label : 'Live form...'
            }, {
              label : 'Summary of responses...'
            }, {
              label : 'View linked spreadsheet...'
            }, {
              opt_divider : true
            }, {
              label : 'Compact controls'
            }, {
              label : 'Full screen'
            }
        ]
    };
    var viewMenu = new dng.Menu(viewMenuData);

    var insertMenuData = {
        opt_label : 'Insert',
        menuitems : [
            {
                label : 'Text',
                opt_id : 'textMenuItem'
            }, {
                label : 'Paragraph',
                opt_id : 'paragraphMenuItem'
            }, {
                label : 'Multiple choice',
                opt_id : 'multipleChoiceMenuItem'
            }, {
                label : 'Checkboxes',
                opt_id : 'checkboxesMenuItem'
            }, {
                label : 'Choose from list',
                opt_id : 'chooseFromListMenuItem'
            }, {
                label : 'Grid',
                opt_id : 'gridMenuItem'
            }, {
                label : 'Scale',
                opt_id : 'scaleMenuItem'
            }, {
              opt_divider : true
            }, {
              label : 'Upload a file'
            }, {
              label : 'Web address'
            }, {
                label : 'Date picker',
                opt_id : 'dateMenuItem'
            }, {
              label : 'Email address'
            }, {
              opt_divider : true
            }, {
                label : 'New section',
                opt_id : 'newSectionMenuItem'
            }, {
                label : 'New page',
                opt_id : 'newPageMenuItem'
            }
        ]
    };
    var insertMenu = new dng.Menu(insertMenuData);

    var responsesMenuData = {
        opt_label : 'Responses',
        menuitems : [
            {
              label : 'TBD'
            }, {
              opt_divider : true
            }, {
              label : 'TBD'
            }
        ]
    };
    var responsesMenu = new dng.Menu(responsesMenuData);

    var helpMenuData = {
        opt_label : 'Help',
        menuitems : [
            {
              label : 'Google Docs Help Center'
            }, {
              label : 'Learn from other Google users'
            }, {
              label : 'New features'
            }, {
              opt_divider : true
            }, {
              label : 'Report an issue'
            }, {
              label : 'Report abuse'
            }, {
              opt_divider : true
            }, {
              label : 'Keyboard shortcuts'
            }
        ]
    };
    var helpMenu = new dng.Menu(helpMenuData);

    // var menuBar = new dng.MenuBar(menubarData);

    var fileMenu = new dng.Menu(fileMenuData);
    // var helpMenu = new dng.Menu(helpMenuData);

    var menubarData = {
      menus : [
          fileMenu, editMenu, viewMenu, insertMenu, responsesMenu, helpMenu
      ]
    };
    var menuBar = new dng.MenuBar(menubarData);
    // $(menuBar).bind('rendered.MenuBar', handleMenuBarRendered);
    // Replace menus.
    menuBar.render($('.menu'));

  }

  renderMenuBar();

  var selectedLi;

  var mdQuestion;
  $('.question').live('mousedown', function(e) {
    mdQuestion = $(this);
  });

  $('.questions').sortable({
      placeholder : 'highlight',
      connectWith : '.questions',
      helper : 'clone',
      start : function(e, ui) {
        var ghost = mdQuestion.clone();
        ghost.css('opacity', .33);
        $('.highlight').append(ghost);
      }
  });

  $('.answers').sortable({
      handle : '.answer-handle',
      placeholder : 'highlight'
  });

  $('.sortable').sortable({
    placeholder : "highlight"
  });

  $('.pages').sortable({
      handle : '.page-header',
      placeholder : 'highlight',
  });

  $('.answer').live('click', function(e) {
    $('.question').removeClass('selected');
    $('.answer, .question .question-title, .page h1').removeClass('active');
    $(e.currentTarget).addClass('active');

    var a = $(this);
    setTimeout(function(e) {
      a.parents('.question').addClass('selected');
    }, 0);

    e.stopPropagation();
  });

  $('.question .question-title').live('click', function(e) {
    $('.answer, .question .question-title, .page h1').removeClass('active');
    $(e.currentTarget).addClass('active');

    var a = $(this);
    setTimeout(function(e) {
      a.parents('.question').addClass('selected');
    }, 0);

    e.stopPropagation();
  });

  $('.page h1').live('click', function(e) {
    $('.answer, .question, .page h1').removeClass('active');
    $(e.currentTarget).addClass('active');
    e.stopPropagation();
  });

  $(document).on('click', function(e) {
    $('.answer, .question .question-title, .page h1').removeClass('active');
    $('.question').removeClass('selected');
    $('.form-description').removeClass('selected');
  });

  $('.edit.icon').live('click', function(e) {
    var q = $(e.currentTarget).parents('.question');
    q.toggleClass('edit');
  });

  $('.answers .remove.icon').live('click', function(e) {

    var mult = $(this).parents('.multiple-choice-question');
    var tx = mult.find('.textarea-options');

    console.log(ans);

    var a = $(e.currentTarget).parent();
    a.remove();

    e.stopPropagation();

    var ans = mult.find('.answer');

    var str = '';
    for ( var i = 0; i < ans.length; i++) {
      str += $(ans[i]).val() + '\n';
    }
    tx.val(str);

  });

  $('.question-header .delete.icon').live('click', function(e) {
    var q = $(e.currentTarget).parents('.question');
    q.remove();
  });

  $('.page-header .delete.icon').live('click', function(e) {
    var p = $(e.currentTarget).parents('.page');
    p.remove();
  });

  $('.answer').live('keydown', function(e) {
    var a = $(e.currentTarget).parents('.answers');
    var input = $(e.currentTarget);
    if (input.val().length > -1 && !input.hasClass('text') && !input.hasClass('date')) {
      var li = $('<li><div class="answer-handle"></div><input type="radio" name="a1"><input class="answer"></li>');
      var l = input.parent();
      var rIcon = l.find('.remove.icon');
      if (rIcon.length == 0) {
        var d = $('<div class="remove icon"></div>');
        l.append(d);
        a.append(li);
      }
    }
  });

  $('.date').live('mousedown', function(e) {
    var f = $(this);
    if (f.val() == 'mm/dd/yyyy') {
      f.val('');
      f.css('color', '#222');
    }
  });

  $('button.date').live('mousedown', function(e) {
    var dp = $(this).find('.kd-datepicker');
    dp.toggleClass('shown');
  });

  $('.question').live('click', function(e) {

    var q = $(this);
    var selected = false;
    if (q.hasClass('selected')) {
      selected = true;
    }

    if ($(e.srcElement).hasClass('answer')) {
      q.addClass('selected');
    } else {
      $('.question').removeClass('selected');
      if (selected) {
        q.removeClass('selected');
      } else {
        q.addClass('selected');
      }
    }
    e.stopPropagation();
  });

  $('#newSectionBtn, #newSectionMenuItem').live('click', function(e) {
    var sec = $($('.section')[0]);
    var nSec = sec.clone();

    var li = $('<li>');
    li.append(nSec);

    var qs;
    var sel = $('.questions .selected');
    if (sel.length == 0) {

      if ($(e.target).parent().hasClass('controls')) {
        qs = $(e.target).parents('.page').find('.questions');
        qs.append(li);
      } else {
        var qs = $('.questions');
        $(qs[qs.length - 1]).append(li);
      }

    } else {
      qs = $('.questions .selected').parents('.page').find('.questions');
      qs.append(li);
    }

    window.scrollTo(0, li.offset().top);

  });

  $('.new-question').live('click', function(e) {

    $('.question').removeClass('selected');

    var li = $('<li></li>');
    var q = $($('.question.multiple-choice-question')[0]).clone();
    q.addClass('selected');
    li.append(q);

    li.addClass('highlight-insertion');
    setTimeout(function() {
      li.removeClass('highlight-insertion');
    }, 250);

    var qs;
    var sel = $('.questions .selected');
    if (sel.length == 0) {

      if ($(e.target).parent().hasClass('controls')) {
        qs = $(e.target).parents('.page').find('.questions');
        qs.append(li);

      } else {
        var qs = $('.questions');
        $(qs[qs.length - 1]).append(li);
        window.scrollTo(0, li.offset().top);
      }

    } else {
      qs = $('.questions .selected').parents('.page').find('.questions');
      qs.append(li);
    }

    e.stopPropagation();

  });

  $('.type-select').live('click', function(e) {
    var ts = $(this);

    selectedLi = $(ts.parents('li')[0]);

    $('.menu-picker').toggle();
    $('.menu-picker').css('left', ts.offset().left + 'px').css('top', ts.offset().top + 31 + 'px');
    e.stopPropagation();
  });

  $('.multi-options').live('click', function(e) {
    var mo = $(this);
    mo.toggleClass('show');

  });

  var pageCount = 1;
  $('#newPageBtn').live('click', function(e) {

    var content = $('<li></li>');
    var q = $($('.question.multiple-choice-question')[0]).clone();

    content.append(q);

    var f = $('.form .pages');
    pageCount++;
    var p = $('<div class="page"><div class="dog-ear">Page ' + pageCount + '</div><div class="page-header"><div class="handle middle"></div><div class="delete icon right"></div></div><h1>Page ' + pageCount + ' title</h1><ul class="questions"><li></li>' + content.html() + '</ul></div>');

    var ctrls = '<div class="controls">\
        <button class="new-question">Add Question</button>\
        <div class="clear"></div>\
      </div>';

    p.append(ctrls);

    p.addClass('highlight-insertion');
    setTimeout(function() {
      p.removeClass('highlight-insertion');
    }, 250);

    var li = $('<li>');
    li.append(p);
    f.append(li);

    window.scrollTo(0, document.body.scrollHeight);

    $('.questions').sortable({
        handle : '.question-header',
        placeholder : 'highlight',
        connectWith : '.questions'
    });

    setTimeout(function() {
      p.find('.question').addClass('selected');
    }, 500);

  });

  $('.placeholder').live('click', function(e) {
    $(this).removeClass('placeholder');
    if (this.tagName == 'INPUT') {
      $(this).val('');
    } else {
      $(this).html('');
    }
  });

  $('.answer').live('blur', function(e) {
    if (this.tagName == 'INPUT' && $(this).val() == '') {
      $(this).val('Answer');
      $(this).addClass('placeholder');
    }
  });

  $('.question-content .question-title').live('blur', function(e) {
    if ($(this).val() == '') {
      $(this).val('Enter your question text here.');
      $(this).addClass('placeholder');
    }
  });

  $('.question-content .question-title').live('click', function(e) {
    e.stopPropagation();
  });

  $('.menu-picker').click(function(e) {
    var t = $(e.target);
    if (!t.hasClass('menu-picker')) {

      var className = t.text().toLowerCase().replace(/ /g, '-') + '-question';
      var qType = $($('.' + className)[0]);

      if (qType.length > 0) {
        var nType = qType.clone();
        var li = $('<li>');
        li.append(nType);
        li.find('.question').addClass('selected');
        selectedLi.after(li);
        selectedLi.remove();
      }
    }
    $(this).hide();
    clearTimeout(mpTimer);
    e.stopPropagation();
  });

  $('.advanced-settings').live('click', function(e) {
    $(this).parents('.question-settings').toggleClass('closed');
    e.stopPropagation();
  });

  $('.col-btn').live('click', function(e) {
    console.log($(this).text() * 1);
    e.stopPropagation();
  });

  $('.options-done-button').live('click', function(e) {
    var qs = $(this).parents('.question-settings');
    var cp = qs.find('.control-panel');
    cp.animate({
      height : 0
    }, 333, function() {
      qs.addClass('closed');
      cp.css('height', 'auto');
    });
  });

  $('.dialog .button-confirm-group button').live('click', function(e) {
    var btn = $(this);

    btn.parents('.dialog').hide();
    $('.dialog-bg').hide();

  });

  $('.dialog .theme-thumb').live('click', function(e) {
    $(this).parent().find('.theme-thumb').removeClass('selected');
    $(this).addClass('selected');

    var font = $(this)[0].className.replace(/(theme-thumb|selected)/g, '');

    $('.form h1, .form .question-title').removeClass('judson');
    $('.form h1, .form .question-title').removeClass('candy');
    $('.form h1, .form .question-title').removeClass('trocchi');
    $('.form h1, .form .question-title').removeClass('electrolize');
    $('.form h1, .form .question-title').removeClass('ubuntu');

    $('.form h1, .form .question-title').addClass(font);

    $('body').css('background', $(this).css('background'));
  });

  $('.dialog .theme-thumb').live('dblclick', function(e) {
    $(this).parents('.dialog').hide();
    $('.dialog-bg').hide();

    setTimeout(function() {
      console.log($('#initialQuestion .question'));
      $('#initialQuestion .question').addClass('selected');
    }, 100);

  });

  $('#changeThemeBtn').on('click', function(e) {
    $('.dialog.theme').show();
    $('.dialog-bg').show();
  });

  function addQuestion(e, type) {
    var li = $('<li></li>');
    var q = $($('.question.' + type + '-question')[0]).clone();
    li.append(q);

    li.addClass('highlight-insertion');
    setTimeout(function() {
      li.removeClass('highlight-insertion');
    }, 250);

    var qs;
    var sel = $('.questions .selected');
    if (sel.length == 0) {

      if ($(e.target).parent().hasClass('controls')) {
        qs = $(e.target).parents('.page').find('.questions');
        qs.append(li);

      } else {
        var qs = $('.questions');
        $(qs[qs.length - 1]).append(li);
        window.scrollTo(0, li.offset().top);
      }

    } else {
      qs = $('.questions .selected').parents('.page').find('.questions');
      qs.append(li);
    }
  }

  $('#textMenuItem').live('click', function(e) {
    addQuestion(e, 'text');
  });

  $('#paragraphMenuItem').live('click', function(e) {
    addQuestion(e, 'paragraph');
  });

  $('#multipleChoiceMenuItem').live('click', function(e) {
    addQuestion(e, 'multiple-choice');
  });

  $('#checkboxesMenuItem').live('click', function(e) {
    addQuestion(e, 'checkboxes');
  });

  $('#chooseFromListMenuItem').live('click', function(e) {
    addQuestion(e, 'choose-from-list');
  });

  $('#scaleMenuItem').live('click', function(e) {
    addQuestion(e, 'scale');
  });

  $('#dateMenuItem').live('click', function(e) {
    addQuestion(e, 'date');
  });

  $('.desc').live('click', function(e) {

    var input = $(this).find('input');

    if (input.length == 0) {
      $(this).html('');
      var d = $('<input class="desc-text">');
      $(this).parents('.form-description').addClass('selected');
      $(this).append(d);
      d.focus();
    }

    e.stopPropagation();

  });

  $('.desc input').live('click', function(e) {
    $(this).parents('.question').addClass('selected');
    $(this).parents('.form-description').addClass('selected');
    e.stopPropagation();
  });

  $(document).on('blur', '.multiple-choice-question .answer', function(e) {

    var tx = $(this).parents('.multiple-choice-question').find('.textarea-options');
    var ans = $(this).parents('.answers').find('.answer');

    var str = '';
    for ( var i = 0; i < ans.length; i++) {
      str += $(ans[i]).val() + '\n';
    }
    tx.val(str);

  });

  $(document).on('keyup', '.multiple-choice-question .answer', function(e) {

    var tx = $(this).parents('.multiple-choice-question').find('.textarea-options');
    var ans = $(this).parents('.answers').find('.answer');

    var str = '';
    for ( var i = 0; i < ans.length; i++) {
      str += $(ans[i]).val() + '\n';
    }
    tx.val(str);

  });

  $(document).on('keyup', '.multiple-choice-question .textarea-options', function(e) {

    var ans = $(this).parents('.multiple-choice-question').find('.answers');
    ans.html('');

    var val = $(this).val();
    var lines = val.split('\n');
    for ( var i = 0; i < lines.length; i++) {
      var li = '<li><div class="answer-handle"></div> <input type="radio" name="a1"><input class="answer placeholder" value="' + lines[i] + '"><div class="remove icon"></div></li>'
      ans.append(li);
    }

  });

  var mpTimer;
  $('.menu-picker').live({
      mouseover : function(e) {
        if (mpTimer) {
          clearTimeout(mpTimer);
        }
        mpTimer = setTimeout(function() {
          $('.menu-picker').show();
        }, 250);
      },
      mouseout : function(e) {
        if (mpTimer) {
          clearTimeout(mpTimer);
        }
        mpTimer = setTimeout(function() {
          $('.menu-picker').hide();
        }, 250);
      }
  });

  $('.type-select').live({
    mouseout : function(e) {
      if (mpTimer) {
        clearTimeout(mpTimer);
      }
      mpTimer = setTimeout(function() {
        $('.menu-picker').hide();
      }, 250);
    }
  });

  $('.question-item').live('click', function(e) {

    var input = $(this).find('input');
    var state = input.attr('checked');

    if (state == null) {
      input.attr('checked', 'checked');
    } else {
      input.attr('checked', null);
    }
    e.stopPropagation();

  });

  $('.desc-text').live('blur', function(e) {
    var dt = $(this);
    if (dt.val() == '') {
      dt.parent().html('<a href="#">Add Description</a>');
    }
  });

  $('input').live('keyup', function(e) {
    if (e.keyCode == 13) {
      var answers = $(this).parents('.question').find('.answer');

      var selectedN;
      for ( var i = 0; i < answers.length; i++) {
        if (this == answers[i]) {
          selectedN = i;

          if ($(answers[i]).val() != '') {
            $(answers[i]).removeClass('placeholder');
          }

        }
      }

      if (selectedN == null) {
        selectedN = -1;
      }

      $(answers[selectedN + 1]).focus();
      $(answers[selectedN + 1]).val('');
      $(answers[selectedN + 1]).removeClass('placeholder');
    }
  });

  setTimeout(function() {
    console.log($('#initialQuestion .question'));
    $('#initialQuestion .question').addClass('selected');
  }, 100);

  $('.dialog-bg').hide();
  $('.dialog.theme').hide();

  $('.dialog.share').hide();
  $('.dialog.access').hide();
  $('.dialog.send').hide();

  $('.send-btn').on('click', function() {
    $('.dialog-bg').show();
    $('.dialog.send').show();
  });

  $('#shareBtn').on('click', function() {
    $('.dialog-bg').show();
    $('.dialog.share').show();
  });

  $('.add-people-field').on('click', function() {
    $('.add-people-field').html('');
    $('.add-people-field').removeClass('edit-instructions');
    $('.sub-pane-options').show();
    $('.button-confirm-group .blue').hide();

    $('.dropdown-container').show();
    $('.dialog.share .add-people-field').css('width', '320');

  });

  $('.sub-pane-options button').on('click', function(e) {
    $('.sub-pane-options').hide();
    $('.button-confirm-group .blue').show();

    setTimeout(function() {
      $('.add-people-field').val('');
    }, 100);
    
    $('.dropdown-container').hide();
    $('.dialog.share .add-people-field').css('width', '97.8%');

  });

  $('.sub-pane-options button.save').on('click', function(e) {
    updateList(e);
  });

  $('.scrolling-pane .remove.icon').live('click', function(e) {
    $(e.currentTarget).parents('li').remove();
  });

  updateList = function(e) {

    var target = $(e.currentTarget);
    var dialog = target.parents('.dialog');
    var field = dialog.find('.add-people-field');

    var updateBtn = dialog.find('.green');
    // updateBtn.html('Done');
    // updateBtn.removeClass('green');
    // updateBtn.addClass('blue');

    var val = field.val().replace(/,/g, ' ').replace(/\s{1,}/g, ' ');
    var vals = val.split(' ');
    var pane = $(dialog.find('.scrolling-pane ul')[0]);

    for ( var i = 0; i < vals.length; i++) {

      var nVal = vals[i];

      if (nVal != '') {

        if (dialog.hasClass('share')) {
          var li = $('<li><div class="mug"><span class="person icon"></span></div>\
        <div class="line-info">\
          <span class="email">' + vals[i] + '</span>\
        </div>\
          <div class="line-options">\
          <a href="#" class="dropdown"><span class="selected">Can edit</span> <span class="icon"></span> </a>\
          <ul class="multi-options-contents">\
            <li><a>Can edit</a></li>\
            <li><a>Can comment</a></li>\
            <li><a>Can view</a></li>\
          </ul>\
        </div>\
        <div class="remove icon"></div>\
        <div class="clear"></div></li>');

          pane.append(li);

        }

        if (dialog.hasClass('send')) {
          var li = $('<li><div class="mug"><span class="person icon"></span></div>\
        <div class="line-info">\
          <span class="email">' + vals[i] + '</span>\
        </div>\
          <div class="line-options">\
          <ul class="multi-options-contents">\
            <li><a>Can respond</a></li>\
          </ul>\
        </div>\
        <div class="remove icon"></div>\
        <div class="clear"></div></li>');

          pane.append(li);

        }

      }
    }
    dialog.find('.add-on-enter').val('');

  };

  $('.add-on-enter').on('keyup', function(e) {
    if (e.keyCode == 13) {
      updateList(e);
    }
  });

  $('.dialog.send .add-on-enter').on('keypress', function(e) {
    var field = $(e.currentTarget);
    var dialog = field.parents('.dialog');
    var doneBtn = dialog.find('.blue');

    // doneBtn.html('Send and save');
    // doneBtn.removeClass('blue');
    // doneBtn.addClass('green');
  });

  $('.dialog.share .add-on-enter').on('keypress', function(e) {
    var field = $(e.currentTarget);
    var dialog = field.parents('.dialog');
    var doneBtn = dialog.find('.blue');

    // doneBtn.html('Share and save');
    // doneBtn.removeClass('blue');
    // doneBtn.addClass('green');
  });

  $('.dropdown').live('click', function(e) {
    var dd = $(e.currentTarget);
    var opts = dd.parent().find('.multi-options-contents');
    if (opts) {
      opts.show();
      if (opts.offset()) {
        opts.css('top', opts.offset().top);
        opts.css('left', opts.offset().left);
        opts.css('position', 'fixed');
      }
    }
  });

  $('.multi-options-contents a').live('click', function(e) {
    var opts = $(e.currentTarget);
    opts.parents('.multi-options-contents').hide();
    var content = opts.text();
    opts.parents('.line-options').find('.selected').html(content);
  });

  var menuTimeout;
  $('.multi-options-contents').on({
      mouseover : function() {
        if (menuTimeout)
          clearTimeout(menuTimeout);
      },
      mouseout : function() {
        var d = $(this);
        if (menuTimeout)
          clearTimeout(menuTimeout);
        menuTimeout = setTimeout(function() {
          d.hide();
        }, 750);
      }
  });

  $('.optional-message-link').on('click', function(e) {
    $('.optional-message-pane').show();
    $('.optional-message-link').hide();
  });

  $('.change-access-link').on('click', function(e) {
    $('.dialog.access').show();

    if ($('.dialog.send').is(':visible')) {
      $('.action-verb').html('respond');
    } else {
      $('.action-verb').html('view');
    }

  });

  $('#changeAccessBtn').on('click', function(e) {
    var d = $('#changeAccessBtn').parents('.dialog.access');

    var selLi;
    var ins = d.find('input');
    for ( var i = 0; i < ins.length; i++) {
      var c = $(ins[i]);
      if (c.attr('checked') == 'checked') {
        selLi = c.parent();
      }
    }

    var selIcon = selLi.find('.icon');

    if ($('.dialog.send').is(':visible')) {

      var dispLi = $('.dialog.send li.access');
      var lineInfo = dispLi.find('.line-info');
      var lineIcon = dispLi.find('.icon');

      lineIcon.removeClass('public');
      lineIcon.removeClass('org');
      lineIcon.removeClass('private');

      if (selIcon.hasClass('public')) {
        lineInfo.html('Anyone on the internet can <strong>find and respond</strong>.');
        lineIcon.addClass('public');
      } else if (selIcon.hasClass('org')) {
        lineInfo.html('Anyone who has the link can <strong>respond</strong>.');
        lineIcon.addClass('org');
      } else if (selIcon.hasClass('icon')) {
        lineInfo.html('Only the people listed below can <strong>respond</strong>.');
        lineIcon.addClass('private');
      }
    }

    if ($('.dialog.share').is(':visible')) {
      var dispLi = $('.dialog.share li.access');
      var lineInfo = dispLi.find('.line-info');
      var lineIcon = dispLi.find('.icon');

      lineIcon.removeClass('public');
      lineIcon.removeClass('org');
      lineIcon.removeClass('private');

      if (selIcon.hasClass('public')) {
        lineInfo.html('Anyone on the internet can <strong>find and view</strong>.');
        lineIcon.addClass('public');
      } else if (selIcon.hasClass('org')) {
        lineInfo.html('Anyone who has the link can <strong>view</strong>.');
        lineIcon.addClass('org');
      } else if (selIcon.hasClass('icon')) {
        lineInfo.html('Only the people listed below can <strong>access</strong>.');
        lineIcon.addClass('private');
      }

    }

  });

});
