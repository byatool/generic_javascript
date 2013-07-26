goog.require('goog.string');
goog.require('src.site.validation.validateDate');

goog.provide('src.test.validation.whenValidatingADate');

/**
 @export
 */
src.test.validation.whenValidatingADate.describe = function() {
  //Using
  var Current_ = src.site.validation.validateDate;


  //Fields

  var Day_ = '12';
  var Month_ = '05';
  var Separator_ = goog.string.getRandomString();
  var SeparatorCount_ = 2;
  var Year_ = '2013';

  var countOf_;
  var date_;
  var parseInt_;
  var split_;
  var splitDate_;


  //Test Hooks
  beforeEach(function() {

    date_ = '11/11/2011';
    splitDate_ = [Month_, Day_, Year_];

    countOf_ = function() { return SeparatorCount_;};
    parseInt_ = function() {return 12;};

    split_ = function() { return splitDate_; };
  });

  //Support Methods
  var callTheMethod_ = function() {
    return Current_.isValid(date_, Separator_, countOf_, split_, parseInt_);
  };


  //Test Methods

  it('should count the number of separators.', function() {
    var methodWasCalled = false;

    countOf_ = function(toCheck, symbol) {
      methodWasCalled = methodWasCalled ||
        (toCheck === date_ &&
         symbol === Separator_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return false when there are not enough separators.', function() {
    countOf_ = function() {
      return SeparatorCount_ - 1;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should split the date by the separator.', function() {
    var methodWasCalled = false;

    split_ = function(toSplit, splitBy) {
      methodWasCalled = methodWasCalled ||
        (toSplit === date_ && splitBy === Separator_);

      return splitDate_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should return false if the month is not a number.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Month_ ? NaN : Day_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the month is too low.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Month_ ? 0 : Day_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the month is too high.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Month_ ? 13 : Day_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the day is not a number.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Day_ ? NaN : Month_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the day is too low.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Day_ ? 0 : Month_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the day is too high.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Day_ ? 32 : Month_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the year is not a number.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Year_ ? NaN : Month_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the year is too low.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Year_ ? Current_.MinimumYear : Month_;
    };

    expect(callTheMethod_()).toBe(false);
  });


  it('should return false if the year is too high.', function() {

    parseInt_ = function(toCheck) {
      return toCheck === Year_ ? Current_.MaximumYear : Month_;
    };

    expect(callTheMethod_()).toBe(false);
  });

};


describe('When validating a date, it', function() {

  src.test.validation.whenValidatingADate.describe();

});
