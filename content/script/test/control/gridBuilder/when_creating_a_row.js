goog.require('goog.string');
goog.require('src.base.control.gridBuilder');
goog.provide('src.test.control.gridBuilder.whenCreatingARow');


/**
 @export
 */
src.test.control.gridBuilder.whenCreatingARow.describe = function() {
  //Using

  var Current_ = src.base.control.gridBuilder;


  //Fields


  var FirstColumnClass_ = goog.string.getRandomString();

  var appendChild_;
  var columnMapping_;
  var createdCount_;
  var createADiv_;
  var nameColumn_;
  var professionColumn_;
  var result_;
  var row_;
  var rowClickHandler_;
  var setClick_;
  var setTextContent_;


  //Test Hooks
  beforeEach(function() {
    createdCount_ = 0;
    nameColumn_ = {};
    professionColumn_ = {};
    row_ = {};

    columnMapping_ = [
      {'headerText' : 'Name', 'propertyName': 'name', 'class': FirstColumnClass_},
      {'headerText' : 'Profession', 'propertyName': 'profession'}
    ];

    result_ = [
      {'name': 'Jim', 'profession': 'Dentist'}
    ];


    createADiv_ = function() {
      var element;

      switch (createdCount_) {
      case 1:
        element = nameColumn_;
        break;
      case 2:
        element = professionColumn_;
        break;
      default:
        element = row_;
        break;
      }

      createdCount_ += 1;

      return element;
    };

    appendChild_ = function() {};

    setTextContent_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    return Current_.createARow(result_, columnMapping_, createADiv_,
                               setTextContent_, appendChild_, rowClickHandler_,
                               setClick_);
  };


  //Test Methods

  it('should create a div for the result item.', function() {
    var methodWasCalled = 0;

    createADiv_ = function(attributes) {
      methodWasCalled += attributes['class'] === Current_.RowClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(1);
  });


  it('should set the click for the row if the handler is not null.', function() {
    var methodWasCalled = false;

    rowClickHandler_ = function(row) {
      methodWasCalled = methodWasCalled &&
        row === row_;
    };

    setClick_ = function(element, handler) {
      methodWasCalled = element === row_;
      handler();
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should not set the click event if the handler is null.', function() {
    var methodWasCalled = false;
    rowClickHandler_ = null;

    setClick_ = function() {
      methodWasCalled = true;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });


  it('should not set the click event if the handler is undefined.', function() {
    var methodWasCalled = false;
    rowClickHandler_ = undefined;

    setClick_ = function() {
      methodWasCalled = true;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });


  it('should create a div for each column.', function() {
    var methodWasCalled = 0;

    createADiv_ = function(attributes) {
      methodWasCalled += (attributes['class'] === Current_.ColumnClass + ' ' + FirstColumnClass_) ||
        attributes['class'] === Current_.ColumnClass + '';
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(columnMapping_.length);
  });


  it('should set the column text correctly.', function() {
    var methodWasCalled = 0;

    setTextContent_ = function(element, text) {
      methodWasCalled += (element === nameColumn_ && text === result_['name']) ||
        (element === professionColumn_ && text === result_['profession']);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });




  it('should add the column to the parent row.', function() {
    var methodWasCalled = 0;

    appendChild_ = function(parent, child) {
      methodWasCalled += parent === row_ &&
        (child === nameColumn_ || child === professionColumn_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(2);
  });


  it('should create a div for clearing floats.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === 'clearBoth';
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should add the clear div to the row.', function() {
    var methodWasCalled = false;
    var clearBoth = {'id': 'clearBothDiv'};

    createADiv_ = function(attributes) {
      return attributes['class'] === 'clearBoth' ? clearBoth : row_;
    };

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === row_ && child === clearBoth);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should return the row.', function() {

    expect(callTheMethod_()).toBe(row_);
  });

};




describe('When creating a row, it', function() {
  src.test.control.gridBuilder.whenCreatingARow.describe();
});
