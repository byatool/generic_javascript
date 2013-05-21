goog.require('goog.date');
goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.positioning.AnchoredViewportPosition');
goog.require('goog.positioning.Corner');
goog.require('goog.ui.DatePicker');
goog.require('goog.ui.DatePicker.Events');
goog.require('goog.ui.Popup');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.popupDatePicker');


/**
 @const
 @type {string}
 @export
 */
src.base.control.popupDatePicker.ButtonClass = 'buttonClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.popupDatePicker.ButtonText = 'buttonText';


/**
 @const
 @type {string}
 @export
 */
src.base.control.popupDatePicker.ContainerClass = 'containerClass';

/**
 @const
 @type {string}
 @export
 */
src.base.control.popupDatePicker.DatePickerClass = 'datePickerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.popupDatePicker.PopupClass = 'popupClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.popupDatePicker.TextboxName = 'textboxName';

/* Support Methods */




/**
 @return {Object} A datepicker control.
 @private

 */
src.base.control.popupDatePicker.createTheDatePicker_ = function() {
  var Div = src.base.helper.domCreation.div;
  var datepickerControl = new goog.ui.DatePicker();
  var datepickerParent = Div({'id': 'test'});

  datepickerControl.render(datepickerParent);

  return [datepickerParent, datepickerControl];
};

/**
 @return {Object} A popup control.
 @private
 */
src.base.control.popupDatePicker.createThePopup_ = function() {
  var Div = src.base.helper.domCreation.div;
  var popUpDiv = Div({'class': 'popup'});

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
src.base.control.popupDatePicker.showPopup_ = function(popup, toClick) {
  popup.setVisible(false);
  popup.setPinnedCorner(toClick);
  popup.setPosition(new goog.positioning.AnchoredViewportPosition(toClick, goog.positioning.Corner.TOP_RIGHT));
  popup.setVisible(true);
};


/**
 @param {Object} datePicker The date picker control.
 @param {string} textboxName The name of the textbox the datepicker is to fill.
 @param {function(string) : Object} findElement Method used to find an element.
 @param {function} listen The event listener used to attach a handler to the
 change event.
 @param {string} eventType Name of the event to be handled.
 @param {function} setValue This is used to the value of a textbox.
 @param {function(goog.date.Date) : string} formatTheDate This is to format the date.
 */
src.base.control.popupDatePicker.setTheDatePickerEvent = function(datePicker, textboxName, findElement, listen, eventType, setValue, formatTheDate) {
  var textbox = findElement(textboxName);

  listen(datePicker, eventType, function(event) {

    // setValue(textbox, event.date ? event.date.toIsoString(true) : 'none');
    //IMPORTANT: This is where the date format is set before updating the textbox.
    //TODO: Not sure how to test that the date is formatted correctly...
    setValue(textbox, event.date ? formatTheDate(event.date) : 'none');
  });
};


/**
 @param {goog.date.Date} date The date to be formatted.
 @return {string} The formatted date.
 @protected
 */
src.base.control.popupDatePicker.formatTheDate = function(date) {
  return date.getMonth() + '/' + date.getDate() + '/' + date.getYear();
};


/**
 @param {Object} options The various control options..
 @param {function(Object, Object)} appendChild Used to add an element to a parent
 element.
 @param {function() : Object} createThePopup Used to create the popup control.
 @param {function() : Object} createTheDatePicker Used to create the datepicker control.
 @param {function} setTheEvent This is for setting the click event for the popup.
 @param {function} setTheDatePickerEvent This is used to attack the change event of the
 datepicker to an existing textbox.
 @param {function} showPopup Function to be called on the button click.

 @return {Object} The created popup datepicker container.
 @export
 */
src.base.control.popupDatePicker.create = function(options, appendChild, createThePopup, createTheDatePicker, setTheEvent, setTheDatePickerEvent, showPopup) {
  var Button = src.base.helper.domCreation.button;
  var Current = src.base.control.popupDatePicker;
  var Div = src.base.helper.domCreation.div;
  var Textbox = src.base.helper.domCreation.textbox;


  appendChild = appendChild ? appendChild : goog.dom.appendChild;
  setTheEvent = setTheEvent ? setTheEvent : src.base.helper.events.setClick;
  createThePopup = createThePopup ? createThePopup : src.base.control.popupDatePicker.createThePopup_;
  createTheDatePicker = createTheDatePicker ? createTheDatePicker : src.base.control.popupDatePicker.createTheDatePicker_;
  setTheDatePickerEvent = setTheDatePickerEvent ? setTheDatePickerEvent : src.base.control.popupDatePicker.setTheDatePickerEvent;
  showPopup = showPopup ? showPopup : src.base.control.popupDatePicker.showPopup_;


  var parentContainer = Div({'class': options[Current.ContainerClass]});

  var clickControl = Button({'class': options[Current.ButtonClass], 'type': 'button' }, options[Current.ButtonText]);
  appendChild(parentContainer, clickControl);

  var datePickerPair = createTheDatePicker(options[Current.DatePickerClass]);

  setTheDatePickerEvent(datePickerPair[1],
                        options[Current.TextboxName],
                        goog.dom.getElement,
                        goog.events.listen,
                        goog.ui.DatePicker.Events.CHANGE,
                        goog.dom.forms.setValue,
                        src.base.control.popupDatePicker.formatTheDate);

  var popup = createThePopup(options[Current.PopupClass]);

  popup['element'] = popup.element_;

  setTheEvent(clickControl, function() { showPopup(popup, clickControl); });

  appendChild(popup['element'], datePickerPair[0]);

  appendChild(parentContainer, clickControl);
  appendChild(parentContainer, popup['element']);

  return parentContainer;
};





