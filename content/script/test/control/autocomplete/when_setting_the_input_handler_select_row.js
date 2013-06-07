goog.require('goog.string');
goog.require('goog.ui.ac.InputHandler');
goog.require('src.base.control.autocomplete');


goog.provide('src.test.control.autocomplete.whenSettingTheInputHandlerSelectRow');


/**
 @export
 */
src.test.control.autocomplete.whenSettingTheInputHandlerSelectRow.describe = function() {
  //Using

  var Current = src.base.control.autocomplete;


  //Fields

  var Id_ = goog.string.getRandomString();
  var HiddenName_ = goog.string.getRandomString();

  var getElement_;
  var hiddenElement_;
  var hiddenName_;
  var selectedItem_;
  var inputHandler_;
  var opt_multi_;
  var setTokenText_;
  var setValue_;
  var toCall_;

  //Test Hooks
  beforeEach(function() {
    setTokenText_ = function() {};
    inputHandler_ = new goog.ui.ac.InputHandler();

    hiddenElement_ = {};
    hiddenName_ = HiddenName_;

    selectedItem_ = {};
    selectedItem_[Current.Id] = Id_;

    getElement_ = function() { return hiddenElement_; };
    setValue_ = function() {};
    toCall_ = [];
  });

  //Support Methods
  var callTheMethod_ = function() {
    Current.setInputHandlerSelectRow(inputHandler_, hiddenName_, toCall_, getElement_, setValue_, setTokenText_);

    return inputHandler_.selectRow(selectedItem_, opt_multi_);
  };

  //Test Methods

  it('should call find the hidden element.', function() {
    var methodWasCalled = false;

    getElement_ = function(hiddenName) {
      methodWasCalled = hiddenName === HiddenName_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the value of the hidden.', function() {
    var methodWasCalled = false;

    setValue_ = function(hiddenElement, id) {
      methodWasCalled = hiddenElement === hiddenElement_ &&
        id === Id_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the token text.', function() {
    var methodWasCalled = false;

    setTokenText_ = function(text) {
      methodWasCalled = text === selectedItem_[Current.LastName] +
        ', ' +
        selectedItem_[Current.FirstName];
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should call the methods to call.', function() {
    var methodWasCalled = false;
    var methodToCall = function(id) {
      methodWasCalled = id === Id_;
    };

    toCall_ = [methodToCall];

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should not fail if there are no methods to call.', function() {
    var noError = true;

    toCall_ = null;

    callTheMethod_();

    expect(noError).toBe(true);
  });
};


describe('When setting the input handler select row, it', function() {
  src.test.control.autocomplete.whenSettingTheInputHandlerSelectRow.describe();
});
