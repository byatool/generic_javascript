goog.require('goog.dom');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.helper.domCreation.whenCreatingTextarea');

/**
 @export
 */
src.test.helper.domCreation.whenCreatingTextarea.describe = function() {
  //Fields
  var DomCreation = src.base.helper.domCreation;
  
  //Test Hooks
  beforeEach(function() {
    
  });
  
  //Support Methods
  
  //Test Methods
  
  it('should default the value to an empty string.', function() {
    var createdTextarea = DomCreation.textarea({});
    
    expect(createdTextarea.value).toBe('');
  });
  
  
  it('should set the value to what is passed in.', function() {
    var someValue = 'blarg';
    var createdTextarea = DomCreation.textarea({}, someValue);
    
    expect(createdTextarea.value).toBe(someValue);
  });
};

describe('When creating a textarea, it', function() {
  src.test.helper.domCreation.whenCreatingTextarea.describe();
});
