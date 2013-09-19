goog.require('goog.string');
goog.require('src.base.control.feedback.constant');
goog.require('src.base.control.feedback.form');

goog.provide('src.test.control.feedback.form.whenCreatingTheForm');

/**
 @export
 */
src.test.control.feedback.form.whenCreatingTheForm.describe = function () {
  
  //Using
  
  var Current_ = src.base.control.feedback.form;
  var Constant_ = src.base.control.feedback.constant;
  
  
  //Fields
  
  var SubmitUrl_ = goog.string.getRandomString();
  
  
  var createAButton_;
  var createAButtonList_;
  var createADiv_;
  var createAForm_;
  var createATextArea_;
  var refreshHistory_;
  var setClick_;
  var setValue_;
  
  //Test Hooks
  beforeEach(function() {
    
    createAButton_ = function() {};
    createAButtonList_ = function() {};
    createADiv_ = function(){};
    createAForm_ = function() {};
    createATextArea_ = function() {};
    refreshHistory_ = function() {};
    setClick_ = function() {};
    setValue_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.create(SubmitUrl_, refreshHistory_, createADiv_, createAForm_,
                          createATextArea_, createAButtonList_, createAButton_,
                          setClick_, setValue_);
      
  };
  
  
  //Test Methods
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    
    createAForm_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.FeedbackForm !== undefined &&
         attributes['class'] === Constant_.FeedbackForm);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When creating the form for a feedback control, it', function() {
  src.test.control.feedback.form.whenCreatingTheForm.describe();
});
