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
  var ButtonList_ = src.base.control.buttonList;
  
  //Fields
  
  var SubmitUrl_ = goog.string.getRandomString();
  
  var commentArea_;
  var createAButton_;
  var createAButtonList_;
  var createADiv_;
  var createAForm_;
  var createALabelInput_;
  var createATextArea_;
  var parentForm_;
  var refreshHistory_;
  var setClick_;
  var setValue_;
  
  //Test Hooks
  beforeEach(function() {
    
    commentArea_ = {};
    parentForm_ = {};
    
    createAButton_ = function() {};
    createAButtonList_ = function() {};
    createADiv_ = function(){};
    createAForm_ = function() { return parentForm_; };
    createALabelInput_ = function(){};
    createATextArea_ = function() { return commentArea_; };
    refreshHistory_ = function() {};
    setClick_ = function() {};
    setValue_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.create(SubmitUrl_, refreshHistory_, createADiv_, createAForm_,
                           createATextArea_, createALabelInput_, createAButtonList_,
                           createAButton_, setClick_, setValue_);
    
  };
  
  
  //Test Methods
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    
    createAForm_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.FeedbackForm !== undefined &&
         attributes['class'] === Constant_.FeedbackForm &&
         attributes['method'] === 'post' &&
         attributes['action'] === SubmitUrl_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the textarea.', function() {
    var methodWasCalled = false;
    
    createATextArea_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.CommentArea !== undefined &&
         attributes['class'] === Constant_.CommentArea &&
         Constant_.ParameterComment !== undefined &&
         attributes['id'] === Constant_.ParameterComment &&
         attributes['name'] === Constant_.ParameterComment);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text area label.', function() {
    var methodWasCalled = false;
    
    createALabelInput_ = function(label, textarea){
      methodWasCalled = Constant_.CommentAreaText !== undefined &&
        label === Constant_.CommentAreaText &&
        textarea === commentArea_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the button list.', function() {
    var methodWasCalled = false;
    
    createAButtonList_ = function(options) {
      methodWasCalled = Constant_.CategoryListContainer !== undefined &&
        options[ButtonList_.ContainerClass] === Constant_.CategoryListContainer &&
        options[ButtonList_.ElementId] === Constant_.CategoryListContainer &&
        Constant_.ParameterCategory !== undefined &&
        options[ButtonList_.HiddenId] === Constant_.ParameterCategory &&
        Constant_.CategorySelected !== undefined &&
        options[ButtonList_.SelectedButtonClass] === Constant_.CategorySelected &&
        options[ButtonList_.ButtonOptions][0]['text'] === 'Issue' &&
        options[ButtonList_.ButtonOptions][0]['value'] === 'is' &&
        options[ButtonList_.ButtonOptions][1]['text'] === 'Information' &&
        options[ButtonList_.ButtonOptions][1]['value'] === 'in';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
};


describe('When creating the form for a feedback control, it', function() {
  src.test.control.feedback.form.whenCreatingTheForm.describe();
});
