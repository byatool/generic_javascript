goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.string');
goog.require('src.base.control.simpleInformationDisplay');

goog.provide('src.test.control.simpleInformationDisplay.whenFillingTheRows');

/**
 @export
 */
src.test.control.simpleInformationDisplay.whenFillingTheRows.describe = function() {
  //Using

  var Current_ = src.base.control.simpleInformationDisplay;


  //Fields

  var FirstName_ = goog.string.getRandomString();
  var FirstValue_ = goog.string.getRandomString();
  var LabelText_ = goog.string.getRandomString();


  var container_;
  var firstItem_;
  var items_;
  var layoutItem_;
  var options_;
  var result_;
  var setTextContent_;
  
  
  //Test Hooks
  
  beforeEach(function() {
    result_ = {};
    result_[FirstName_] = FirstValue_;
    
    options_ = {};
    options_[Current_.RowClass] = 'row';
    options_[Current_.ColumnClass] = 'column';
    
    layoutItem_ = {};
    layoutItem_[Current_.Label] = LabelText_;
    layoutItem_[Current_.PropertyName] = FirstName_;
    options_[Current_.LayoutItems] = [layoutItem_];
    
    container_ = Current_.initialize('', [], options_);
    
    setTextContent_ = function() {};
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    Current_.fillTheRows(container_, result_, setTextContent_);
  };
  
  
  //Test Methods
  
  it('should fill each value column correctly.', function() {
    var methodWasCalled = false;
    
    var row = goog.dom.findNode(container_, function(item) {
      return item['id'] === FirstName_;
    });
    
    var child = goog.dom.findNode(row, function(item) {
      return goog.dom.classes.has(item, Current_.InformationColumn);
    });
    
    setTextContent_ = function(container, value) {
      methodWasCalled = container === child &&
        value == FirstValue_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set an empty value to n/a', function() {
    var methodWasCalled = false;
    result_[FirstName_] = null;
    
    var row = goog.dom.findNode(container_, function(item) {
      return item['id'] === FirstName_;
    });
    
    var child = goog.dom.findNode(row, function(item) {
      return goog.dom.classes.has(item, Current_.InformationColumn);
    });
    
    setTextContent_ = function(container, value) {
      methodWasCalled = container === child &&
        value == 'N/A';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should not fail if there are no matches between the result properties, and the display columns.', function() {
    var methodWasCalled = false;
    
    result_ = null;
    result_ = {};
    result_['kflhasfjljdaf'] = '';
    
    setTextContent_ = function() {
      methodWasCalled = true;
    };
    
    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });

};


describe('When filling the rows, it', function() {
  src.test.control.simpleInformationDisplay.whenFillingTheRows.describe();
});
