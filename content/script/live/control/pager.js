goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
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
 @export
 */
src.base.control.pager.CopyOptions = 'copyOptions';


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
src.base.control.pager.PagerClass = 'pagerPagerClass';


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
src.base.control.pager.ParametersPage = 'Page';


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
 @param {Object} options The options that are used to construct the pager.
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
 @protected
 */
src.base.control.pager.createAndAppendPagerButton =
  function(isPrevious, options, result,
           containerRow, findNode, createADiv,
           setTextContent, toggleEnabledOnAButton,
           removeAllEvents, swap, setClick,
           appendChild) {
    
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
    
    var resultKey = isPrevious ?
          current.ResultPreviousPage :
          current.ResultNextPage;
    
    var currentOptions = options[current.CopyOptions](options, result[resultKey]);
    
    var currentPage = options[current.Parameters][current.ParametersPage];
    var totalCountOfPages = result[current.TotalCountOfPages];
    toggleEnabledOnAButton(button, isPrevious, currentPage, totalCountOfPages, swap);
    
    removeAllEvents(button);
    
    setClick(button, function() {
      options[current.Refresh](currentOptions);
    });
  };



/**
 @param {Object} result The result returned from the server.
 @param {Object} options The options that are used to construct the grid.
 @param {?Object} pagerControl The possibly already existing pager control.
 @param {?function} createAndAppendPagerButton The function used to create
 the next, and previous page buttons.
 @param {?function} createADiv The function used to create a div.
 @param {?function} appendChild The method used to append a child to a
 @return {Object} The created pager.
 @protected
 */
src.base.control.pager.initialize =
  function(result, options, pagerControl,
           createAndAppendPagerButton, createADiv) {
    
    
    createAndAppendPagerButton = createAndAppendPagerButton ?
      createAndAppendPagerButton :
      src.base.control.pager.createAndAppendPagerButton;
    
    
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    
    var Current_ = src.base.control.pager;
    
    var container = pagerControl ?
          pagerControl :
          createADiv({
            'id': options[Current_.ContainerId],
            'class': options[Current_.ContainerClass]
          });
    
    createAndAppendPagerButton(true,
                               options,
                               result,
                               container,
                               goog.dom.findNode,
                               createADiv,
                               goog.dom.setTextContent,
                               src.base.control.pager.toggleEnabledOnAButton,
                               goog.events.removeAll,
                               goog.dom.classes.swap,
                               src.base.helper.events.setClick,
                               goog.dom.appendChild);
    
    createAndAppendPagerButton(false,
                               options,
                               result,
                               container,
                               goog.dom.findNode,
                               createADiv,
                               goog.dom.setTextContent,
                               src.base.control.pager.toggleEnabledOnAButton,
                               goog.events.removeAll,
                               goog.dom.classes.swap,
                               src.base.helper.events.setClick,
                               goog.dom.appendChild);
    
    return container;
    
  };

//REFRESH
//refresh(result, options, rowContainer)
//  createPagers(result, options, rowContainer)

// result, options, parentContainer, findNode,
// createADiv, appendChild, removeAllEvents,
// swap, setClick, setTextContent, copyOptions


//options[refresh] = function(options) {
//  src.base.control.pager.refresh(options, createdContainer);
//}
//var pager = pager.initialize(result, options, createdContainer);
//appendChild(createdContainer, pager);



//refresh(containerId, result, options)
// var containerRow = findNode(parentContainer, function(item) {
//   return item['className'] === current.ButtonRowClass;
// });

// var didNotExist = !containerRow;

// if (didNotExist) {
//   containerRow = createADiv({'class': current.ButtonRowClass});
// }
