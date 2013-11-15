goog.require('goog.string');
goog.require('src.base.control.wall.row');
goog.require('src.base.control.wall.constant');

goog.provide('src.test.control.wall.row.whenCreatingTheRowInformationContainer');

/**
 @export
 */
src.test.control.wall.row.whenCreatingTheRowInformationContainer.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall.row;
  
  
  //Fields

  var Date_ = goog.string.getRandomString();
  var DeleteUrl_ = goog.string.getRandomString();
  var Username_ = goog.string.getRandomString();
  
  var appendChild_;
  var createADiv_;
  var createDeleteContainer_;
  var currentItem_;
  var options_;
  var refreshGrid_;
  var setTextContent_;
  var wallInformationContainer_;
  var wallInformationTextContainer_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    currentItem_ = {};
    options_ = {};
    options_[Constant_.DeleteUrl] = DeleteUrl_;
    
    currentItem_[Constant_.FieldDate] = Date_;
    currentItem_[Constant_.FieldUsername] = Username_;
    
    wallInformationContainer_ = {};
    wallInformationTextContainer_ = {};
    
    createADiv_ = function(attributes){
      switch(attributes[ControlConstant_.Class]) {
      case Constant_.WallInformation:
        return wallInformationContainer_;
        break;
      case Constant_.WallInformationText:
        return wallInformationTextContainer_;
        break;
      default:
        return wallInformationContainer_;                      
      }};

    appendChild_ = function(){};
    createDeleteContainer_ = function() {};
    refreshGrid_ = function() {};
    setTextContent_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createRowInformationContainer(options_, currentItem_, refreshGrid_, createDeleteContainer_,
                                                  createADiv_, setTextContent_, appendChild_);
  };
  
  //Test Methods
  it('should create the information holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.WallInformation !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.WallInformation);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the text holder.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled ||
        (Constant_.WallInformationText !== undefined &&
         attributes[ControlConstant_.Class] === Constant_.WallInformationText);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the text of the text container.', function() {
    var methodWasCalled = false;
    
    setTextContent_ = function(element, text){
      methodWasCalled = methodWasCalled ||
        (element === wallInformationTextContainer_ &&
         text === currentItem_[Constant_.FieldUsername] +
         ' on ' +
         currentItem_[Constant_.FieldDate]);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the delete container.', function() {
    var methodWasCalled = false;
    
    createDeleteContainer_ = function(currentItem, deleteUrl, refreshGrid,
                                      createADiv, setTextContent, createDeletePostHandler,
                                      setOnClick){
      methodWasCalled = Constant_.DeleteUrl !== undefined &&
        currentItem === currentItem_ &&
        deleteUrl === DeleteUrl_ &&
        refreshGrid === refreshGrid_ &&
        createADiv === createADiv_ &&
        setTextContent === setTextContent_ &&
        createDeletePostHandler === src.base.control.wall.row.createDeletePostHandler &&
        setOnClick === src.base.helper.events.setClick;
      
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });


  
  it('should append the text container to the parent.', function() {
    var methodWasCalled = false;
    
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === wallInformationContainer_ && child === wallInformationTextContainer_);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  

  
  
  it('should append the delete container to the parent.', function() {
    var methodWasCalled = false;
    var deleteContainer = {};

    createDeleteContainer_ = function(){
      return deleteContainer;
    };
     
    appendChild_ = function(parent, child){
      methodWasCalled = methodWasCalled || 
        (parent === wallInformationContainer_ &&
         child === deleteContainer);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  
  it('should return the parent container.', function() {
    expect(callTheMethod_()).toBe(wallInformationContainer_);
  });
  
};

describe('When creating the row information container, it', function() {
  src.test.control.wall.row.whenCreatingTheRowInformationContainer.describe();
});


//--namespace="src.test.control.wall.row.whenCreatingTheRowInformationContainer" ^
