goog.require('goog.string');
goog.require('src.base.control.dropDownList');

goog.provide('src.test.control.dropDownList.whenCreatingAFillListHandler');

/**
 @export
 */
src.test.control.dropDownList.whenCreatingAFillListHandler.describe = function() {
  //Using
  
  //Fields
  
  var DefaultText_ = goog.string.getRandomString();
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
    src.base.control.dropDownList.createFillListHandler(select_, DefaultText_, fillASelect_)(result_);
  };
  
  
  //Test Methods
  
  it('should fill the select with the default text', function() {
    var methodWasCalled = false;
    fillASelect_ = function(select, data, defaultText) {
      methodWasCalled = select === select_ &&
        data === result_ &&
        defaultText === DefaultText_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should fill the select without any default text', function() {
    var methodWasCalled = false;
    DefaultText_ = null;
    
    fillASelect_ = function(select, data, defaultText) {
      methodWasCalled = select === select_ &&
        data === result_ &&
        defaultText === null;
    };

    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When creating a fill list handler, it', function() {
  src.test.control.dropDownList.whenCreatingAFillListHandler.describe();
});
