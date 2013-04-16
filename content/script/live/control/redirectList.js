goog.require('goog.array');
goog.provide('src.base.control.redirectList');


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ButtonId = 'ButtonId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ButtonList = 'ButtonList';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ButtonText = 'ButtonText';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ContainerClass = 'ContainerClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.ContainerId = 'ContainerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.For = 'For';


/**
 @const
 @type {string}
 @export
 */
src.base.control.redirectList.Goto = 'Goto';



/**
 @param {Object} options The collection of options to build the customize the control.
 @param {?function(Object, Object) : Object} createADiv The method used to create a div element.
 @param {?function(Object, Object) : Object} createAButton The method used to create a button.
 @return {Object} The control.
 @export
 */
src.base.control.redirectList.initialize = function(options, createADiv, createAButton) {
    var Current = src.base.control.redirectList;
    
    //createADiv
    var container = createADiv({'id': options[Current.ContainerId], 'class': options[Current.ContainerClass]});
    
    goog.array.map(options[Current.ButtonList], function(currentItem){
        var attributes = {};
        
        attributes['id'] = currentItem[Current.ButtonId];
        attributes['value'] = currentItem[Current.ButtonText];
        
        return createAButton(attributes);
    });
    
    return container;
};
