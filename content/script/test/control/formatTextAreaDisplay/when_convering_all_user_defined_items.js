
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
  
  
  //Fields
  
  var Text_ = goog.string.getRandomString(); 
  
  var forEach_;
  var match_;
  var replace_;
  var surroundWithColor_;
  var toRegex_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    forEach_= function() {};
    match_= function() {};
    replace_= function() {};
    surroundWithColor_= function() {};
    toRegex_= function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.convertAllUserDefinedItems(Text_, toRegex_, match_, replace_,
                                               forEach_, surroundWithColor_);
  };
  
  
  //Test Methods
  
  it('should create the regular expression.', function() {
    var methodWasCalled = false;
    
    toRegex_ = function(text){
      methodWasCalled = Constant_.RegexFinUserDefinedItems !== undefined &&
        text === Constant_.RegexFinUserDefinedItems;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should match the created regex to get the user defined items.', function() {
    var methodWasCalled = false;
    var createdRegex = {};
    
    toRegex_ = function(){
      return createdRegex;
    };
    
    match_ = function(text, regex){
      methodWasCalled = text === Text_ &&
        regex === createdRegex;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should remove var from the matched items.', function() {
    var callCount = 0;
    var matched = {};
    var createdRegex = 'b';
    var matchedItem = 'a';
    
    toRegex_ = function(text){
      callCount += text === 'var ';
      return createdRegex;
    };
    
    replace_ = function(text, regex, to){
      callCount += text === matchedItem &&
        regex === createdRegex &&
        to === '';
    };
    
    forEach_ = function(items, toDo) {
      callCount += items === matched && callCount === 0;
      
      toDo(matchedItem);
    };
    
    callTheMethod_();
    
    expect(callCount).toBe(3);
  });
  
  
  it('should surround all matched with color.', function() {
    var callCount = 0;
    var matched = {};
    var item = {};
    
    surroundWithColor_ = function(text, word, color, toRegex, replace){
      callCount += text === Text_ &&
        word === item &&
        color === Constant_.ColorUserMethods &&
        toRegex === toRegex_ &&
        replace === replace_;
    };
    
    forEach_ = function(items, toDo){
      callCount += items === matched && callCount === 0;
      
      toDo(item);
    };
    
    
    callTheMethod_();
    
    expect(callCount).toBe(2);
  });
};

describe('When converting all user defined items, it', function() {
  src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems.describe();
});


//--namespace="src.test.control.formatTextAreaDisplay.whenCovertingAllUserDefinedItems" ^
