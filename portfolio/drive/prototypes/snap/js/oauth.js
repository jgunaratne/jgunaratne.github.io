DocsList = function(config) {
  var obj = this;
  obj.fileHierarchy = {};
  obj.fileHierarchy['Root'] = [];
};

DocsList.prototype = {
    checkCookies : function() {

      var obj = this;

      obj.accessToken = $.cookie('docslist-oauth');

      console.log(obj.accessToken);

      if (!obj.accessToken) {
        console.log("No Access Token Cookie is set");
        // check if there is a hash with the access_token
        if (location.hash) {
          console.log("hash: " + location.hash);
          var hashStr = location.hash;
          var tokenHash = hashStr.match(/#access_token=/);
          if (tokenHash) {
            // if there is save it to the document.cookie
            var hashStr = hashStr.slice(14);
            console.log(hashStr);
            var index = hashStr.indexOf('&');

            // and set tg.access_token to the hash access_token
            obj.accessToken = hashStr.substr(0, index);
            console.log(obj.accessToken);

            $.cookie("docslist-oauth", obj.accessToken);

            // then erase it from the location.hash
            window.location.href = '#';
          }

        }

        // if not, redirect user to the oauth page
        if (!obj.accessToken) {
          var clientId = '200261659672-v2306d1gm4c7kend80k4d8m6evgipseq.apps.googleusercontent.com';
          var redirectURL = "http://junius.nyc.corp.google.com/workspace/snap";
          window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=' + redirectURL + '&scope=https://docs.google.com/feeds/&response_type=token';
        }

      }
    },

    requestGlobalFeed : function() {
      var obj = this;
      var callUrl = 'https://docs.google.com/feeds/default/private/full?v=3&access_token=' + obj.accessToken + '&alt=json&showfolders=true';

      var xhr = $.ajax({
          url : callUrl,
          dataType : "jsonp",
          success : function(data) {
            console.log("success getting gDrive data");
            console.log(data);
            obj.populateDocsList(data);
          },
          error : function(data) {
            console.log("error: could not get gDrive data");
          }
      });
    },

    requestRootCollections : function() {
      var obj = this;
      var callUrl = 'https://docs.google.com/feeds/default/private/full/folder%3Aroot/contents/-/folder?v=3&access_token=' + obj.accessToken + '&alt=json&callback=?';

      var xhr = $.ajax({
          url : callUrl,
          dataType : "jsonp",
          success : function(data) {
            console.log("success getting gDrive collections");
            console.log(data);
          },
          error : function(data) {
            console.log("error: could not get gDrive collections");
          }
      });

    },

    populateDocsList : function(docsData) {

      var obj = this;
      var docsList = $('#docsList ul');

      var entries = docsData.feed.entry;
      for ( var i = 0; i < entries.length; i++) {
        var modifiedDate = entries[i].updated.$t.split('T')[0];
        var resourceType = entries[i].gd$resourceId.$t.split(':')[0]
        var links = entries[i].link;
        var collectionName = '';
        var docTitle = entries[i].title.$t;
        var authorName = entries[i].author[0].name.$t;

        var parent = false;
        for ( var j = 0; j < links.length; j++) {
          if (links[j].rel.split('#')[1] == 'parent') {
            collectionName = links[j].title;
            parent = true;
          }
        }

        if (obj.fileHierarchy[collectionName] == null) {
          obj.fileHierarchy[collectionName] = [];
        }

        if (parent) {
          obj.fileHierarchy[collectionName].push(docTitle);
        } else {
          obj.fileHierarchy['Root'].push(docTitle);
        }
        var docItem = $('<li><span class="icon"></span><span class="title">' + docTitle + '</span><span class="date">' + modifiedDate + '</span><span class="name">' + authorName + '</span></li>');
        if (entries[i].content && entries[i].content.src) {
          var docID = entries[i].content.src.split('=')[1];
          console.log(docID);
          docItem.data('docID', docID);
        }
        docsList.append(docItem);
      }

      console.log(obj.fileHierarchy);

    }
};
