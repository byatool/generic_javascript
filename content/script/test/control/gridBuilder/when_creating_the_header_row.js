goog.require('src.base.control.gridBuilder');

goog.provide('src.test.control.gridBuilder.whenCreatingTheHeaderRow');

/**
 @export
 */
src.test.control.gridBuilder.whenCreatingTheHeaderRow.describe = function() {

  //Using

  var Current_ = src.base.control.gridBuilder;


  //Fields

  var FirstHeaderClass_ = goog.string.getRandomString();
  var SecondHeaderClass_ = goog.string.getRandomString();

  var createdCount_;
  var findNode_;
  var firstColumn_;
  var mapping_;
  var options_;
  var parentRow_;
  var secondColumn_;
  var setTextContent_;
  var showHeader_;

  var appendChild_;
  var createADiv_;
  var parentContainer_;


  //Test Hooks
  beforeEach(function() {
    mapping_ = [
      {'headerText' : 'Name', 'propertyName': 'name', 'class': FirstHeaderClass_},
      {'headerText' : 'Profession', 'propertyName': 'profession'}
    ];

    showHeader_ = true;
    options_ = {};
    options_[Current_.Map] = mapping_;
    options_[Current_.ShowHeader] = showHeader_;

    firstColumn_ = {};
    secondColumn_ = {};
    parentRow_ = {};
    createdCount_ = 0;
    findNode_ = function() { return null; };

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

    appendChild_ = function() {};
    setTextContent_ = function() {};
  });

  //Support Methods
  var callTheMethod_ = function() {
    return src.base.control.gridBuilder.createTheHeaderRow(options_, parentContainer_, findNode_,
                                                           createADiv_, setTextContent_, appendChild_);
  };

  //Test Methods


  it('should create the row.', function() {
    var methodWasCalled = false;

    createADiv_ = function(attributes) {
      methodWasCalled = methodWasCalled || attributes['class'] === Current_.HeaderRowClass;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should create a column per mapping item.', function() {
    var methodWasCalled = 0;

    createADiv_ = function(attributes) {
      methodWasCalled += (attributes['class'] === Current_.HeaderClass + ' ' + FirstHeaderClass_) ||
         (attributes['class'] === Current_.HeaderClass);
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


  it('should append each header column to the parent row', function() {
    var methodWasCalled = 0;

    appendChild_ = function(parent, child) {
      methodWasCalled += parent === parentRow_ &&
        (child === firstColumn_ || child === secondColumn_);
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


  it('should append a clear both div to the parent row  column.', function() {
    var methodWasCalled = false;
    var clearBoth = {'id': 'clearBothDiv'};

    createADiv_ = function(attributes) {
      return attributes['class'] === 'clearBoth' ? clearBoth : parentRow_;
    };

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentRow_ && child === clearBoth);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should append the parent row to the parentContainer.', function() {
    var methodWasCalled = false;

    appendChild_ = function(parent, child) {
      methodWasCalled = methodWasCalled ||
        (parent === parentContainer_ && child === parentRow_);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });



  it('should find the header row if it exists.', function() {
    var methodWasCalled = false;

    findNode_ = function(parent, toFind) {
      methodWasCalled = parent === parentContainer_ &&
        String(toFind) === String('function (a){return"gridBuilderHeaderRowClass"===a.className}');

      return null;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

  it('should not create the header row if it exists.', function() {
    var methodWasCalled = false;

    findNode_ = function() {
      return parentRow_;
    };

    createADiv_ = function() {
      methodWasCalled = true;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });



  it('should not create the head row if is not to be shown', function() {
    var methodWasCalled = false;

    options_[Current_.ShowHeader] = false;

    createADiv_ = function(attributes) {
      methodWasCalled = true;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(false);
  });
};


describe('When creating the header row, it', function() {
  src.test.control.gridBuilder.whenCreatingTheHeaderRow.describe();
});
