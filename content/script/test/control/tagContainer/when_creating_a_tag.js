goog.require('goog.string');
goog.require('src.base.control.tagContainer');
goog.require('src.base.helper.domHelper');

goog.provide('src.test.control.tagContainer.whenCreatingATag');


/**
 @export
 */
src.test.control.tagContainer.whenCreatingATag.describe = function() {

  //Using

  var Current_ = src.base.control.tagContainer;


  //Fields

  var DeleteUrl_ = goog.string.getRandomString();
  var TagId_ = goog.string.getRandomString();
  var TagName_ = goog.string.getRandomString();

  var appendChild_;
  var clearDiv_;
  var createADiv_;
  var parameters_;
  var parentContainer_;
  var createTagDeleteHandler_;
  var setClick_;
  var setTextContent_;
  var tagContainer_;
  var tagDeleteContainer_;
  var tagInformation_;
  var tagNameContainer_;


  //Test Hooks

  beforeEach(function() {
    clearDiv_ = {};
    parameters_ = {};
    parentContainer_ = {};
    createTagDeleteHandler_ = {};

    tagInformation_ = {};
    tagInformation_[Current_.TagItemId] = TagId_;
    tagInformation_[Current_.TagItemName] = TagName_;

    appendChild_ = function() {};

    createTagDeleteHandler_ = function() {};
    tagContainer_ = {};
    tagNameContainer_ = {};
    tagDeleteContainer_ = {};

    createADiv_ = function(attributes) {
      return attributes['class'] === Current_.TagItemClass ?
        tagContainer_ :
        attributes['class'] === Current_.TagItemTextClass ?
        tagNameContainer_ :
        tagDeleteContainer_;
    };

    setClick_ = function() {};
    setTextContent_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createTag(parentContainer_, parameters_, tagInformation_, DeleteUrl_,
                              createADiv_, setTextContent_, createTagDeleteHandler_,
                              setClick_, appendChild_);
  };


  //Test Methods


  it('should create the overall container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === Current_.TagItemClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the tag name container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === Current_.TagItemTextClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the text of the tag name container.', function() {
    var methodWasCalled = false;

    setTextContent_ = function(element, text) {
      methodWasCalled = methodWasCalled ||
        (element === tagNameContainer_ && text == TagName_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the delete tag container.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        attributes['class'] === Current_.TagItemDeleteClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the text for the delete tag container.', function() {
    var methodWasCalled = false;

    setTextContent_ = function(element, text) {
      methodWasCalled = methodWasCalled ||
        (element === tagDeleteContainer_ && text === 'X');
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create the delete button handler.', function() {
    var methodWasCalled = false;

    createTagDeleteHandler_ = function(tagItem, deleteUrl, parameters, submitUrl, removeNode) {
      methodWasCalled = tagItem === tagContainer_ &&
        DeleteUrl_ === DeleteUrl_ &&
        parameters === parameters &&
        parameters[Current_.TagItemId] === TagId_ &&
        submitUrl === src.base.helper.domHelper.submitToUrl &&
        removeNode === goog.dom.removeNode;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the click event.', function() {
    var methodWasCalled = false;
    var deleteHandler = function() {};

    createTagDeleteHandler_ = function() {
      return deleteHandler;
    };

    setClick_ = function(element, method) {
      methodWasCalled = element === tagDeleteContainer_ &&
        method === deleteHandler;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should add the text container to the tag container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === tagContainer_ &&
         child === tagNameContainer_);
    };


    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should add the delete container to the tag container.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === tagContainer_ &&
         child === tagDeleteContainer_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
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


  it('should append the clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};

    createADiv_ = function(attributes) {
      return attributes['class'] === Current_.TagItemClass ?
        tagContainer_ :
        clearDiv;
    };

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === tagContainer_ &&
         child === clearDiv);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should return tthe created container.', function() {
    expect(callTheMethod_()).toBe(tagContainer_);
  });

};


describe('When creating a tag, it', function() {
  src.test.control.tagContainer.whenCreatingATag.describe();
});
