goog.require('goog.dom.forms');
goog.require('src.base.control.buttonList');
goog.require('src.base.control.feedback.constant');
goog.require('src.base.control.formComponent');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');
goog.require('src.base.helper.googleWrapper');
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
 @param {?function} createALabelInput The function used to
 add the watermark text to the comment text area.
 @param {?function} createACharCounter The function used
 to create the character counter.
 @param {?function} createAButtonList The function used to
 create the category choices for the comment.
 @param {?function} createAButton The function used to create
 the various buttons.
 @param {?function} formInitialize The function used to
 initialize the created form.
 @param {?function} setClick The function used to set the
 click handler for the buttons.
  @param {?function} setValue The function used to reset the
 form values.
 @param {?function} createAClearDiv The function used to
 create a clear div for the button menu bar.
 @param {?function} appendChild The function used to add
 all the created elemets to the form.
 @param {?function} setTextContent The function used to
 set the text of the characters left label.
 @return {Object} The created control.
 @export
 */
src.base.control.feedback.form.create =
  function(submitUrl, refreshHistory, createADiv, createAForm,
           createATextArea, createALabelInput, createACharCounter,
           createAButtonList, createAButton, formInitialize,
           setClick, setValue, createAClearDiv, appendChild,
           setTextContent) {
    
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
      src.base.helper.googleWrapper.createALabelInput;

    createACharCounter = createACharCounter ?
      createACharCounter :
      src.base.helper.googleWrapper.charCounter;

    createAButtonList = createAButtonList ?
      createAButtonList :
      src.base.control.buttonList.createAButtonList;

    createAButton = createAButton ?
      createAButton :
      src.base.helper.domCreation.button;

    formInitialize = formInitialize ?
      formInitialize :
      src.base.control.feedback.form.initializeForm;

    setClick = setClick ?
      setClick :
      src.base.helper.events.setClick;

    setValue = setValue ?
      setValue :
      goog.dom.forms.setValue;

    createAClearDiv = createAClearDiv ?
      createAClearDiv :
      src.base.helper.domCreation.createAClearDiv;

    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    setTextContent = setTextContent ?
      setTextContent :
      goog.dom.setTextContent;


    //START

    var current = src.base.control.feedback.form;
    var constant = src.base.control.feedback.constant;
    var ButtonList_ = src.base.control.buttonList;
    var Form_ = src.base.control.formComponent;

    
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
      {'text': 'Issue', 'value': 'issue'},
      {'text': 'Comment', 'value': 'comment'},
      {'text': 'Concern', 'value': 'concern'}
    ];
    var categoryList = createAButtonList(buttonListOptions);
    
    
    // CHARACTER COUNTER
    
    var characterCounter = createADiv({
      'class': constant.CharacterCounter
    });
    
    createACharCounter(textarea,
                       characterCounter,
                       constant.CommentLengthLimit);
    
    var postCounterTextContainer = createADiv({
      'class': constant.PostCounterTextContainer
    });
    
    setTextContent(postCounterTextContainer,
                   constant.PostCounterTextContainerText);
    
    
    //SUBMIT AND CANCEL
    
    var submitButton = createAButton({
      'type': 'button',
      'class': Form_.ButtonClass
    }, constant.SubmitButtonText);

    var cancelButton = createAButton({
      'type': 'button',
      'class': constant.CancelButton
    }, constant.CancelButtonText);



    var menuBar = createADiv({'class': constant.MenuBar});
    
    appendChild(menuBar, categoryList);
    appendChild(menuBar, characterCounter);
    appendChild(menuBar, postCounterTextContainer);
    appendChild(menuBar, submitButton);
    appendChild(menuBar, cancelButton);
    appendChild(menuBar, createAClearDiv());
    
    appendChild(form, textarea);
    appendChild(form, menuBar);


    // var validation = createAValidationWrapper(current.AdjustmentRules);
    // var datePickerInfo = {};
    
    // datePickerInfo[FormComponent_.DatepickerOptions] = {};
    // datePickerInfo[FormComponent_.DatepickerTextboxes] = [];

    // formInitialize(form,
    //                datePickerInfo,
    //                validation,
    //                false,
    //                null);

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

    return form;
  };

