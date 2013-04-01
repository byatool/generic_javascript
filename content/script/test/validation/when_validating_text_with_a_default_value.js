goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validateText');

goog.provide('src.test.validation.whenValidatingTextWithADefaultValue');

/**
 @export
 */
src.test.validation.whenValidatingTextWithADefaultValue.describe = function() {
  //Fields
  var Validation = src.site.validation.validateText;

  var ConceptName = goog.string.getRandomString();
  var DefaultText = goog.string.getRandomString();

  //Test Hooks
  beforeEach(function() {

  });

  //Support Methods

  var errorCount = function(textValue) {
    return goog.array.count(Validation.isEmptyOrIsDefault(textValue, ConceptName, DefaultText), function(item) {
      return item === 'Pick a ' + ConceptName + '.';
    });
  };


  //Test Methods

  it('should return an error if there is no text.', function() {
    expect(errorCount('')).toBe(1);
  });


  it('should return an error if the text is the default.', function() {
    expect(errorCount(DefaultText)).toBe(1);
  });


  it('should not return an error for valid text.', function() {
    expect(errorCount(goog.string.getRandomString())).toBe(0);
  });
};

describe('When validating text with a default value, it', function() {
  src.test.validation.whenValidatingTextWithADefaultValue.describe();
});
