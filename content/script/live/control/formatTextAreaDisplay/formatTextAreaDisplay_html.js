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
    '=',
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
    'class',
    'id',
    'type',
    'name',
    'style',
    'div'
  ];







/**
 @param {string} text The raw html to format.
 @param {function} cleanUpText The function used to remove any non regex
 friendly character.
 @param {?function} convertAllListedWords The function used to surround
 any listed word with with a color span.
 @param {?function} convertAllReservedMethods  The function used to surround
 any html functions with with a color span.
 @param {?function} convertAllUserDefinedItems The function used to surround
 any non build in functions with with a color span.
 @param {?function} convertAllQuotedText The function used to surround any
 " " with a color span.
 @param {?function} convertAllParameters The function used to color all
 parameters.
 @return {string} The formatted text.
 @export
 */
src.base.control.formatTextAreaDisplay.html.format =
  function(text, cleanUpText, convertAllListedWords,
           convertAllReservedMethods, convertAllUserDefinedItems,
           convertAllQuotedText, convertAllParameters) {
    
    cleanUpText = cleanUpText ?
      cleanUpText :
      src.base.control.formatTextAreaDisplay.utility.cleanUpText;
    
    convertAllListedWords = convertAllListedWords ?
      convertAllListedWords :
      src.base.control.formatTextAreaDisplay.utility.convertAllListedWords;
    
    convertAllUserDefinedItems = convertAllUserDefinedItems ?
      convertAllUserDefinedItems :
      src.base.control.formatTextAreaDisplay.utility.convertAllUserDefinedItems;
    
    // convertAllNonReservedMethods = convertAllNonReservedMethods ?
    //   convertAllNonReservedMethods :
    //   function() {};
    
    convertAllQuotedText = convertAllQuotedText ?
      convertAllQuotedText :
      src.base.control.formatTextAreaDisplay.utility.convertAllQuotedText;
    
    convertAllParameters = convertAllParameters ?
      convertAllParameters :
      src.base.control.formatTextAreaDisplay.utility.convertAllParameters;
    
    /* Start */
    
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var Current_ = src.base.control.formatTextAreaDisplay.html;
    var Utility_ = src.base.control.formatTextAreaDisplay.utility;
    var GoogleWrapper_ = src.base.helper.googleWrapper;
    
    
    text = cleanUpText(text);
    
    text = convertAllQuotedText(text,
                                Constant_.ColorQuotedText);
    
    text = convertAllListedWords(text,
                                 Current_.reservedWords,
                                 Constant_.ColorReservedWords);
    
    text = convertAllListedWords(text,
                                 Current_.operators,
                                 Constant_.ColorEqualityOperators);
    return text;
  };
