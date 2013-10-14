goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.control.formatTextAreaDisplay.utility');


/**
 @param {string} text The text to clean up.
 @param {?function} toRegex The function used to find the word in the text.
 @param {?function} replace The function used to replace the word.
 @return {string} The cleaned text.
 @export
 */
src.base.control.formatTextAreaDisplay.utility.cleanUpText =
  function(text, toRegex, replace) {

    toRegex = toRegex ?
      toRegex :
      src.base.helper.googleWrapper.toRegex;

    replace = replace ?
      replace :
      src.base.helper.googleWrapper.replace;

    /* Start */

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;


    return replace(text,
                   toRegex(Constant_.RegexFindPipe),
                   Constant_.EqualityOperatorOr);
  };


/**
  @param {string} text The text to format.
  @param {Array.<string>} wordList The list of words to surround with color.
  @param {string} color The color to surround the list of words with.
  @param {?function} forEach The function used to search through, and format
  the text.
  @param {?function} surroundWithColor The function used to surround any
  word with a color div.
  @return {string} The formatted text.
  @protected
  */
src.base.control.formatTextAreaDisplay.utility.convertAllListedWords =
  function(text, wordList, color, forEach, surroundWithColor) {

    forEach = forEach ?
      forEach :
      goog.array.forEach;

    surroundWithColor = surroundWithColor ?
      surroundWithColor :
      src.base.control.formatTextAreaDisplay.utility.surroundWithColor;

    /* Start */

    var GoogleWrapper_ = src.base.helper.googleWrapper;

    forEach(wordList, function(item) {
      text = surroundWithColor(text,
                               item,
                               color,
                               GoogleWrapper_.toRegex,
                               GoogleWrapper_.replace);
    });

    return text;
  };


/**
 @param {string} text The text to update.
 @param {string} parameterSearch The regex needed to find the parameters.
 @param {string} functionSearch The regex needed to find the function
 start text.
 @param {string} color The color to use to highlight the matches.
 @param {?function} toRegex The function used to find the parameters in
 the text.
 @param {?function} match The function used to find the parameters.
 @param {?function} buildString The function used to take all the matched
 parameter group, and combine to one string.
 @param {?function} split The function used to split the parameters from
 the matched string.
 @param {?function} remove The function used to remove function(.
 @param {?function} sort The function used to make sure all matches are
 it order.
 @param {function} reverse The function used to take the sorted matches
 are sorted descending so that a word like theTest is wrapped before
 Test.
 @param {?function} trim The function used to remove the spaces from
 the matched items.
 @param {?function} map The function used to remove any unwanted text
 from the matches.
 @param {?function} forEach The function used to take the matches
 and update the text.
 @param {?function} surroundWithColor The function used to surround the
 matched text with a color div.
 @return {string} The updated text.
 @protected
 */
src.base.control.formatTextAreaDisplay.utility.convertAllParameters =
  function(text, parameterSearch, functionSearch, color,
           toRegex, match, buildString, split, remove, sort, reverse,
           trim, map, forEach, surroundWithColor) {

    toRegex = toRegex ?
      toRegex :
      src.base.helper.googleWrapper.toRegex;

    match = match ?
      match :
      src.base.helper.googleWrapper.match;

    buildString = buildString ?
      buildString :
      goog.string.buildString;

    split = split ?
      split :
      src.base.helper.googleWrapper.split;

    remove = remove ?
      remove :
      goog.string.remove;

    sort = sort ?
      sort :
      src.base.helper.googleWrapper.sort;

    reverse = reverse ?
      reverse :
      src.base.helper.googleWrapper.reverse;

    trim = trim ?
      trim :
      goog.string.trim;

    map = map ?
      map :
      goog.array.map;

    forEach = forEach ?
      forEach :
      goog.array.forEach;

    surroundWithColor = surroundWithColor ?
      surroundWithColor :
      src.base.control.formatTextAreaDisplay.utility.surroundWithColor;

    /* start */

    var GoogleWrapper_ = src.base.helper.googleWrapper;

    var userDefinedParamtersRegex = toRegex(parameterSearch);
    var userItems = match(text, userDefinedParamtersRegex);

    if (userItems !== null) {

      userItems = map(userItems, function(item) {
        return remove(item, functionSearch);
      });

      userItems = buildString(userItems);

      var allInOne = split(userItems, ',');
      allInOne = sort(allInOne);
      allInOne = reverse(allInOne);

      forEach(allInOne, function(item) {
        text = surroundWithColor(text,
                                 trim(item),
                                 color,
                                 toRegex,
                                 GoogleWrapper_.replace);
      });
    }

    return text;
  };


/**
 @param {string} text The text to check for quoted text.
 @param {string} color The color to use withing the color span.
 @param {?string} quoteRegex The optional regex to find quotes.
 @param {?function} isEmptySafe The function used to check if there is
 a value to the quoteRegex parameter.
 @param {?function} toRegex The funcion used to find the quotes  in
 the text.
 @param {?function} replace The function used to replace the word.
 @param {?function} match The function used to find the quoted text.
 @param {?function} forEach The function used to take the matches
 and update the text.
 @param {?function} surroundWithColor The function used to surround the
 matched text with a color div.
 @return {string} The updated text.
 @protected
 */
src.base.control.formatTextAreaDisplay.utility.convertAllQuotedText =
  function(text, color, quoteRegex, isEmptySafe,
           toRegex, replace, match, forEach,
           surroundWithColor) {


    isEmptySafe = isEmptySafe ?
      isEmptySafe :
      goog.string.isEmptySafe;

    toRegex = toRegex ?
      toRegex :
      src.base.helper.googleWrapper.toRegex;

    replace = replace ?
      replace :
      src.base.helper.googleWrapper.replace;

    match = match ?
      match :
      src.base.helper.googleWrapper.match;

    forEach = forEach ?
      forEach :
      goog.array.forEach;

    surroundWithColor = surroundWithColor ?
      surroundWithColor :
      src.base.control.formatTextAreaDisplay.utility.surroundWithColor;

    /* Start */

    var Constant_ = src.base.control.formatTextAreaDisplay.constant;

    quoteRegex = isEmptySafe(quoteRegex) ?
      Constant_.RegexFindBetweenQuotes :
      quoteRegex;

    var findMatch = toRegex(quoteRegex);

    var matched = match(text, findMatch);

    if (matched !== null) {

      forEach(matched, function(item) {
        text = surroundWithColor(text, item, color, toRegex, replace);
      });
    }

    return text;
  };


/**
 @param {string} text The text to update.
 @param {string} regexFindUserDefinedItems The regex needed to find
 all user defined items.
 @param {string} declarationText The text the precedes the user
 defined items.
 @param {string} color The color to highlight the items.
 @param {?function} toRegex The function used to find the quotes in
 the text.
 @param {?function} match The function used to find the declared vars.
 @param {?function} remove The function used to remove the vars keyword.
 @param {?function} trim The function used to remove the spaces from
 the matched items.
 @param {?function} map The function used to remove any unwanted text
 from the matches.
 @param {?function} forEach The function used to take the matches
 and update the text.
 @param {?function} surroundWithColor The function used to surround the
 matched text with a color div.
 @return {string} The updated text.
 @protected
 */
src.base.control.formatTextAreaDisplay.utility.convertAllUserDefinedItems =
  function(text, regexFindUserDefinedItems, declarationText,
           color, toRegex, match, remove, trim, map,
           forEach, surroundWithColor) {

    toRegex = toRegex ?
      toRegex :
      src.base.helper.googleWrapper.toRegex;

    match = match ?
      match :
      src.base.helper.googleWrapper.match;

    remove = remove ?
      remove :
      goog.string.remove;

    trim = trim ?
      trim :
      goog.string.trim;

    map = map ?
      map :
      goog.array.map;

    forEach = forEach ?
      forEach :
      goog.array.forEach;

    surroundWithColor = surroundWithColor ?
      surroundWithColor :
      src.base.control.formatTextAreaDisplay.utility.surroundWithColor;


    var GoogleWrapper_ = src.base.helper.googleWrapper;

    var userDefinedItemsSearchRegex = toRegex(regexFindUserDefinedItems);
    var userItems = match(text, userDefinedItemsSearchRegex);

    if (userItems !== null) {
      userItems = map(userItems, function(item) {
        return remove(trim(item), declarationText);
      });


      forEach(userItems, function(item) {
        text = surroundWithColor(text,
                                 item,
                                 color,
                                 toRegex,
                                 GoogleWrapper_.replace);
      });
    }

    return text;
  };


/**
 @param {string} text The text to surround with a color span.
 @param {string} word The word to surround.
 @param {string} color The color to use withing the color span.
 @param {?function} toRegex The function used to find the word in the text.
 @param {?function} replace The function used to replace the word.
 @return {string} The surrounded text.
 @protected
 */
src.base.control.formatTextAreaDisplay.utility.surroundWithColor =
  function(text, word, color, toRegex, replace) {

    toRegex = toRegex ?
      toRegex :
      src.base.helper.googleWrapper.toRegex;

    replace = replace ?
      replace :
      src.base.helper.googleWrapper.replace;

    /* Start */

    var regex = toRegex(word);

    return replace(text,
                   regex,
                   '<span style=\'color:' + color + ';\'>' + word + '</span>');
  };
