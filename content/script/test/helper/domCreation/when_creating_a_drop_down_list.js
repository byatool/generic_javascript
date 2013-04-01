goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.ui.Select');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.helper.domCreation.whenCreatingADropDownList');

/**
 @export
 */
src.test.helper.domCreation.whenCreatingADropDownList.describe = function() {
  //Fields
  var Select = src.base.helper.domCreation.select;
  
  //Test Hooks
  beforeEach(function() {
    
  });
  
  //Support Methods
  
  //Test Methods
  
  
  it('should create a drop down list.', function() {
    expect(Select()).toNotBe(null);
  });
  
  it('should default if default text is given.', function() {
    var select = Select({}, [], 'value');
    var something = false;
    
    expect(goog.dom.forms.getValue(select)).toBe('value');
  });
  
  
  it('should create options from a list of options', function() {
    var options = [{text: 'first', value: 'hi'}, {text: 'second', value: 'there'}];
    
    var select = Select({}, options, 'select');
    
    var itemCount =
          goog.array.count(goog.dom.getChildren(select), function(currentChild) {
            return (currentChild.innerText === 'first' && currentChild.value === 'hi') ||
              (currentChild.innerText === 'second' && currentChild.value === 'there');
          });

    expect(itemCount).toBe(2);
  });
};


describe('When creating a drop down list, it', function() {
  src.test.helper.domCreation.whenCreatingADropDownList.describe();
});
