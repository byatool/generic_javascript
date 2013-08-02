goog.require('goog.string');
goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCopyingOptions');


/**
 @export
 */
src.test.control.gridBuilder.whenCopyingOptions.describe = function() {

  //Using
  var Current_ = src.base.control.gridBuilder;


  //Fields


  var ContainerClass_ = goog.string.getRandomString();
  var ContainerId_ = goog.string.getRandomString();
  var PageNumber_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();

  var mapping_;
  var optionToCopy_;
  var parameters_;
  var rowClickHandler_;

  //Test Hooks
  beforeEach(function() {

    parameters_ = {};
    parameters_[Current_.ParametersPageAttribute] = 1;
    rowClickHandler_ = function() {};

    optionToCopy_ = {};
    optionToCopy_[Current_.ContainerClass] = ContainerClass_;
    optionToCopy_[Current_.ContainerId] = ContainerId_;
    optionToCopy_[Current_.Url] = Url_;
    optionToCopy_[Current_.Parameters] = parameters_;
    optionToCopy_[Current_.RowClickHandler] = rowClickHandler_;

    mapping_ = {};
    optionToCopy_[Current_.Map] = mapping_;
  });

  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.gridBuilder.copyOptions(optionToCopy_, PageNumber_);
  };


  //Test Methods

  it('should set the container class.', function() {
    expect(callTheMethod_()[Current_.ContainerClass]).toBe(ContainerClass_);
  });


  it('should set the container id.', function() {
    expect(callTheMethod_()[Current_.ContainerId]).toBe(ContainerId_);
  });


  it('should set the url.', function() {
    expect(callTheMethod_()[Current_.Url]).toBe(Url_);
  });


  it('should set the parameter page number.', function() {
    expect(callTheMethod_()[Current_.Parameters][Current_.ParametersPageAttribute]).toBe(PageNumber_);
  });


  it('should set the mapping.', function() {
    expect(callTheMethod_()[Current_.Map]).toBe(mapping_);
  });


  it('should not change the original option page number.', function() {
    callTheMethod_();
    expect(optionToCopy_[Current_.Parameters][Current_.ParametersPageAttribute]).toBe(1);
  });


  it('should set the row click handler.', function() {
    expect(callTheMethod_()[Current_.RowClickHandler]).toBe(rowClickHandler_);
  });
};


describe('When copying options, it', function() {

  src.test.control.gridBuilder.whenCopyingOptions.describe();

});

