goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall.constant');

goog.provide('src.base.control.wall.form');


///  setOnSubmit

/**
 @param {string} postTo The url to post the form data to.
 @param {?function} createAForm The function used to create the
 container form.
 @param {?function} createATextbox The function used to add the
 comment textbox.
 @param {?function} createAButton The function used to create
 the submit button.
 @param {?function} appendChild The function used to add the
 elements to the form.
 @protected
 */
src.base.control.wall.form.create =
  function(postTo, createAForm, createATextbox,
           createAButton, appendChild) {
    
    createAForm = createAForm ? 
      createAForm : 
      src.base.helper.domCreation.form;
    
    createAButton = createAButton ? 
      createAButton : 
      src.base.helper.domCreation.textbox;
    
    createAButton = createAButton ? 
      createAButton : 
      src.base.helper.domCreation.button;
     
    appendChild = appendChild ? 
      appendChild : 
      goog.dom.appendChild;
    
    /* START */
    
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    
    var entryFormAttributes = {};
    entryFormAttributes[ControlConstant_.Id] = Constant_.EntryForm;
    entryFormAttributes[ControlConstant_.Class] = Constant_.EntryForm;
    entryFormAttributes[ControlConstant_.Method] = ControlConstant_.Post;
    entryFormAttributes[ControlConstant_.Action] = postTo;
    var entryForm = createAForm(entryFormAttributes);
    
    var entryTextBoxAttributes = {};
    entryTextBoxAttributes[ControlConstant_.Class] = Constant_.EntryTextbox;
    entryTextBoxAttributes[ControlConstant_.Id] = Constant_.EntryTextbox;
    entryTextBoxAttributes[ControlConstant_.Name] = Constant_.EntryTextbox;
    var textEntry = createATextbox(entryTextBoxAttributes);
    
    
    var entrySubmitAttributes = {};
    entrySubmitAttributes[ControlConstant_.Class] = Constant_.EntrySubmit;
    entrySubmitAttributes[ControlConstant_.Id] = Constant_.EntrySubmit;
    entrySubmitAttributes[ControlConstant_.Type] = ControlConstant_.Button;
    var submitEntry = createAButton(entrySubmitAttributes,
                                    Constant_.EntrySubmitText);
    
    appendChild(entryForm,
                textEntry);
    
    appendChild(entryForm,
                submitEntry);

    return entryForm;
    
  };
