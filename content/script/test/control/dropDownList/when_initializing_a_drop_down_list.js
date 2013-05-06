goog.require('goog.string');
goog.require('src.base.control.dropDownList');


goog.provide('src.test.control.dropDownList.whenInitializingADropDownList');


/**
 @export
 */
src.test.control.dropDownList.whenInitializingADropDownList.describe = function() {
  //Using
  var Current = src.base.control.dropDownList;


  //Fields
  var ControlId_ = goog.string.getRandomString();
  var ParameterString_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();

  var createdListFillMethod_;
  var createRequestParameterText_;
  var dropDownList_;
  var fillTheList_;
  var findElement_;
  var parameters_;
  var submitData_;


  //Test Hooks
  beforeEach(function() {
    dropDownList_ = {};
    parameters_ = {};

    submitData_ = function() {};
    createRequestParameterText_ = function() { return ParameterString_;};
    fillTheList_ = function() { return createdListFillMethod_;};
    findElement_ = function() { return dropDownList_; };
  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current.initialize(ControlId_, Url_, parameters_, findElement_, createRequestParameterText_, submitData_, fillTheList_);
  };


  //Test Methods

  it('should create the request parameters', function() {
    var methodWasCalled = false;

    createRequestParameterText_ = function(parameters) {
      methodWasCalled = parameters === parameters;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should get the drop down list.', function() {
    var methodWasCalled = false;

    findElement_ = function(elementId) {
      methodWasCalled = elementId === ControlId_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the needed method to fill the list.', function() {
    var methodWasCalled = false;

    fillTheList_ = function(dropDownList) {
      methodWasCalled = dropDownList === dropDownList_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should request for the data.', function() {
    var methodWasCalled = false;

    submitData_ = function(url, parameters,  successMethod) {
      methodWasCalled = url === Url_ &&
        parameters === ParameterString_ &&
        successMethod === createdListFillMethod_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When initializing an dropDownList, it', function() {
  src.test.control.dropDownList.whenInitializingADropDownList.describe();
});
