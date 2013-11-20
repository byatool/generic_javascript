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
  var forEach_;
  var insert_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    currentItem_ = {};
    
    currentItem_[ControlConstant_.Id] = Id_;
    currentItem_[ValidationConstant_.Validation] = [
      [RuleName_, ErrorMessage_]];
    
    forEach_ = function(){ };
    insert_ = function(){};
    
    
    // {type: 'text', id: 'username', class: 'textInput', label: 'Username:',
    //  -   validation: [
    //      -     ['is not empty', 'Return To Work Date is required'],
    //      -     ['is a valid date', 'Must be a valid date.']
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createValidationItem(currentItem_, forEach_, insert_);
  };
  
  //Test Methods
  
  it('should create the correct id entry.', function() {
    expect(callTheMethod_()[0]).toBe(Id_);
  });
  
  
  it('should add all validation to the result.', function() {
    var methodWasCalled = 0;
    var item = {};
    
    insert_ = function(list, toInsert){
      methodWasCalled += list[0] === Id_ &&
        toInsert === item;
    };
    
    forEach_ = function(list, toDo){
      methodWasCalled += list === currentItem_[ValidationConstant_.Validation];
      toDo(item);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
};

describe('When creating a validation item, it', function() {
  src.test.control.formBuilder.validation.whenCreatingAValidationItem.describe();
});



