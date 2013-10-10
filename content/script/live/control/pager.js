goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.object');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.events');


goog.provide('src.base.control.pager');

/**
 @const
 @type {string}
 @export
 */
src.base.control.pager.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.pager.ContainerClass = 'containerClass';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.DisabledPagerClass = 'pagerDisabledClass';

/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.NextButton = 'next';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.NumberPagerContainerClass = 'pagerNumberPagerContainerClass';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.PagerClass = 'pagerEnabledClass';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.Parameters = 'parameters';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.ParametersPage = 'page';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.TotalCountOfPages = 'TotalCountOfPages';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.PreviousButton = 'previous';


/**
 @const
 @type {string}
 @export
 */
src.base.control.pager.Refresh = 'refresh';


/**
  @const
  @type {string}
  @protected
  */
src.base.control.pager.ResultNextPage = 'NextPage';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.pager.ResultPreviousPage = 'PreviousPage';




/**
 @param {Object} options The options for the overall pager.
 @param {integer} newPageNumber The page number for the new
 options.
 @param {function} clone The function used to make non
 reference based copies.
 @return {Object} The new options with the new page number.
 @protected
 */
src.base.control.pager.cloneOptions = function(options, newPageNumber, clone) {

  var current = src.base.control.pager;

  var updatedOptions = {};
  updatedOptions = clone(options);
  updatedOptions[current.Parameters] = clone(options[current.Parameters]);
  updatedOptions[current.Parameters][current.ParametersPage] = newPageNumber;

  return updatedOptions;
};


/**
 @param {Object} button The button to toggle the class of.
 @param {boolean} isPrevious Whether the button represents
 the previous page or the next page.
 @param {integer} pageNumber The page number for the button.
 @param {integer} totalCountOfPages The absolute number of
 possible pages..
 @param {function} swap The function used to toggle the
 class.
 @protected
 */
src.base.control.pager.toggleEnabledOnAButton =
  function(button, isPrevious, pageNumber, totalCountOfPages, swap) {
    var current = src.base.control.pager;

    if (isPrevious) {
      if (pageNumber === 0) {
        swap(button, current.PagerClass, current.DisabledPagerClass);
      }
      else {
        swap(button, current.DisabledPagerClass, current.PagerClass);
      }
    }

    if (!isPrevious) {
      if (totalCountOfPages === 0 || pageNumber === totalCountOfPages - 1) {
        swap(button, current.PagerClass, current.DisabledPagerClass);
      }
      else {
        swap(button, current.DisabledPagerClass, current.PagerClass);
      }
    }
  };


/**
 @param {boolean} isPrevious Whether the button is used to go back a page,
 or forward.
 @param {Object} options The options have been passed through by the
 parent control.
 @param {Object} pagerOptions The options that are used to construct
 the pager.
 @param {Object} result The result returned from the server.
 @param {Object} containerRow The row that will hold the pager buttons.
 @param {function} findNode The function used to find the pager buttons
 if they exist.
 @param {function} createADiv The function used to create a div.
 @param {function} setTextContent The function used to set a div's text.
 @param {function} toggleEnabledOnAButton The function used to disable,
 or enable,
 the pager buttons.
 @param {function} removeAllEvents The function used to strip the pager
 buttons of any prior event hooks.
 @param {function} swap The function used to set or remove the disabled
 class.
 @param {function} setClick The function used to set the click event
 for the pagers.
 @param {function} appendChild The method used to append a child to a
 parent element.
 @param {function} clone The function used to clone the options so
 that the page number can be updated.
 @param {function} cloneOptions The function used to correctly
 clone the options, and update the page number.
 @protected
 */
src.base.control.pager.createAndAppendPagerButton =
  function(isPrevious, options, pagerOptions,
           result, containerRow, findNode,
           createADiv, setTextContent,
           toggleEnabledOnAButton, removeAllEvents,
           swap, setClick, appendChild,
           clone, cloneOptions) {
    
    //TODO Remove the injection of clone, and clone options
    var current = src.base.control.pager;
    
    var buttonId = isPrevious ? current.PreviousButton : current.NextButton;
    var button = findNode(containerRow,
                          function(item) {
                            return item['id'] === buttonId;
                          });
    
    if (!button) {
      button = createADiv({'id': buttonId, 'class': current.PagerClass});
      setTextContent(button, isPrevious ? '<' : '>');
      appendChild(containerRow, button);
    }
    
    var currentPage = options[current.Parameters][current.ParametersPage];
    var totalCountOfPages = result[current.TotalCountOfPages];
    toggleEnabledOnAButton(button, isPrevious, currentPage,
                           totalCountOfPages, swap);
    
    removeAllEvents(button);
    
    var resultKey = isPrevious ?
          current.ResultPreviousPage :
          current.ResultNextPage;
    
    setClick(button, function() {
      pagerOptions[current.Refresh](result[resultKey]);
    });
  };



/**
 @param {integer} id The id for the pager button.
 @param {Object} options The options have been passed through by the
 parent control.
 @param {Object} pagerOptions The options that are used to construct
 the pager.
 @param {Object} pagerContainer The parent pager.
 @param {function} findNode The fuction used to find an
 existing pager button by id.
 @param {functino} removeAllEvents The function used to
 remove all events from an existing pager button.
 @param {function} clone The function used to create
 a new option object, and update the page.
 @param {function} cloneOptions The function used to correctly
 clone the options, and update the page number.
 @param {function} createADiv The function used to create
 the button if it didn't exist.
 @param {function} appendChild The function used to add a new button
 to the button container.
 @param {function} setTextContent The function to set the
 text of a new pager button.
 @param {function} swap The function used to enable, or
 disable the created button.
 @param {function} setClick The function used to set the click
 event for a button.
 @protected
 */
src.base.control.pager.createAPagerNumberButton =
  function(id, options, pagerOptions,
           pagerContainer, findNode, removeAllEvents,
           clone, cloneOptions, createADiv, appendChild,
           setTextContent, swap, setClick) {

    //TODO Remove the injection of clone, and clone options
    
    var current = src.base.control.pager;
    
    var button = findNode(pagerContainer, function(item) {
      return Number(item['id']) === id;
    });
    
    if (button != null && button != undefined) {
      removeAllEvents(button);
    } else {
      button = createADiv({'id': id, 'class': current.PagerClass});
      setTextContent(button, id + 1);
      appendChild(pagerContainer, button);
    }
    
    if (options[current.Parameters][current.ParametersPage] === id) {
      swap(button, current.PagerClass, current.DisabledPagerClass);
    }
    else {
      swap(button, current.DisabledPagerClass, current.PagerClass);
    }
    
    setClick(button, function() {
      pagerOptions[current.Refresh](id);
    });
  };




/**
 @param {Object} result that contains the page
 info.
 @param {Object} options The options from the pager
 owner.
 @param {Object} pagerOptions The options for the pager.
 @param {Object} pagerContainer The parent pager.
 @param {function} findNode The function used to find
 an existing number pager container.
 @param {function} createADiv The function used to create
 the number pager container if it does not exist.
 @param {function} appendChild The function used to add
 the container to the pager parent if it does not exist.
 @param {function} findNodes The function used to find
 existing page number buttons.
 @param {function} forEach The function used to go through
 a list of items.
 @param {function} removeNode The function used to remove
 existing page number buttons.
 @param {function} createAPagerNumberButton The function
 used to create a button for every page.
 @param {function} createAClearDiv The function used to
 create a clear div that will follow all the number
 buttons.
 @protected
 */
src.base.control.pager.createAPageNumberContainer =
  function(result, options, pagerOptions,
           pagerContainer, findNode, createADiv,
           appendChild, findNodes, forEach,
           removeNode, createAPagerNumberButton,
           createAClearDiv) {
    
    
    var current = src.base.control.pager;
    
    var buttonContainer = findNode(pagerContainer, function(item) {
      return item['className'] === current.NumberPagerContainerClass;
    });
    
    if (buttonContainer === null || buttonContainer === undefined) {
      buttonContainer = createADiv({'class': current.NumberPagerContainerClass});
      appendChild(pagerContainer, buttonContainer);
    }
    
    var totalCountOfPages = result[current.TotalCountOfPages];
    var deadNodes = findNodes(buttonContainer, function(item) {
      return Number(item['id']) > (totalCountOfPages - 1);
    });
    
    forEach(deadNodes, function(node) {
      removeNode(node);
    });
    
    for (var i = 0; i < totalCountOfPages; i++) {
      createAPagerNumberButton(i,
                               options,
                               pagerOptions,
                               buttonContainer,
                               findNode,
                               goog.events.removeAll,
                               goog.object.clone,
                               src.base.control.pager.cloneOptions,
                               createADiv,
                               appendChild,
                               goog.dom.setTextContent,
                               goog.dom.classes.swap,
                               src.base.helper.events.setClick);
    }

    var clearDiv = findNode(buttonContainer, function(item) {
      return item['class'] === 'clearBoth';
    });

    removeNode(clearDiv);
    clearDiv = createAClearDiv();
    appendChild(buttonContainer, clearDiv);
  };


/**
 @param {Object} result The result returned from the server.
 @param {Object} options The options that are used by the
 parent containers.
 @param {Object} pagerOptions The options for building
 the pager.
 @param {?Object} pagerControl The possibly already existing
 pager control.
 @param {?function} createAndAppendPagerButton The function used
 to create the next, and previous page buttons.
 @param {?function} createAPageNumberContainer The function used
 to update, or create the page number buttons.
 @param {?function} createADiv The function used to create a div.
 @param {?function} getElementByClass The function that will
 be used to check if the parent container has a clear div.
 @param {?function} removeNode The function used to remove
 an existing clearBoth div.
 @param {?function} createAClearDiv The function used to
 create a clear div to follow the pager buttons.
 @param {?function} appendChild The function used to add
 the clear div, and to be used when creating the pager
 buttons.
 @return {Object} The created pager.
 @export
 */
src.base.control.pager.initialize =
  function(result, options, pagerOptions,
           pagerControl, createAndAppendPagerButton,
           createAPageNumberContainer, createADiv,
           getElementByClass, removeNode, createAClearDiv,
           appendChild) {


    /* Method Intialization */
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;

    createAClearDiv = createAClearDiv ?
      createAClearDiv :
      src.base.helper.domCreation.createAClearDiv;

    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    createAndAppendPagerButton = createAndAppendPagerButton ?
      createAndAppendPagerButton :
      src.base.control.pager.createAndAppendPagerButton;

    createAPageNumberContainer = createAPageNumberContainer ?
      createAPageNumberContainer :
      src.base.control.pager.createAPageNumberContainer;

    getElementByClass = getElementByClass ?
      getElementByClass :
      goog.dom.getElementByClass;
    
    removeNode = removeNode ?
      removeNode :
      goog.dom.removeNode;
    
    /*  */
    var Current_ = src.base.control.pager;
    
    var container = pagerControl ?
          pagerControl :
          createADiv({
            'id': pagerOptions[Current_.ContainerId],
            'class': pagerOptions[Current_.ContainerClass]
          });
    
    createAndAppendPagerButton(true,
                               options,
                               pagerOptions,
                               result,
                               container,
                               goog.dom.findNode,
                               createADiv,
                               goog.dom.setTextContent,
                               src.base.control.pager.toggleEnabledOnAButton,
                               goog.events.removeAll,
                               goog.dom.classes.swap,
                               src.base.helper.events.setClick,
                               appendChild,
                               goog.object.clone,
                               src.base.control.pager.cloneOptions);
    
    
    createAPageNumberContainer(result,
                               options,
                               pagerOptions,
                               container,
                               goog.dom.findNode,
                               createADiv,
                               appendChild,
                               goog.dom.findNodes,
                               goog.array.forEach,
                               removeNode,
                               src.base.control.pager.createAPagerNumberButton,
                               createAClearDiv);


    createAndAppendPagerButton(false,
                               options,
                               pagerOptions,
                               result,
                               container,
                               goog.dom.findNode,
                               createADiv,
                               goog.dom.setTextContent,
                               src.base.control.pager.toggleEnabledOnAButton,
                               goog.events.removeAll,
                               goog.dom.classes.swap,
                               src.base.helper.events.setClick,
                               appendChild,
                               goog.object.clone,
                               src.base.control.pager.cloneOptions);

    var clearDiv = getElementByClass('clearBoth', container);
    removeNode(clearDiv);

    clearDiv = createAClearDiv();

    appendChild(container, clearDiv);

    return container;
  };
