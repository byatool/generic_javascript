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
  var Current_ = src.base.control.formComponent;


  //Fields

  var FormComponent = src.base.control.formComponent;
  var FormId = goog.string.getRandomString();
  var SubmitToUrl_ = goog.string.getRandomString();

  var appendChild_;
  var autoFillParameters_;
  var callBackFunction_;
  var createAResult_;
  var createDatepicker_;
  var createMessageBox_;
  var createTheRetrieveFormDataCallback_;
  var datepickerOptions_;
  var fillTheRows_;
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
  var setValue_;
  var showElement_;
  var submitData_;
  var submitTheAutoFill_;
  var submitToParameters_;
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
    
    //Form fill options
    submitToParameters_ = {};
    autoFillParameters_ = {};
    autoFillParameters_[Current_.AutoFillUrl] = SubmitToUrl_;
    autoFillParameters_[Current_.AutoFillParameters] = submitToParameters_;
    callBackFunction_ = {};
    createTheRetrieveFormDataCallback_ = function() { return callBackFunction_; };
    fillTheRows_ = function() {};
    setValue_ = function() {};
    submitTheAutoFill_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    FormComponent.initialize(FormId,
                             datepickerOptions_,
                             validate_,
                             autoFillParameters_,
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
                             submitData_,
                             setValue_,
                             createTheRetrieveFormDataCallback_,
                             fillTheRows_,
                             submitTheAutoFill_);
    
    
  };
  
  //Test Methods
  
  it('should set up the form.', function() {
    var methodWasCalled = false;
    
    setupTheForm_ = function(formId, datepickerOptions, datepickerTextboxes, messageBoxName,
                             getElement, createMessageBox, appendChild, createDatepicker,
                             createTheRetrieveFormDataCallback_, fillTheRows_) {
      
      methodWasCalled = formId === FormId &&
        datepickerOptions === datepickerOptions_[FormComponent.DatepickerOptions] &&
        datepickerTextboxes === datepickerOptions_[FormComponent.DatepickerTextboxes] &&
        getElement === getElement_ &&
        createMessageBox === createMessageBox_ &&
        appendChild === appendChild_ &&
        createDatepicker === createDatepicker_;
      
      return result_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  // messageBoxName === formId + FormComponent.MessageBoxSuffix &&
  
  it('should create the messagebox name from the formId if it is a string.', function() {
    var methodWasCalled = false;
    
    setupTheForm_ = function(formId, datepickerOptions, datepickerTextboxes, messageBoxName,
                             getElement, createMessageBox, appendChild, createDatepicker,
                             createTheRetrieveFormDataCallback_, fillTheRows_) {
      
      methodWasCalled = messageBoxName === formId + FormComponent.MessageBoxSuffix;
      return result_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should use the form id if the form is not a string.', function() {
    var methodWasCalled = false;
    var id = 'dasfds';
    FormId = {};
    FormId['id'] = id;
    
    setupTheForm_ = function(formId, datepickerOptions, datepickerTextboxes, messageBoxName,
                             getElement, createMessageBox, appendChild, createDatepicker,
                             createTheRetrieveFormDataCallback_, fillTheRows_) {
      
      methodWasCalled = messageBoxName === id + Current_.MessageBoxSuffix;
      return result_;
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the retreive data callback.', function() {
    var methodWasCalled = false;

    createTheRetrieveFormDataCallback_ = function(form, fillMethod, setValue) {
      methodWasCalled = form === result_['form'] &&
        fillMethod === fillTheRows_ &&
        setValue === setValue_;

      return callBackFunction_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  
  it('should retrieve the data for the form.', function() {
    var methodWasCalled = false;

    submitTheAutoFill_ = function(url, parameter, callBackFunction) {
      methodWasCalled = url === autoFillParameters_[Current_.AutoFillUrl] &&
        parameter === autoFillParameters_[Current_.AutoFillParameters] &&
        callBackFunction === callBackFunction_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should not retrieve the data if the autofill parameter is null.', function() {
    var methodWasCalled = false;

    submitTheAutoFill_ = function() {
      methodWasCalled = true;
    };

    autoFillParameters_ = null;
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(false);
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
  
  
  it('should create the click event handler.', function() {
    expect('This').toBe('tested when possible.');
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



};


describe('When initializing the form, it', function() {
  src.test.control.formComponent.whenInitializingTheForm.describe();
});
