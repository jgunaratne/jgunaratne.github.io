var allFields = [ drive.ds.Field.PARENTS, drive.ds.Field.TITLE,
    drive.ds.Field.MIME_TYPE, drive.ds.Field.STARRED, drive.ds.Field.HIDDEN,
    drive.ds.Field.TRASHED, drive.ds.Field.RESTRICTED, drive.ds.Field.VIEWED,
    drive.ds.Field.CREATE_DATE_MILLIS, drive.ds.Field.MODIFIED_DATE_MILLIS,
    drive.ds.Field.MODIFIED_BY_ME_DATE_MILLIS,
    drive.ds.Field.LAST_VIEWED_BY_ME_DATE_MILLIS, drive.ds.Field.FILE_SIZE,
    drive.ds.Field.OWNER_ID, drive.ds.Field.OWNER_DISPLAY_NAME,
    drive.ds.Field.OWNER_PHOTO_URL, drive.ds.Field.LAST_MODIFYING_USER_ID,
    drive.ds.Field.LAST_MODIFYING_USER_DISPLAY_NAME,
    drive.ds.Field.LAST_MODIFYING_USER_PHOTO_URL, drive.ds.Field.OPEN_URL,
    drive.ds.Field.THUMBNAIL_URL, drive.ds.Field.ICON_URL, drive.ds.Field.ID,
    drive.ds.Field.SHARED, drive.ds.Field.SHARED_WITH_ME_DATE_MILLIS,
    drive.ds.Field.DESCRIPTION, drive.ds.Field.USER_ROLE,
    drive.ds.Field.EXPLICITLY_TRASHED, drive.ds.Field.IMAGE_DATE_MILLIS,
    drive.ds.Field.IMAGE_WIDTH, drive.ds.Field.IMAGE_HEIGHT ];

var App = function() {
  var obj = this;
  obj.root;
  obj.fileCount = 0;
  obj.maxDepth = 4;
  obj.folderIdHash = [];
  obj.lastFolderId = 'root';
};

App.prototype.init = function() {
  var obj = this;
  var rootJSON = localStorage.getItem('root');
  if (rootJSON == null || rootJSON == 'null') {
    obj.getData();
  } else {
    obj.root = JSON.parse(localStorage.getItem('root'));
    obj.fileCount = localStorage.getItem('fileCount');
    $('.file-count').text(obj.fileCount);
    $('.status').fadeOut();
    obj.renderItems(obj.root, $('#items'));
  }
  obj.folderIdHash['root'] = obj.root;
};

App.prototype.getData = function() {
  var obj = this;
  function deferredCallback() {
    obj.root = new Folder({
      title : 'My Files',
      id : 'root',
      depth : 0
    });
    obj.retrieveFolderContents(obj.root);
  }
  var deferred = new goog.async.Deferred();
  deferred.addCallback(function() {
    deferredCallback();
  });
  var config = new drive.ds.sync.SyncedConfig().setUseThirdPartyAuth(true)
      .setClientId('583643521913-vg5plv8etnf3t2895g675arkp9bdlqe1');
  config
      .setFirstPartyClientId(drive.ds.sync.SyncedConfig.FirstPartyClientId.TOPHAT);
  config.setGaiaSessionId(0);
  syncedItemService = new drive.ds.sync.GenericSyncedItemService(deferred,
      drive.ds.sync.Context.buildContext(allFields, config));
};

App.prototype.retrieveFolderContents = function(folder) {
  var obj = this;
  var parentSpec = new drive.ds.ParentSpec();
  parentSpec.setValue(folder.id);

  var sortSpec = new drive.ds.SortSpec();
  sortSpec.setType(drive.ds.SortSpec.Type.FOLDER_TITLE);

  var request = new drive.ds.ItemQueryRequest();
  request.setParentList([ parentSpec ]);
  request.setTrashed(false);
  request.setFieldList(allFields);
  request.setSort(sortSpec);

  function getAllItems(resp) {
    if (resp.target.hasMoreItems()) {
      resp.target.incrementMaxItems(1000);
    } else {
      if (resp) {
        liveList.deactivate();
        var items = resp.target.getItems();
        var itemList = items.getItemList();
        obj.updateFolderContents(folder, itemList);
      }
    }
  }

  var liveList = syncedItemService.query(request);
  var liveListListener = new goog.events.EventHandler();
  liveListListener.listen(liveList,
      drive.ds.ItemQueryLiveList.EventType.CHANGED, getAllItems);
  liveList.activate();
};

App.prototype.updateFolderContents = function(folder, items) {
  var obj = this;
  function createItem(item) {
    obj.fileCount++;
    var title = item.getTitle();
    var id = item.getId();
    var iconURL = item.getIconUrl();
    var ownerName = item.getOwnerList()[0].getDisplayName();
    var mimeType = item.getMimeType();
    var nextDepth = folder.depth + 1;
    var parentId = folder.id;
    var date = item.getCreateDateMillis();
    if (obj.fileCount < 10) {
      console.log(item);
    }

    folder.downloaded = true;
    if (mimeType.indexOf('folder') != -1) {
      var childFolder = new Folder({
        title : title,
        id : id,
        depth : nextDepth,
        parent : folder,
        parentId : parentId,
        mimeType : mimeType,
        ownerName : ownerName,
        iconURL : iconURL,
        date : date
      });
      folder.addItem(childFolder);
      if (folder.depth < obj.maxDepth) {
        obj.retrieveFolderContents(childFolder);
      }
    } else {
      var file = new File({
        title : title,
        id : id,
        parent : folder,
        parentId : parentId,
        mimeType : mimeType,
        ownerName : ownerName,
        iconURL : iconURL,
        date : date
      });
      folder.addItem(file);
    }
  }
  for ( var i = 0; i < items.length; i++) {
    var item = items[i];
    createItem(item);
  }
  $('.file-count').text(obj.fileCount);
  if (obj.renderDataTimeout) {
    clearTimeout(obj.renderDataTimeout);
  }
  obj.renderDataTimeout = setTimeout(function() {
    if (obj.renderedFolders != true) {
      obj.renderedFolders = true;
      var rootJSON = JSON.stringify(obj.root);
      localStorage.setItem('root', rootJSON);
      localStorage.setItem('fileCount', obj.fileCount);
      obj.renderItems(obj.root, $('#items'));
      $('.status').fadeOut();
    }
  }, 2500);
};

App.prototype.renderItems = function(folder, domParent) {
  var obj = this;
  var items = folder.contents;
  var ul = $('<ul class="folder">');
  ul.hide();
  if (folder.depth == 0) {
    domParent.html('');
    ul.show();
  }
  if (folder.depth <= obj.maxDepth) {
    for ( var i = 0; i < items.length; i++) {
      var item = items[i];
      var li = $('<li class="item"><div class="twisty"></div><div class="icon">\
          <div class="inner-icon"></div></div><span class="title">'
          + item.title
          + '</span><span class="owner">Me</span>\
          <span class="date">Today</span></li>');
      var icon = li.find('.icon');
      if (item.type == 'folder') {
        icon.addClass('folder-icon');
        if (item.contents.length == 0) {
          icon.parent().find('.twisty').remove();
        }
        obj.folderIdHash[item.id] = item;
      } else {
        icon.addClass('page-icon');
        icon.find('.inner-icon').css('background-image',
            'url(' + item.iconURL + ')');
        icon.parent().find('.twisty').remove();
      }
      li.find('.owner').text(item.ownerName);
      var dateStr = (new Date(item.date)).toString();
      var dateArr = dateStr.split(' ');
      li.find('.date').text(dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[3]);
      li.data(item);
      ul.append(li);
      if (item.contents && item.contents.length > 0) {
        obj.renderItems(item, ul);
      }
    }
    domParent.append(ul);
  }
};

App.prototype.addEvents = function() {
  var obj = this;

  $(document).on('click', '.item', function(e) {
    var li = $(this);
    li.toggleClass('selected');
    if (li.hasClass('selected')) {
      $('.item').removeClass('selected');
      li.addClass('selected');
    } else {
      $('.item').removeClass('selected');
      li.removeClass('selected');
    }
  });

  $(document).on('click', '.twisty', function(e) {
    var li = $(this).parent();
    $(this).toggleClass('open');
    var item = li.data();
    var subFolder = li.next('ul');
    subFolder.toggle();
    e.stopPropagation();
  });

  $('.avatar').on('click', function() {
    localStorage.setItem('root', null);
    console.log('Cleared root');
    location.reload();
  });

  $('.double-list-view').on('click', function() {
    $('.items-container').addClass('half');
    $('.items2').show();
  });

  $('.list-view').on('click', function() {
    $('.items-container').removeClass('half');
    $('.items2').hide();
  });

  $(document).on('click', '.items1 .item', function(e) {
    var li = $(this);
    var item = li.data();
    console.log(item);
    $('#items2').html('');
    obj.renderItems(item, $('#items2'));
    $('#items2 .folder:first').show();
  });

  $(document).on('dblclick', '.items1 .item', function(e) {
    var li = $(this);
    var item = li.data();
    if (item.type == 'folder') {
      $('#items').html('');
      $('#items2').html('');
      obj.renderItems(item, $('#items'));
      $('#items .folder:first').show();
      $('.back-btn').show();
    }
    e.stopPropagation();
  });

  $(document).on('dblclick', '.items2 .item', function(e) {
    var li = $(this);
    var item = li.data();
    if (item.type == 'folder') {
      $('#items').html('');
      $('#items2').html('');
      obj.renderItems(item, $('#items'));
      $('#items .folder:first').show();
      $('.back-btn').show();
    }
    e.stopPropagation();
  });

  $('.back-btn').on('click', function() {
    var firstItem = $('#items .item:first').data();
    if (firstItem && firstItem.parentId) {
      var currFolder = obj.folderIdHash[firstItem.parentId];
      if (currFolder) {
        var parentFolder = obj.folderIdHash[currFolder.parentId];
        if (parentFolder) {
          $('#items').html('');
          $('#items2').html('');
          $('body, li, .back-btn').addClass('wait');
          setTimeout(function() {
            obj.renderItems(parentFolder, $('#items'));
            $('body, li, .back-btn').removeClass('wait');
            $('#items .folder:first').show();
          }, 100);
        } else {
          obj.renderItems(obj.root, $('#items'));
        }
        if (currFolder.parentId == 'root') {
          $('.back-btn').hide();
        }
      }
    } else {
      obj.renderItems(obj.root, $('#items'));
    }

  });

};

var app = new App();
app.init();
app.addEvents();
