var Folder = function(config) {
  var obj = this;
  obj.title = config.title;
  obj.id = config.id;
  obj.depth = config.depth;
  obj.contents = [];
  //obj.parent = config.parent;
  obj.parentId = config.parentId;
  obj.downloaded = false;
  obj.type = 'folder';
  obj.ownerName = config.ownerName;
  obj.iconURL = config.iconURL;
  obj.mimeType = config.mimeType;
  obj.date = config.date;
  if (config.downloaded) {
    obj.downloaded = config.downloaded;
  }
};

Folder.prototype.addItem = function(item) {
  var obj = this;
  obj.contents.push(item);
};

var File = function(config) {
  var obj = this;
  obj.title = config.title;
  obj.id = config.id;
  //obj.parent = config.parent;
  obj.parentId = config.parentId;
  obj.type = 'file';
  obj.ownerName = config.ownerName;
  obj.iconURL = config.iconURL;
  obj.mimeType = config.mimeType;
  obj.date = config.date;
};