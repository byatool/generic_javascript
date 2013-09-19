goog.require('goog.dom.forms');
goog.require('goog.ui.LabelInput');
goog.require('src.base.control.buttonList');
goog.require('src.base.control.feedback.constant');
goog.require('src.base.helper.events');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.feedback.form');

/**
 @param {string} submitUrl The url for adding a comment.
 @param {function} refreshHistory The function used to
 refresh the history list after a comment is submitted.
 @param {?function} createADiv The function used to create
 the container div.
 @param {?function} createAForm The function used to create
 form.
 @param {?function} createATextArea The function used to 
 create the comment text area.
 @param {?function} createAButtonList The function used to
 create the category choices for the comment.
 @param {?function} createAButton The function used to create
 the various buttons.
 @param {?function} setClick The function used to set the
 click handler for the buttons.
 @param {?function} setValue The function used to reset the
 form values.
 @return {Object} The created control.
 @protected
 */
src.base.control.feedback.form.create =
  function(submitUrl, refreshHistory, createADiv, createAForm,
           createATextArea, createAButtonList, createAButton,
           setClick, setValue) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createAForm = createAForm ?
      createAForm :
      src.base.helper.domCreation.form;
    
    createATextArea = createATextArea ?
      createATextArea :
      src.base.helper.domCreation.textarea;
    
    createAButtonList = createAButtonList ?
      createAButtonList :
      src.base.control.buttonList.createAButtonList;
    
    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;
    
    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;
    
    setValue = setValue ?
      setValue :
      goog.dom.forms.setValue;
    
    //START
    
    var current = src.base.control.feedback.form;
    var constant = src.base.control.feedback.constant;
    
    var form = createAForm({'class': constant.FeedbackForm});
  //create the form
  // set the action
  // create the textarea
  // create the button list
  // create the submit
  //   set click with the url
  //   set on submit through
  // create the cancel button
  //   fire off cancel function
  // create the history button
  //  show/hide history
};
