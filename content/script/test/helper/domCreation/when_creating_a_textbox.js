goog.require('goog.dom');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.helper.domCreation.whenCreatingTextbox');

/**
 @export
 */
src.test.helper.domCreation.whenCreatingTextbox.describe = function() {
  //Fields
  var DomCreation = src.base.helper.domCreation;

  //Test Hooks
  beforeEach(function() {

  });

  //Support Methods

  //Test Methods

  it('should default the value to an empty string.', function() {
    var createdTextbox = DomCreation.textbox({});

    expect(createdTextbox.value).toBe('');
  });


  it('should set the value to what is passed in.', function() {
    var someValue = 'blarg';
    var createdTextbox = DomCreation.textbox({}, someValue);

    expect(createdTextbox.value).toBe(someValue);
  });
};

describe('When creating a textbox, it', function() {
  src.test.helper.domCreation.whenCreatingTextbox.describe();
});
