goog.require('goog.string');
goog.require('src.base.control.tagContainer');

goog.provide('src.test.control.tagContainer.whenCreatingTags');


/**
 @export
 */
src.test.control.tagContainer.whenCreatingTags.describe = function() {

  //Using
  var Current_ = src.base.control.tagContainer;


  //Fields

  var DeleteUrl_ = goog.string.getRandomString();
  var FirstName_ = goog.string.getRandomString();
  var SecondName_ = goog.string.getRandomString();

  var appendChild_;
  var clearDiv_;
  var createADiv_;
  var createTag_;
  var createTagDeleteHandler_;
  var firstTagItem_;
  var parameters_;
  var parentContainer_;
  var result_;
  var secondTagItem_;
  var setClick_;
  var setTextContent_;
  var tagContainer_;

  //Test Hooks

  beforeEach(function() {

    parentContainer_ = {};
    firstTagItem_ = {};
    firstTagItem_[Current_.TagItemName] = FirstName_;
    secondTagItem_ = {};
    secondTagItem_[Current_.TagItemName] = SecondName_;
    result_ = [firstTagItem_, secondTagItem_];

    appendChild_ = function() {};
    createADiv_ = function(attributes) {
      return clearDiv_;
    };

    createTag_ = function() {};
    createTagDeleteHandler_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
  });


  //Support Methods

  var callTheMethod_ = function() {
    Current_.createTags(result_, parentContainer_, DeleteUrl_, createTag_,
                        parameters_, createADiv_, appendChild_, setTextContent_,
                        createTagDeleteHandler_, setClick_);
  };


  //Test Methods


  it('should create the tag for each item.', function() {
    var methodWasCalled = 0;

    createTag_ = function(parentContainer, parameters, tagInformation,
                          deleteUrl, createADiv, setTextContent, createTagDeleteHandler,
                          setClick, appendChild) {

      methodWasCalled += parentContainer === parentContainer_ &&
        parameters === parameters_ &&
        deleteUrl === DeleteUrl_ &&
        setTextContent === setTextContent_ &&
        createTagDeleteHandler === createTagDeleteHandler_ &&
        setClick === setClick_ &&
        appendChild === appendChild_ &&
        (tagInformation === result_[0] || tagInformation === result_[1]);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });



  it('should add the created tags to the tag container.', function() {
    var methodWasCalled = 0;
    var firstCall = false;
    var firstTag = {};
    var secondTag = {};


    createTag_ = function() {
      if (firstCall) {
        firstCall = true;
        return firstTag;
      }
      else {
        return secondTag;
      }
    };

    appendChild_ = function(parent, child) {
      methodWasCalled += parent === parentContainer_ &&
        (child === firstTag || child === secondTag);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should create a clear div.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes['class'] === 'clearBoth');

      return {};
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append a clear div.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ && child === clearDiv_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When creating tags, it', function() {
  src.test.control.tagContainer.whenCreatingTags.describe();
});
