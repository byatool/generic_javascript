goog.require('goog.dom');
goog.require('goog.string');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.helper.domCreation.whenFillingASelect');

/**
 @export
 */
src.test.helper.domCreation.whenFillingASelect.describe = function() {
  //Using
  var Current_ = src.base.helper.domCreation;
  
   //Fields
  var FirstText_ = goog.string.getRandomString();
  var FirstValue_ = goog.string.getRandomString();
  var SecondText_ = goog.string.getRandomString();
  var SecondValue_ = goog.string.getRandomString();
 
  var data_;
  var defaultText_;
  var select_;
  
  
  //Test Hooks
  beforeEach(function() {
    data_ = [{text: FirstText_, value: FirstValue_}, {text: SecondText_, value: SecondValue_}];
    select_ = goog.dom.createDom('select');
    defaultText_ = null;
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    Current_.fillASelect$(select_, data_, defaultText_);
  };
  
  
  //Test Methods
  
  it('should do nothing if there is no data.', function() {
    data_ = null;
    callTheMethod_();
    
    expect(select_.children.length).toBe(0);
  });
  
  
  it('should fill the select from an option list', function() {
    callTheMethod_();
    
    expect(select_.children.length).toBe(data_.length);
  });
  
  
  it('should fill the select with the default item.', function() {
    defaultText_ = 'hihi';
    callTheMethod_();
    
    var first = select_.children[0];
    
    var isCorrect = first.text === defaultText_ &&
          first.value === '';
    
    expect(isCorrect).toBe(true);
  });
  
  
  it('should fill the select with the default item if it is an empty string.', function() {
    defaultText_ = '';
    callTheMethod_();
    
    var first = select_.children[0];
    
    var isCorrect = first.text === defaultText_ &&
          first.value === '';
    
    expect(isCorrect).toBe(true);
  });
  
  it('should ignore an undefined default text..', function() {
    defaultText_ = undefined;
    callTheMethod_();
    
    var first = select_.children[0];
    
    var isCorrect = first.text === FirstText_&&
      first.value === FirstValue_;
    
    expect(isCorrect).toBe(true);
  });
  
  
  it('should have the correct options added.', function() {
    callTheMethod_();
    var first = select_.children[0];
    var second = select_.children[1];
    
    var isCorrect = first.text === FirstText_ &&
          first.value === FirstValue_ &&
          second.text === SecondText_ &&
          second.value === SecondValue_;
    
    expect(isCorrect).toBe(true);
  });
};


describe('When filling a select, it', function() {
  src.test.helper.domCreation.whenFillingASelect.describe();
});
