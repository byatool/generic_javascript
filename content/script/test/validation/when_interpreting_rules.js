goog.require('goog.array');
goog.require('goog.string');
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
  var NameEmptyError_ = goog.string.getRandomString();
  var UsernameEmptyError_ = goog.string.getRandomString();
  var UsernameTooLongError_ = goog.string.getRandomString();
  
  var interpreter_;
  var methodList_;
  var rules_;
  var toCheck_;
  
  //Test Hooks
  beforeEach(function() {
    
    var isNotEmpty = function(pair) {
      return function(toCheck) {
        var result = pair[1];
        
        if (!goog.string.isEmptySafe(toCheck[pair[0]])) {
          result = '';
        }
        
        return result;
      };
    };
    
    var isNotTooLong = function(settings) {
      return function(toCheck) {
        var result = settings[2];
        
        if (toCheck[settings[0]].length < settings[1]) {
          result = '';
        }
        
        return result;
      };
    };
    
    interpreter_ = {};
    toCheck_ = {'Username': DefaultUsername_, 'Name': DefaultName_};
    
    methodList_ = [
      ['is not empty', isNotEmpty],
      ['is not longer than', isNotTooLong]];
    
    rules_ = [
      ['Username',
       ['is not empty', UsernameEmptyError_],
       ['is not longer than', 7, UsernameTooLongError_]],
      ['Name',
       ['is not empty', NameEmptyError_]]];
    
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    var result = Current.interpretB(rules_, methodList_);
    
    result = goog.array.map(result, function(currentItem) {
      return currentItem(toCheck_);
    });
    
    return goog.array.filter(result, function(currentItem){
      return !goog.string.isEmptySafe(currentItem);
    });
  };
  
  
  //Test Methods
  
  it('should find an empty string', function() {
    toCheck_ = {
      'Name': '',
      'Username': ''
    };
    
    var result = callTheMethod_();
    
    expect(goog.array.count(result, function(item) {
      return item === UsernameEmptyError_ ||
        item === NameEmptyError_;
    })).toBe(2);
  });
  
  it('should find string that is too long', function() {
    toCheck_ = {
      'Name': 'hi',
      'Username': '1234567'
    };
    
    var result = callTheMethod_();
    
    expect(result.length === 1 &&
           goog.array.count(result, function(item) {
             return item === UsernameTooLongError_;
           })).toBe(1);
  });

};


describe('When when, it', function() {
  src.test.validation.validationInterpreter.whenInterpretingRules.describe();
});
