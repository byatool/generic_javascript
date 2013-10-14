goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.control.formatTextAreaDisplay.utility');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.control.formatTextAreaDisplay.html');



/**
 @const
 @type {Array.<string>}
 @protected
 */
src.base.control.formatTextAreaDisplay.html.operators =
  [
    '&gt;',
    '&lt;'
  ];


/**
 @const
 @type {Array.<string>}
 @protected
 */
src.base.control.formatTextAreaDisplay.html.reservedWords =
  [
    'span',
    'div',
    'head',
    'body',
    'class&#61;',
    'id&#61;',
    'type&#61;',
    'name&#61;',
    'style&#61;'
  ];


/**
 @param {string} text The raw html to format.
 @param {?function} replace The function used to replace the word.
 @param {?function} toRegex The function used to find the word in the text.
 @param {?function} convertAllListedWords The function used to surround
 any listed word with with a color span.
 @param {?function} convertAllQuotedText The function used to surround any
 " " with a color span.
 @return {string} The formatted text.
 @export
 */
src.base.control.formatTextAreaDisplay.html.format =
  function(text, replace, toRegex, convertAllListedWords, convertAllQuotedText) {

    replace = replace ?
      replace :
      src.base.helper.googleWrapper.replace;

    toRegex = toRegex ?
      toRegex :
      src.base.helper.googleWrapper.toRegex;

    convertAllListedWords = convertAllListedWords ?
      convertAllListedWords :
      src.base.control.formatTextAreaDisplay.utility.convertAllListedWords;

    convertAllQuotedText = convertAllQuotedText ?
      convertAllQuotedText :
      src.base.control.formatTextAreaDisplay.utility.convertAllQuotedText;


    /* Start */

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var Current_ = src.base.control.formatTextAreaDisplay.html;
    var Utility_ = src.base.control.formatTextAreaDisplay.utility;
    var GoogleWrapper_ = src.base.helper.googleWrapper;


    text = replace(text, toRegex('&'), '&amp;');
    text = replace(text, toRegex('='), '&#61;');
    text = replace(text, toRegex('"'), '_!');
    text = replace(text, toRegex('>'), '&gt;');
    text = replace(text, toRegex('<'), '&lt;');


    text = convertAllListedWords(text,
                                 Current_.reservedWords,
                                 Constant_.ColorUserItems);

    text = convertAllQuotedText(text,
                                Constant_.ColorQuotedText,
                                Constant_.RegexFindBetweenReplacementQuote);

    text = convertAllListedWords(text,
                                 Current_.operators,
                                 Constant_.ColorEqualityOperators);

    text = replace(text, toRegex('_!'), '&quot;');

    return text;
  };
