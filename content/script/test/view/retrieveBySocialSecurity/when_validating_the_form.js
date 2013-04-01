goog.require('src.site.validation.validateSocialSecurityNumber');
goog.require('src.site.view.retrieveBySocialSecurityNumber');

goog.provide('src.test.view.retrieveBySocialSecurityNumber.whenValidatingTheRetrieveBySocialSecurityForm');

/**
 @export
 */
src.test.view.retrieveBySocialSecurityNumber.whenValidatingTheRetrieveBySocialSecurityForm.describe = function() {
  //Fields
  var Current = src.site.view.retrieveBySocialSecurityNumber;
  var SocialSecurityNumber = '123';

  var validateSocialSecurityNumber_;
  var values_;

  //Test Hooks
  beforeEach(function() {
    values_ = {};

    values_['get'] = function() {
      var _ = 'hi';
      return [SocialSecurityNumber];
    };
  });

  //Support Methods

  //Test Methods
  it('should validate the social security number.', function() {
    var methodWasCalled = false;

    validateSocialSecurityNumber_ = function(text) {
      methodWasCalled = text === SocialSecurityNumber;
    };

    Current.validate(values_, validateSocialSecurityNumber_);

    expect(methodWasCalled).toBe(true);
  });
};

describe('When validating the retrieve by social security form, it', function() {
  src.test.view.retrieveBySocialSecurityNumber.whenValidatingTheRetrieveBySocialSecurityForm.describe();
});
