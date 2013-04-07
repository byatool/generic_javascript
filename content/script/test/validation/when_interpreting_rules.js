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
  var flatten_;
  var isNotEmpty_;
  var isNotTooLong_;
  var methodList_;
  var rules_;
  var toCheck_;

  //Test Hooks
  beforeEach(function() {

    isNotEmpty_ = function(pair) {
      return function(toCheck) {
        var result = pair[1];

        if (!goog.string.isEmptySafe(toCheck[pair[0]])) {
          result = '';
        }

        return result;
      };
    };

    isNotTooLong_ = function(settings) {
      return function(toCheck) {
        var result = settings[2];

        if (toCheck[settings[0]].length < settings[1]) {
          result = '';
        }

        return result;
      };
    };
    
    car_ = function(input) {
      return src.base.helper.arrayHelper.car(input);
    };

    cdr_ = function(input) {
      return src.base.helper.arrayHelper.cdr(input);
    };

    flatten_ = function() {
      return [];
    };


    toCheck_ = {'Username': DefaultUsername_, 'Name': DefaultName_};

    methodList_ = [
      [IsNotEmpty_, isNotEmpty_],
      [IsNotLongerThan_, isNotTooLong_]];

    rules_ = [
      [Username_,
       [IsNotEmpty_, UsernameEmptyError_],
       [IsNotLongerThan_, 7, UsernameTooLongError_]],
      [Name_,
       [IsNotEmpty_, NameEmptyError_]]];

  });


  //Support Methods
  var callTheMethod_ = function() {
    var result = Current.interpret(rules_, methodList_, car_, cdr_, flatten_);

    return result;

  };


  //Test Methods

  it('should retrieve the property name for each rule.', function() {
    var methodWasCalled = 0;

    car_ = function(list) {
      methodWasCalled += list === rules_[0] ||
        list === rules_[1];
      return src.base.helper.arrayHelper.car(list);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should retrieve the rest of the list.', function() {
    var methodWasCalled = 0;

    cdr_ = function(list) {
      methodWasCalled += list === rules_[0] ||
        list === rules_[1];
      return src.base.helper.arrayHelper.cdr(list);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should find all the methods.', function() {
    var methodWasCalled = false;
    expect('this').toBe('tested when list methods are testable');
  });


  it('should use all the methods.', function() {
    var methodWasCalled = 0;

    isNotEmpty_ = function(otherArguments) {
      methodWasCalled += goog.array.equals(otherArguments, [Username_, UsernameEmptyError_]) ||
        goog.array.equals(otherArguments, [Name_, NameEmptyError_]);

      return function() {};
    };

    isNotTooLong_ = function(otherArguments) {
      methodWasCalled += goog.array.equals(otherArguments, [Username_, 7, UsernameTooLongError_]);
      return function() {};
    };

    methodList_ = [
      [IsNotEmpty_, isNotEmpty_],
      [IsNotLongerThan_, isNotTooLong_]];

    callTheMethod_();

    expect(methodWasCalled).toBe(3);
  });



  it('should flatten the results.', function() {
    var methodWasCalled = false;

    flatten_ = function(finalList) {
      methodWasCalled = true;
      return [];
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should have the correct number of method calls returned.', function() {
    flatten_ = goog.array.flatten;

    var result = callTheMethod_();

    expect(result.length).toBe(3);
  });

  //Temporary integration tests

  it('should find an empty string', function() {
    toCheck_ = {};
    toCheck_[Name_] = '';
    toCheck_[Username_] = '';

    var result = Current.interpret(rules_, methodList_);

    result = goog.array.map(result, function(currentItem) {
      return currentItem(toCheck_);
    });

    result = goog.array.filter(result, function(currentItem) {
      return !goog.string.isEmptySafe(currentItem);
    });

    expect(goog.array.count(result, function(item) {
      return item === UsernameEmptyError_ ||
        item === NameEmptyError_;
    })).toBe(2);
  });


  // it('should find string that is too long', function() {
  //   toCheck_ = {
  //     'Name': 'hi',
  //     'Username': '1234567'
  //   };

  //   var result = callTheMethod_();

  //   expect(result.length === 1 &&
  //          goog.array.count(result, function(item) {
  //            return item === UsernameTooLongError_;
  //          })).toBe(1);
  // });

};


describe('When when, it', function() {
  src.test.validation.validationInterpreter.whenInterpretingRules.describe();
});
