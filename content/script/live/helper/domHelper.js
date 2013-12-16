goog.require('goog.Uri.QueryData');
goog.require('goog.array');
goog.require('goog.debug');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.dom.forms');
goog.require('goog.events');
goog.require('goog.json');
goog.require('goog.net.XhrIo');
goog.require('goog.structs');
goog.require('src.base.control.controlConstant');
goog.require('src.base.helper.googleWrapper');

goog.provide('src.base.helper.domHelper');


/* PRIVATE FUNCTIONS */

/**
 @param {Object} parameters The parameter map to create the
 parameter query string with.
 @param {function} toString The function used to turn the
 create from map result to a string.
 @param {function} createFromMap The function used to convert
 the parameters map.
 @return {string} The created query string parameters
 @private
 */
src.base.helper.domHelper.createParameterString_ =
  function(parameters, toString, createFromMap) {

    return parameters !== null && parameters !== undefined ?
      '?' + toString(createFromMap(parameters)) :
      '';
  };


/* PROTECTED FUNCTIONS */

/**
 @param {Object} element The created element.
 @param {Object} options The created element options.
 @return {Object} The control and options in the general
 container form.
 @protected
 */
src.base.helper.domHelper.createControlResult =
  function(element, options) {

    var ControlConstant_ = src.base.control.controlConstant;

    var result = {};

    result[ControlConstant_.CreatedControl] = element;
    result[ControlConstant_.CreatedOptions] = options;

    return result;
  };


/* EXPORTED FUNCTIONS */

/**
 @param {Object} button The button to update.
 @param {bool} enabled To disable the button or not.
 @param {?function} addRemove Used to add a class, and remove another.
 @export
 */
src.base.helper.domHelper.toBeEnabled =
  function(button, enabled, addRemove) {
    addRemove = addRemove ?
      addRemove :
      goog.dom.classes.addRemove;

    if (enabled) {
      button['disabled'] = undefined;
      addRemove(button, 'Disabled', null);
    } else {
      button['disabled'] = true;
      addRemove(button, null, 'Disabled');
    }
  };

/**
 @param {string} url The url to redirect to.
 @return {function} The function used to redirect.
 @export
 */
src.base.helper.domHelper.createRedirectHandler =
  function(url) {
    return function() {window.location = url; };
  };

/**
 @param {Object} form The form to reset.
 @param {?function} findNodes The function used to find elements of a type.
 @param {?function} getChildren The function used to get the select items.
 @param {?function} setValue The function used to reset a select.
 @export
 */
src.base.helper.domHelper.resetAForm =
  function(form, findNodes, getChildren, setValue) {
    findNodes = findNodes ?
      findNodes :
      goog.dom.findNodes;

    setValue = setValue ?
      setValue :
      goog.dom.forms.setValue;

    getChildren = getChildren ?
      getChildren :
      goog.dom.getChildren;

    var textBoxes = findNodes(form,
                              function(item) {
                                return item.nodeName === 'INPUT' &&
                                  item.type === 'text';
                              });

    goog.array.forEach(textBoxes,
                       function(item) {
                         setValue(item, '');
                       });

    var selects = findNodes(form,
                            function(item) {
                              return item.nodeName === 'SELECT';
                            });

    goog.array.forEach(selects, function(select) {
      var children = getChildren(select);
      setValue(select, children[0]);
    });
};

/**
 @param {!Object} parentDiv Parent element to check for child.
 @param {number} id Id of the child.
  @return {?Object} The found child.
 @export
 */
src.base.helper.domHelper.retrieveChildById = function(parentDiv, id) {

  var result =
        goog.array.filter(goog.dom.getChildren(parentDiv), function(item) {
          return item.id == id;
        });

  if (result.length > 1) {
    throw (new goog.debug.Error('Duplicate child found.'));
  }

  return result.length > 0 ? result[0] : null;
};


/**
 @param {Map} mapToCheck The datamap created by retrieveFormDataMap.
 @param {string} keyName This is the element name used to retrieve the data.
 @return {?Object} The value found in the datamap, or null if nothing is found.
 @export
 */
src.base.helper.domHelper.retrieveFormDataMap = function(mapToCheck, keyName) {
  return mapToCheck.get(keyName) ? mapToCheck.get(keyName)[0] : null;
};


/**
 This is not tested since it would be difficult without dependency setup.
 @param {Object} dataMap The form data.
 @param {function} successMethod Method to be called after submittal.
 @export
 */
src.base.helper.domHelper.submitData =
  function(dataMap, successMethod) {

    var request = new goog.net.XhrIo();

    goog.events.listen(request, 'complete', function(result) {
      successMethod(result.target.getResponseJson());
    });

    var data = goog.Uri.QueryData.createFromMap(dataMap);

    request.send(dataMap.action, 'POST', data.toString());
  };

/**
 @param {string} url The url to submit to.
 @param {Object} mainParameter The parameter that the get call
 is expecting to trail the url.
 @param {Object} parameters The optional parameters to send.
 @param {?function} successMethod The function to be called on
 successful return.
 @param {?function} createRequest The function used to create a
 xhrio request.
 @param {?function} listen The event setter.
 @param {?function} createFromMap The function used to turn
 @param {?function} toString The .toString wrapper function.
 the parameters into a data map.
 @export
 */
src.base.helper.domHelper.submitRestfulGet =
  function(url, mainParameter, parameters, successMethod,
           createRequest, listen, createFromMap, toString) {

    createRequest = createRequest ?
      createRequest :
      src.base.helper.googleWrapper.createRequest;

    listen = listen ?
      listen :
      goog.events.listen;

    createFromMap = createFromMap ?
      createFromMap :
      goog.Uri.QueryData.createFromMap;

    toString = toString ?
      toString :
      src.base.helper.googleWrapper.toString;


    /* Start */

    var Current_ = src.base.helper.domHelper;

    var request = createRequest();

    listen(request, 'complete', function(result) {
      successMethod(result.target.getResponseJson());
    });

    if (mainParameter !== null && mainParameter !== undefined) {
      url = url + '/' + mainParameter;
    }

    var queryItemString = Current_.createParameterString_(parameters,
                                                          toString,
                                                          createFromMap);

    request.send(url + queryItemString, 'GET');
  };



/**
 @param {string} url The url to submit to.
 @param {Array} parameters The parameters needed for the request.
 @param {function} successMethod The method to call on server result.
 @export
 */
src.base.helper.domHelper.submitToUrl =
  function(url, parameters, successMethod) {
    var request = new goog.net.XhrIo();

    goog.events.listen(request, 'complete', function(result) {
      successMethod(result.target.getResponseJson());
    });

    var data = goog.Uri.QueryData.createFromMap(parameters);

    request.send(url, 'POST', data.toString());
  };


/**
 @param {string} url The url to submit to.
 @param {Object} parameters The optional parameters to send.
 @param {?function} successMethod The function to be called on
 successful return.
 @param {?function} createRequest The function used to create a
 xhrio request.
 @param {?function} listen The event setter.
 @param {?function} createFromMap The function used to turn
 @param {?function} toString The .toString wrapper function.
 the parameters into a data map.
 @export
 */
src.base.helper.domHelper.submitToGetUrl =
  function(url, parameters, successMethod, createRequest,
           listen, createFromMap, toString) {

    createRequest = createRequest ?
      createRequest :
      src.base.helper.googleWrapper.createRequest;

    listen = listen ?
      listen :
      goog.events.listen;

    createFromMap = createFromMap ?
      createFromMap :
      goog.Uri.QueryData.createFromMap;

    toString = toString ?
      toString :
      src.base.helper.googleWrapper.toString;

    
    /* Start */

    var Current_ = src.base.helper.domHelper;
    
    var request = createRequest();
    
    listen(request, 'complete', function(result) {
      successMethod(result.target.getResponseJson());
    });
    
    var queryItemString = Current_.createParameterString_(parameters,
                                                          toString,
                                                          createFromMap);
    
    request.send(url + queryItemString, 'GET');
  };
