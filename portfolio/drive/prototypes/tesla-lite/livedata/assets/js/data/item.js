var FolderData = function(config) {
  var obj = this;
  obj.title = config.title;
  obj.id = config.id;
  obj.depth = config.depth;
  obj.contents = [];
  //obj.parent = config.parent;
  obj.downloaded = false;
  obj.type = 'folder';
  obj.ownerName = config.ownerName;
  obj.iconURL = config.iconURL;
  obj.mimeType = config.mimeType;
  if (config.downloaded) {
    obj.downloaded = config.downloaded;
  }
};

FolderData.prototype.addItem = function(item) {
  var obj = this;
  obj.contents.push(item);
};

var FileData = function(config) {
  var obj = this;
  obj.title = config.title;
  obj.id = config.id;
  //obj.parent = config.parent;
  obj.type = 'file';
  obj.ownerName = config.ownerName;
  obj.iconURL = config.iconURL;
  obj.thumbURL = config.thumbURL;
  obj.mimeType = config.mimeType;
  obj.openURL = config.openURL;
};