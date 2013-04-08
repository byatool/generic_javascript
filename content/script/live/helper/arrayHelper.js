goog.require('goog.array');

goog.provide('src.base.helper.arrayHelper');


/**
 @param {Array} list This is the list to retrieve the first item from.
 @return {?Object} The first item in the list if on exists.
 */
src.base.helper.arrayHelper.car = function(list) {
    return list.length === 0 ? null : list[0];
};

/**
 @param {Array} list This is the list to retrieve all but the first item
 from.
 @return {?Array} The is the rest of the items.
 */
src.base.helper.arrayHelper.cdr = function(list) {
    return goog.array.slice(list, 1);
};

/**
 @param {Array} list The original list.
 @return {Array} All but the last item in a list.
 */
src.base.helper.arrayHelper.sink = function(list) {
    var result = null;

    if (list && list.length > 1) {

        result = goog.array.slice(list, 0, list.length - 1);
    }

    return result;
};
