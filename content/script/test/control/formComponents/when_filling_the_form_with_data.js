goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('src.base.control.formComponent');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.control.formComponent.whenFillingTheFormWithData');

/**
 @export
 */ 
src.test.control.formComponent.whenFillingTheFormWithData.describe = function () {
  
  //Using

  var Current_ = src.base.control.formComponent;
  var DomCreation_ = src.base.helper.domCreation;
  var Forms_ = goog.dom.forms;
  var Name_ = goog.string.getRandomString();
  
  
  //Fields
  
  var TextboxName_ = goog.string.getRandomString();
   
  var form_;
  var textbox_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    form_ = DomCreation_.form();
    textbox_ = DomCreation_.textbox({'id': TextboxName_});
    goog.dom.appendChild(form_, textbox_);
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    var result = {};
    
    result[TextboxName_] = Name_;
    Current_.fillTheFormElements(form_, result, goog.dom.forms.setValue);
  };
  
  
  //Test Methods
  
  it('should set the textbox value.', function() {
    callTheMethod_();
    
    expect(Forms_.getValue(textbox_)).toBe(Name_);
  });
};


describe('When filling the form with data, it', function() {
  src.test.control.formComponent.whenFillingTheFormWithData.describe();
});
