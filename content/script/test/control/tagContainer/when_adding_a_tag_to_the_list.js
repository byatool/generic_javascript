goog.require('goog.dom');
goog.require('goog.string');
goog.require('src.base.control.tagContainer');
goog.require('src.base.helper.domCreation');

goog.provide('src.test.control.tagContainer.whenAddingATagToTheList');


/**
 @export
 */
src.test.control.tagContainer.whenAddingATagToTheList.describe = function() {

  //Using

  var Current_ = src.base.control.tagContainer;


  //Fields

  var DeleteUrl_ = goog.string.getRandomString();
  var Id_ = goog.string.getRandomString();
  var Name_ = goog.string.getRandomString();

  var appendChild_;
  var createTag_;
  var findNode_;
  var parameters_;
  var insertSiblingBefore_;
  var tagContainer_;


  //Test Hooks

  beforeEach(function() {

    parameters_ = {};
    tagContainer_ = {};

    appendChild_ = function() {};
    createTag_ = function() {};
    findNode_ = function() {};
    insertSiblingBefore_ = function() {};

  });


  //Support Methods

  var callTheMethod_ = function() {
    Current_.addTagToList(Name_, Id_, tagContainer_, DeleteUrl_, parameters_, createTag_,
                          findNode_, insertSiblingBefore_, appendChild_);
  };


  //Test Methods


  it('should create the tag.', function() {
    var methodWasCalled = false;

    createTag_ = function(parentContainer, parameters, tagInformation,
                          deleteUrl, createADiv, setTextContent, createDeleteTagHandler,
                          setClick, appendChild) {

      methodWasCalled = parentContainer === tagContainer_ &&
        parameters === parameters_ &&
        (tagInformation[Current_.TagItemId] === Id_ && tagInformation[Current_.TagItemName] === Name_) &&
        deleteUrl === DeleteUrl_ &&
        createADiv === src.base.helper.domCreation.div &&
        setTextContent === goog.dom.setTextContent &&
        createDeleteTagHandler === Current_.createDeleteTagHandler &&
        setClick === src.base.helper.events.setClick &&
        appendChild === appendChild_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should find the last clear div.', function() {
    var methodWasCalled = false;

    findNode_ = function(parent) {
      methodWasCalled = parent === tagContainer_;
    };
    
    // findNode_ = function(parent, toDo) {
    //   methodWasCalled = parent === tagContainer_ &&
    //     String(toDo) === String(function(a) { return a['className'] === 'clearBoth'; });
    // };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should insert the new tag before the clear div.', function() {
    var methodWasCalled = false;
    var clearDiv = {};
    var createdTag = {};
    
    createTag_ = function() {
      return createdTag;
    };

    findNode_ = function() {
      return clearDiv;
    };

    insertSiblingBefore_ = function(before, after) {
      methodWasCalled = before === createdTag &&
        after === clearDiv;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When adding a tag to the list, it', function() {
  src.test.control.tagContainer.whenAddingATagToTheList.describe();
});
