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
  
  //Fields
  
  var Name_ = goog.string.getRandomString();
  var TextboxName_ = goog.string.getRandomString();
  
  var form_;
  var textbox_;
  
  
  //Test Hooks
  beforeEach(function() {
    form_ = src.base.helper.domCreation.form();
    textbox_ = src.base.helper.domCreation.textbox({'id': TextboxName_});
    goog.dom.appendChild(form_, textbox_);
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    var result = {};
    result[TextboxName_] = Name_;
    src.base.control.formComponent.fillTheFormElements(form_, result, goog.dom.forms.setValue);
  };
  
  
  //Test Methods
  
  it('should set the textbox value.', function() {
    callTheMethod_();
    
    expect(goog.dom.forms.getValue(textbox_)).toBe(Name_);
  });
};


describe('When filling the form with data, it', function() {
  src.test.control.formComponent.whenFillingTheFormWithData.describe();
});
