goog.require('goog.array');
goog.require('src.base.helper.arrayHelper');

goog.provide('src.test.helper.arrayHelper.whenUsingCdr');

/**
 @export
 */
src.test.helper.arrayHelper.whenUsingCdr.describe = function() {
  //Using
  var cdr = src.base.helper.arrayHelper.cdr;


  //Fields
  var toCheck_;


  //Test Hooks
  beforeEach(function() {

  });

  //Support Methods
  var callTheMethod_ = function() {
    return cdr(toCheck_);
  };


  //Test Methods

  it('should return an empy list if there are no items in the list.', function() {
    toCheck_ = [];

    expect(callTheMethod_().length).toBe(0);
  });


  it('should return an empty list if there is only one item.', function() {
    var item = {};
    toCheck_ = [item];
    expect(callTheMethod_().length).toBe(0);
  });


  it('should return the first item if there are many items.', function() {
    var item1 = {};
    var item2 = {};

    toCheck_ = [{}, item1, item2];
    expect(goog.array.equals(callTheMethod_(), [item1, item2])).toBe(true);
  });
};


describe('When using cdr, it', function() {

  src.test.helper.arrayHelper.whenUsingCdr.describe();

});
