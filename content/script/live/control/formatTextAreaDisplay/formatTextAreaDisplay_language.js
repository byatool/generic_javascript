goog.provide('src.base.control.formatTextAreaDisplay.javascript');

//Just surround with pre

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
//&& -> <span color='#'>&amp;&amp;</span>
//===
//!==
//>
//<
//>=
//<=
//false
//true

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
 @param {?function} setAllReservedWords The function used to surround
 any special forms with with a color span.
 @param {?function} setAllEquality The function used to surround
 any equality operators with with a color span.
 @param {?function} setAllReservedMethods  The function used to surround
 any javascript functions with with a color span.
 @param {?function} setAllNonReservedMethods The function used to surround
 any non build in functions with with a color span.
 @param {?function} setAllText  The function used to surround any " " with
 a color span.
 @param {?function} surroundWithPre The function used to surround the
 formatted text with a pre tag.
 @protected
 */
src.base.control.formatTextAreaDisplay.javascript =
  function(text, setAllReservedWords, setAllEquality, setAllReservedMethods,
          setAllNonReservedMethods, setAllText, surroundWithPre) {
    
  };
