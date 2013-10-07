goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.control.formatTextAreaDisplay.javascript');


/**
 @param {string} text The text to format.
 @param {string} word The word that will be surrounded with a color
 span.
 @param {function} surroundWithColor The function used to surround any
 word with a color div.
 @return {string} The formatted text.
 @private
 */
src.base.control.formatTextAreaDisplay.javascript.forEqualityOperatorWords_ =
  function(text, word, surroundWithColor) {
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var GoogleWrapper_ = src.base.helper.googleWrapper;
    
    return surroundWithColor(text,
                             word,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.toRegex,
                             GoogleWrapper_.replace);
    
  };



/**
 @param {string} text The text to format.
 @param {string} word The word that will be surrounded with a color
 span.
 @param {function} surroundWithColor The function used to surround any
 word with a color div.
 @return {string} The formatted text.
 @private
 */
src.base.control.formatTextAreaDisplay.javascript.forReservedWords_ =
  function(text, word, surroundWithColor) {
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var GoogleWrapper_ = src.base.helper.googleWrapper;

    return surroundWithColor(text,
                             word,
                             Constant_.ColorReservedWords,
                             GoogleWrapper_.toRegex,
                             GoogleWrapper_.replace);
    
  };


/**
 @param {string} text The text to surround with a color span.
 @param {string} word The word to surround.
 @param {string} color The color to use withing the color span.
 @param {function} toRegex The function used to find the word in the text.
 @param {function} replace The function used to replace the word.
 @return {string} The surrounded text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.surroundWithColor =
  function(text, word, color, toRegex, replace) {
    var regex = toRegex(word);
    
    return replace(text, regex, '<span style=\'color:' + color + ';\'>' + word + '</span>');
  };


/**
 @param {string} text The text to format.
 @param {function} surroundWithColor The function used to surround any
 word with a color div.
 @return {string} The formatted text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllReservedWords =
  function(text, surroundWithColor) {
    
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var Current_ = src.base.control.formatTextAreaDisplay.javascript;
    var DomCreation_ = src.base.helper.domCreation;
    var GoogleWrapper_ = src.base.helper.googleWrapper;

    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordElse,
                                      surroundWithColor);

    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordEquals,
                                      surroundWithColor);

    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordFor,
                                      surroundWithColor);

    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordFunction,
                                      surroundWithColor);

    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordIf,
                                      surroundWithColor);
    
    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordReturn,
                                      surroundWithColor);

    text = Current_.forReservedWords_(text,
                                      Constant_.ReservedWordVar,
                                      surroundWithColor);


    return text;
  };



/**
 @param {string} text The text to format.
 @param {function} surroundWithColor The function used to surround any
 word with a color div.
 @return {string} The formatted text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllEqualityOperators =
  function(text, surroundWithColor) {
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var Current_ = src.base.control.formatTextAreaDisplay.javascript;
    var DomCreation_ = src.base.helper.domCreation;
    var GoogleWrapper_ = src.base.helper.googleWrapper;
    
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorEqualsEquals,
                                              surroundWithColor);
     
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorNotEqual,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorGreaterThan,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorGreaterOrEqualTo,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorLessThan,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorLessOrEqualTo,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorFalse,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorTrue,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorAnd,
                                              surroundWithColor);
    
    text = Current_.forEqualityOperatorWords_(text,
                                              Constant_.EqualityOperatorOr,
                                              surroundWithColor);
    return text;
  };

//reserved methods 9b3429
//isNaN
//substr


//non reserved method
//mid yellow dab45c
//find all with X.name

//take the last name and add to a list
// find all with '.' + name
// color

//Text
//light green
//"safda"


/**
 @param {string} text The raw javascript to format.
 @param {?function} convertAllReservedWords The function used to surround
 any special forms with with a color span.
 @param {?function} convertAllEqualityOperators The function used to surround
 any equality operators with with a color span.
 @param {?function} convertAllReservedMethods  The function used to surround
 any javascript functions with with a color span.
 @param {?function} convertAllNonReservedMethods The function used to surround
 any non build in functions with with a color span.
 @param {?function} convertAllQuotedText The function used to surround any " " with
 a color span.
 @return {string} The formatted text.
 @export
 */
src.base.control.formatTextAreaDisplay.javascript.format =
  function(text, convertAllReservedWords, convertAllEqualityOperators,
           convertAllReservedMethods, convertAllNonReservedMethods,
           convertAllQuotedText) {


    convertAllReservedWords = convertAllReservedWords ?
      convertAllReservedWords :
      src.base.control.formatTextAreaDisplay.javascript.convertAllReservedWords;

    convertAllEqualityOperators = convertAllEqualityOperators ?
      convertAllEqualityOperators :
      src.base.control.formatTextAreaDisplay.javascript.convertAllEqualityOperators;

    // convertAllReservedMethods = convertAllReservedMethods ?
    //   convertAllReservedMethods :
    //   function() {};

    // convertAllNonReservedMethods = convertAllNonReservedMethods ?
    //   convertAllNonReservedMethods :
    //   function() {};

    // convertAllQuotedText = convertAllQuotedText ?
    //   convertAllQuotedText :
    //   function() {};

    /* Start */

    var Current_ = src.base.control.formatTextAreaDisplay.javascript;

    text = convertAllReservedWords(text, Current_.surroundWithColor);
    text = convertAllEqualityOperators(text, Current_.surroundWithColor);

    // convertAllReservedMethods(text);
    // convertAllNonReservedMethods(text);
    // convertAllQuotedText(text);

    return text;
  };
