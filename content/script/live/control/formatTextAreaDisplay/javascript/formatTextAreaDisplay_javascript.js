goog.require('goog.array');
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
 @param {string} text The text to clean up.
 @param {function} toRegex The function used to find the word in the text.
 @param {function} replace The function used to replace the word.
 @return {string} The cleaned text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.cleanUpText =
  function(text, toRegex, replace) {

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;


    return replace(text,
                   toRegex(Constant_.RegexFindPipe),
                   Constant_.EqualityOperatorOr);
  };


/**
 @param {string} text The text to check for quoted text.
 @param {string} color The color to use withing the color span.
 @param {function} toRegex The funcion used to find the quotes  in
 the text.
 @param {function} replace The function used to replace the word.
 @protected
 @param {function} match The function used to find the quoted text.
 @param {function} forEach The function used to take the matches
 and update the text.
 @param {function} surroundWithColor The function used to surround the
 matched text with a color div.
 @return {string} The updated text.
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllQuotedText =
  function(text, color, toRegex, replace,
           match, forEach, surroundWithColor) {
    
    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    
    var findMatch = toRegex(Constant_.RegexFindBetweenQuotes);
    var matched = match(text, findMatch);
    
    if(matched !== null) {
      forEach(matched, function(item) {
        text = surroundWithColor(text, item, color, toRegex, replace);
      });
    }
     
    return text;
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


    text = Current_. forEqualityOperatorWords_(text,
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


/**
 @param {string} text The text to update.
 @param {function} toRegex The function used to find the quotes  in
 the text.
 @param {function} match The function used to find the declared vars.
 @param {function} remove The function used to remove the vars keyword.
 @param {function} trim The function used to remove the spaces from
 the matched items.
 @param {function} map The function used to remove any unwanted text
 from the matches.
 @param {function} forEach The function used to take the matches
 and update the text.
 @param {function} surroundWithColor The function used to surround the
 matched text with a color div.
 @return {string} The updated text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllUserDefinedItems =
  function(text, toRegex, match, remove, trim, map,
           forEach, surroundWithColor) {

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var GoogleWrapper_ = src.base.helper.googleWrapper;

    var userDefinedItemsSearchRegex = toRegex(Constant_.RegexFindUserDefinedItems);
    var userItems = match(text, userDefinedItemsSearchRegex);

    userItems = map(userItems, function(item) {
      return remove(trim(item), Constant_.RegexVarText);
    });

    forEach(userItems, function(item) {
      text = surroundWithColor(text,
                               item,
                               Constant_.ColorUserItems,
                               toRegex,
                               GoogleWrapper_.replace);
    });

    return text;
  };


/**
 @param {string} text The text to update.
 @param {function} toRegex The function used to find the parameters in
 the text.
 @param {function} match The function used to find the parameters.
 @param {function} buildString The function used to take all the matched
 parameter group, and combine to one string.
 @param {function} split The function used to split the parameters from
 the matched string.
  @param {function} remove The function used to remove function(.
 @param {function} trim The function used to remove the spaces from
 the matched items.
 @param {function} map The function used to remove any unwanted text
 from the matches.
 @param {function} forEach The function used to take the matches
 and update the text.
 @param {function} surroundWithColor The function used to surround the
 matched text with a color div.
 @return {string} The updated text.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript.convertAllParameters =
  function(text, toRegex, match, buildString, split, remove, trim, map,
           forEach, surroundWithColor) {

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var GoogleWrapper_ = src.base.helper.googleWrapper;

    var userDefinedParamtersRegex = toRegex(Constant_.RegexFindParameters);
    var userItems = match(text, userDefinedParamtersRegex);

    userItems = map(userItems, function(item) {
      return remove(item, Constant_.RegexFunctionText);
    });

    userItems = buildString(userItems);

    var allInOne = split(userItems, ',');

    forEach(allInOne, function(item) {
      text = surroundWithColor(text,
                               item,
                               Constant_.ColorUserParameters,
                               toRegex,
                               GoogleWrapper_.replace);
    });

    return text;
  };


/**
 @param {string} text The raw javascript to format.
 @param {function} cleanUpText The function used to remove any non regex
 friendly character.
 @param {?function} convertAllReservedWords The function used to surround
 any special forms with with a color span.
 @param {?function} convertAllEqualityOperators The function used to surround
 any equality operators with with a color span.
 @param {?function} convertAllReservedMethods  The function used to surround
 any javascript functions with with a color span.
 @param {?function} convertAllUserDefinedItems The function used to surround
 any non build in functions with with a color span.
 @param {?function} convertAllQuotedText The function used to surround any " " with
 a color span.
 @param {?function} convertAllParameters The function used to color all parameters.
 @return {string} The formatted text.
 @export
 */
src.base.control.formatTextAreaDisplay.javascript.format =
  function(text, cleanUpText, convertAllReservedWords, convertAllEqualityOperators,
           convertAllReservedMethods, convertAllUserDefinedItems,
           convertAllQuotedText, convertAllParameters) {

    cleanUpText = cleanUpText ?
      cleanUpText :
      src.base.control.formatTextAreaDisplay.javascript.cleanUpText;

    convertAllReservedWords = convertAllReservedWords ?
      convertAllReservedWords :
      src.base.control.formatTextAreaDisplay.javascript.convertAllReservedWords;

    convertAllEqualityOperators = convertAllEqualityOperators ?
      convertAllEqualityOperators :
      src.base.control.formatTextAreaDisplay.javascript.convertAllEqualityOperators;

    convertAllUserDefinedItems = convertAllUserDefinedItems ?
      convertAllUserDefinedItems :
      src.base.control.formatTextAreaDisplay.javascript.convertAllUserDefinedItems;

    // convertAllNonReservedMethods = convertAllNonReservedMethods ?
    //   convertAllNonReservedMethods :
    //   function() {};

    convertAllQuotedText = convertAllQuotedText ?
      convertAllQuotedText :
      src.base.control.formatTextAreaDisplay.javascript.convertAllQuotedText;

    convertAllParameters = convertAllParameters ?
      convertAllParameters :
      src.base.control.formatTextAreaDisplay.javascript.convertAllParameters;

    /* Start */

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;
    var Current_ = src.base.control.formatTextAreaDisplay.javascript;
    var GoogleWrapper_ = src.base.helper.googleWrapper;


    text = cleanUpText(text,
                       GoogleWrapper_.toRegex,
                       GoogleWrapper_.replace);

    text = convertAllQuotedText(text,
                                Constant_.ColorQuotedText,
                                GoogleWrapper_.toRegex,
                                GoogleWrapper_.replace,
                                GoogleWrapper_.match,
                                goog.array.forEach,
                                Current_.surroundWithColor);

    text = convertAllUserDefinedItems(text,
                                      GoogleWrapper_.toRegex,
                                      GoogleWrapper_.match,
                                      goog.string.remove,
                                      goog.string.trim,
                                      goog.array.map,
                                      goog.array.forEach,
                                      Current_.surroundWithColor);

    text = convertAllParameters(text,
                                GoogleWrapper_.toRegex,
                                GoogleWrapper_.match,
                                goog.string.buildString,
                                GoogleWrapper_.split,
                                goog.string.remove,
                                goog.string.trim,
                                goog.array.map,
                                goog.array.forEach,
                                Current_.surroundWithColor);

    text = convertAllReservedWords(text, Current_.surroundWithColor);
    text = convertAllEqualityOperators(text, Current_.surroundWithColor);


    // convertAllReservedMethods(text);
    // convertAllNonReservedMethods(text);


    return text;
  };
