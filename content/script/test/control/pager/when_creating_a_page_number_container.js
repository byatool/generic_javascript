goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.object');
goog.require('src.base.control.pager');
goog.require('src.base.helper.events');

goog.provide('src.test.control.pager.whenCreatingAPageNumberContainer');

/**
 @export
 */
src.test.control.pager.whenCreatingAPageNumberContainer.describe = function () {
  
  //Using
  var Current_ = src.base.control.pager;
  
  
  //Fields
  var TotalCountOfPages_ = 10;

  var appendChild_;
  var createAClearDiv_;
  var createADiv_;
  var createAPagerNumberButton_;
  var every_;
  var findNode_;
  var findNodes_;
  var numberPagerContainer_;
  var options_;
  var pagerOptions_;
  var pagerContainer_;
  var removeNode_;
  var result_;
  
  
  //Test Hooks
  beforeEach(function() {
    pagerContainer_ = {};
    numberPagerContainer_ = {};
    
    options_ = {};
    pagerOptions_ = {};
    
    result_ = {};
    result_[Current_.TotalCountOfPages] = TotalCountOfPages_;
    
    appendChild_ = function(){};
    createADiv_ = function() {};
    createAClearDiv_ = function() {};
    createAPagerNumberButton_ = function() { return {}; };
    findNode_ = function(){ return numberPagerContainer_;};
    findNodes_ = function(){ return []; };
    every_ = function(){};
    removeNode_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createAPageNumberContainer(result_, options_, pagerOptions_,
                                               pagerContainer_, findNode_,
                                               createADiv_, appendChild_, findNodes_,
                                               every_, removeNode_, createAPagerNumberButton_,
                                               createAClearDiv_);
  };
  
  
  //Test Methods
  
  it('should find the current number pager container if it exists.', function() {
    var methodWasCalled = false;
    var item  = {};
    
    item['className'] = Current_.NumberPagerContainerClass;
    
    findNode_ = function(parent, toDo){
      methodWasCalled = methodWasCalled ||
        (parent === pagerContainer_ && toDo(item));
      
      return numberPagerContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the number pager container if it does not exist.', function() {
    var methodWasCalled = false;
    
    findNode_ = function(){
      return null;
    };
    
    createADiv_ = function(attributes){
      methodWasCalled = attributes['class'] === Current_.NumberPagerContainerClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append a created button container.', function() {
    var methodWasCalled = false;
    var newContainer = {};
    
    findNode_ = function(){
      return null;
    };
    
    createADiv_ = function() {
      return newContainer;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled ||
        (parent === pagerContainer_  && child === newContainer);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
   it('should find any existing nodes that are higher than the page count.', function() {
    var methodWasCalled = false;
    var item = {};
    item['id'] = TotalCountOfPages_ + 1;
     
    findNodes_ = function(parent, toDo){
      methodWasCalled = parent === numberPagerContainer_ && toDo(item);
    };
     
    callTheMethod_();
     
    expect(methodWasCalled).toBe(true);
  });
  
  it('should remove any existing nodes that are higher that the page count.', function() {
    var methodWasCalled = 0;
    var itemOne = {};
    var itemsReturned = {};
    
    findNodes_ = function(){
      return itemsReturned;
    };
    
    every_ = function(collection, toDo) {
      methodWasCalled += collection === itemsReturned;
      toDo(itemOne);
    };
    
    removeNode_ = function(node){
      methodWasCalled += node === itemOne;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should create a number pager button for every page.', function() {
    var methodWasCalled = 0;
    var count = 2;
    
    result_[Current_.TotalCountOfPages] = count;
    
    
    createAPagerNumberButton_ = function(id,
                                         options,
                                         pagerOptions,
                                         pagerContainer,
                                         findNode,
                                         removeAll,
                                         clone,
                                         cloneOptions,
                                         createADiv,
                                         appendChild,
                                         setTextContent,
                                         swap,
                                         setClick) {
      methodWasCalled += (id === 0 || id === 1) &&
        options === options_ &&
        pagerOptions === pagerOptions_&&
        pagerContainer === numberPagerContainer_ &&  
        findNode === findNode_ && 
        removeAll === goog.events.removeAll && 
        clone === goog.object.clone &&
        cloneOptions === Current_.cloneOptions &&
        createADiv === createADiv_&&
        appendChild === appendChild_ &&
        setTextContent === goog.dom.setTextContent &&
        swap === goog.dom.classes.swap && 
        setClick === src.base.helper.events.setClick;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(count);
  });
  
  
  it('should find a clear div.', function() {
    var methodWasCalled = false;
    var item ={};
    item['class'] = 'clearBoth';
    
    findNode_ = function(parent, toDo) {
      methodWasCalled = methodWasCalled ||
        (parent === numberPagerContainer_ && toDo(item));
      
      return numberPagerContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should remove the clear div', function() {
    var clearDiv = {};
    var methodWasCalled = false;
    
    findNode_ = function(parent){
      return parent === numberPagerContainer_ ?
        clearDiv :
        numberPagerContainer_;
    };
    
    removeNode_ = function(node){
      methodWasCalled = methodWasCalled ||
        node === clearDiv;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  it('should create a clear div.', function() {
    var methodWasCalled = false;
    
    createAClearDiv_ = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};

    createAClearDiv_ = function() {
      return clearDiv;
    };
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === numberPagerContainer_ && child === clearDiv);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating a page number container, it', function() {
  
  src.test.control.pager.whenCreatingAPageNumberContainer.describe();
  
});
