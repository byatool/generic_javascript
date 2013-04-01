goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.window');
goog.require('src.base.control.formComponent');
goog.require('src.base.control.popupDatePicker');
goog.require('src.base.helper.domHelper');
goog.require('src.base.helper.events');

goog.provide('src.test.control.formComponent.whenInitializingTheForm');

/**
 @export
 */
src.test.control.formComponent.whenInitializingTheForm.describe = function() {
  //Fields
  var FormComponent = src.base.control.formComponent;
  var FormId = goog.string.getRandomString();

  var appendChild_;
  var createAResult_;
  var createDatepicker_;
  var createMessageBox_;
  var datepickerOptions_;
  var findTheButton_;
  var form_;
  var getElement_;
  var getFormDataMap_;
  var handleSubmit_;
  var messageBoxName_;
  var onClick_;
  var result_;
  var setClick_;
  var setupTheForm_;
  var showElement_;
  var submitData_;
  var updateMessagesByResult_;
  var validate_;

  //Test Hooks
  beforeEach(function() {
    datepickerOptions_ = {};
    datepickerOptions_[FormComponent.DatepickerOptions] = {};
    datepickerOptions_[FormComponent.DatepickerTextboxes] = {};

    findTheButton_ = function() {};

    form_ = {};
    handleSubmit_ = function() {};
    setClick_ = function() {};

    result_ = {};
    result_['form'] = form_;
    result_['messageBox'] = {};

    setupTheForm_ = function() {
      return result_;
    };

    validate_ = {};
    getElement_ = {};
    createMessageBox_ = {};
    appendChild_ = {};
    createDatepicker_ = {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    FormComponent.initialize(FormId,
                             datepickerOptions_,
                             validate_,
                             onClick_,
                             setupTheForm_,
                             handleSubmit_,
                             findTheButton_,
                             setClick_,
                             getElement_,
                             createMessageBox_,
                             appendChild_,
                             createDatepicker_,
                             getFormDataMap_,
                             createAResult_,
                             updateMessagesByResult_,
                             showElement_,
                             submitData_);


  };

  //Test Methods

  it('should set up the form.', function() {
    var methodWasCalled = false;

    setupTheForm_ = function(formId, datepickerOptions, datepickerTextboxes, messageBoxName, getElement, createMessageBox, appendChild, createDatepicker) {
      methodWasCalled = formId === FormId &&
        datepickerOptions === datepickerOptions_[FormComponent.DatepickerOptions] &&
        datepickerTextboxes === datepickerOptions_[FormComponent.DatepickerTextboxes] &&
        messageBoxName === formId + FormComponent.MessageBoxSuffix &&
        getElement === getElement_ &&
        createMessageBox === createMessageBox_ &&
        appendChild === appendChild_ &&
        createDatepicker === createDatepicker_;

      return result_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the click event handler.', function() {
    expect('This').toBe('tested when possible.');
  });


  it('should find the button.', function() {

    var methodWasCalled = false;
    var form = {};

    setupTheForm_ = function() {
      return {'form': form};
    };

    findTheButton_ = function(className, theForm) {
      methodWasCalled = className === FormComponent.ButtonClass &&
        theForm === form;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should find the button.', function() {
    var methodWasCalled = false;

    findTheButton_ = function(className, createdForm) {
      methodWasCalled = className === FormComponent.ButtonClass &&
        createdForm === form_;

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the button click.', function() {
    var button = {};
    var methodWasCalled = false;

    findTheButton_ = function() {
      return button;
    };

    setClick_ = function(theButton, onClick) {
      methodWasCalled = theButton === button;
    };

    callTheMethod_();
    expect('This').toBe('checking if the correct method is used on the set click');
    //expect(methodWasCalled).toBe(true);
  });



  it('should should', function() {
    expect('This is not').toBe('tested yet');
  });
};


describe('When initializing the form, it', function() {
  src.test.control.formComponent.whenInitializingTheForm.describe();
});
