goog.require('goog.date');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.positioning.AnchoredViewportPosition');
goog.require('goog.positioning.Corner');
goog.require('goog.ui.DatePicker');
goog.require('goog.ui.DatePicker.Events');
goog.require('goog.ui.Popup');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.popupDatePicker.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.popupDatePicker');



/* Support Methods */

/**
 @param {string} containerId The id for the date picker container.
 @param {function} createADiv The function used to create the
 date picker container.
 @return {Array.<Object>} The container, and the date picker
 control.
 @protected
 */
src.base.control.popupDatePicker.createTheDatePicker =
  function(containerId, createADiv) {

    var datepickerControl = new goog.ui.DatePicker();
    var datepickerParent = createADiv({'id': containerId});
    datepickerControl.setAllowNone(false);
    datepickerControl.setDate(null);
    datepickerControl.render(datepickerParent);

    return [datepickerParent, datepickerControl];
  };


/**
 @param {string} popupDivClass The css class for the created
 popup div.
 @param {function} createADiv The function used to create the
 popup div.
 @return {Object} A popup control.
 @protected
 */
src.base.control.popupDatePicker.createThePopup =
  function(popupDivClass, createADiv) {

    var popUpDiv = createADiv({'class': popupDivClass});

    var popup = new goog.ui.Popup(popUpDiv);
    popup.setHideOnEscape(true);
    popup.setAutoHide(true);

    return popup;
  };


/**
 @param {Object} popup The popup elemnt.
 @param {Object} toClick element that the popup will show up next to.
 @private
 */
src.base.control.popupDatePicker.showPopup_ =
  function(popup, toClick) {
    popup.setVisible(false);
    popup.setPinnedCorner(toClick);
    popup.setPosition(new goog.positioning.AnchoredViewportPosition(toClick, goog.positioning.Corner.TOP_RIGHT));
    popup.setVisible(true);
  };


/**
 @param {Object} datePicker The date picker control.
 @param {string} textboxName The name of the textbox the datepicker
 is to fill.
 @param {function} findElement Method used to
 find an element.
 @param {function} listen The event listener used to attach a
 handler to the change event.
 @param {string} eventType Name of the event to be handled.
 @param {function} setValue This is used to the value of a textbox.
 @param {function} formatTheDate This is to
 format the date.
 */
src.base.control.popupDatePicker.setTheDatePickerEvent =
  function(datePicker, textboxName, findElement, listen, eventType, setValue, formatTheDate) {
    var textbox = findElement(textboxName);

    listen(datePicker, eventType, function(event) {
      setValue(textbox, event.date ? formatTheDate(event.date) : 'none');
      textbox['focus']();
    });
  };


/**
 @param {goog.date.Date} date The date to be formatted.
 @return {string} The formatted date.
 @protected
 */
src.base.control.popupDatePicker.formatTheDate =
  function(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getYear();
  };


/**
 @param {Object} options The various control options.
 @param {?function} createADiv The function used to create the parent container.
 @param {?function} createAButton The function used to create the pop button.
 @param {?function} appendChild Used to add an element to a parent
 element.
 @param {?function} createThePopup Used to create the popup control.
 @param {?function} createTheDatePicker Used to create the datepicker control.
 @param {?function} setTheEvent This is for setting the click event for the popup.
 @param {?function} setTheDatePickerEvent This is used to attack the change event
 of the datepicker to an existing textbox.
 @param {?function} showPopup Function to be called on the button click.
 @return {Object} The created popup datepicker container.
 @export
 */
src.base.control.popupDatePicker.create =
  function(options, createADiv, createAButton,
           appendChild, createThePopup,
           createTheDatePicker, setTheEvent,
           setTheDatePickerEvent, showPopup) {

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;

    createThePopup = createThePopup ?
      createThePopup :
      src.base.control.popupDatePicker.createThePopup;

    createTheDatePicker = createTheDatePicker ?
      createTheDatePicker :
      src.base.control.popupDatePicker.createTheDatePicker;

    setTheEvent = setTheEvent ?
      setTheEvent :
      src.base.helper.events.setClick;

    setTheDatePickerEvent = setTheDatePickerEvent ?
      setTheDatePickerEvent :
      src.base.control.popupDatePicker.setTheDatePickerEvent;

    showPopup = showPopup ?
      showPopup :
      src.base.control.popupDatePicker.showPopup_;


    /* START */


    var Constant_ = src.base.control.popupDatePicker.constant;
    var Current_ = src.base.control.popupDatePicker;
    var ControlConstant_ = src.base.control.controlConstant;

    var parentContainerAttributes = {};
    parentContainerAttributes[ControlConstant_.Class] = Constant_.ContainerClass;
    var parentContainer = createADiv(parentContainerAttributes);


    var popupButtonAttributes = {};
    popupButtonAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    popupButtonAttributes[ControlConstant_.Class] = Constant_.ButtonClass;
    var popupButton = createAButton(popupButtonAttributes,
                                    options[Constant_.ButtonText]);

    appendChild(parentContainer, popupButton);


    var datePickerPair = createTheDatePicker(Constant_.DatePickerClass,
                                             createADiv);

    setTheDatePickerEvent(datePickerPair[1],
                          options[Constant_.TextboxName],
                          goog.dom.getElement,
                          goog.events.listen,
                          goog.ui.DatePicker.Events.CHANGE,
                          goog.dom.forms.setValue,
                          Current_.formatTheDate);

    var popup = createThePopup(Constant_.PopupClass, createADiv);

    setTheEvent(popupButton, function() { showPopup(popup, popupButton); });


    popup['element'] = popup.element_;
    appendChild(popup['element'], datePickerPair[0]);
    appendChild(parentContainer, popup['element']);

    return parentContainer;
  };
