goog.require('src.base.helper.arrayHelper');

goog.provide('src.test.helper.arrayHelper.whenUsingCar');

/**
 @export
 */
src.test.helper.arrayHelper.whenUsingCar.describe = function() {
  //Using
  var car = src.base.helper.arrayHelper.car;


  //Fields
  var toCheck_;


  //Test Hooks
  beforeEach(function() {

  });

  //Support Methods
  var callTheMethod_ = function() {
    return car(toCheck_);
  };


  //Test Methods

  it('should return null if there are no items in the list.', function() {
    toCheck_ = [];

    expect(callTheMethod_()).toBe(null);
  });


  it('should return the first item if there is only one item.', function() {
    var item = {};
    toCheck_ = [item];
    expect(callTheMethod_()).toBe(item);
  });


  it('should return the first item if there are many items.', function() {
    var item = {};
    toCheck_ = [item, {}, {}];
    expect(callTheMethod_()).toBe(item);
  });
};


describe('When using car, it', function() {

  src.test.helper.arrayHelper.whenUsingCar.describe();

});
