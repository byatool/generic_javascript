goog.require('goog.dom');
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
  //var SecondName_  = goog.string.getRandomString();
  //var SecondValue_  = goog.string.getRandomString();

  var container_;
  var firstItem_;
  var items_;
  var layoutItem_;
  var options_;
  var result_;


  //Test Hooks

  beforeEach(function() {
    // items_ = [];
    firstItem_ = {};
    firstItem_[FirstName_] = FirstValue_;
    //items_.push(firstItem_);

    options_ = {};
    options_[Current_.RowClass] = '';
    options_[Current_.ColumnClass] = '';

    layoutItem_ = {};
    layoutItem_[Current_.Label] = LabelText_;
    layoutItem_[Current_.PropertyName] = FirstName_;
    options_[Current_.LayoutItems] = [layoutItem_];

    container_ = Current_.initialize('', [], options_);

    result_ = {};
    result_ = firstItem_;
  });


  //Support Methods

  var callTheMethod_ = function() {
    Current_.fillTheRows(container_, result_);
  };


  //Test Methods

  it('should fill each value column correctly.', function() {
    callTheMethod_();

    var row = goog.dom.findNode(container_, function(item) {
      return item['id'] === FirstName_;
    });

    var child = goog.dom.findNode(row, function(item) {
      return goog.dom.getTextContent(item) === FirstValue_;
    });

    expect(child).not.toBe(null);
  });
};


describe('When filling the rows, it', function() {
  src.test.control.simpleInformationDisplay.whenFillingTheRows.describe();
});
