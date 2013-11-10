goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall.constant');
goog.require('src.base.helper.domCreation');


goog.provide('src.base.control.wall');


/**
 @param {string} containerId The id for the overall container.
 @param {string} postTo The url the form will post to.
 @param {?function} createADiv The method used  to create a 
 div element.
 @param {?function} createTheForm The function used to create
 the inner form.
 @param {?function} initializeTheForm The fuction used to set up
 the created form.
 @return {Object} The created control.
 @export
 */
src.base.control.wall.initialize = 
  function(containerId, postTo, subjectId, createADiv,
           createTheForm, initializeTheForm) {
    
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    createTheForm = createTheForm ? 
      createTheForm : 
      src.base.control.wall.form.create;
    
    initializeTheForm = initializeTheForm ? 
      initializeTheForm : 
      src.base.control.wall.form.initialize;
    
    
    /* START */
    
    var Constant_ = src.base.control.wall.Constant_;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.wall;
    
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    var entryForm = createTheForm(postTo,
                                  subjectId);
    // initializeTheForm(entryForm,
    //                   onSubmit);
    
    return container;
  };


//form
//  text  button

//grid builder
//  refesh on form submit
