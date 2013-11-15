goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.row');

goog.provide('src.test.control.wall.whenInitializingAWall');

/**
 @export
 */
src.test.control.wall.whenInitializingAWall.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall;
  var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
  
  //Fields
  
  var ContainerClass_ = goog.string.getRandomString();
  var ContainerId_ = goog.string.getRandomString();
  var DeleteUrl_ = goog.string.getRandomString();
  var EditableUrl_ = goog.string.getRandomString();
  var ParentContainerClass_ = goog.string.getRandomString();
  var ParentContainerId_ = goog.string.getRandomString();
  var PostTo_ = goog.string.getRandomString();
  var RetrieveItemsUrl_ = goog.string.getRandomString();
  var SubjectId_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createTheForm_;
  var createTheGrid_;
  var createTheMapping_;
  var createdGrid_;
  var form_;
  var gridOptions_;
  var gridResult_;
  var initializeTheForm_;
  var parentContainer_;
  var refreshGrid_;
  
  
   //Test Hooks
  
  beforeEach(function() {
    parentContainer_ = {};
    
    appendChild_ = function(){};
    createADiv_ = function(){ return parentContainer_; };
    
    form_ = {};
    createTheForm_ = function(){ return form_; };
    
    gridResult_ = {};
    createdGrid_ = {};
    gridOptions_ = {};
    gridResult_[ControlConstant_.CreatedControl] = createdGrid_;
    gridResult_[ControlConstant_.CreatedOptions] = gridOptions_;
    createTheGrid_ = function(){
      return gridResult_;
    };
    
    createTheMapping_ = function(){};
    initializeTheForm_ = function(){};
    refreshGrid_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.initialize(ParentContainerId_, PostTo_, RetrieveItemsUrl_, DeleteUrl_, SubjectId_,
                               EditableUrl_, createADiv_, createTheForm_, createTheGrid_, appendChild_,
                               createTheMapping_, refreshGrid_, initializeTheForm_);
  }; 
  
  
  //Test Methods
  
  it('should create a parent container.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled ||
        (attributes[ControlConstant_.Id] === ParentContainerId_ &&
         attributes[ControlConstant_.Class] === ParentContainerId_);
      
      return parentContainer_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the form.', function() {
    var methodWasCalled = false;
    
    createTheForm_ = function(postTo, subjectId){
      methodWasCalled = postTo === PostTo_ &&
        subjectId === SubjectId_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the grid.', function() {
    var methodWasCalled = false;
    var mapping = {};
    
    createTheMapping_ = function(){
      return mapping;
    };
    
    createTheGrid_ = function(options){
      methodWasCalled = Constant_.ItemsGrid !== undefined &&
        Constant_.SubjectId !== undefined &&
        options[GridBuilderConstant_.ContainerClass] === Constant_.ItemsGrid &&
        options[GridBuilderConstant_.ContainerId] === Constant_.ItemsGrid &&
        options[GridBuilderConstant_.CreateARow] === src.base.control.wall.row.createARow &&
        options[Constant_.DeleteUrl] === DeleteUrl_ &&
        options[Constant_.EditableUrl] === EditableUrl_ &&
        options[GridBuilderConstant_.Map] === mapping &&
        options[GridBuilderConstant_.Parameters][Constant_.SubjectId] === SubjectId_ &&
        options[GridBuilderConstant_.Parameters][ControlConstant_.Page] === 0 &&
        options[GridBuilderConstant_.Url] === RetrieveItemsUrl_ &&
        options[GridBuilderConstant_.ShowHeader] === false;
      
      
      return gridResult_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
   
  it('should initialize the form.', function() {
    var methodWasCalled = 0;
    
    refreshGrid_ = function(gridOptions, grid){
      methodWasCalled += gridOptions === gridOptions_ &&
        grid === createdGrid_;
      
    };
    
    initializeTheForm_ = function(form, onSubmit){
      methodWasCalled += form === form_;
      onSubmit();
    };
     
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append the form to the parentContainer.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === form_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should append the grid.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function (parentContainer, grid) {
      methodWasCalled = methodWasCalled ||
        (parentContainer === parentContainer_ &&
         grid === createdGrid_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
};


describe('When initializing an wall, it', function() {
  src.test.control.wall.whenInitializingAWall.describe();
});
