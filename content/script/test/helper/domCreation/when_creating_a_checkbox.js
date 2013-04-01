goog.require('goog.string');
goog.require('src.base.helper.domCreation');


goog.provide('src.test.helper.domCreation.whenCreatingACheckbox');

/**
 @export
 */
src.test.helper.domCreation.whenCreatingACheckbox.describe = function() {
  //Fields
  var Checkbox = src.base.helper.domCreation.checkBox;
  var Text = goog.string.getRandomString();
  
  var attributes_;
  
  //Test Hooks
  beforeEach(function() {
    attributes_ = {};
  });
  
  //Support Methods
  
  //Test Methods
  
  it('should create an input.', function() {
    expect(Checkbox(attributes_)['tagName']).toBe('INPUT');
  });
  
  
  it('should create a checkbox.', function() {
    expect(Checkbox(attributes_)['type']).toBe('checkbox');
  });
  
  
  it('should not be checked', function() {
    expect(Checkbox(attributes_)['checked']).toBe(false);
  });
  
  
  it('should be checked if specified.', function() {
    expect(Checkbox(attributes_, true)['checked']).toBe(true);
  });
};

describe('When creating a checkbox, it', function() {
  src.test.helper.domCreation.whenCreatingACheckbox.describe();
});
        
