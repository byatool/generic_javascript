goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.control.formatTextAreaDisplay.javascript');

//Just surround with pre

/**
 @param {string} text The text to surround with a color span.
 @param {string} color The color to use withing the color span.
 @param {string} word The word to replace.
 @param {function} replace The function used to replace the word.
 @return {string} The surrounded text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.surroundWithColor =
  function(text, word, color, replace) {
    return replace(text, word, '<span style=\'color:' + color +';\'>' + word + '</span>');
  };


/**
 @param {string} text The text to format.
 @param {function} replace The function used to add color to any
 reserved words.
 @param {function} surroundWithColor The function used to surround any
 word with a color div.
 @return {string} The formatted text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllReservedWords =
  function(text, surroundWithColor) {
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    //src.base.control.formatTextAreaDisplay
    
    var DomCreation_ = src.base.helper.domCreation;
    var GoogleWrapper_ = src.base.helper.googleWrapper;
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordElse,
                      Constant_.ColorReservedWords,
                      GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordEquals,
                      Constant_.ColorReservedWords,
                      GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordFor,
                      Constant_.ColorReservedWords,
                      GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordFunction,
                      Constant_.ColorReservedWords,
                      GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordIf,
                      Constant_.ColorReservedWords,
                      GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordReturn,
                      Constant_.ColorReservedWords,
                      GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                      Constant_.ReservedWordVar,
                      Constant_.ColorReservedWords,
                             GoogleWrapper_.replace);
    
    return text;
  };



/**
 @param {string} text The text to format.
 @param {function} replace The function used to add color to any
 reserved words.
 @param {function} surroundWithColor The function used to surround any
 word with a color div.
 @return {string} The formatted text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllEqualityOperators =
  function(text, surroundWithColor) {
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    
    var DomCreation_ = src.base.helper.domCreation;
    var GoogleWrapper_ = src.base.helper.googleWrapper;
    
    // //!==
    // //>
    // //<
    // //>=
    // //<=
    // //false
    // //true
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorEqualsEquals,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorNotEqual,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorGreaterThan,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorGreaterOrEqualTo,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorLessThan,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorLessOrEqualTo,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorFalse,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
    
    text = surroundWithColor(text,
                             Constant_.EqualityOperatorTrue,
                             Constant_.ColorEqualityOperators,
                             GoogleWrapper_.replace);
     
    return text;
  };


//reserved words
//dark orange e08940
//function
//for
//return
//var
//if
//else
//=

//Equallity  4578a6
//metal blue... and convert to html?


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
 @param {?function} convertAllEqualityOperators The function used to surround
 any special forms with with a color span.
 @param {?function} convertAllEquality The function used to surround
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
