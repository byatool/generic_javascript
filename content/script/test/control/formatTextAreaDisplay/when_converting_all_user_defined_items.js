
goog.require('goog.string');
goog.require('src.base.control.formatTextAreaDisplay.javascript');
goog.require('src.base.control.formatTextAreaDisplay.constant');

goog.provide('src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems');

/**
 @export
 */
src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.formatTextAreaDisplay.constant;
  var Current_ = src.base.control.formatTextAreaDisplay.javascript;
  var ControlConstant_ = src.base.control.controlConstant;
  var GoogleWrapper_ = src.base.helper.googleWrapper;
  
  //Fields
  
  var CleanUpTextRegex_ = goog.string.getRandomString();
  var FindUserRegex_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  
  var forEach_;
  var match_;
  var matched_;
  var remove_;
  var map_;
  var surroundWithColor_;
  var toRegex_;
  var trim_;
  
  //Test Hooks
  
  beforeEach(function() {
    forEach_= function() {};
    map_ = function(){};
    
    matched_ = {};
    match_= function() { return matched_; };
    remove_ = function(){};
    surroundWithColor_= function() {};
    toRegex_ = function(toFind) { return FindUserRegex_; };
    trim_ = function(){};
  });
  
  
  //Support Items
  
  var callTheMethod_ = function() {
    return Current_.convertAllUserDefinedItems(Text_, toRegex_, match_, remove_, trim_,
                                               map_, forEach_, surroundWithColor_);
  };
  
  
  //Test Items
  
  it('should create the regular expression.', function() {
    var methodWasCalled = false;
    
    toRegex_ = function(text){
      methodWasCalled = methodWasCalled ||
        (Constant_.RegexFindUserDefinedItems !== undefined &&
         text === Constant_.RegexFindUserDefinedItems);
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should match the created regex to get the user defined items.', function() {
    var methodWasCalled = false;
    
    
    match_ = function(text, regex){
      methodWasCalled = text === Text_ &&
        regex === FindUserRegex_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove var from the matched items.', function() {
    var callCount = 0;
    var item = 'adf';
    var trimmedText = 'ads';
    
    trim_ = function(text) {
      callCount += text === item;
      
      return trimmedText;
    };
    
    remove_ = function(text, what){
      callCount += text === trimmedText &&
        what === Constant_.RegexVarText;
    };
    
    map_ = function(items, toWhat){
      callCount += items === matched_;
      
      toWhat(item);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(3);
  });
  
  
  it('should surround all matched with color.', function() {
    var callCount = 0;
    var item = {};
    var mapped = {};
  
    map_ = function(){
      return mapped;
    };
    
    surroundWithColor_ = function(text, word, color, toRegex, replace){
      callCount += text === Text_ &&
        word === item &&
        color === Constant_.ColorUserItems &&
        toRegex === toRegex_ &&
        replace === GoogleWrapper_.replace;
    };
    
    forEach_ = function(items, toDo){
      callCount += items === mapped;
      
      toDo(item);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });

  
  it('should return the text.', function() {
    
    expect(callTheMethod_()).toBe(Text_);
    
  });
};


describe('When converting all user defined items, it', function() {
  src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems" ^
