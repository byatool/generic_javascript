goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingTheHeaderRow');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheHeaderRow.describe = function () {
  
  //Using

  var Current_ = src.base.control.gridBuilder;
  
  
  //Fields
  
  var createdCount_;
  var firstColumn_;
  var mapping_;
  var parentRow_;
  var secondColumn_;
  var setTextContent_;
   
  var appendChild_;
  var createADiv_;
  var parentContainer_;
  
  
  //Test Hooks
  beforeEach(function() {
    mapping_ = [
      {'headerText' : 'Name', 'propertyName': 'name'},
      {'headerText' : 'Profession', 'propertyName': 'profession'}
    ];
    
    firstColumn_ = {};
    secondColumn_ = {};
    parentRow_ = {};
    createdCount_ = 0;
    
    createADiv_ = function() {
      var element;
      
      switch (createdCount_) {
      case 1:
        element = firstColumn_;
        break;
      case 2:
        element = secondColumn_;
        break;
      default:
        element = parentRow_;
        break;
      }
      
      createdCount_ += 1;
      
      return element;
    };
    
    appendChild_ = function(){};
    setTextContent_ = function(){};
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.gridBuilder.createTheHeaderRow(mapping_, parentContainer_, createADiv_, setTextContent_, appendChild_);
  };
  
  //Test Methods
  
  
  it('should create the row.', function() {
    var methodWasCalled = false;
    
    createADiv_ = function(attributes){
      methodWasCalled = methodWasCalled || attributes['class'] === Current_.HeaderRowClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create a column per mapping item.', function() {
    var methodWasCalled = 0;
    
    createADiv_ = function(attributes){
      methodWasCalled += attributes['class'] === Current_.HeaderClass;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should set each column text.', function() {
    var methodWasCalled = 0;
    
    setTextContent_ = function(element, text) {
      methodWasCalled += (element === firstColumn_ && text === mapping_[0]['headerText']) ||
        (element === secondColumn_ && text === mapping_[1]['headerText']);
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append each header column to the parnent row', function() {
    var methodWasCalled = 0;
    
    appendChild_ = function(parent, child) {
      methodWasCalled += parent === parentRow_ &&
        (child === firstColumn_ || child === secondColumn_);
    };
      
    callTheMethod_();
      
    expect(methodWasCalled).toBe(2);
  });
  
};


describe('When creating the header row, it', function() {
  src.test.control.gridBuilder.whenCreatingTheHeaderRow.describe();
});
