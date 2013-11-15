goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.formBuilder');


/**
 @param {Object} controlSpec The various control specifications.
 @param {function} createADiv The function used to create divs.
 @param {function} createALabel The function used to create a
 label.
 @param {function} createATextbox The function used to create a
 textbox.
 @param {function} appendChild The function used to append all
 created elements to a parent element.
 @param {function} createAClearDiv The function used to create
 a clear:both div.
 @return {Object} The created control.
 @protected
 */
src.base.control.formBuilder.createControl =
  function(controlSpec, createADiv, createALabel,
           createATextbox, appendChild, createAClearDiv){
    
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    
    var formRowAttributes = {};
    formRowAttributes[ControlConstant_.Class] = Constant_.FormRowContainer;
    formRowAttributes[ControlConstant_.Id] = Constant_.FormRowContainer;
    var formRow = createADiv(formRowAttributes);
    
    var formRowLabelAttributes = {};
    formRowLabelAttributes[ControlConstant_.Class] = Constant_.FormRowLabel;
    var formRowLabel = createALabel(formRowLabelAttributes,
                                    controlSpec[Constant_.LabelText]);
    
    
    var element = {};
    
    switch(controlSpec[ControlConstant_.Type]) {
    case Constant_.Textbox:
      
      var textboxAttributes = {};
      textboxAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
      textboxAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
      textboxAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
      element = createATextbox(textboxAttributes);
      
      break;
    default:
      
      textboxAttributes = {};
      textboxAttributes[ControlConstant_.Class] = controlSpec[ControlConstant_.Class];
      textboxAttributes[ControlConstant_.Id] = controlSpec[ControlConstant_.Id];
      textboxAttributes[ControlConstant_.Name] = controlSpec[ControlConstant_.Id];
      element = createATextbox(textboxAttributes);
      
      break;
    }
    
    appendChild(formRow,
                formRowLabel);
    
    appendChild(formRow,
                element);
     
    appendChild(formRow,
                createAClearDiv());
    
    return formRow;
  };

/*
 
 - foreach in options[items]
 -  attributes[Id] = item[Id]
 -  attributes[Class] = item[Class]
 -- var element 
 --   case item[type] === 'div'
 --     var div = createADiv(attributes)
 --     setTextContent(div, item[text])
 --     div
 --   case item[type] === 'clear'
 --     createClearDiv(attributes)
 
 --  createAButton(FormComponentConstant_.ButtonClass,
 --                options[ButtonText])
 --  
 */

/**
 @param {string} containerId The id for the overall container.
 @param {string} postTo The url for the form to post to.
 @param {Object} controlSpecs The list representation of the 
 needed inputs.
 @param {?function} forEach The function used to loop through
 the controls, and create elements.
 @param {?function} createAForm The function used to create
 the form.
 @param {?function} createADiv The function used  to create a 
 div element.
 @param {?function} createAClearDiv The function used to
 create clear:both divs.
 @return {Object} The created control.
 @export
 */
src.base.control.formBuilder.initialize =
  function(containerId, postTo, controlSpecs, createAForm, forEach,
           createADiv, createControl, appendChild) {
    
    createAForm = createAForm ? 
      createAForm : 
      src.base.helper.domCreation.form;
    
    forEach = forEach ?
      forEach :
      goog.array.forEach;
    
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    createControl = createControl ? 
      createControl : 
      src.base.control.formBuilder.createControl;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    
    /* START */
    
    var Constant_ = src.base.control.formBuilder.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.formBuilder;
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    var formAttributes = {};
    formAttributes[ControlConstant_.Action] = postTo;
    formAttributes[ControlConstant_.Class] = Constant_.FormId;
    formAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    formAttributes[ControlConstant_.Id] = Constant_.FormId;
    var form = createAForm(formAttributes);
    
    forEach(controlSpecs, function(control) {
      var element = createControl(control,
                                  createADiv,
                                  src.base.helper.domCreation.label,
                                  src.base.helper.domCreation.textbox,
                                  appendChild,
                                  src.base.helper.domCreation.createAClearDiv);
      
      appendChild(form,
                  element);
    });
    
    appendChild(container,
                form);
    
    return container;
  };

/*
 - [controlSpecs:
 -  {type: 'text', id: 'username', class: 'textInput', label: 'Username:'}
 -  {type: 'select, default: 'choose', url: 'retrieveUserNames'}
 - ]
 */
