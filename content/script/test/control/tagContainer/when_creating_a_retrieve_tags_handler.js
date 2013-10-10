goog.require('goog.string');
goog.require('src.base.control.tagContainer');

goog.provide('src.test.control.tagContainer.whenCreatingARetrieveTagsHandler');


/**
 @export
 */
src.test.control.tagContainer.whenCreatingARetrieveTagsHandler.describe = function() {

  //Using

  var Current_ = src.base.control.tagContainer;


  //Fields
  var DeleteUrl_ = goog.string.getRandomString();

  var appendChild_;
  var createADiv_;
  var createTag_;
  var createTags_;
  var createTagDeleteHandler_;
  var parameters_;
  var parentContainer_;
  var result_;
  var setClick_;
  var setTextContent_;


  //Test Hooks
  beforeEach(function() {
    parentContainer_ = {};
    result_ = {};

    appendChild_ = function() {};
    createADiv_ = function() {};
    createTag_ = function() {};
    createTags_ = function() {};
    createTagDeleteHandler_ = function() {};
    setClick_ = function() {};
    setTextContent_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createRetrieveTagsHandler(parentContainer_, DeleteUrl_,
                                              createTag_, createTags_, parameters_,
                                              createADiv_, appendChild_, setTextContent_,
                                              createTagDeleteHandler_, setClick_);
  };


  //Test Methods


  it('should call the create tags method.', function() {
    var methodWasCalled = false;

    createTags_ = function(result, parentContainer, deleteUrl,
                           createTag, parameters, createADiv,
                           appendChild, setTextContent, createTagDeleteHandler,
                           setClick) {

      methodWasCalled = result === result_ &&
        parentContainer === parentContainer_ &&
        deleteUrl === DeleteUrl_ &&
        createTag === createTag_ &&
        parameters === parameters_ &&
        createADiv === createADiv_ &&
        appendChild === appendChild_ &&
        setTextContent === setTextContent_ &&
        createTagDeleteHandler === createTagDeleteHandler_ &&
        setClick === setClick_;
    };

    var method = callTheMethod_();
    method(result_);

    expect(methodWasCalled).toBe(true);
  });

};


describe('When creating a retrieve tags handler, it', function() {

  src.test.control.tagContainer.whenCreatingARetrieveTagsHandler.describe();

});
