goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.formBuilder');
goog.require('src.base.control.login.constant');
goog.require('src.base.helper.domCreation');
goog.require('src.site.validation.validationInterpreter.constant');


goog.provide('src.base.control.login');


/**
 @return {Array.<Object>} The list of rules for building a form.
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
 @param {string} postTo description.
 @param {?function} createADiv The method used  to create a
 div element.
 @param {?function} createFormDetails The function used to create
 the form rules for construction.
 @param {?function} initializeFormBuilder The function used to
 create the form.
 @param {?function} appendChild The function used to append
 elements to the parent container.
 @return {Object} The created control.
 @return {Object} The parent container.
 @export
 */
src.base.control.login.initialize =
  function(containerId, postTo, postSubmit, createADiv, createFormDetails,
           initializeFormBuilder, appendChild) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;
    
    createFormDetails = createFormDetails ?
      createFormDetails :
      src.base.control.login.createTheFormDetails;
    
    initializeFormBuilder = initializeFormBuilder ?
      initializeFormBuilder :
      src.base.control.formBuilder.initialize;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    
    /* START */
    
    var Constant_ = src.base.control.login.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var Current_ = src.base.control.login;
    
    
    var containerAttributes = {};
    containerAttributes[ControlConstant_.Id] = containerId;
    containerAttributes[ControlConstant_.Class] = containerId;
    var container = createADiv(containerAttributes);
    
    
    var form = initializeFormBuilder(Constant_.IdForm,
                                     postTo,
                                     createFormDetails(),
                                     postSubmit);
    appendChild(container, form);


    return container;
  };
