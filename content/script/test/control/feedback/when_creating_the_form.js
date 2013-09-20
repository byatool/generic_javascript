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
  var Form_ = src.base.control.formComponent;


  //Fields
  
  var SubmitUrl_ = goog.string.getRandomString();
  
  var appendChild_;
  var cancelButton_;
  var categoryList_;
  var clearDiv_;
  var characterCounter_;
  var createACharCounter_;
  var createAClearDiv_;
  var commentArea_;
  var createAButton_;
  var createAButtonList_;
  var createADiv_;
  var createAForm_;
  var createALabelInput_;
  var createATextArea_;
  var formInitialize_;
  var menuBar_;
  var parentForm_;
  var postCounterTextContainer_;
  var refreshHistory_;
  var setClick_;
  var setTextContent_;
  var setValue_;
  var submitButton_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    
    cancelButton_=  {};
    categoryList_ = {};
    characterCounter_ = {};
    clearDiv_ = {};
    commentArea_ = {};
    parentForm_ = {};
    postCounterTextContainer_ = {};
    
    
    createADiv_ = function(attributes){
      switch(attributes['class']) {
      case Current_.CharacterCounter:
        return characterCounter_;
        break;
      case Constant_.MenuBar:
        return menuBar_;
        break;
      case Constant_.PostCounterTextContainer:
        return postCounterTextContainer_;
        break;
      default:
        return characterCounter_;                      
      }};
    
    createAButton_ = function(attributes, text){
      switch(text) {
      case Constant_.SubmitButtonText:
        return submitButton_;
        break;
      case Constant_.CancelButtonText:
        return cancelButton_;
        break;
      default:
        return submitButton_;                      
      }};
    
    appendChild_ = function(){};
    createAButtonList_ = function() { return categoryList_; };
    createACharCounter_ = function(){ return characterCounter_; };
    createAClearDiv_ = function() { return clearDiv_; };
    createAForm_ = function() { return parentForm_; };
    createALabelInput_ = function(){};
    createATextArea_ = function() { return commentArea_; };
    formInitialize_ = function() {};
    refreshHistory_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
    setValue_ = function() {};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.create(SubmitUrl_, refreshHistory_, createADiv_, createAForm_,
                           createATextArea_, createALabelInput_, createACharCounter_,
                           createAButtonList_, createAButton_, formInitialize_,
                           setClick_, setValue_, createAClearDiv_, appendChild_,
                           setTextContent_);
    
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
        options[ButtonList_.ButtonOptions][0]['value'] === 'issue' &&
        options[ButtonList_.ButtonOptions][1]['text'] === 'Comment' &&
        options[ButtonList_.ButtonOptions][1]['value'] === 'comment' &&
        options[ButtonList_.ButtonOptions][2]['text'] === 'Concern' &&
        options[ButtonList_.ButtonOptions][2]['value'] === 'concern'
      ;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the charater counter holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.CharacterCounter !== undefined &&
         attributes['class'] === Constant_.CharacterCounter);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should initialize the counter.', function() {
    var methodWasCalled = false;
    
    createACharCounter_ = function(element, counter, limit) {
      methodWasCalled = element === commentArea_ &&
        counter === characterCounter_ &&
        Constant_.CommentLengthLimit !== undefined &&
        limit === Constant_.CommentLengthLimit;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

 
  it('should create the post counter text container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        Constant_.PostCounterTextContainer !== undefined &&
        attributes['class'] === Constant_.PostCounterTextContainer;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text of the post conter text container.', function() {
    var methodWasCalled = false;
    
    setTextContent_ = function(element, text) {
      methodWasCalled = methodWasCalled ||
        (element === postCounterTextContainer_ &&
         Constant_.PostCounterTextContainerText !== undefined  &&
         text === Constant_.PostCounterTextContainerText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the submit button.', function() {
    var methodWasCalled = false;
    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        attributes['type'] === 'button' &&
        attributes['class'] === Form_.ButtonClass &&
        Constant_.SubmitButtonText !== undefined &&
        text === Constant_.SubmitButtonText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the cancel button.', function() {
    var methodWasCalled = false;
    createAButton_ = function(attributes, text){
      methodWasCalled = methodWasCalled ||
        attributes['type'] === 'button' &&
        Constant_.CancelButton !== undefined &&
        attributes['class'] === Constant_.CancelButton &&
        Constant_.CancelButtonText !== undefined &&
        text === Constant_.CancelButtonText;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  // MENU BAR
  it('should create the menu bar.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.MenuBar !== undefined &&
         attributes['class'] === Constant_.MenuBar);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the button list to the menu bar.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === menuBar_ && child === categoryList_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the counter to the menu bar.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === menuBar_ && child === characterCounter_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should append the post counter text to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === menuBar_ && child === postCounterTextContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  

  
  
  it('should append the submitButton to the menu bar.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === menuBar_ && child === submitButton_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the cancel button to the menu bar.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === menuBar_ && child === cancelButton_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  
  it('should append the clear div to the menu bar.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === menuBar_ && child === clearDiv_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  

  
  // FINAL APPEND
  
  it('should append the comment area to the form.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentForm_ && child === commentArea_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });

  
  it('should append the menu bar to the form.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentForm_ && child === menuBar_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should return the form.', function() {
    expect(callTheMethod_()).toBe(parentForm_);
  });
  
};


describe('When creating the form for a feedback control, it', function() {
  src.test.control.feedback.form.whenCreatingTheForm.describe();
});
