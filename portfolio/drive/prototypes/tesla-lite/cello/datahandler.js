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

var DataHandler = function() {
	console.log('DataHandler');
	var obj = this;
	obj.root;
	obj.fileCount = 0;
	obj.lastDepth = -1;
};

DataHandler.prototype.init = function() {
	var obj = this;

	var jsonRootStr = localStorage.getItem('jsonRoot');
	if (jsonRootStr == null || jsonRootStr == '') {
		function deferredCallback() {
			obj.root = new FolderData({
				title : 'My Drive',
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
				.setClientId('583643521913');
		config
				.setFirstPartyClientId(drive.ds.sync.SyncedConfig.FirstPartyClientId.TOPHAT);
		config.setGaiaSessionId(0);
		syncedItemService = new drive.ds.sync.GenericSyncedItemService(deferred,
				drive.ds.sync.Context.buildContext(allFields, config));
	} else {
//		obj.root = JSON.parse(jsonRootStr);
//		var render = new Render(obj.root);
		obj.render();
	}
};

DataHandler.prototype.render = function() {
	var obj = this;
	var jsonRootStr = localStorage.getItem('jsonRoot');
	obj.root = JSON.parse(jsonRootStr);
	console.log('render');
};

DataHandler.prototype.setLocalStorage = function(jsonRootStr) {
	var obj = this;
	var jsonRootStr = JSON.stringify(obj.root);
	localStorage.setItem('jsonRoot', jsonRootStr);
	console.log('render');
};

DataHandler.prototype.getRootJSONString = function() {
	var obj = this;
	var jsonRootStr = JSON.stringify(obj.root);
	return jsonRootStr;
};

DataHandler.prototype.clearLocalStorage = function() {
	localStorage.setItem('jsonRoot', '');
};

DataHandler.prototype.retrieveFolderContents = function(folder) {
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
		if (resp.target.hasMoreData()) {
			resp.target.incrementMaxCount(1000);
		} else {
			if (resp) {
				liveList.deactivate();
				var items = resp.target.getData();
				var itemList = items.getItemList();
				obj.updateFolderContents(folder, itemList);
			}
		}
	}

	var liveList = syncedItemService.query(request);
	var liveListListener = new goog.events.EventHandler();
	liveListListener.listen(liveList, drive.ds.LiveList.EventType.CHANGED, getAllItems);
	liveList.activate();
};

DataHandler.prototype.updateFolderContents = function(folder, items) {
	var obj = this;
	function createItem(item) {
		obj.fileCount++;
		var title = item.getTitle();
		var id = item.getId();
		var iconURL = item.getIconUrl();
		var mimeType = item.getMimeType();
		//var ownerName = item.getOwnerList()[0].getDisplayName();
		//console.log(item.getOwnerList());
		var ownerName = 'me';
		var thumbURL = item.getThumbnailUrl();
		var openURL = item.getOpenUrl();
		if (obj.fileCount < 100) {
			//console.log(item);
		}
		if (thumbURL) {
			thumbURL = thumbURL.replace('s220', 's320');
		}

		// console.log(item);
		// console.log(owner);

		var nextDepth = folder.depth + 1;
		folder.downloaded = true;
		if (mimeType.indexOf('folder') != -1) {
			var childFolder = new FolderData({
				title : title,
				id : id,
				depth : nextDepth,
				parent : folder,
				iconURL : iconURL,
				ownerName : ownerName,
				mimeType : mimeType
			});
			folder.addItem(childFolder);
			if (folder.depth < 5) {
				obj.retrieveFolderContents(childFolder);
			}
		} else {
			var file = new FileData({
				title : title,
				id : id,
				parent : folder,
				iconURL : iconURL,
				ownerName : ownerName,
				mimeType : mimeType,
				thumbURL : thumbURL,
				openURL : openURL
			});
			folder.addItem(file);
		}
	}
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		createItem(item);
	}
	if (obj.renderDataTimeout) {
		clearTimeout(obj.renderDataTimeout);
	}
	obj.renderDataTimeout = setTimeout(function() {
		if (obj.renderedFolders != true) {
			obj.renderedFolders = true;
			obj.setLocalStorage();
			obj.render();
		}
	}, 5000);
	console.log(obj.fileCount);
};