goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder');
goog.require('src.base.control.login.constant');
goog.require('src.base.helper.domCreation');
goog.require('src.site.validation.validationInterpreter.constant');


goog.provide('src.base.control.login');


/**
 @protected
 */
src.base.control.login.createTheFormDetails =
  function() {
    
    var Constant_ = src.base.control.login.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var ValidationConstant_ = src.site.validation.validationInterpreter.constant;
    
    var username = {};
    username[ControlConstant_.Type] = ControlConstant_.Text;
    username[ControlConstant_.Id] = Constant_.IdUsername;
    username[ControlConstant_.Class] = Constant_.ClassTextbox;
    username[ControlConstant_.Label] = Constant_.LabelUsername;
    
    username[ValidationConstant_.Validation] = [[ValidationConstant_.IsNotEmpty,
                                                Constant_.EmptyUsername]];
    
    var password = {};
    password[ControlConstant_.Type] = ControlConstant_.Text;
    password[ControlConstant_.Id] = Constant_.IdPassword;
    password[ControlConstant_.Class] = Constant_.ClassTextbox;
    password[ControlConstant_.Label] = Constant_.LabelPassword;
    
    password[ValidationConstant_.Validation] = [[ValidationConstant_.IsNotEmpty,
                                                 Constant_.EmptyPassword]];
    
    return [username, password];
  };


/**
 @param {string} containerId The id for the overall container.
 @param {?function} createADiv The method used  to create a 
 div element.
 @return {Object} The created control.
 @export
 */
src.base.control.login.initialize = 
  function(containerId, postTo, createADiv, initializeFormBuilder,
           createFormDetails, appendChild) {
    
    createADiv = createADiv ? 
      createADiv : 
      src.base.helper.domCreation.div;
    
    initializeFormBuilder = initializeFormBuilder ? 
      initializeFormBuilder : 
      src.base.control.formBuilder.initialize;
    
    createFormDetails = createFormDetails ? 
      createFormDetails : 
      src.base.control.login.createTheFormDetails;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    
    /* START */
    
    var Constant_ = src.base.control.login.Constant_;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_  = src.base.control.login;
    
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    // var result = src.base.control.formBuilder.initialize(
    //  'formContainer',
    //  '/formbuilderpost/', 
    //  specs
    // );
    // // document.getElementById('mainContainer').appendChild(result);)]
    
    
    return container;
  };
