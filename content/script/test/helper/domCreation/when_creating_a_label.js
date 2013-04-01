goog.require('goog.dom');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.helper.domCreation.whenCreatingALabel');

/**
 @export
 */
src.test.helper.domCreation.whenCreatingALabel.describe = function() {
  //Fields
  var DomCreation = src.base.helper.domCreation;

  //Test Hooks
  beforeEach(function() {

  });

  //Support Methods

  //Test Methods

  it('should default the value to an empty string.', function() {
    var createdTextbox = DomCreation.label({});

    expect(createdTextbox.innerText).toBe('');
  });


  it('should set the value to what is passed in.', function() {
    var someValue = 'blarg';
    var createdTextbox = DomCreation.label({}, someValue);

    expect(createdTextbox.innerText).toBe(someValue);
  });
};

describe('When creating a label, it', function() {
  src.test.helper.domCreation.whenCreatingALabel.describe();
});
