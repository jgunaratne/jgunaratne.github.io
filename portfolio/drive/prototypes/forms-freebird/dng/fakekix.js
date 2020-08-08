$(function() {
  // Add CSS to <head>.
  var headEl = document.getElementsByTagName('head')[0];
  var kixLinkEl = document.createElement('link');
  kixLinkEl.rel = 'stylesheet';
  kixLinkEl.href = 'http://www.corp.google.com/~vagell/docsnextgen/lib2/kix.css';
  headEl.appendChild(kixLinkEl);

  // Add DOM.
  var shellyInnerHTML = '' +
      '<div class="shelly-header">' +
        '<div class="shelly-header-right-controls">' +
          '<div class="shelly-header-username">jessiewilliams07@gmail.com <span class="shelly-down-arrow"></span></div>' +
          '<span id="shelly-comments-button" class="button">Comments</span>' +
          '<span id="shelly-share-button" class="blue-button button">' +
            '<span class="shelly-share-icon"></span>' +
            'Share' +
          '</span>' +
        '</div>' +
        '<div class="shelly-doc-name-container">' +
          '<span id="shelly-back-arrow"></span>' +
          '<span id="shelly-doc-name">Untitled document</span>' +
          '<span id="shelly-star"></span>' +
        '</div>' +
        '<div class="shelly-header-menus">' +
          '<span class="shelly-menu-button">File</span>' +
          '<span class="shelly-menu-button">Edit</span>' +
          '<span class="shelly-menu-button">View</span>' +
          '<span class="shelly-menu-button">Insert</span>' +
          '<span class="shelly-menu-button">Format</span>' +
          '<span class="shelly-menu-button">Tools</span>' +
          '<span class="shelly-menu-button">Table</span>' +
          '<span class="shelly-menu-button">Help</span>' +
        '</div>' +
      '</div>' +
      '<div class="kix shelly-toolbar">' +
      '</div>';
  var shellyEl = document.createElement('div');
  shellyEl.innerHTML = shellyInnerHTML;
  shellyEl.className = 'shelly unselectable';

  var editorInnerHTML = '' +
      '<span class="kix-ruler unselectable"></span>' +
      '<div class="kix-doc-scroller">' +
        '<div class="kix-doc">' +
          '<div id="kix-doc-content" contentEditable="true">' +
            'Lorem ipsum.' +
          '</div>' +
        '</div>' +
      '</div>';
  var editorEl = document.createElement('div');
  editorEl.className = 'editor';
  editorEl.innerHTML = editorInnerHTML;

  // Prepend so that prototype-provided DOM overlays fake kix by default.
  $('body').prepend(shellyEl, editorEl);
});
