goog.require('goog.dom.forms');
goog.require('goog.string');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');

goog.provide('src.test.helper.domHelper.whenRetrievingSpecificDataFromADataMap');

/**
 @export
 */
src.test.helper.domHelper.whenRetrievingSpecificDataFromADataMap.describe = function() {
  //Fields
  var DomCreation = src.base.helper.domCreation;
  var DomHelper = src.base.helper.domHelper;

  var SomeValue = 'hhhi';
  var TextboxOne = 'textboxOne';
  var TextboxTwo = 'textboxTwo';

  var form;
  var values;

  //Test Hooks
  beforeEach(function() {
    form = DomCreation.form({}, [
      DomCreation.textbox({'name': TextboxOne}, SomeValue),
      DomCreation.textbox({'name': TextboxTwo}, '')
    ]);

    values = goog.dom.forms.getFormDataMap(form);
  });

  //Support Methods

  //Test Methods

  it('should find the value of a specified control.', function() {
    expect(DomHelper.retrieveFormDataMap(values, TextboxOne)).toBe(SomeValue);
  });


  it('should return an empty string if the element was empty.', function() {
    expect(DomHelper.retrieveFormDataMap(values, TextboxTwo)).toBe('');
  });


  it('should return null if there is no matching element.', function() {
    expect(DomHelper.retrieveFormDataMap(values, goog.string.getRandomString())).toBe(null);
  });
};

describe('When retrieving specific data from a data map, it', function() {
  src.test.helper.domHelper.whenRetrievingSpecificDataFromADataMap.describe();
});

