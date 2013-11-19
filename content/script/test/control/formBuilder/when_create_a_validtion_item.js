goog.require('goog.string');
goog.require('src.base.control.formBuilder.validation');
goog.require('src.base.control.formBuilder.constant');

goog.provide('src.test.control.formBuilder.validation.whenCreatingAValidationItem');

/**
 @export
 */
src.test.control.formBuilder.validation.whenCreatingAValidationItem.describe = function () {
  
  var Constant_ = src.base.control.formBuilder.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.formBuilder.validation;
  var ValidationConstant_ = src.site.validation.validationInterpreter.constant;
  
  //Fields
  
  
  var ErrorMessage_= goog.string.getRandomString();
  var Id_ = goog.string.getRandomString();
  var RuleName_= goog.string.getRandomString();
  
  var currentItem_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    currentItem_ = {};
    
    currentItem_[ControlConstant_.Id] = Id_;
    currentItem_[ValidationConstant_.Validation] = [
      [RuleName_, ErrorMessage_]];
    
    // {type: 'text', id: 'username', class: 'textInput', label: 'Username:',
    //  -   validation: [
    //      -     ['is not empty', 'Return To Work Date is required'],
    //      -     ['is a valid date', 'Must be a valid date.']
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createValidationItem(currentItem_);
  };
  
  //Test Methods
  
  it('should create the correct id entry.', function() {
    expect(callTheMethod_()[0][0]).toBe(Id_);
  });
  
  it('should create the validation entry.', function() {
    expect(callTheMethod_()[0][1][0][0]).toBe(RuleName_);
  });
  
  it('should create the validation entry.', function() {
    expect(callTheMethod_()[0][1][0][1]).toBe(ErrorMessage_);
  });
  
  
  it('should handle multiple validation.', function() {
    var ruleTwo = goog.string.getRandomString();
    var errorTwo = goog.string.getRandomString();
    
    currentItem_[ValidationConstant_.Validation] = [
      [RuleName_, ErrorMessage_],
      [ruleTwo, errorTwo]
    ];
    
    var result = callTheMethod_();
    
    var methodWasCalled = result[0][1][0][0] === RuleName_ &&
          result[0][1][0][1] === ErrorMessage_ &&
          result[0][1][1][0] === ruleTwo &&
          result[0][1][1][1] === errorTwo;
    
    expect(methodWasCalled).toBe(true);
  });
  
};

describe('When creating a validation item, it', function() {
  src.test.control.formBuilder.validation.whenCreatingAValidationItem.describe();
});



