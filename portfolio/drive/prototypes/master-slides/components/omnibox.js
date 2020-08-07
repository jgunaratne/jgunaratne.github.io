var dng = dng || {}; // Namespace declaration.


// Example data:
/*
var data = {
  opt_hotkey: 'ALT /', // Same as built-in default, just showing how to change
  opt_placeholder: 'Search the menus', // Ditto
  features: [
    {
      name: 'New',
      menus: ['file'],
      synonyms: ['create', 'add']
    },
    {
      name: 'Open',
      opt_icon: 'http://site/img/whatever.png', // Can optionally include icons for some items.
      menus: ['file'],
      synonyms: ['recent']
    },
    {
      name: 'Delete',
      menus: ['edit'],
      synonyms: ['remove', 'cut'] // Shares synonyms with "cut"
    },
    {
      name: 'Cut',
      menus: ['edit'],
      synonyms: ['remove', 'delete'] // Shares synonyms with "delete"
    },
    {
      name: 'Insert table',
      menus: ['insert', 'table'],
      synonyms: ['add table', 'add a table', 'spreadsheet', 'grid', 'columns', 'rows']
    }
  ]
};
*/


dng.Omnibox = function(data) {
  this.data_ = data;
  this.element_ = null;
  this.menu_ = null;
  this.rendered_ = false;
  this.value_ = ''; // The user-typed value currently in the omnibox.
};


dng.Omnibox.prototype.getElement = function() {
  return this.element_;
};


dng.Omnibox.DEFAULT_HOTKEY = 'ALT /';
dng.Omnibox.DEFAULT_PLACEHOLDER = 'Search the menus';


dng.Omnibox.prototype.render = function(parentEl) {
  // Render self.
  this.element_ = $('<div class="omnibox" tabindex="0"></div>').get(0);
  
  $(this.element_).append(
    '<div class="omnibox-hotkey-tooltip">' + (this.data_.opt_hotkey ? this.data_.opt_hotkey : dng.Omnibox.DEFAULT_HOTKEY) + '</div>' +
    '<input class="omnibox-input kennedy-search" type="text" placeholder="' + (this.data_.opt_placeholder ? this.data_.opt_placeholder : dng.Omnibox.DEFAULT_PLACEHOLDER) + '">' +
    '<div class="menu-holder"></div>'
  );
  
  $(parentEl).append(this.element_);
  this.rendered_ = true;
  $(this).trigger('rendered.Omnibox');

  // Now that DOM exists, we can listen for events.
  this.attachListeners_();
};


dng.Omnibox.prototype.attachListeners_ = function() {
  // NOTE: Don't attach to menu, because it will be re-rendered frequently.

  $('.omnibox-input').
      keyup($.proxy(this.handleSearchKeyUp_, this)).
      keydown($.proxy(this.handleSearchKeyDown_, this)).
      focus($.proxy(this.handleSearchFocus_, this)).
      blur($.proxy(this.handleSearchBlur_, this));
};


/**
 * The search box contents right now. Might briefly differ from this.value_,
 * depending on which listeners have fired.
 */
dng.Omnibox.prototype.getSearchText_ = function() {
  return $.trim($('.omnibox-input', this.element_).attr('value').toLowerCase());
};


dng.Omnibox.prototype.clearSearch = function() {
  $('.omnibox-input', this.element_).attr('value', '');
  this.value_ = '';
  if (this.menu_) {
    this.menu_.setVisible(false);
  }
};


dng.Omnibox.prototype.handleSearchFocus_ = function(e) {
  if (this.getSearchText_().length > 0) {
    this.updateMenuContents_();
    this.menu_.selectFirst();
    this.menu_.setVisible(true);
  }
};


dng.Omnibox.prototype.updateMenuContents_ = function() {
  var newValue = this.getSearchText_();
  if (this.value_ == newValue) {
    return; // Nothing changed.
  } else {
    this.value_ = newValue;
  }

  // Remove old menu if there is one.
  if (this.menu_) {
    $(this.menu_.getElement()).remove();
  }
  
  var features = this.getMatchingFeatures_();

  var menuData = {
    menuitems: [
    ]
  };
  for (var i = 0; i < features.length; i++) {
  	var featureObj = this.findFeature_(features[i]);
    menuData['menuitems'].push({
      label: this.createLabel_(features[i]),
      opt_icon: featureObj.opt_icon,
      opt_checked: featureObj.opt_checked,
      opt_id: featureObj.opt_id
    });
  }
  this.menu_ = new dng.Menu(menuData);
  this.menu_.render($('.menu-holder', this.element_));
  
  // Track when the menu closes, so we can rebroadcast it.
  $(this.menu_).bind('hide.Menu', $.proxy(function(e) {
    $(this).trigger('menuhidden.Omnibox');
  }, this));

  // Whenever the menu changes, select the first item anew.
  this.menu_.selectFirst();
};


dng.Omnibox.prototype.handleSearchBlur_ = function(e) {
  if (this.menu_) {
    this.menu_.setVisible(false);
  }
};


dng.Omnibox.prototype.getMatchingFeatures_ = function() {
  var matchingFeatures = [];
  var valueWords = this.value_.split(' ');

  // Look through features to find those that match user-typed value.
  for (var i = 0; i < this.data_.features.length; i++) {
    var feature = this.data_.features[i];
    var featureWords = feature.name.split(' ');
    // Treat menus and synonyms as matches.
    featureWords = featureWords.concat(feature.menus);
    featureWords = featureWords.concat(feature.synonyms);
    var match = false;

    // Look through each word in the feature names.
    for (var j = 0; j < featureWords.length; j++) {
      var featureWord = featureWords[j].toLowerCase();

      // Compare them to user-typed words.
      for (var k = 0; k < valueWords.length; k++) {
        var valueWord = valueWords[k].toLowerCase();
        var idx = featureWord.indexOf(valueWord);
        if (featureWord == valueWord || idx == 0 || (idx != -1 && idx - 1 >= 0 && featureWord[idx - 1] == ' ')) {
          matchingFeatures.push(feature.name);
          match = true;
          break;
        }
      }
      if (match) {
        break;
      }
    }
  }

  // Sort them.
  matchingFeatures = this.sortMatches_(matchingFeatures);

  // Truncate. We do this after sorting so we have a sort list of relevant items.
  matchingFeatures = matchingFeatures.slice(0, dng.Omnibox.MAX_NUM_MENUITEMS);

  return matchingFeatures;
};


dng.Omnibox.MAX_NUM_MENUITEMS = 10;


/**
 * Returns number of chars from stringA that prefix words in stringB.
 */
dng.Omnibox.prototype.findMatchingCharCount_ = function(stringA, stringB) {
  var chars = 0;

  var wordsA = stringA.toLowerCase().split(' ');
  var wordsB = stringB.toLowerCase().split(' ');

  for (var i = 0; i < wordsA.length; i++) {
    for (var j = 0; j < wordsB.length; j++) {
      if (wordsB[j].indexOf(wordsA[i]) == 0) {
        chars += wordsA[i].length;
      }
    }
  }

  return chars;
};


dng.Omnibox.prototype.findDirectMatchWeight_ = function(match) {
  var count = this.findMatchingCharCount_(this.value_, match);
  return count / match.length; // Perfect match is 1.0 weight
};


dng.Omnibox.prototype.findFeature_ = function(name) {
  name = name.toLowerCase();
  for (var i = 0; i < this.data_.features.length; i++) {
    if (this.data_.features[i].name.toLowerCase() == name) {
      return this.data_.features[i];
    }
  }
  console.log('Warning: Could not findFeature_ for "' + name + '"');
};


dng.Omnibox.prototype.findIndirectMatchWeight_ = function(match) {
  var highestSynonymWeight = 0;

  var feature = this.findFeature_(match);
  var synonyms = feature.synonyms;
  var synonymChars = 0;

  for (var i = 0; i < synonyms.length; i++) {
    synonymChars = this.findMatchingCharCount_(this.value_, synonyms[i]);
    var tempSynonymWeight = synonymChars / match.length; // Perfect match is 1.0 weight.
    if (tempSynonymWeight > highestSynonymWeight) {
      highestSynonymWeight = tempSynonymWeight;
    }
  }

  // If there's no synonym match, check for a menu match. That awards some nominal weight.
  if (highestSynonymWeight == 0) {
    var menus = feature.menus;
    for (var i = 0; i < menus.length; i++) {
      if (this.findMatchingCharCount_(this.value_, menus[i]) > 0) {
        return 0.1;
      }
    }
  }

  return highestSynonymWeight;
};


/**
 * This could be combined with the filtering loops in getMatchingFeatures_
 * to optimize.
 */
dng.Omnibox.prototype.sortMatches_ = function(matches) {
  var context = this;
  var compareFn = function(matchA, matchB) {
    var directMatchWeightA = context.findDirectMatchWeight_(matchA);
    var indirectMatchWeightA = context.findIndirectMatchWeight_(matchA); // Indirect takes synonyms and menus into account
    var directMatchWeightB = context.findDirectMatchWeight_(matchB);
    var indirectMatchWeightB = context.findIndirectMatchWeight_(matchB);

    // Use which weight is higher, direct or indirect match.
    var weightA = (directMatchWeightA >  indirectMatchWeightA) ? directMatchWeightA : indirectMatchWeightA;
    var weightB = (directMatchWeightB >  indirectMatchWeightB) ? directMatchWeightB : indirectMatchWeightB;

    if (weightA > weightB) {
      return -1;
    } else if (weightA == weightB) {
      // If one match STARTS with user-typed value, that one wins.
      var startIdxA = matchA.toLowerCase().indexOf($.trim(context.value_).toLowerCase());
      var startIdxB = matchB.toLowerCase().indexOf($.trim(context.value_).toLowerCase());
      if (startIdxA == 0 && startIdxB != 0) {
        return -1;
      } else if (startIdxA != 0 && startIdxB == 0) {
        return 1;
      }

      return 0;
    } else {
      return 1;
    }
  };

  return matches.sort(compareFn);
};


/**
 * Creates a label for the given feature, bolding any appropriate parts before
 * it gets inserted into the menu.
 */
dng.Omnibox.prototype.createLabel_ = function(feature) {
  var label = '';

  // We simplify this by assuming user will start typing the beginning of
  // a word (a reasonable assumption).
  var typedWords = this.value_.split(' ');
  var featureWords = feature.split(' ');
  // Going through official feature names.
  for (var i = 0; i < featureWords.length; i++) {
    var featureWord = featureWords[i].toLowerCase();
    var greatestMatchedLength = 0;
    // Going through words the user typed.
    for (var j = 0; j < typedWords.length; j++) {
      var typedWord = typedWords[j].toLowerCase();

      // If the feature word doesn't completely contain this word, it's not
      // a real match.
      if (featureWord.indexOf(typedWord) != 0) {
        continue;
      }

      // Going through letters in the official feature name to see how far in
      // the user's text matches.
      for (var k = 0; k < featureWord.length; k++) {
        if (featureWord[k] == typedWord[k]) {
          if ((k + 1) > greatestMatchedLength) {
            greatestMatchedLength = k + 1; // Up to char after match.
          }
        } else {
          break;
        }
      }
    }
    label += '<span class="match">' +
        featureWords[i].substring(0, greatestMatchedLength) + '</span>' +
        featureWords[i].substring(greatestMatchedLength) + ' ';
  }
  label = label.substring(0, label.length - 1); // Remove trailing space.

  // If this is a font, add font family to it.
  var fontFamily = this.findFeature_(feature).opt_fontFamily;
  if (fontFamily) {
    label = '<span style=\'font-family: ' + fontFamily + '\'>' + label + '</span>';
  }

  return label;
};


dng.Omnibox.prototype.handleSearchKeyDown_ = function(e) {
  // Let user navigate menu with arrows.
  if (e.keyCode == 38) { // Up
    e.preventDefault(); // Don't move text cursor.
    this.menu_.selectPrevious();
  } else if (e.keyCode == 40) { // Down
    e.preventDefault(); // Don't move text cursor.
    this.menu_.selectNext();
  } else if (e.keyCode == 13) { // Enter
  	var choice = $('.active', this.element_).text();
    this.clearSearch();
    this.menu_.setVisible(false);
    if (choice && choice.length > 0) {
      $(this).trigger('choice.Omnibox', $.trim(choice));
    }
  }
};


dng.Omnibox.prototype.handleSearchKeyUp_ = function(e) {
  this.updateMenuContents_();

  // Tweak menu size and position to suit omnibox.
  if (this.menu_) {
	  $(this.menu_.getElement()).
	      css('min-width', (this.element_.offsetWidth - 2) + 'px').
	      css('padding-top', '0px');
	  this.menu_.setPosition(1 /* left */, this.element_.offsetHeight + 1 /* top */);
	  this.menu_.setVisible(this.getSearchText_().length > 0);
  }
};
