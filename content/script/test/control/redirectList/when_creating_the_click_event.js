goog.require('goog.string');
goog.require('src.base.control.redirectList');

goog.provide('src.test.control.redirectList.whenCreatingTheClickEvent');


/**
 @export
 */
src.test.control.redirectList.whenCreatingTheClickEvent.describe = function() {
  //Using
  
  var Current = src.base.control.redirectList;
  
  
  //Fields
  
  var FirstElementId_ = goog.string.getRandomString();
  var FirstValue_ = goog.string.getRandomString();
  var SecondElementId_ = goog.string.getRandomString();
  var SecondValue_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  
  var button_;
  var elementIds_;
  var firstElement_;
  var getElement_;
  var getValue_;
  var map_;
  var redirect_;
  var reduce_;
  var removeAt_;
  var secondElement_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    button_ = {};
    elementIds_ = [FirstElementId_, SecondElementId_];
    firstElement_ = {};
    secondElement_ = {};
    
    map_ = function(){ return '';};
    reduce_ = function(){ return ''; };
    removeAt_ = function(){ return ''; };
    
    getElement_ = function(item) {
      return item === FirstElementId_ ? firstElement_ : secondElement_;
    };
    
    getValue_ = function(item) {
      return item === firstElement_ ? FirstValue_ : SecondValue_;
    };
    
    redirect_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    Current.createTheClickEvent(elementIds_, Url_, map_, getValue_, getElement_,
                                reduce_, removeAt_, redirect_)();
  };
  
  
  //Test Methods
   
  it('should find the needed element.', function() {
    var methodWasCalled = 0;
    var currentItem = {};
    
    
    getElement_ = function(item){
      methodWasCalled += item === currentItem;
    };
    
    map_ = function(ids, toDo){
      methodWasCalled += ids === elementIds_;
      toDo(currentItem);
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should find the needed value from the found element.', function() {
    var methodWasCalled = false;
    var foundElement = {};
    
    
    getElement_ = function(){
      return foundElement;
    };
    
    getValue_ = function(element){
      methodWasCalled = element === foundElement;
    };
    
    
    map_ = function(ids, toDo){
      toDo();
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create a list of name value pairs.', function() {
    var methodWasCalled = false;
    var item = {};
    var value = {};
    
    getElement_ = function(){
      return {};
    };
    
    getValue_ = function(){
      return value;
    };
    
    map_ = function(ids, toDo){
      methodWasCalled = toDo(item)[0] === item &&
        toDo(item)[1] === value;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
   
  
  it('should create a request parameters string.', function() {
    var methodWasCalled = false;
    var key = 'key';
    var value = 'value';
    var overallString = '?';
    var keyValueList = [[key, value]];
    
    map_ = function(){
      return keyValueList;
    }; 
    
    reduce_ = function(list, toDo, toStart) {
      methodWasCalled = keyValueList === list &&
        toDo(overallString, keyValueList[0]) === overallString + key + '=' + value + '&' &&
        toStart === '';
      
      return '';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove the last character from the parameter string.', function() {
    var methodWasCalled = false;
    var parameterString = 'ad';
    
    reduce_ = function(){
      return parameterString;
    };
    
    removeAt_ = function(theString, index, count){
      methodWasCalled = theString === parameterString &&
        index === parameterString.length - 1 &&
        count === 1;
      
      return parameterString;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should redirect.', function() {
    var methodWasCalled = false;
    var parameters = 'daf';
    
    removeAt_ = function(){
      return parameters;
    };
    
    redirect_ = function(url) {
      methodWasCalled = url === Url_ + '?' + parameters;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not create the name/value pairs if there are no element ids.', function() {
    var methodWasCalled = false;
    
    elementIds_ = null;
    
    map_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });

  
  it('should not create the parameter string if there are no element ids.', function() {
    var methodWasCalled = false;
    
    elementIds_ = null;
    
    reduce_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  it('should not create remove from the non existing string if there are no element ids.', function() {
    var methodWasCalled = false;
    
    elementIds_ = null;
    
    removeAt_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
  });
  
  
  it('should redirect to just the url if there are no element ids', function() {
    var methodWasCalled = false;
    elementIds_ = null;

    redirect_ = function(url){
      methodWasCalled = url === Url_;
    };
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
};


describe('When creating the click event, it', function() {
    src.test.control.redirectList.whenCreatingTheClickEvent.describe();
});
