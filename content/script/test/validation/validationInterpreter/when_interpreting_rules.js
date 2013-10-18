goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.helper.arrayHelper');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenInterpretingRules');


/**
 @export
 */
src.test.validation.validationInterpreter.whenInterpretingRules.describe = function() {
  //Using
  var Current = src.site.validation.validationInterpreter;
  
  //Fields
  
  var DefaultName_ = 'derp';
  var DefaultUsername_ = 'herp';
  
  var IsNotEmpty_ = goog.string.getRandomString();
  var IsNotLongerThan_ = goog.string.getRandomString();
  var Name_ = goog.string.getRandomString();
  var NameEmptyError_ = goog.string.getRandomString();
  var Username_ = goog.string.getRandomString();
  var UsernameEmptyError_ = goog.string.getRandomString();
  var UsernameTooLongError_ = goog.string.getRandomString();
  
  var car_;
  var cdr_;
  var createAValidationCall_;
  var flatten_;
  var innerRule_;
  var isNotEmpty_;
  var isNotTooLong_;
  var map_;
  var methodList_;
  var rule_;
  var rules_;
  var toCheck_;
  
  //Test Hooks
  beforeEach(function() {
    innerRule_ = {};
    methodList_ = {};
    rule_ = {};
    rules_ = {};
    toCheck_ = {};

    car_ = function(){};
    cdr_ = function(){};
    createAValidationCall_ = function() {};
    flatten_ = function() {return []; };
    isNotEmpty_ = function() {};
    isNotTooLong_ = function() {};
    
    map_ = function(list, toDo){
      if(list === rules_) {
        toDo(rule_);
      }
      else {
        toDo(innerRule_);
      }
    };
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    var result = Current.interpret(rules_, methodList_, createAValidationCall_,
                                   map_, car_, cdr_, flatten_);
    
    return result;
  };
  
  
  //Test Methods
  
  
  it('should map the rules.', function() {
    var methodWasCalled = false;
    
    map_ = function(rules, toDo){
      methodWasCalled = rules === rules_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should retrieve the property name.', function() {
    var methodWasCalled = false;
    
    car_ = function(rule){
      methodWasCalled = rule === rule_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should retrieve the method calls.', function() {
    var methodWasCalled = false;
    
    cdr_ = function(rule){
      methodWasCalled = rule === rule_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should create the validation calls', function() {
    var methodWasCalled = 0;
    var checkThem = {};
    var theInnerRule = {};
    var thePropertyName = {};
    
    car_ = function(){
      return thePropertyName;
    };
    
    cdr_ = function(){
      return checkThem;
    };
    
    createAValidationCall_ = function(propertyName, methods, innerRule, find, car, cdr, peek, sink){
      methodWasCalled += propertyName === thePropertyName &&
        methods === methodList_ &&
        innerRule === theInnerRule &&
        find === goog.array.find &&
        car === car_ &&
        cdr === cdr_ &&
        peek === goog.array.peek &&
        sink === src.base.helper.arrayHelper.sink;
    };
     
    map_ = function(toCheck, toDo) {
      methodWasCalled += toCheck === checkThem;
      toDo(theInnerRule);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should flatten the result.', function() {
    var methodWasCalled = false;
    var result = {};
    
    map_ = function(){
      return result;
    };


    flatten_ = function(methodGroups){
      methodWasCalled = methodGroups === result;
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the flattened results', function() {
    var results_ = {};

    flatten_ = function(){
      return results_;
    };

    expect(callTheMethod_()).toBe(results_);
  });
};


describe('When interpreting rules, it', function() {
    src.test.validation.validationInterpreter.whenInterpretingRules.describe();
});
