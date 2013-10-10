goog.require('goog.style');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');

goog.provide('src.test.helper.events.whenSettingTheClickEvent');

/**
 @export
 */
src.test.helper.events.whenSettingTheClickEvent.describe = function() {
  //Fields
  var PARENT_BUTTON = 'parentButton';
  var PARENT_DIV = 'parent';

  var Button = src.base.helper.domCreation.button;
  var Div = src.base.helper.domCreation.div;
  var SetClick = src.base.helper.events.setClick;

  //Support Methods
  var theBody = function() {
    'use strict';
    return goog.dom.getDocument().body;
  };

  var theButton = function() {
    'use strict';
    return goog.dom.getElement(PARENT_BUTTON);
  };

  var theDiv = function() {
    'use strict';
    return goog.dom.getElement(PARENT_DIV);
  };

  //Test Hooks

  beforeEach(function() {
    var createdDiv = Div({id: PARENT_DIV, type: 'submit'});
    goog.style.showElement(createdDiv, false);
    goog.dom.appendChild(theBody(), createdDiv);

    var createdButton = Button({id: PARENT_BUTTON, type: 'button'});
    var createTheClickEvent = function() {
      goog.style.showElement(createdDiv, true);
    };

    SetClick(createdButton, createTheClickEvent);

    goog.dom.appendChild(theBody(), createdButton);
  });

  afterEach(function() {
    if (theButton() !== null) {
      goog.dom.removeNode(theButton());
    }

    if (theDiv() != null) {
      goog.dom.removeNode(theDiv());
    }
  });

  //Test methods

  it('will not change the visibilty if not clicked.', function() {
    expect(goog.style.isElementShown(theDiv())).toBe(false);
  });

  it('will show a div when clicked.', function() {
    theButton().click();
    expect(goog.style.isElementShown(theDiv())).toBe(true);
  });
};

describe('When setting the click event ', function() {
  src.test.helper.events.whenSettingTheClickEvent.describe();
});
