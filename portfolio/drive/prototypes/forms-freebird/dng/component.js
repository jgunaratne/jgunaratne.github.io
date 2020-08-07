var dng = dng || {}; // Namespace declaration.


dng.Component = {};


dng.Component.BASE_URL = 'dng/';


dng.Component.templateLoadCount = 0;


/**
 * Loads a template's resources, and returns a template function that can
 * render it. All files should be relative to .../docsnextgen/ URL pattern.
 *
 * @param cssFile CSS file this template uses.
 * @param templateFile PURE template HTML file.
 * @param templateSelector CSS selector to find template in HTML file.
 * @param directive PURE template directive to pair data to the template.
 * @param callbackFn Function to call when template is loaded. templateFn will be passed to it.
 */
dng.Component.loadTemplate = function(cssFile, templateFile, templateSelector, directive, callbackFn) {
  // Turn jQuery caching on, to avoid reloading already-loaded files.
  $.ajaxSetup({
    cache: true
  });

  // Then load files this component needs.
  // CSS
  $('head').append('<link rel="stylesheet" type="text/css" href="' + dng.Component.BASE_URL + cssFile + '">');

  // PURE library
  $.getScript(dng.Component.BASE_URL + 'pure-lib.js',
      function(response, status, xhr) {
        if (status != 'error') {
          // HTML TEMPLATE
          var templateHolderId = 'template-holder-' + dng.Component.templateLoadCount++;
          $('body').append('<div id="' + templateHolderId + '" style="position: absolute;left: -9999px;top: -9999px;height: 1px;width: 1px;"></div>');
          $('#' + templateHolderId).load(dng.Component.BASE_URL + templateFile,
              function(response, status, xhr) {
                if (status != 'error') {
                  var templateFn = $p('#' + templateHolderId + ' ' + templateSelector).compile(directive);
                  $('#' + templateHolderId).remove();
                  callbackFn(templateFn);
                } else {
                  console.log('Error compiling HTML template: ' + templateFile);
                }
              }
          );
      } else {
          console.log('Error loading PURE library.');
        }
      }
  );
};
