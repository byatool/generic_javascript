goog.require('goog.string');

goog.provide('src.site.validation.validateDate');


/**
 @const
 @type {string}
 @export
 */
src.site.validation.validateDate.MaximumYear = 2999;


/**
 @const
 @type {string}
 @export
 */
src.site.validation.validateDate.MinimumYear = 1900;


/**
 @param {string} dateToCheck The date being validated.
 @param {string} separator The text used to separate the
 date parts.
 @param {?function} countOf The function used to find the
 count of the seperators.
 @param {?function} split The facade of the .split method.
 @param {?function}  parseInt The function used to create
 numbers out of all three sections of the date.
 @return {boolean} Whether the date is valid, or not.
 @export
 */
src.site.validation.validateDate.isValid =
  function(dateToCheck, separator, countOf, split, parseInt) {
    separator = '/';
    
    countOf = countOf ? countOf : goog.string.countOf;
    split = split ? split : src.site.validation.validateDate.split;
    parseInt = parseInt ? parseInt : goog.string.parseInt;
    
    
    var current = src.site.validation.validateDate;
    var isValid = false;
    
    if (countOf(dateToCheck, separator) === 2) {
      
      var sections = split(dateToCheck, separator);
      var month = sections[0];
      var day = sections[1];
      var year = sections[2];
      
      var actualMonth = parseInt(month);
      var actualDay = parseInt(day);
      var actualYear = parseInt(year);
      
      if ((actualMonth && actualMonth > 0 && actualMonth < 13) &&
         (actualDay && actualDay > 0 && actualDay < 31) &&
         (actualYear && actualYear > current.MinimumYear && actualYear < current.MaximumYear)) {
        
        isValid = true;
      }
  }

  return isValid;
};

/**
 @param {string} toSplit The string to be split.
 @param {string} splitBy The character to split with.
 @return {Array.<string>} The split string.
 @export
 */
src.site.validation.validateDate.split = function(toSplit, splitBy) {
  return toSplit.split(splitBy);
};
