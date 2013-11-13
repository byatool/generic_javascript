goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder.constant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.control.wall.row');

goog.provide('src.test.control.wall.row.whenCreatingARow');

/**
 @export
 */
src.test.control.wall.row.whenCreatingARow.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall.row;
  var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
  
  //Fields
  
  var Date_ = goog.string.getRandomString();
  var EditableUrl_ = goog.string.getRandomString();
  var PostId_ = goog.string.getRandomString();
  var Text_ = goog.string.getRandomString();
  var Username_ = goog.string.getRandomString();
  
  var appendChild_;
  var columnContainer_;
  var createADiv_;
  var createEditableDiv_;
  var currentItem_;
  var options_;
  var parentContainer_;
  var refreshGrid_;
  var setTextContent_;
  var textContainer_;
  var wallInformationContainer_;
  
  //Test Hooks
  
  beforeEach(function() {
    options_ = {};
    options_[Constant_.EditableUrl] = EditableUrl_;
    
    currentItem_ = {};
    currentItem_[Constant_.FieldId] = PostId_;
    currentItem_[Constant_.FieldText] = Text_;
    currentItem_[Constant_.FieldDate] = Date_;
    currentItem_[Constant_.FieldUsername] = Username_;
    
    columnContainer_ = {};
    parentContainer_ = {};
    textContainer_ = {};
    wallInformationContainer_ = {};
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case Constant_.RowClass:
        return parentContainer_;
        break;
      case GridBuilderConstant_.ColumnClass:
        return columnContainer_;
        break;
      // case Constant_.WallText:
      //   return textContainer_;
      //   b reak;
      case Constant_.WallInformation:
        return wallInformationContainer_;
        break;
      default:
        return parentContainer_;                      
      }};
    
    appendChild_ = function(){};
    createEditableDiv_ = function(){ return textContainer_;};
    refreshGrid_ = function(){};
    setTextContent_ = function(){};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createARow(currentItem_, options_, refreshGrid_, createADiv_,
                               createEditableDiv_, setTextContent_, appendChild_);
  };
  
  
  //Test Methods
  
  
  it('should create the row holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (attributes[ControlConstant_.Class] === GridBuilderConstant_.RowClass);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the item information holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.WallInformation !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.WallInformation);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text of the information container.', function() {
    var methodWasCalled = false;
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === wallInformationContainer_ &&
         Constant_.FieldDate !== undefined  &&
         Constant_.FieldUsername !== undefined  &&
         text === Username_ + ' on ' + Date_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the editable div.', function() {
    
    var methodWasCalled = false;
    
    createEditableDiv_ = function(name, text, id, url){
      methodWasCalled = Constant_.EditableUrl !== undefined &&
        Constant_.FieldId !== undefined &&
        name === PostId_  &&
        id === PostId_ &&
        text === Text_ &&
        url === EditableUrl_;
      
    };
    
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  // it('should create the text holder.', function() {
  //   var methodWasCalled = false;
  
  //   createADiv_ = function(attributes){
  //     methodWasCalled = methodWasCalled ||
  //       (Constant_.WallText !== undefined &&
  //        attributes[ControlConstant_.Class] === Constant_.WallText);
  //   };
  
  //   callTheMethod_();
  
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  // it('should set the text of the text container.', function() {
  //   var methodWasCalled = false;
  
  //   setTextContent_ = function(element, text){
  //     methodWasCalled = methodWasCalled ||
  //       (element === textContainer_ &&
  //        Constant_.FieldText !== undefined  &&
  //        text === Text_);
  //   };
  
  //   callTheMethod_();
  
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  
  it('should append the information container to the row.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === wallInformationContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should append the text container to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === parentContainer_ && child === textContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  

  
  // it('should append the text container to the row.', function() {
  //   var methodWasCalled = false;
    
  //   appendChild_ = function(parent, child){
  //     methodWasCalled = methodWasCalled || 
  //       (parent === parentContainer_ && child === textContainer_);
  //   };
    
  //   callTheMethod_();
    
  //   expect(methodWasCalled).toBe(true);
  // });
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(parentContainer_);
  });
  
  
};



describe('When creating a row, it', function() {
  src.test.control.wall.row.whenCreatingARow.describe();
});



