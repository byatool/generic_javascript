goog.require('goog.dom');
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
  var select_;


  //Test Hooks
  beforeEach(function() {
    data_ = [{text: FirstText_, value: FirstValue_}, {text: SecondText_, value: SecondValue_}];
    select_ = goog.dom.createDom('select');
  });

  //Support Methods
  var callTheMethod_ = function() {
    Current_.fillASelect$(select_, data_);
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
