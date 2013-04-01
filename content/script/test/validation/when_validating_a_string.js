goog.require('src.site.validation.validateText');

goog.provide('src.text.validation.whenValidatingAString');

/**
 @export
 */
src.text.validation.whenValidatingAString.describe = function() {
  //Fields
  var ConceptName = 'First Name:';
  var ValidateText = src.site.validation.validateText;

  //Test Hooks
  beforeEach(function() {

  });

  //Support Methods

  //Test Methods


  it('should return a message if there is no text', function() {
    var result = ValidateText.isEmpty(null, ConceptName);
    expect(result).toBe(ConceptName + ' is required.');
  });


  it('should return a message if it is an empty string.', function() {
    var result = ValidateText.isEmpty('', ConceptName);
    expect(result).toBe(ConceptName + ' is required.');
  });


  it('should return a null if it a valid string.', function() {
    var result = ValidateText.isEmpty('derp', ConceptName);
    expect(result).toBe(null);
  });
};

describe('When validating text, it', function() {
  src.text.validation.whenValidatingAString.describe();
});
