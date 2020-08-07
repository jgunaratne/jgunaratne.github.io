// Setup namespaces.
var dng = dng || {};
dng.FakeTrix = {};


// Creates fake Trix in the page.
dng.FakeTrix.init = function() {
  dng.FakeTrix.addCss();
  dng.FakeTrix.buildHtml();
  dng.FakeTrix.buildCells();
  dng.FakeTrix.attachListeners();

  dng.FakeTrix.selectCell($('#A1'));
};


// Adds CSS to <head>.
dng.FakeTrix.addCss = function() {
  var headEl = document.getElementsByTagName('head')[0];
  var trixLinkEl = document.createElement('link');
  trixLinkEl.rel = 'stylesheet';
  trixLinkEl.href = 'http://www.corp.google.com/~vagell/docsnextgen/lib2/trix.css';
  headEl.appendChild(trixLinkEl);
};


// Builds fake Trix HTML content.
dng.FakeTrix.buildHtml = function() {
  var shellyInnerHTML = '' +
      '<div class="shelly-header">' +
        '<div class="shelly-header-right-controls">' +
          '<div class="shelly-header-username">jessiewilliams07@gmail.com <span class="shelly-down-arrow"></span></div>' +
          '<span id="shelly-comments-button" class="button">Comments <span class="shelly-down-arrow"></span></span>' +
          '<span id="shelly-share-button" class="blue-button button">' +
            '<span class="shelly-share-icon"></span>' +
            'Share' +
          '</span>' +
        '</div>' +
        '<div class="shelly-doc-name-container">' +
          '<span id="shelly-back-arrow"></span>' +
          '<span id="shelly-doc-name">Workout tracker</span>' +
          '<span id="shelly-star"></span>' +
        '</div>' +
        '<div class="shelly-header-menus">' +
          '<span class="shelly-menu-button">File</span>' +
          '<span class="shelly-menu-button">Edit</span>' +
          '<span class="shelly-menu-button">View</span>' +
          '<span class="shelly-menu-button">Insert</span>' +
          '<span class="shelly-menu-button">Format</span>' +
          '<span class="shelly-menu-button">Data</span>' +
          '<span class="shelly-menu-button">Tools</span>' +
          '<span class="shelly-menu-button">Help</span>' +
        '</div>' +
      '</div>' +
      '<div class="trix shelly-toolbar">' +
      '</div>';
  var shellyEl = document.createElement('div');
  shellyEl.innerHTML = shellyInnerHTML;
  shellyEl.className = 'shelly unselectable';

  var editorInnerHTML = '' +
      '<div class="trix-formula">' +
        '<span class="trix-formula-icon"></span>' +
        '<span class="trix-formula-right-controls"></span>' +
        '<div id="trix-formula-input" contentEditable="true" spellcheck="false"></div>' +
      '</div>' +
      '<div id="trix-grid-scroller" tabindex="0">' +
        '<div id="trix-column-headers"></div>' +
        '<div id="trix-row-headers"></div>' +
        '<div id="trix-rows"></div>' +
      '</div>' +
      '<div class="trix-sheet-tabs"></div>' +
      '<div id="trix-cell-editor" contentEditable="true" spellcheck="false"></div>' +
      '<div id="trix-value-hint-bubble">' +
        '<span id="trix-value-hint"></span>' +
        '<div class="trix-bubble-arrow">' +
          '<div class="trix-bubble-arrow trix-bubble-inner-arrow"></div>' +
        '</div>' +
      '</div>' +
      '<div id="trix-formula-markup-container" contentEditable="true" spellcheck="false"></div>' +
      '<div id="trix-formula-helper">' +
        '<div id="trix-formula-autocomplete">' +
          '<div class="trix-formula-autocomplete-row selected">SUM<span class="trix-formula-arguments-hint">(number_1, number_2, ... number_30)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Adds all the numbers in a range of cells. Number_1, number_2,... number_30 are up to 30 arguments whose sum is to be calculated. You can also enter a range using cell references.<br><br><b>Example: </b>=SUM(A1:A10)</span></span></span></div>' +
          '<div class="trix-formula-autocomplete-row">AVERAGE<span class="trix-formula-arguments-hint">(number_1, number_2, ... number_30)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Returns the average of the arguments. Number_1, number_2, ... number_30 are numerical values or ranges. Text is ignored.<br><br><b>Example: </b>=AVERAGE(A1:A10)</span></span></span></div>' +
          '<div class="trix-formula-autocomplete-row">COUNT<span class="trix-formula-arguments-hint">(number_1, number_2, ... number_30)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Counts how many numbers are in the list of arguments. Text entries are ignored. Value_1, value_2, ... value_30 are values or ranges which are to be counted.<br><br><b>Example: </b>=COUNT(A1:A10)</span></span></span></div>' +
          '<div class="trix-formula-autocomplete-row">MIN<span class="trix-formula-arguments-hint">(number_1, number_2, ... number_30)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Returns the minimum value in a list of arguments. Number_1, number_2, ... number_30 are numerical values or ranges.<br><br><b>Example: </b>=MIN(A1:A10)</span></span></span></div>' +
          '<div class="trix-formula-autocomplete-row">MAX<span class="trix-formula-arguments-hint">(number_1, number_2, ... number_30)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Returns the maximum value in a list of arguments. Number_1, number_2, ... number_30 are numerical values or ranges.<br><br><b>Example: </b>=MAX(A1:A10)</span></span></span></div>' +
          '<div class="trix-formula-autocomplete-row hidden">COUNTIF<span class="trix-formula-arguments-hint">(range, criteria)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Returns the number of elements that meet certain criteria within a cell range. Range is the range to which the criteria are to be applied. Criteria indicates the criteria in the form of a number or a character string by which the cells are counted. In the criteria section, you can use a question mark (?) to match a single character or an asterisk (*) to match a sequence of characters. If you would like to find an actual question mark or asterisk, you can type a tilde (~) before the question mark (?) or asterisk (*).<br><br><b>Example: </b>=COUNTIF(A1:A10, "deposit")</span></span></span></div>' +
          '<div class="trix-formula-autocomplete-row hidden">SUMIF<span class="trix-formula-arguments-hint">(range, criteria, sum_range)</span><span class="trix-function-help"><span class="trix-function-help-close"></span><span class="trix-function-help-inner">Adds the cells specified by a given criteria. Range is the range to which the criteria are to be applied. Criteria is the cell in which the search criterion is shown, or the search criterion itself. In the criteria section, you can use a question mark (?) to match a single character or an asterisk (*) to match a sequence of characters. If you would like to find an actual question mark or asterisk, you can type a tilde (~) before the question mark (?) or asterisk (*). Sum_range is the range from which values are summed, if it has not been indicated, the values found in the Range are summed.<br><br><b>Example: </b>=SUMIF(A1:A10, "withdrawal", B1:B10)</span></span></span></div>' +
          '<a id="trix-formula-more-functions" href="https://docs.google.com/support/bin/static.py?page=table.cs&topic=25273" target="_blank">More functions</a>' +
        '</div>' +
        '<div id="trix-formula-help"></div>' +
      '</div>';

  var editorEl = document.createElement('div');
  editorEl.className = 'editor';
  editorEl.innerHTML = editorInnerHTML;

  // Prepend so that prototype-provided DOM overlays fake kix by default.
  $('body').prepend(shellyEl, editorEl);
};


dng.FakeTrix.ASCII_A = 65; // 'A'


// Adds cells to the fake Trix.
dng.FakeTrix.buildCells = function() {
  var NUM_COLUMNS = 20;
  var NUM_ROWS = 100;

  // Add column headers
  var columnHeadersEl = document.getElementById('trix-column-headers');
  for (var i = 0; i < NUM_COLUMNS; i++) {
    var columnLetter = String.fromCharCode(dng.FakeTrix.ASCII_A + i).toUpperCase();
    var columnHeaderEl = document.createElement('span');
    columnHeaderEl.className = 'trix-column-header';
    columnHeaderEl.id = 'trix-column-header-' + columnLetter;
    columnHeaderEl.innerHTML = columnLetter;
    columnHeadersEl.appendChild(columnHeaderEl);
  }

  // Add row headers and rows
  var rowHeadersEl = document.getElementById('trix-row-headers');
  var rowsEl = document.getElementById('trix-rows');
  for (var i = 1; i < NUM_ROWS + 1; i++) {
    // Row header
    var rowNumber = '' + i;
    var rowHeaderEl = document.createElement('div');
    rowHeaderEl.className = 'trix-row-header';
    rowHeaderEl.id = 'trix-row-header-' + rowNumber;
    rowHeaderEl.innerHTML = rowNumber;
    rowHeadersEl.appendChild(rowHeaderEl);

    // Rows
    var rowEl = document.createElement('div');
    rowEl.className = 'trix-row';
    for (var j = 0; j < NUM_COLUMNS; j++) {
      // Cells
      var cellEl = document.createElement('span');
      cellEl.className = 'trix-cell';
      cellEl.id = String.fromCharCode(dng.FakeTrix.ASCII_A + j) + i;
      cellEl.spellcheck = false;
      cellEl.tabIndex = 0;
      rowEl.appendChild(cellEl);

      dng.FakeTrix.attachCellListeners($(cellEl));
    }
    rowsEl.appendChild(rowEl);
  }
};


dng.FakeTrix.mouseStillDown = false;


dng.FakeTrix.attachCellListeners = function(cell) {
  // Cell selection
  cell.mousedown(function(e) {
    e.preventDefault();
    dng.FakeTrix.mouseStillDown = true;
    dng.FakeTrix.selectCell($(this), false /* force */, e.shiftKey);
  });

  cell.mouseup(function() {
    dng.FakeTrix.mouseStillDown = false;
    dng.FakeTrix.refRangeStartEl = null;
  });

  // Cell highlight
  cell.mouseover(function(e) {
    if (dng.FakeTrix.mouseStillDown) {
      // Reference highlighting.
      if (dng.FakeTrix.refRangeStartEl) {
        dng.FakeTrix.addCellRef($(this).get(0).id, true /* isRange */);
      } else {
      // Selection highlighting.
        dng.FakeTrix.highlightCells($(this));
      }
    }
  });

  // Edit cell via mouse
  cell.dblclick(function() {
    dng.FakeTrix.editCell($(this));
  });

  // Edit cell via keyboard
  cell.keydown(function(e) {
    if (dng.FakeTrix.isArrowKeyCode(e.keyCode) || e.keyCode == dng.FakeTrix.SHIFT || e.keyCode == dng.FakeTrix.TAB) {
      return;
    }

    // Starting to type with a cell selected clears it. Hitting enter edits
    // without clearing.
    if (e.keyCode == dng.FakeTrix.ENTER) {
      e.preventDefault();
      dng.FakeTrix.editCell($(this)); // Start editing cell.
    } else if (e.keyCode == dng.FakeTrix.CONTROL) {
      // Stay calm and carry on. Don't delete cell contents.
      dng.FakeTrix.editCell($(this)); // Start editing cell.
      document.execCommand('selectAll', false, null);
    } else {
      $(this).html('');
      $(this).data('formula-html', null);
      dng.FakeTrix.editCell($(this)); // Start editing cell.
    }
  });
};


dng.FakeTrix.highlightsActive = false;


dng.FakeTrix.highlightCells = function(endCell) {
  // No highlight, just a regular selection (mousedown and up on a single cell).
  if (endCell.get(0) === dng.FakeTrix.selectedCellEl) {
    return;
  }

  // Remove highlights.
  if (dng.FakeTrix.highlightsActive) {
    $('.trix-cell').removeClass('highlighted');
    $('.trix-column-header').removeClass('highlighted');
    $('.trix-row-header').removeClass('highlighted');
  }
  dng.FakeTrix.highlightsActive = true;

  var beginId = dng.FakeTrix.selectedCellEl.id;
  var endId = endCell.get(0).id;
  var col1 = beginId.substring(0, 1);
  var col2 = endId.substring(0, 1);
  var startCol = col1.charCodeAt() < col2.charCodeAt() ? col1 : col2;
  var endCol = col1.charCodeAt() < col2.charCodeAt() ? col2 : col1;
  var row1 = parseInt(beginId.substring(1));
  var row2 = parseInt(endId.substring(1));
  var startRow = row1 < row2 ? row1 : row2;
  var endRow = row1 < row2 ? row2 : row1;

//  console.log('highlight from ' + startCol + startRow + ' to ' + endCol + endRow);

  // Highlight cells.
  for (var col = startCol.charCodeAt(); col <= endCol.charCodeAt(); col++) {
    // Highlight this column header.
    var columnHeaderId = 'trix-column-header-' + String.fromCharCode(col).toUpperCase();
    $('#' + columnHeaderId).addClass('highlighted');

    for (var row = startRow; row <= endRow; row++) {
      // Highlight this row header.
      var rowHeaderId = 'trix-row-header-' + row;
      $('#' + rowHeaderId).addClass('highlighted');

      // Highlight this cell.
      var cellId = String.fromCharCode(col).toUpperCase() + row;
      $('#' + cellId).addClass('highlighted');
    }
  }
};


dng.FakeTrix.isEditingFormula = function() {
  return $.trim($('#trix-cell-editor').text())[0] == '=';
};


dng.FakeTrix.refRangeStartEl = null;


dng.FakeTrix.isCursorInCellEditor = function() {
  var selection = window.getSelection();
  var range = null;
  if (selection.rangeCount > 0) {
    range = selection.getRangeAt(0);
  }
  if (range) {
    var cellEditorEl = $('#trix-cell-editor').get(0);
    // If cursor is in any child of the cell editor, return true.
    for (var i = 0; i < cellEditorEl.childNodes.length; i++) {
      if (range.startContainer == cellEditorEl.childNodes[i]) {
        return true;
      }
    }
  }
  return false;
};


dng.FakeTrix.selectCell = function(cell, force, shiftKey) {
  var cellEl = cell.get(0);
  // If already selected, stop.
  if (!force && dng.FakeTrix.selectedCellEl === cellEl) {
    return;
  }

  // If editing a cell, and it has a formula, this is a reference
  if ((dng.FakeTrix.isCursorInCellEditor() || dng.FakeTrix.editingViaFormulaBar) && dng.FakeTrix.isEditingFormula()) {
    // In case this selection becomes a range, track where it starts.
    dng.FakeTrix.refRangeStartEl = cellEl;
    dng.FakeTrix.addCellRef(cellEl.id, shiftKey /* isRange */, shiftKey);
    return;
  }

  // Deselect previous selection.
  if (dng.FakeTrix.selectedCellEl) {
    $(dng.FakeTrix.selectedCellEl).removeClass('selected');
  }
  dng.FakeTrix.selectedCellEl = cellEl;
  dng.FakeTrix.hideCellEditor();

  // Remove highlights.
  if (dng.FakeTrix.highlightsActive) {
    $('.trix-cell').removeClass('highlighted');
    $('.trix-column-header').removeClass('highlighted');
    $('.trix-row-header').removeClass('highlighted');
  }
  dng.FakeTrix.highlightsActive = false;

  // Select the cell itself
  cell.addClass('selected');

  // Select the column header
  $('.trix-column-header').removeClass('selected');
  var columnHeaderId = 'trix-column-header-' + cell.attr('id').substring(0, 1);
  $('#' + columnHeaderId).addClass('selected');

  // Select the row header
  $('.trix-row-header').removeClass('selected');
  var rowHeaderId = 'trix-row-header-' + cell.attr('id').substring(1);
  $('#' + rowHeaderId).addClass('selected');

  // Show cell contents in formula bar too.
  var formulaHtml = $(dng.FakeTrix.selectedCellEl).data('formula-html') || cell.text();
  $('#trix-formula-input').html(formulaHtml);
};


dng.FakeTrix.selectedCellEl = null;
dng.FakeTrix.editedCellEl = null;


dng.FakeTrix.editCell = function(cell) {
  var cellEl = cell.get(0);
  if (dng.FakeTrix.editedCellEl === cellEl) {
    return; // Already editing this cell.
  }
  dng.FakeTrix.editedCellEl = cellEl;

  // Let function help be shown.
  $('.trix-function-help').removeClass('hidden');

  // Display the cell editor.
  var cellEditorEl = $('#trix-cell-editor').get(0);
  var gridScrollerEl = $('#trix-grid-scroller').get(0);
  var cellHtml = $(dng.FakeTrix.selectedCellEl).data('formula-html') || cell.html();
  cellEditorEl.innerHTML = cellHtml;
  cellEditorEl.style.top = cellEl.offsetTop - gridScrollerEl.scrollTop + 'px';
  cellEditorEl.style.left = cellEl.offsetLeft - gridScrollerEl.scrollLeft + 'px';
  cellEditorEl.style.display = 'block';

  // Display the markup container (for hover states).
  var formulaMarkupEl = $('#trix-formula-markup-container').get(0);
  formulaMarkupEl.style.top = cellEditorEl.style.top;
  formulaMarkupEl.style.left = cellEditorEl.style.left;
  formulaMarkupEl.style.height = cellEditorEl.offsetHeight - 4 + 'px';
  formulaMarkupEl.innerHTML = cellHtml;
  formulaMarkupEl.style.display = 'block';
  $('#trix-value-hint-bubble').get(0).style.display = 'block';
  dng.Parser.markupFormula(cellEditorEl);

  if (!dng.FakeTrix.editingViaFormulaBar) {
    // Move cursor to end of cell editor
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    var textNode = cellEditorEl.childNodes[0];
    if (textNode) {
      range.setStart(textNode, $(cellEditorEl).text().length);
      range.setEnd(textNode, $(cellEditorEl).text().length);
      selection.addRange(range);
    }

    cellEditorEl.focus();
  }
};


// Prototypes that want to do things with formulas can override this.
// Should return CALCULATED value of formula, not the formula itself.
dng.FakeTrix.getFormulaValue = dng.FakeTrix.getFormulaValue || function(cellEl) {
  return 'FORMULA VALUE';
};


dng.FakeTrix.hideCellEditor = function() {
  var cellEditorEl = document.getElementById('trix-cell-editor');

  // Show value in cell.
  var valueChanged = false;
  if (dng.FakeTrix.editedCellEl) {
    if (dng.FakeTrix.isEditingFormula()) {
      dng.FakeTrix.editedCellEl.innerHTML = cellEditorEl.innerHTML;
      valueChanged = dng.FakeTrix.editedCellEl.innerHTML != dng.FakeTrix.getFormulaValue(dng.FakeTrix.editedCellEl);
      dng.FakeTrix.editedCellEl.innerHTML =
          dng.FakeTrix.getFormulaValue(dng.FakeTrix.editedCellEl);
      $(dng.FakeTrix.editedCellEl).data('formula-html', cellEditorEl.innerHTML);
    } else {
      valueChanged = dng.FakeTrix.editedCellEl.innerHTML != cellEditorEl.innerHTML;
      dng.FakeTrix.editedCellEl.innerHTML = cellEditorEl.innerHTML;
      $(dng.FakeTrix.editedCellEl).data('formula-html', null);
    }
  }

  // Hide the editor.
  cellEditorEl.style.display = null;
  dng.FakeTrix.editedCellEl = null;

  // Hide markup container.
  $('#trix-formula-markup-container').get(0).style.display = null;
  $('#trix-value-hint-bubble').get(0).style.display = null;

  // Hide refs.
  dng.FakeTrix.setRefsVisible(false);

  // Whenever cell editor closes, we're done with all editing, even if formula bar.
  dng.FakeTrix.editingViaFormulaBar = false;

  // Update all other formulas.
  if (valueChanged) {
    dng.FakeTrix.updateFormulas();
  }

  // Clear node map, since without an active editor, there are no nodes.
  dng.Parser.nodeMap = {};

  // If the cell has a formula, and it has an error, show ERROR in cell.
  var parseRootNode = $(dng.FakeTrix.selectedCellEl).data('parse-tree-root-node');
  if (parseRootNode && parseRootNode.hasError()) {
    $(dng.FakeTrix.selectedCellEl).text('ERROR');
  }

  // Hide the formula autocomplete helper.
  dng.Formulas.setFormulaHelperVisible(false);

  // And let it reshow next time a cell is edited.
  dng.FakeTrix.suppressFormulaHelper = false;

  // Focus on the cell again.
  dng.FakeTrix.selectedCellEl.focus();
};


dng.FakeTrix.updateFormulas = function() {
  // Find all cells with parse data attached
  for (var i = 0; i < dng.Parser.cellsWithFormula.length; i++) {
    // For each cell, replace its value with the result of its parse
    var el = dng.Parser.cellsWithFormula[i];
    var parseRootNode = $(el).data('parse-tree-root-node');
    var formulaHtml = $(el).data('formula-html');
    if (formulaHtml && formulaHtml.substring(0, 1) == '=' && parseRootNode) {
      $(el).text(dng.FakeTrix.getFormulaValue(el));
    } else {
      $(el).data('parse-tree-root-node', null);
      $(el).data('formula-html', null);
    }
  }
};


dng.FakeTrix.UP_ARROW = 38;
dng.FakeTrix.RIGHT_ARROW = 39;
dng.FakeTrix.DOWN_ARROW = 40;
dng.FakeTrix.LEFT_ARROW = 37;
dng.FakeTrix.TAB = 9;
dng.FakeTrix.SHIFT = 16;


dng.FakeTrix.isArrowKeyCode = function(keyCode) {
  return keyCode == dng.FakeTrix.UP_ARROW ||
         keyCode == dng.FakeTrix.RIGHT_ARROW ||
         keyCode == dng.FakeTrix.DOWN_ARROW ||
         keyCode == dng.FakeTrix.LEFT_ARROW;
};


dng.FakeTrix.attachListeners = function() {
  $('#trix-grid-scroller').keydown(dng.FakeTrix.handleGridKeyDown);
  $('#trix-cell-editor').keyup(dng.FakeTrix.handleCellEditorKeyUp);
  $('#trix-cell-editor').keydown(dng.FakeTrix.handleCellEditorKeyDown);
  $('#trix-cell-editor').focus(function(e) {
    dng.FakeTrix.editingViaFormulaBar = false;
  });
  $('#trix-formula-input').click(dng.FakeTrix.handleFormulaInputClick);
  $('#trix-formula-input').keyup(dng.FakeTrix.handleFormulaInputKeyUp);
  $('#trix-formula-input').keydown(dng.FakeTrix.handleFormulaInputKeyDown);
  $('#trix-formula-markup-container').mouseup(dng.FakeTrix.handleMarkupMouseUp);
};


// Moves cursor to clicked position in underlying editor, even though click was
// caught by markup container.
dng.FakeTrix.handleMarkupMouseUp = function(e) {
  var editTarget = dng.FakeTrix.editingViaFormulaBar ? $('#trix-formula-input') : $('#trix-cell-editor');

  // insert ~ at cursor location
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    var cursorMarkerEl = document.createTextNode('~');
    range.insertNode(cursorMarkerEl);
  }

  // replace contents of markup container with textContent of self
  // replace ~ with cursor span in markup container
  $('#trix-formula-markup-container').html($('#trix-formula-markup-container').text().replace(/\~/, '<span id="cursor-marker"></span>'));

  // replace contents of underlying editor with contents of markup container
  editTarget.html($('#trix-formula-markup-container').html());
  $('#trix-formula-markup-container').html(editTarget.text()); // remove cursor marker el from markup container

  // move cursor to cursor marker el in underlying editor
  selection.removeAllRanges();
  var range = document.createRange();
  var cursorMarkerEl = document.getElementById('cursor-marker');
  range.selectNode(cursorMarkerEl);
  selection.addRange(range);
  cursorMarkerEl.parentNode.removeChild(cursorMarkerEl);

  // 'markup' the container again
  dng.Parser.markupFormula(editTarget.get(0));

  // Maybe show a value, depending on where they clicked.
  dng.FakeTrix.maybeShowNodeValue($('#trix-cell-editor').get(0));
};


dng.FakeTrix.editingViaFormulaBar = false;


dng.FakeTrix.handleFormulaInputClick = function(e) {
  dng.FakeTrix.editingViaFormulaBar = true;

  var formulaEl = $('#trix-formula-input').get(0);

  dng.FakeTrix.editCell($(dng.FakeTrix.selectedCellEl));

  // Display the markup container (for hover states).
  var formulaMarkupEl = $('#trix-formula-markup-container').get(0);
  formulaMarkupEl.style.top = formulaEl.offsetTop + 'px';
  formulaMarkupEl.style.left = formulaEl.offsetLeft + 'px';
  formulaMarkupEl.style.height = formulaEl.offsetHeight - 4 + 'px';
  formulaMarkupEl.innerHTML = formulaEl.innerHTML;
  formulaMarkupEl.style.display = 'block';
  $('#trix-value-hint-bubble').get(0).style.display = 'block';
  dng.Parser.markupFormula(formulaEl);

  formulaEl.focus();
};


dng.FakeTrix.ENTER = 13;
dng.FakeTrix.ESC = 27;
dng.FakeTrix.CONTROL = 17;


dng.FakeTrix.hideAllNodeValues = function() {
  $('#trix-value-hint').get(0).style.opacity = null;

  // TODO do we need to call setValueVisible(false) to restore some state?
//  for (var tokenId in dng.Parser.nodeMap) {
//    var tempNode = dng.Parser.nodeMap[tokenId];
//    if (tempNode) {
//      tempNode.setValueVisible(false);
//    }
//  }
};


dng.FakeTrix.maybeShowNodeValue = function(el) {
  // Reset any token treatments.
  $('.trix-token')
      .removeClass('current-scope')
      .removeClass('highlighted');

  // Can't show a node value when there's a general error.
  if (dng.Parser.generalErrorMessage) {
    return;
  }

  // Find cursor position in el.
  var cursorIdx = 0;
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    cursorIdx = range.endOffset;
  } else {
    return; // No cursor.
  }

  // Translate cursor position to markup container.
  var markup = $('#trix-formula-markup-container').html();
  var plainText = '';
  var cursorIdxInMarkup = 0;
  for (var i = 0; i < markup.length; i++) {
     // Skip over token starts.
     if (markup[i] == '<' && markup[i + 1] == 's' && markup[i + 2] == 'p' && markup[i + 3] == 'a' && markup[i + 4] == 'n') {
       do {
         i++;
       } while (i < markup.length && markup[i - 1] != '>');
     } else if (markup[i] == '<' && markup[i + 1] == '/') {
       // Skip over token ends.
       do {
         i++;
       } while (i < markup.length && markup[i - 1] != '>');
       // Tokens often abut other tokens.
       if (markup[i] == '<' && markup[i + 1] == 's' && markup[i + 2] == 'p' && markup[i + 3] == 'a' && markup[i + 4] == 'n') {
         do {
           i++;
         } while (i < markup.length && markup[i - 1] != '>');
       }
     }
     plainText += markup[i];
     if (plainText.length >= cursorIdx) {
       cursorIdxInMarkup = i;
       break;
     }
  }
//  console.log('cursorIdxInMarkup: ' + cursorIdxInMarkup);

  // Special case, if cursor is at front or end of formula show value of entire thing.
  var node = null;
  var tokenId = '';
  if (cursorIdxInMarkup == 0 || cursorIdxInMarkup == (markup.length - '</span>'.length - 1)) {
    node = $(dng.FakeTrix.selectedCellEl).data('parse-tree-root-node');
  } else {
    // Otherwise, find token ID of where the cursor is.
    for (var i = cursorIdxInMarkup; i > -1; i--) {
      if (markup[i - 3] == 'i' && markup[i - 2] == 'd' && markup[i - 1] == '=' && markup[i] == '"') {
        var j = i + 1;
        while (markup[j] != '"') {
          tokenId += markup[j++];
        }
      break;
      }
    }
    console.log('Found tokenID at cursor: ' + tokenId);

    // Look up Node for that token.
    var tokenNumber = parseInt(tokenId.substring('trix-token-'.length));
    while (!node && tokenNumber > -1) {
      node = dng.Parser.nodeMap[tokenId];

      // If not found, keep lowering ID til we find one (skip parens and commas)
      if (node) {
        break;
      } else {
        tokenNumber--;
        tokenId = 'trix-token-' + tokenNumber;
      }
    }
  }

  // If Node found, tell that Node to show its value.
  if (node && !node.hasError()) {
    // Now make its value visible.
    node.setValueVisible(true, true /* alternate highlight */);
  } else {
    // Otherwise, hide shown value.
    dng.FakeTrix.hideAllNodeValues();
  }
};


dng.FakeTrix.suppressFormulaHelper = false;


dng.FakeTrix.handleCellEditorKeyDown = function(e) {
  // Immediately clear out the markup container. Following processing could be
  // slow and we don't want a stale markup display.
  if (!dng.FakeTrix.isArrowKeyCode(e.keyCode)) {
    $('#trix-formula-markup-container').html('');
  }

  dng.FakeTrix.hideAllNodeValues();

  if (e.keyCode == dng.FakeTrix.ENTER) {
    e.preventDefault();
    if (dng.Formulas.isFormulaHelperVisible()) { // Let formula helper handle it.
      return;
    }
    dng.FakeTrix.hideCellEditor();
    dng.FakeTrix.moveDown();
  } else if (e.keyCode == dng.FakeTrix.ESC) {
    if (dng.Formulas.isFormulaHelperVisible()) {
      dng.Formulas.setFormulaHelperVisible(false);
      dng.FakeTrix.suppressFormulaHelper = true;
    } else {
      dng.FakeTrix.hideCellEditor();
    }
  } else {
    dng.FakeTrix.handleGridKeyDown(e, true); // Defer handling to grid.
  }
};


dng.FakeTrix.handleCellEditorKeyUp = function(e) {
  var cellEditorValue = $('#trix-cell-editor').text();

  if (cellEditorValue.substring(0, 1) == '=') {
    dng.Parser.markupFormula($('#trix-cell-editor').get(0));
    dng.FakeTrix.maybeShowNodeValue($('#trix-cell-editor').get(0));
    if (!dng.Formulas.isFormulaHelperVisible()) {
      dng.Formulas.setFormulaHelperVisible(true, $('#trix-cell-editor').get(0));
    }
  } else {
    // Not a formula, just copy the value from cell editor to markup container.
    $('#trix-formula-markup-container').html($('#trix-cell-editor').html());
    dng.Formulas.setFormulaHelperVisible(false);
  }

  dng.FakeTrix.updateFormulaBar();
};


dng.FakeTrix.updateFormulaBar = function() {
  $('#trix-formula-input').text($('#trix-cell-editor').text());
};


dng.FakeTrix.LEFT_PAREN = 57;


dng.FakeTrix.handleGridKeyDown = function(e, isFromCellEditor) {
  // TODO fix this. it breaks cell reference logic (which depends on flat text nodes), and "show value at cursor loc"
  // If it's an opening paren, insert the closing paren also.
//  if (e.keyCode == dng.FakeTrix.LEFT_PAREN && dng.FakeTrix.isEditingFormula()) {
//    e.preventDefault();
//
//    var selection = window.getSelection();
//    if (selection.rangeCount > 0) {
//      // Add parens.
//      var range = selection.getRangeAt(0);
//      var parenNode = document.createTextNode('()');
//      range.insertNode(parenNode);
//
//      // Move cursor between parens.
//      selection.removeAllRanges();
//      range = document.createRange();
//      range.setStart(parenNode, 1);
//      range.setEnd(parenNode, 1);
//      selection.addRange(range);
//      // TODO below is required if we want "show value at cursor loc", beacuse it will assume flat text node.
////      parenNode.parentNode.normalize(); // Merge text nodes.
//    }
//    return;
//  }

  switch(e.keyCode) {
    case dng.FakeTrix.UP_ARROW:
      if (isFromCellEditor && dng.FakeTrix.isEditingFormula()) {
        e.preventDefault(); // So user can navigate up/down formula autocomplete without cursor moving
        return;
      }
      e.preventDefault();
      dng.FakeTrix.moveUp();
      break;
    case dng.FakeTrix.RIGHT_ARROW:
      if (isFromCellEditor && dng.FakeTrix.isEditingFormula()) {
        return;
      }
      e.preventDefault();
      dng.FakeTrix.moveRight();
      break;
    case dng.FakeTrix.DOWN_ARROW:
      if (isFromCellEditor && dng.FakeTrix.isEditingFormula()) {
        e.preventDefault(); // Ditto
        return;
      }
      e.preventDefault();
      dng.FakeTrix.moveDown();
      break;
    case dng.FakeTrix.LEFT_ARROW:
      if (isFromCellEditor && dng.FakeTrix.isEditingFormula()) {
        return;
      }
      e.preventDefault();
      dng.FakeTrix.moveLeft();
      break;
    case dng.FakeTrix.TAB:
      // Note that tab moves the cell selection EVEN IF user is editing formula
      e.preventDefault();
      dng.FakeTrix.hideCellEditor();
      if (e.shiftKey) {
        dng.FakeTrix.moveLeft();
      } else {
        dng.FakeTrix.moveRight();
      }
      break;
  };
};


dng.FakeTrix.moveUp = function() {
  var cellIdToSelect = null;
  var selectedCellId = dng.FakeTrix.selectedCellEl.id;
  var newRow = parseInt(selectedCellId.substring(1)) - 1;
  if (newRow < 1) {
    return;
  }
  cellIdToSelect = selectedCellId.substring(0, 1) + newRow;
  dng.FakeTrix.selectCell($('#' + cellIdToSelect));
};


dng.FakeTrix.moveRight = function() {
  var cellIdToSelect = null;
  var selectedCellId = dng.FakeTrix.selectedCellEl.id;
  var newColumnAscii = selectedCellId.substring(0, 1).charCodeAt() + 1;
  if (newColumnAscii > 'T'.charCodeAt()) {
    return;
  }
  cellIdToSelect = String.fromCharCode(newColumnAscii) + selectedCellId.substring(1);
  dng.FakeTrix.selectCell($('#' + cellIdToSelect));
};


dng.FakeTrix.moveDown = function() {
  var cellIdToSelect = null;
  var selectedCellId = dng.FakeTrix.selectedCellEl.id;
  var newRow = parseInt(selectedCellId.substring(1)) + 1;
  if (newRow > 100) {
    return;
  }
  cellIdToSelect = selectedCellId.substring(0, 1) + newRow;
  dng.FakeTrix.selectCell($('#' + cellIdToSelect));
};


dng.FakeTrix.moveLeft = function() {
  var cellIdToSelect = null;
  var selectedCellId = dng.FakeTrix.selectedCellEl.id;
  var newColumnAscii = selectedCellId.substring(0, 1).charCodeAt() - 1;
  if (newColumnAscii < dng.FakeTrix.ASCII_A) {
    return;
  }
  cellIdToSelect = String.fromCharCode(newColumnAscii) + selectedCellId.substring(1);
  dng.FakeTrix.selectCell($('#' + cellIdToSelect));
};


dng.FakeTrix.refMap = {}; // 'A12': 'ref-0', 'B1:B13': 'ref-1' ...


// User clicked on or arrowed to a cell/range while editing a formula, so add a
// reference for it.
dng.FakeTrix.addCellRef = function(cellId, isRange, shiftKey) {
  // Check for cell reference at cursor in cell editor
  // Find cursor position
  var editorText = $('#trix-cell-editor').text();
  var cursorIdx = editorText.length;
  var selection = window.getSelection();
  if (selection.rangeCount > 0) {
    var range = selection.getRangeAt(0);
    cursorIdx = range.endOffset;
    // If cursor is at beginning of formula (before equals), insert at end.
    // Makes no sense to insert a ref before the formula.
    if (cursorIdx == 0) {
      cursorIdx = editorText.length;
    }
  }

  // Get text to left of cursor, up to first reserved token
  var subText = '';
  for (var i = cursorIdx - 1; i > -1; i--) {
    if (dng.Parser.isReservedToken(editorText[i])) {
      break;
    }
    subText = editorText[i] + subText;
  }
  console.log('subText: ' + subText);

  // If this is a range, transform cellId based on dng.FakeTrix.refRangeStartEl.
  if (isRange) {
    var startCellId;
    if (shiftKey) { // User previously selected a single cell, now shift+clicked another
      if (!dng.Parser.Node.isRef(subText)) { // Sanity check.
        return;
      }
      startCellId = subText;
    } else { // User is dragging mouse
      startCellId = dng.FakeTrix.refRangeStartEl.id;
    }

    if (cellId[0].charCodeAt() < startCellId[0].charCodeAt()) {
      cellId = cellId + ':' + startCellId; // cellId is a range now, TODO rename var
    } else {
      cellId = startCellId + ':' + cellId;
    }
  }

  // Is that text a cell reference?
  var newCursorIdx;
  if (dng.Parser.Node.isRef(subText)) {
    // Yes. Build new text, removing old cell ref.
    var textBeforeCursor = editorText.substring(0, i + 1) + cellId;
    var textAfterCursor = editorText.substring(cursorIdx);
    editorText = textBeforeCursor + textAfterCursor;
    newCursorIdx = textBeforeCursor.length;
  } else {
    // No. Build new text.
    var textBeforeCursor = editorText.substring(0, cursorIdx - subText.length) + cellId;
    var textAfterCursor = editorText.substring(cursorIdx);
    editorText = textBeforeCursor + textAfterCursor;
    newCursorIdx = textBeforeCursor.length;
  }

  // Insert new ref
  $('#trix-cell-editor').text(editorText);
  dng.FakeTrix.updateFormulaBar();
  dng.Parser.markupFormula($('#trix-cell-editor').get(0)); // Will detect new refs and show highlights.

  // Move cursor after newly-inserted ref.
  selection.removeAllRanges();
  var range = document.createRange();
  var editTarget = dng.FakeTrix.editingViaFormulaBar ? $('#trix-formula-input') : $('#trix-cell-editor');
  var textNode = editTarget.get(0).childNodes[0];
  range.setStart(textNode, newCursorIdx);
  range.setEnd(textNode, newCursorIdx);
  selection.addRange(range);
};


dng.FakeTrix.refHighlightColorCount_ = -1;


dng.FakeTrix.getNextRefHighlightColor = function() {
  var color = 'ref-' + ++dng.FakeTrix.refHighlightColorCount_;
  if (dng.FakeTrix.refHighlightColorCount_ > 3) { // Cycle
    dng.FakeTrix.refHighlightColorCount_ = -1;
  }
  return color;
};


// refMap based on ranges found in the cell's formula.
dng.FakeTrix.setRefsVisible = function(visible) {
  for (ref in dng.FakeTrix.refMap) {
    if (dng.FakeTrix.refMap.hasOwnProperty(ref)) {
      // Show/hide reference highlight for this cell.
      if (ref.indexOf(':') == -1) {
        // Highlight the cell.
        if (visible && $('#' + ref).hasClass('referenced')) {
          continue;
        }
        $('#' + ref).toggleClass('referenced ' + dng.FakeTrix.refMap[ref], visible);
      } else {
        // Highlight the range.
        var beginId = ref.substring(0, ref.indexOf(':'));
        var endId = ref.substring(ref.indexOf(':') + 1);
        var col1 = beginId.substring(0, 1);
        var col2 = endId.substring(0, 1);
        var startCol = col1.charCodeAt() < col2.charCodeAt() ? col1 : col2;
        var endCol = col1.charCodeAt() < col2.charCodeAt() ? col2 : col1;
        var row1 = parseInt(beginId.substring(1));
        var row2 = parseInt(endId.substring(1));
        var startRow = row1 < row2 ? row1 : row2;
        var endRow = row1 < row2 ? row2 : row1;

        // Highlight cells.
        for (var col = startCol.charCodeAt(); col <= endCol.charCodeAt(); col++) {
          for (var row = startRow; row <= endRow; row++) {
            var cellId = String.fromCharCode(col).toUpperCase() + row;
            if (visible && $('#' + cellId).hasClass('referenced')) {
              continue;
            }
            $('#' + cellId).toggleClass('referenced ' + dng.FakeTrix.refMap[ref], visible);
          }
        }
      }
    }
  }
};


dng.FakeTrix.handleFormulaInputKeyDown = function(e) {
  dng.FakeTrix.hideAllNodeValues();

  if (e.keyCode == dng.FakeTrix.ENTER) {
    e.preventDefault();
    if (dng.Formulas.isFormulaHelperVisible()) { // Let formula helper handle it.
      return;
    }
    dng.FakeTrix.hideCellEditor();
    dng.FakeTrix.moveDown();
  }
};


dng.FakeTrix.handleFormulaInputKeyUp = function(e) {
  var formulaInputValue = $('#trix-formula-input').text();

  if (formulaInputValue.substring(0, 1) == '=') {
    dng.Parser.markupFormula($('#trix-formula-input').get(0));
    if (!dng.Formulas.isFormulaHelperVisible()) {
      dng.Formulas.setFormulaHelperVisible(true, $('#trix-formula-input').get(0));
    }
  } else {
    // Not a formula, just copy the value from formula input to markup container.
    $('#trix-formula-markup-container').html($('#trix-formula-input').html());
    dng.Formulas.setFormulaHelperVisible(false);
  }

  $('#trix-cell-editor').text($('#trix-formula-input').text());
  dng.FakeTrix.maybeShowNodeValue($('#trix-cell-editor').get(0));
};


dng.FakeTrix.initialized = false;


// Runs when page loads.
$(function() {
  dng.FakeTrix.init();
  dng.FakeTrix.initialized = true;
  var fakeTrixInitializedEvent = document.createEvent('UIEvents');
  fakeTrixInitializedEvent.initUIEvent('fake-trix-initialized', true, true, window, 1);
  document.dispatchEvent(fakeTrixInitializedEvent);
});
