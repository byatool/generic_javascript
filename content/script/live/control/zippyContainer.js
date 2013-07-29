goog.require('goog.dom');
goog.require('goog.ui.Zippy');
goog.provide('src.base.control.zippyContainer');

/**
 @const
 @type {string}
 @export
 */
src.base.control.zippyContainer.ContainerId = 'containerId';


/**
 @const
 @type {string}
 @export
 */
src.base.control.zippyContainer.HeaderClass = 'zippyContainerHeaderClass';


/**
 @const
 @type {string}
 @export
 */
src.base.control.zippyContainer.HeaderText = 'headerText';


/**
 @const
 @type {string}
 @export
 */
src.base.control.zippyContainer.Title = 'title';


/**
 @param {Array} options The needed options to build the form.
 @param {Object} toHold The element to add to the show/hide container.
 @param {?function} createADiv The method used to create a div element.
 @param {?function} appendChild The function used to add the grid to the
 parent container.
 @param {?function} setTextContent The functin used to set the visible
 text of a container element.
 @param {?function} createAZippy The function used to create the zippy.
  @return {Object} The created control.
 @export
 */
src.base.control.zippyContainer.initialize =
  function(options, toHold, createADiv, appendChild, setTextContent, createAZippy) {
    
    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    createAZippy = createAZippy ? createAZippy : goog.ui.Zippy;
    setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
    
  // <div class="transactionHistory">
  // <div>
  // <div id="transactionHistoryTopTitle" class="transactionHistoryTopTitle">Current Day Transactions</div>
  // <div id="transactionHistoryExpand" class="transactionHistoryExpand"></div>
  // <div class="clearBoth"></div>
  // </div>
  // <div id="transactionHistoryContainer" class="transactionHistoryContainer"></div>
  // </div>
    
  // transactionHistoryTopTitle
  // transactionHistoryExpand
  // clearBoth
    
  // options[Current_.Title] -> header
  //
  //div container
  //  div header
  //    div title  div zippyButton
  //    div showHideContainer
  //      div toHold
    
    var Current_ = src.base.control.zippyContainer;
    
    var container = createADiv(
      {'id': options[Current_.ContainerId],
       'class': options[Current_.ContainerId]});
    
    var header = createADiv({'class': Current_.HeaderClass});

    //create the text div
    //  set the header text
    //create the button div

    //add both to the header.
    
    //create the content div
    //  add the passed in element

    //create the zippy
    
    // var title = createADiv({'id': options[Current_.Title]});
    
    //appendChild(container, header);
    
    //new goog.ui.Zippy('transactionHistoryExpand', 'transactionHistoryContainer');
    return container;
};

