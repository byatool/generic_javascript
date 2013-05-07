goog.require('src.base.control.dropDownList');

goog.provide('src.test.control.dropDownList.whenCreatingAFillListHandler');

/**
 @export
 */
src.test.control.dropDownList.whenCreatingAFillListHandler.describe = function() {
  //Using

  //Fields
  var fillASelect_;
  var result_;
  var select_;


  //Test Hooks
  beforeEach(function() {
    result_ = {};
    select_ = {};
    fillASelect_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    src.base.control.dropDownList.createFillListHandler(select_, fillASelect_)(result_);
  };


  //Test Methods

  it('should fill the select', function() {
    var methodWasCalled = false;
    fillASelect_ = function(select, data) {
      methodWasCalled = select === select_ &&
        data === result_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating a fill list handler, it', function() {
  src.test.control.dropDownList.whenCreatingAFillListHandler.describe();
});
