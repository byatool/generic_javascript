goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.control.redirectList');

goog.provide('src.test.control.redirectList.whenCreatingRedirectButtonOptions');

/**
 @export
 */
src.test.control.redirectList.whenCreatingRedirectButtonOptions.describe = function() {
  //Using
  var Current_ = src.base.control.redirectList;
  
  
  //Fields
  
  var Disabled_ = true;
  var Id_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  
  var controlIds_;
  
  
  //Test Hooks
  beforeEach(function() {
    controlIds_ = ['adfd'];
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createRedirectButtonOptions(Id_, Text_, controlIds_, Url_, Disabled_);
  };
  
  
  //Test Methods
  
  it('should set the button id.', function() {
    expect(callTheMethod_()[Current_.ButtonId]).toBe(Id_);
  });
  
  it('should set the button text.', function() {
    expect(callTheMethod_()[Current_.ButtonText]).toBe(Text_);
  });
  
  it('should set the for.', function() {
    var result = callTheMethod_()[Current_.For];
    
    expect(goog.array.equals(result, controlIds_)).toBe(true);
  });
  
  it('should set the url.', function() {
      expect(callTheMethod_()[Current_.Goto]).toBe(Url_);
  });
  
  it('should set disabled..', function() {
    expect(callTheMethod_()[Current_.Disabled]).toBe(Disabled_);
  });

  
  it('should set disabled to false if null.', function() {
    Disabled_ = null;
    expect(callTheMethod_()[Current_.Disabled]).toBe(false);
  });
};


describe('When creating a redirect button option, it', function() {
  src.test.control.redirectList.whenCreatingRedirectButtonOptions.describe();
});
