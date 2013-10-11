goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.utility');
goog.require('src.base.control.formatTextAreaDisplay.constant');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.test.control.formatTextAreaDisplay.whenConvertingAllParameters');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenConvertingAllParameters.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.utility;
  var GoogleWrapper_ = src.base.helper.googleWrapper;
  
  //Fields
  
  var CleanUpTextRegex_ = goog.string.getRandomString();
  var Color_ = goog.string.getRandomString();
  var FindParametersRegexResult_ = goog.string.getRandomString();
  var FunctionSearch_ = goog.string.getRandomString();
  var Matched_ = goog.string.getRandomString();
  var ParameterSearch_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  
  var buildString_;
  var forEach_;
  var map_;
  var match_;
  var remove_;
  var reverse_;
  var split_;
  var sort_;
  var surroundWithColor_;
  var toRegex_;
  var trim_;
  
  
   //Test Hooks
  
  beforeEach(function() {
    
    toRegex_ = function(toFind) {
      return FindParametersRegexResult_;
    };
    
    buildString_ = function(){ };
    forEach_= function() {};
    map_ = function(){};
    match_= function() { return Matched_; };
    remove_= function() {};
    reverse_ = function(){};
    split_ = function(){};
    sort_ = function(){};
    surroundWithColor_= function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.convertAllParameters(Text_, ParameterSearch_, FunctionSearch_, Color_,
                                         toRegex_, match_, buildString_, split_, remove_,
                                         sort_, reverse_, trim_, map_, forEach_, surroundWithColor_);
  };
  
  
  //Test Methods
  
  it('should create the regular expression.', function() {
    var methodWasCalled = false;
    
    toRegex_ = function(text){
      methodWasCalled = methodWasCalled ||
        (text === ParameterSearch_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should match the created regex to get the parameters.', function() {
    var methodWasCalled = false;
    
    match_ = function(text, regex){
      methodWasCalled = text === Text_ &&
        regex === FindParametersRegexResult_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not continue if there are no  matched items.', function() {
    var methodWasCalled = false;
    var item = 'adf';
    
    match_ = function(){ return null; };
    
    map_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should remove function( from the matched items.', function() {
    var callCount = 0;
    var item = 'adf';
    
    remove_ = function(text, what){
      callCount += text === item &&
        what === FunctionSearch_;
    };
    
    map_ = function(items, toWhat){
      callCount += items === Matched_;
      
      toWhat(item);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });
  
  
  it('should combine all the matched items.', function() {
    var methodWasCalled = false;
    var mapped = [];
    
    map_ = function(){
      return mapped;
    };
    
    buildString_ = function(strings){
      methodWasCalled = strings === mapped;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should split the newly created string by comma.', function() {
    var methodWasCalled = false;
    var newString = '';
    
    buildString_ = function(){
      return newString;
    };
    
    split_ = function(text, by){
      methodWasCalled = text === newString &&
        by === ',';
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should sort the split list.', function() {
    var methodWasCalled = false;
    var allInOne = 'da';
    
    split_ = function(){
      return allInOne;
    };
    
    sort_ = function(theList){
      methodWasCalled = theList === allInOne;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should reverse the sorted list.', function() {
    var methodWasCalled = false;
    var sortedList = {};
    
    sort_ = function(){
      return sortedList;
    };
    
    reverse_ = function(theList){
      methodWasCalled = theList === sortedList;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should surround trim and surround the found parameters with a color span.', function() {
    var allInOne = 'da';
    var callCount = 0;
    var item = 'afa';
    var trimmed = 'a';
    
    reverse_ = function(theList){
      return allInOne;
    };
    
    trim_ = function(toTrim){
      callCount += toTrim === item;
      return trimmed;
    };
    
    surroundWithColor_ = function(text, word, color, toRegex, replace){
      callCount += text === Text_ &&
        word === trimmed &&
        color === Color_ &&
        toRegex === toRegex_ &&
        replace === GoogleWrapper_.replace;
    };
    
    forEach_ = function(items, toDo){
      callCount += items === allInOne;
      
      toDo(item);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(3);
  });
  
   
  it('should return the text.', function() {
    
    expect(callTheMethod_()).toBe(Text_);
    
  });
};

describe('When converting all parameters, it', function() {
  src.test.control.formatTextAreaDisplay.whenConvertingAllParameters.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenConvertingAllParameters" ^
