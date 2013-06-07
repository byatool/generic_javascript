goog.require('src.site.validation.validateSocialSecurityNumber');

goog.provide('src.test.validation.whenCheckingIfASocialSecurityNumberIsValid');


/**
 @export
 */
src.test.validation.whenCheckingIfASocialSecurityNumberIsValid.describe = function() {
  var Validator = src.site.validation.validateSocialSecurityNumber;
  
  it('will return false if the input is null', function() {
    expect(Validator.isValid('')).toBe(false);
    expect(Validator.isValid(null)).toBe(false);
  });
  
  it('will return false if there are any characters.', function() {
    expect(Validator.isValid('12345678a')).toBe(false);
    expect(Validator.isValid('1a3456789')).toBe(false);
    expect(Validator.isValid('a23456789')).toBe(false);
  });
  
  it('will ignore dashes.', function() {
    expect(Validator.isValid('123-23-1231')).toBe(true);
  });
  
  it('will require a length of 9.', function() {
    expect(Validator.isValid('12345678')).toBe(false);
    expect(Validator.isValid('1234567890')).toBe(false);
    expect(Validator.isValid('123456789')).toBe(true);
  });
  
};

describe('When checing if a social security number is valid', function() {
  src.test.validation.whenCheckingIfASocialSecurityNumberIsValid.describe();
});

