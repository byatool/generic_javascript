goog.require('goog.dom.forms');
goog.require('goog.ui.LabelInput');
goog.require('src.base.control.buttonList');
goog.require('src.base.control.feedback.constant');
goog.require('src.base.helper.events');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.feedback.form');




src.base.control.feedback.form.createALabelInput =
  function(label, textarea) {
    var theLabelInput = new goog.ui.LabelInput(label);
    theLabelInput.render(textarea);
    //theLabelInput.getElement().name = 'dynamic';
  };


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
           createATextArea, createALabelInput, createAButtonList,
           createAButton, setClick, setValue) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createAForm = createAForm ?
      createAForm :
      src.base.helper.domCreation.form;
    
    createATextArea = createATextArea ?
      createATextArea :
      src.base.helper.domCreation.textarea;
    
    createALabelInput = createALabelInput ?
      createALabelInput :
      src.base.control.feedback.form.createALabelInput;
    
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
    var ButtonList_ = src.base.control.buttonList;
    
    var form = createAForm({
      'action': submitUrl,
      'class': constant.FeedbackForm,
      'method': 'post'
    });
    
    var textarea = createATextArea({
      'class': constant.CommentArea,
      'id': constant.ParameterComment,
      'name': constant.ParameterComment
    });

    
    createALabelInput(constant.CommentAreaText, textarea);
    
    
    var buttonListOptions = {};
    buttonListOptions[ButtonList_.ContainerClass] = constant.CategoryListContainer;
    buttonListOptions[ButtonList_.ElementId] = constant.CategoryListContainer;
    buttonListOptions[ButtonList_.HiddenId] = constant.ParameterCategory;
    buttonListOptions[ButtonList_.SelectedButtonClass] = constant.CategorySelected;
    buttonListOptions[ButtonList_.ButtonOptions] = [
      {'text': 'Issue', 'value': 'is'},
      {'text': 'Information', 'value': 'in'}
    ];
    createAButtonList(buttonListOptions);
    
    
    
    //create the form         X
    // set the action         X
    // create the textarea    X
    // create the button list X
    //add the counter
    // create the submit
    //   set click with the url
    //   set on submit through
    // create the cancel button
    //   fire off cancel function
    // create the history button
    //  show/hide history
    
  };
    
