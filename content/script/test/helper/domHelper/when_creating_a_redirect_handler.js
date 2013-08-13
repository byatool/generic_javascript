goog.require('goog.string');
goog.require('src.base.helper.domHelper');
goog.provide('src.test.helper.domHelper.whenCreatingARedirectHandler');

/**
 @export
 */
src.test.helper.domHelper.whenCreatingARedirectHandler.describe = function () {
  
  //Using
  var Current_ = src.base.helper.domHelper;
  
  
  //Fields
  
  var Url_ = goog.string.getRandomString();
  
  //Test Hooks
  beforeEach(function() {
    
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createRedirectHandler(Url_);
  };
  
  
  //Test Methods
  
  it('should include the url in the redirect.', function() {
    var methodWasCalled = false;
    
    expect(String(callTheMethod_())).toBe(String(function() {window.location = Url_;}));
  });
};


describe('When creating a redirect handler, it', function() {
  src.test.helper.domHelper.whenCreatingARedirectHandler.describe();
});
