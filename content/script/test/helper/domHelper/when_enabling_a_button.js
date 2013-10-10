goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');

goog.provide('src.test.helper.domHelper.whenEnablingAButton');


/**
 @export
 */
src.test.helper.domHelper.whenEnablingAButton.describe = function() {
  //Using
  var Current_ = src.base.helper.domHelper;


  //Fields

  var addRemove_;
  var button_;
  var enable_;

  //Test Hooks
  beforeEach(function() {
    button_ = src.base.helper.domCreation.button();
    addRemove_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    Current_.toBeEnabled(button_, enable_, addRemove_);
  };


  //Test Methods

  it('should be enabled.', function() {
    enable_ = true;

    callTheMethod_();
    expect(button_['disabled']).toBe(false);
  });


  it('should remove the disabled style if it is to be enabled.', function() {

    var methodWasCalled = false;
    enable_ = true;

    addRemove_ = function(item, remove, add) {
      methodWasCalled =
        item === button_ &&
        remove == 'Disabled' &&
        add === null;
    };


    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should be disabled.', function() {
    enable_ = false;

    callTheMethod_();
    expect(button_['disabled']).toBe(true);
  });


  it('should add the disabled style if it is to be disabled.', function() {

    var methodWasCalled = false;
    enable_ = false;

    addRemove_ = function(item, remove, add) {
      methodWasCalled =
        item === button_ &&
        remove == null &&
        add === 'Disabled';

    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


};


describe('When enabling a button, it', function() {

  src.test.helper.domHelper.whenEnablingAButton.describe();

});
