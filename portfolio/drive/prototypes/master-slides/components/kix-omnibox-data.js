var dng = dng || {}; // Namespace declaration.


dng.KIX_OMNIBOX_DATA = {
  features: [
    /*
     * File menu.
     */
    {
      name: 'Share...',
      menus: ['file'],
      synonyms: ['collaborate', 'send', 'email']
    },
    {
      name: 'New document',
      opt_icon: 'img/toolbar/doc-icon.png',
      menus: ['file'],
      synonyms: ['create', 'write']
    },
    {
      name: 'New presentation',
      opt_icon: 'img/toolbar/presentation-icon.png',
      menus: ['file'],
      synonyms: ['create', 'new slides']
    },
    {
      name: 'New spreadsheet',
      opt_icon: 'img/toolbar/spreadsheet-icon.png',
      menus: ['file'],
      synonyms: ['create', 'new workbook']
    },
    {
      name: 'New form',
      opt_icon: 'img/toolbar/form-icon.png',
      menus: ['file'],
      synonyms: ['create', 'new survey']
    },
    {
      name: 'New drawing',
      opt_icon: 'img/toolbar/drawing-icon.png',
      menus: ['file'],
      synonyms: ['create', 'new picture', 'new image']
    },
    {
      name: 'New from template...',
      menus: ['file'],
      synonyms: ['templates']
    },
    {
      name: 'Open',
      menus: ['file'],
      synonyms: []
    },
    {
      name: 'Rename',
      menus: ['file'],
      synonyms: ['save as', 'save a copy', 'save']
    },
    {
      name: 'Make a copy (of this document)',
      menus: ['file'],
      synonyms: ['save as', 'save', 'save a copy', 'copy to']
    },
    {
      name: 'See revision history',
      menus: ['file'],
      synonyms: ['revisions', 'revert', 'undo', 'fix', 'old versions', 'prior versions', 'previous versions']
    },
    {
      name: 'Language',
      menus: ['file'],
      synonyms: []
    },
    {
      name: 'Download as Microsoft Word (.doc)',
      menus: ['file'],
      synonyms: ['ms', 'export']
    },
    {
      name: 'Download as OpenDocument Format (.odt)',
      menus: ['file'],
      synonyms: ['open office', 'export', 'odt']
    },
    {
      name: 'Download as Rich Text Format (.rtf)',
      menus: ['file'],
      synonyms: ['export', 'rtf']
    },
    {
      name: 'Download as PDF Document (.pdf)',
      menus: ['file'],
      synonyms: ['export', 'adobe', 'pdf']
    },
    {
      name: 'Download as Plain Text (.txt)',
      menus: ['file'],
      synonyms: ['export', 'txt']
    },
    {
      name: 'Download as Web Page (.html, zipped)',
      menus: ['file'],
      synonyms: ['export', 'web site', 'html', 'zip']
    },
    {
      name: 'Publish to the web...',
      menus: ['file'],
      synonyms: []
    },
    {
      name: 'Email collaborators...',
      menus: ['file'],
      synonyms: ['people', 'gmail']
    },
    {
      name: 'Email as attachment...',
      menus: ['file'],
      synonyms: ['gmail']
    },
    {
      name: 'Page setup...',
      menus: ['file'],
      synonyms: ['orientation', 'landscape', 'portrait', 'margins']
    },
    {
      name: 'Print',
      opt_icon: 'img/toolbar/print-icon.png',
      menus: ['file'],
      synonyms: []
    },

    /*
     * Edit menu.
     */
    {
      name: 'Undo',
      opt_icon: 'img/toolbar/undo-icon.png',
      menus: ['edit'],
      synonyms: ['fix']
    },
    {
      name: 'Redo',
      opt_icon: 'img/toolbar/redo-icon.png',
      menus: ['edit'],
      synonyms: ['fix']
    },
    {
      name: 'Cut',
      opt_icon: 'img/toolbar/cut-icon.png',
      menus: ['edit'],
      synonyms: ['remove', 'delete']
    },
    {
      name: 'Copy',
      opt_icon: 'img/toolbar/copy-icon.png',
      menus: ['edit'],
      synonyms: []
    },
    {
      name: 'Paste',
      opt_icon: 'img/toolbar/paste-icon.png',
      menus: ['edit'],
      synonyms: []
    },
    {
      name: 'Select all',
      menus: ['edit'],
      synonyms: ['select everything']
    },
    {
      name: 'Find and replace...',
      menus: ['edit'],
      synonyms: ['search']
    },

    /*
     * View menu.
     */
    {
      name: 'Paginated document view',
      menus: ['view'],
      synonyms: ['show pages', 'show page breaks', 'pages']
    },
    {
      name: 'Compact document view',
      menus: ['view'],
      synonyms: ['hide pages', 'hide page breaks']
    },
    {
      name: 'Show ruler',
      menus: ['view'],
      synonyms: ['inches', 'width', 'margins', 'tabs', 'tabstops', 'tab stops']
    },
    {
      name: 'Show equation toolbar',
      menus: ['view'],
      synonyms: ['equations', 'functions', 'formulas']
    },
    {
      name: 'Show spelling suggestions',
      menus: ['view'],
      synonyms: ['grammar', 'check spelling']
    },
    {
      name: 'Compact controls',
      menus: ['view'],
      synonyms: ['exit', 'leave']
    },
    {
      name: 'Full screen',
      menus: ['view'],
      synonyms: ['exit', 'leave']
    },


    /*
     * Insert menu.
     */
    {
      name: 'Image...',
      opt_icon: 'img/toolbar/insert-image-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['photo', 'picture', 'add a photo', 'add a picture', 'add an image']
    },
    {
      name: 'Link...',
      opt_icon: 'img/toolbar/insert-link-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['url', 'web site', 'address', 'web page', 'hyperlink', 'add a link']
    },
    {
      name: 'Equation...',
      opt_icon: 'img/toolbar/insert-equation-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['function', 'formula', 'add an equation']
    },
    {
      name: 'Drawing...',
      opt_icon: 'img/toolbar/insert-drawing-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['picture', 'image', 'chart', 'graphic', 'add a drawing']
    },
    {
      name: 'Comment',
      opt_icon: 'img/toolbar/insert-comment-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['feedback', 'message', 'note', 'add a comment']
    },
    {
      name: 'Footnote',
      menus: ['insert', 'add'],
      synonyms: ['foot note', 'add a foot note']
    },
    {
      name: 'Special characters',
      opt_icon: 'img/toolbar/special-chars-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['symbols', 'add a symbol', 'add symbols']
    },
    {
      name: 'Horizontal line',
      opt_icon: 'img/toolbar/horiz-line-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['hr', 'horizontal rule', 'add a horizontal line', 'add a horitonzal rule', 'add a line']
    },
    {
      name: 'Page number (top)',
      menus: ['insert', 'add'],
      synonyms: ['page numbers', 'add page numbers']
    },
    {
      name: 'Page number (bottom)',
      menus: ['insert', 'add'],
      synonyms: ['page numbers', 'add page numbers']
    },
    {
      name: 'Page break',
      opt_icon: 'img/toolbar/page-break-icon.png',
      menus: ['insert', 'add'],
      synonyms: ['new page', 'new section', 'add a page break']
    },
    {
      name: 'Page count',
      menus: ['insert', 'add'],
      synonyms: ['number of pages', 'add page count']
    },
    {
      name: 'Header',
      menus: ['insert', 'add'],
      synonyms: ['add a header']
    },
    {
      name: 'Footer',
      menus: ['insert', 'add'],
      synonyms: ['add a footer']
    },
    {
      name: 'Bookmark',
      menus: ['insert', 'add'],
      synonyms: ['anchor', 'link', 'add a bookmark', 'add an anchor', 'add a link']
    },
    {
      name: 'Table of contents',
      menus: ['insert', 'add'],
      synonyms: ['toc', 'index', 'list of sections', 'add a table of contents']
    },

    /*
     * Format menu.
     */
    {
      name: 'Bold',
      opt_icon: 'img/toolbar/bold-icon.png',
      menus: ['format'],
      synonyms: ['strong', 'dark']
    },
    {
      name: 'Italic',
      opt_icon: 'img/toolbar/italic-icon.png',
      menus: ['format'],
      synonyms: ['emphasis', 'emphasized']
    },
    {
      name: 'Underline',
      opt_icon: 'img/toolbar/underline-icon.png',
      menus: ['format'],
      synonyms: []
    },
    {
      name: 'Strikethrough',
      opt_icon: 'img/toolbar/strikethrough-icon.png',
      menus: ['format'],
      synonyms: ['strike-through', 'strike through']
    },
    {
      name: 'Superscript',
      opt_icon: 'img/toolbar/superscript-icon.png',
      menus: ['format'],
      synonyms: ['super script', 'super-script']
    },
    {
      name: 'Subscript',
      opt_icon: 'img/toolbar/subscript-icon.png',
      menus: ['format'],
      synonyms: ['sub script', 'sub-script']
    },
    {
      name: 'Increase indent',
      menus: ['format'],
      synonyms: ['increase paragraph indent']
    },
    {
      name: 'Decrease indent',
      menus: ['format'],
      synonyms: ['decrease paragraph indent']
    },
    {
      name: 'Left',
      menus: ['format'],
      synonyms: ['align left', 'left alignment']
    },
    {
      name: 'Center',
      menus: ['format'],
      synonyms: ['align center', 'center alignment']
    },
    {
      name: 'Right',
      menus: ['format'],
      synonyms: ['align right', 'right alignment']
    },
    {
      name: 'Justified',
      menus: ['format'],
      synonyms: ['align justified', 'justified alignment']
    },
    {
      name: '1.0 line spacing',
      opt_icon: 'img/toolbar/line-spacing-icon.png',
      menus: ['format'],
      synonyms: ['single spacing', 'single space']
    },
    {
      name: '1.15 line spacing',
      opt_icon: 'img/toolbar/line-spacing-icon.png',
      menus: ['format'],
      synonyms: []
    },
    {
      name: '1.5 line spacing',
      opt_icon: 'img/toolbar/line-spacing-icon.png',
      menus: ['format'],
      synonyms: []
    },
    {
      name: '2.0 line spacing',
      opt_icon: 'img/toolbar/line-spacing-icon.png',
      menus: ['format'],
      synonyms: ['double spacing', 'double space']
    },
    {
      name: 'Bullet list style',
      menus: ['format'],
      synonyms: ['circles']
    },
    {
      name: 'Hollow list style',
      menus: ['format'],
      synonyms: ['circles']
    },
    {
      name: 'Square list style',
      menus: ['format'],
      synonyms: ['boxes']
    },
    {
      name: '1, 2, 3 list style',
      menus: ['format'],
      synonyms: ['numbers', '123', 'numbered', 'outline']
    },
    {
      name: 'a, b, c list style',
      menus: ['format'],
      synonyms: ['letters', 'abc']
    },
    {
      name: 'i, ii, iii list style',
      menus: ['format'],
      synonyms: ['roman numerals']
    },
    {
      name: 'A, B, C list style',
      menus: ['format'],
      synonyms: ['letters']
    },
    {
      name: 'I, II, III list style',
      menus: ['format'],
      synonyms: ['roman numerals']
    },
    {
      name: 'Clear formatting',
      opt_icon: 'img/toolbar/clear-formatting-icon.png',
      menus: ['format'],
      synonyms: ['remove formatting']
    },
    {
      name: 'Normal text style',
      menus: ['format'],
      synonyms: ['standard text']
    },
    {
      name: 'Title style',
      menus: ['format'],
      synonyms: []
    },
    {
      name: 'Subtitle style',
      menus: ['format'],
      synonyms: []
    },
    {
      name: 'Heading 1 style',
      menus: ['format'],
      synonyms: ['h1', 'header']
    },
    {
      name: 'Heading 2 style',
      menus: ['format'],
      synonyms: ['h2', 'header']
    },
    {
      name: 'Heading 3 style',
      menus: ['format'],
      synonyms: ['h3', 'header']
    },
    {
      name: 'Heading 4 style',
      menus: ['format'],
      synonyms: ['h4', 'header']
    },
    {
      name: 'Heading 5 style',
      menus: ['format'],
      synonyms: ['h5', 'header']
    },
    {
      name: 'Heading 6 style',
      menus: ['format'],
      synonyms: ['h6', 'header']
    },
    {
      name: 'Save as my default styles',
      menus: ['format'],
      synonyms: ['save styles', 'save all styles']
    },
    {
      name: 'Use my default styles',
      menus: ['format'],
      synonyms: ['load default styles']
    },
    {
      name: 'Reset styles',
      menus: ['format'],
      synonyms: ['clear styles']
    },

    /*
     * Tools menu.
     */
    {
      name: 'Research',
      menus: ['tools'],
      synonyms: ['reference', 'search', 'look up', 'lookup']
    },
    {
      name: 'Define...',
      menus: ['tools'],
      synonyms: ['dictionary', 'look up', 'lookup']
    },
    {
      name: 'Word count',
      menus: ['tools'],
      synonyms: []
    },
    {
      name: 'Translate document...',
      menus: ['tools'],
      synonyms: ['languages']
    },
    {
      name: 'Script manager...',
      menus: ['tools'],
      synonyms: ['find scripts', 'browse scripts', 'load scripts']
    },
    {
      name: 'Script editor...',
      menus: ['tools'],
      synonyms: ['edit scripts']
    },
    {
      name: 'Preferences...',
      menus: ['tools'],
      synonyms: ['options', 'settings', 'configuration']
    },

    /*
     * Table menu.
     */
    {
      name: 'Insert table',
      menus: ['table'],
      synonyms: ['add table']
    },
    {
      name: 'Insert row above',
      menus: ['table'],
      synonyms: ['add row above']
    },
    {
      name: 'Insert row below',
      menus: ['table'],
      synonyms: ['add row below']
    },
    {
      name: 'Insert column left',
      menus: ['table'],
      synonyms: ['add column left']
    },
    {
      name: 'Insert column right',
      menus: ['table'],
      synonyms: ['add column right']
    },
    {
      name: 'Delete table',
      menus: ['table'],
      synonyms: ['remove table']
    },
    {
      name: 'Delete row',
      menus: ['table'],
      synonyms: ['remove row']
    },
    {
      name: 'Delete column',
      menus: ['table'],
      synonyms: ['remove column']
    },
    {
      name: 'Table properties...',
      menus: ['table'],
      synonyms: ['table settings', 'table background', 'cell background', 'table color']
    },

    /*
     * Help menu.
     */
    {
      name: 'Google Docs Help Center',
      menus: ['help'],
      synonyms: ['help forum', 'user forum', 'discussion forum']
    },
    {
      name: 'Learn from other Google users',
      menus: ['help'],
      synonyms: []
    },
    {
      name: 'New features',
      menus: ['help'],
      synonyms: []
    },
    {
      name: 'Report an issue',
      menus: ['help'],
      synonyms: []
    },
    {
      name: 'Report abuse',
      menus: ['help'],
      synonyms: []
    },
    {
      name: 'Keyboard shortcuts',
      menus: ['help'],
      synonyms: ['hotkeys']
    },

    /*
     * Toolbar stuff, no menu.
     */
    {
      name: '8 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '9 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '10 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '11 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '12 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '14 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '18 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '24 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '36 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '48 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: '72 font size',
      menus: [],
      synonyms: ['point', 'pt', 'px']
    },
    {
      name: 'Amaranth font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Amaranth'
    },
    {
      name: 'Arial font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Arial'
    },
    {
      name: 'Arial Black font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Arial Black"'
    },
    {
      name: 'Arvo font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Arvo'
    },
    {
      name: 'Bitter font',
      menus: [],
      synonyms: [],
      opt_fontFamily: ''
    },
    {
      name: 'Calibri font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Calibri'
    },
    {
      name: 'Cambria font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Cambria'
    },
    {
      name: 'Comic Sans MS font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Comic Sans"'
    },
    {
      name: 'Consolas font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Consolas'
    },
    {
      name: 'Corsiva font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Corsiva'
    },
    {
      name: 'Courier New font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Courier New"'
    },
    {
      name: 'Crimson Text font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Crimson Text"'
    },
    {
      name: 'Cutive font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Cutive'
    },
    {
      name: 'Dancing Script font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Dancing Script"'
    },
    {
      name: 'Droid Sans font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Droid Sans"'
    },
    {
      name: 'Droid Serif font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Droid Serif"'
    },
    {
      name: 'Gentium Book Basic font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Gentium Book Basic"'
    },
    {
      name: 'Georgia font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Georgia'
    },
    {
      name: 'Lobster font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Lobster'
    },
    {
      name: 'Marck Script font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Marck Script"'
    },
    {
      name: 'Merriweather font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Merriweather'
    },
    {
      name: 'Narrow font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Narrow'
    },
    {
      name: 'Open Sans font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Open Sans"'
    },
    {
      name: 'Oswald font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Oswald'
    },
    {
      name: 'Philosopher font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Philosopher'
    },
    {
      name: 'PT Serif font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"PT Serif"'
    },
    {
      name: 'Quattrocento font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Quattrocentro'
    },
    {
      name: 'Syncopate font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Syncopate'
    },
    {
      name: 'Times New Roman font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Times New Roman"'
    },
    {
      name: 'Trebuchet MS font',
      menus: [],
      synonyms: [],
      opt_fontFamily: '"Trebuchet MS"'
    },
    {
      name: 'Ubuntu font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Ubuntu'
    },
    {
      name: 'Verdana font',
      menus: [],
      synonyms: [],
      opt_fontFamily: 'Verdana'
    },
    {
      name: 'Add fonts...',
      opt_icon: 'img/toolbar/add-fonts-icon.png',
      menus: [],
      synonyms: []
    }
  ]
};
