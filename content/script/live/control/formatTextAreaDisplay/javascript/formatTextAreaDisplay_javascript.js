goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.control.formatTextAreaDisplay.utility');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.control.formatTextAreaDisplay.javascript');



/**
 @const
 @type {Array.<string>}
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.operators =
  [
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorEqualsEquals,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorNotEqual,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorGreaterThan,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorGreaterOrEqualTo,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorLessThan,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorLessOrEqualTo,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorFalse,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorTrue,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorAnd,
    src.base.control.formatTextAreaDisplay.constant.EqualityOperatorOr
  ];


/**
 @const
 @type {Array.<string>}
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.reservedWords =
  [
    src.base.control.formatTextAreaDisplay.constant.ReservedWordElse,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordEquals,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordFor,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordFunction,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordIf,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordNull,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordReturn,
    src.base.control.formatTextAreaDisplay.constant.ReservedWordVar
  ];


/**
 @param {string} text The raw javascript to format.
 @param {function} cleanUpText The function used to remove any non regex
 friendly character.
 @param {?function} convertAllListedWords The function used to surround
 any listed word with with a color span.
 @param {?function} convertAllReservedMethods  The function used to surround
 any javascript functions with with a color span.
 @param {?function} convertAllUserDefinedItems The function used to surround
 any non build in functions with with a color span.
 @param {?function} convertAllQuotedText The function used to surround any
 " " with a color span.
 @param {?function} convertAllParameters The function used to color all
 parameters.
 @return {string} The formatted text.
 @export
 */
src.base.control.formatTextAreaDisplay.javascript.format =
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
    var Current_ = src.base.control.formatTextAreaDisplay.javascript;
    var Utility_ = src.base.control.formatTextAreaDisplay.utility;
    var GoogleWrapper_ = src.base.helper.googleWrapper;


    text = cleanUpText(text);

    text = convertAllQuotedText(text,
                                Constant_.ColorQuotedText);


    text = convertAllUserDefinedItems(text,
                                      Constant_.RegexFindUserDefinedItems,
                                      Constant_.RegexVarText,
                                      Constant_.ColorUserItems);

    text = convertAllParameters(text,
                                Constant_.RegexFindParameters,
                                Constant_.RegexFunctionText,
                                Constant_.ColorUserParameters);

    text = convertAllListedWords(text,
                                 Current_.reservedWords,
                                 Constant_.ColorReservedWords);

    text = convertAllListedWords(text,
                                 Current_.operators,
                                 Constant_.ColorEqualityOperators);
    return text;
  };
