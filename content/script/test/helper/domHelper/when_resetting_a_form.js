goog.require('goog.string');
goog.require('src.base.helper.domHelper');

goog.provide('src.test.helper.domHelper.whenResettingAForm');


/**
 @export
 */
src.test.helper.domHelper.whenResettingAForm.describe = function() {
  //Using
  var Current_ = src.base.helper.domHelper;


  //Fields

  var findNodes_;
  var form_;
  var getChildren_;
  var setValue_;


  //Test Hooks
  beforeEach(function() {
    form_ = {};
    findNodes_ = function() { return [];};
    getChildren_ = function() { return []; };
    setValue_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    src.base.helper.domHelper.resetAForm(form_, findNodes_, getChildren_, setValue_);
  };


  //Test Methods

  it('should find the text nodes.', function() {
    var methodWasCalled = false;

    findNodes_ = function(formElement, method) {
      methodWasCalled = methodWasCalled ||
        formElement === form_ &&
        String(method) === String(function(a) {return'INPUT' === a.nodeName && 'text' === a.type;});
      return [];
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the text for all found textboxes.', function() {
    var calledCounts = 0;
    var elementOne = {};
    var elementTwo = {};

    findNodes_ = function(list, method) {
      return goog.string.contains(String(method), 'text') ? [elementOne, elementTwo] : [];
    };

    setValue_ = function(element, text) {
      calledCounts += (element === elementOne || element === elementTwo) &&
        text === '';
    };

    callTheMethod_();

    expect(calledCounts).toBe(2);
  });


  it('should find the selects.', function() {
    var methodWasCalled = false;

    findNodes_ = function(formElement, method) {
      methodWasCalled = methodWasCalled ||
        formElement === form_ &&
        String(method) === String(function(a) { return a.nodeName === 'SELECT'; });
      return [];
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should find the children for each select.', function() {
    var calledCounts = 0;
    var elementOne = {};
    var elementTwo = {};

    findNodes_ = function(list, method) {
      return goog.string.contains(String(method), 'SELECT') ? [elementOne, elementTwo] : [];
    };

    getChildren_ = function(parent) {
      calledCounts += parent === elementOne || parent === elementTwo;
      return [];
    };

    callTheMethod_();

    expect(calledCounts).toBe(2);
  });


  it('should set the select value to its first child. ', function() {
    var methodWasCalled = false;
    var parentElement = {};
    var childOne = {'id': 'childOne'};
    var childTwo = {};

    findNodes_ = function(item, method) {
      return goog.string.contains(String(method), 'SELECT') ? [parentElement] : [];
    };

    getChildren_ = function(parent) {
      return [childOne, childTwo];
    };

    setValue_ = function(parent, child) {
      methodWasCalled = parent === parentElement &&
        child === childOne;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When resetting a form, it', function() {
  src.test.helper.domHelper.whenResettingAForm.describe();
});
