goog.require('goog.dom');
goog.require('goog.dom.a11y');
goog.require('goog.dom.classes');
goog.require('goog.ui.IdGenerator');
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.Remote');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.autocomplete');


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.HiddenId = 'hiddenId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.LabelId = 'autocompleteLabel';

/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.TextboxId = 'autocompleteTextbox';


/**
 @const
 @type {string}
 @export
 */
src.base.control.autocomplete.Url = 'Url';


/**
 @export
 */
src.base.control.autocomplete.tempAutocomplete = function(textboxName, hiddenName, url) {
    var Div = src.base.helper.domCreation.div;
    var Hidden = src.base.helper.domCreation.hidden;
    var input = goog.dom.getElement(textboxName);
    var ac = new goog.ui.ac.Remote(url, input);
    //The main reason for writing renderer enhancement was the use of objects being returned for the
    //  autocomplete to create rows in the selection area.  For this example the return type is
    //  an array of {Id, Name}.  The idea was to have it display the name for each item,
    //  and set a hidden value with the Id when something was selected.
    
    
    //The renderer is in charge of how the rows should look in the selection area.
    var renderer = ac.getRenderer();
    
    //Basically reassigning the original funtion with a new function that uses
    //  the code of the original, but with modifications.
    //The idea with this example is to create a row with not only a Name, but a
    //  hidden input that will hold an ID associated with the Name.
    renderer.renderRowContents_ = function(row, token, node) {
        var createdDiv = Div({}, row['data']['Name']);
        node.innerHTML = goog.dom.getOuterHtml(createdDiv);
    };
    
    
    //The inputHandler is in charge of what to do with an item when it has been selected.
    //  In this case, the value set to the textbox.
    var inputHandler = ac.getInputHandler();
    
    //Like the renderRowHtml method above, this reassigning the function
    //  tasked with taking a selected item, and updating the attached textbox.
    //One good note: the "selectedItem" isn't the actual selected row html, but
    //  the original object that was returned from the server.  This means that
    //  selectedRow = {Id: '1', Name: 'Fred'}. This was a nice surprise.
    inputHandler.selectRow = function(selectedItem, opt_multi) {
        //This is used to set the hidden value's... value whenever
        //  and item is selected.
        var hidden = goog.dom.getElement(hiddenName);
        goog.dom.forms.setValue(hidden, selectedItem['Id']);
        
        
        //This is the original code other than the
        //  selectedItem['Name'] value retrieval.
        this.setTokenText(selectedItem['Name']);
        return false;
    };
    
    ac.setMethod('POST');
};

//    ;
//  renderer.renderRowContents_ =
//   function(row, token, node) {
//     var createdDiv = Div({}, row['data']['Name']);
//     node.innerHTML = goog.dom.getOuterHtml(createdDiv);
// };

/**
 @param {Object} renderer the renderer attached to the autocomplete.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {function(Object) : string} getOuterHtml The method used to get the hmtl from an element object.
 @export
 */
src.base.control.autocomplete.setRenderRowContents = function(renderer, createADiv, getOuterHtml)  {
    renderer.renderRowContents_ = function(row, token, node) {
        var createdDiv = createADiv({}, row['data']['Name']);
        node.innerHTML = getOuterHtml(createdDiv);
    };
};

/**
 @param {Object} options The is the set of options for building.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createATextbox The method used to create a textbox.
 @param {?function(Object, Object)} appendChild The method used to append a child to a parent element.
 @param {?function(Object) : Object} createAHidden The method used to create a hidden input.
 @param {?function(string, Object) : Object} createAnAutocomplete The method used to create an autocomplete
 control.
 @param {?function(Object, function, function} setRenderRowContents Method used to replace the
 renderRowContents_ method on a renderer.
 @param {?function(string, Object) : Object} getTheRenderer The method used facade the autocomplete.getRenderer
 method.
 @return {Object} The created autocomplete element.
 @export
 */
src.base.control.autocomplete.initialize = function(options, createADiv, createATextbox, appendChild, createAHidden, createAnAutocomplete, setRenderRowContents, getTheRenderer) {
    var Current = src.base.control.autocomplete;
    
    var parentContainer = createADiv({'id': options[Current.ContainerId]});
    var textbox = createATextbox({'id': Current.TextboxId});
    appendChild(parentContainer, textbox);
    
    var hidden = createAHidden({'id': Current.HiddenId});
    appendChild(parentContainer, hidden);
    
    var autocomplete = createAnAutocomplete(options[Current.Url], textbox);
    var renderer = getTheRenderer(autocomplete);

    setRenderRowContents(renderer, createADiv, goog.dom.getOuterHtml);
    
    //inputHandler.selectRow = function(selectedItem, opt_multi)
    //renderer.renderRowHtml = function(row, token)
    //var ac = new goog.ui.ac.Remote(url, input);
    
    return parentContainer;
};
