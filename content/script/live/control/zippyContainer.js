goog.require('goog.dom');
goog.require('goog.ui.Zippy');
goog.require('src.base.helper.domCreation');

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
 @protected
 */
src.base.control.zippyContainer.ContentContainerClass = 'zippyContentContainerClass';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.zippyContainer.HeaderClass = 'zippyContainerHeaderClass';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.zippyContainer.HeaderExpandClass = 'zippyContainerExpand';


/**
 @const
 @type {string}
 @protected
 */
src.base.control.zippyContainer.HeaderTitleClass = 'zippyContainerTitleClass';


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
 @param {?function} createAClearDiv The function used to create a div
 that is clear:both.
 @param {?function} zippy The zippy constructor.
 @return {Object} The created control.
 @export
 */
src.base.control.zippyContainer.initialize =
  function(options, toHold, createADiv, appendChild, setTextContent, createAClearDiv, zippy) {

    appendChild = appendChild ? appendChild : goog.dom.appendChild;
    createADiv = createADiv ? createADiv : src.base.helper.domCreation.div;
    zippy = zippy ? zippy : goog.ui.Zippy;
    setTextContent = setTextContent ? setTextContent : goog.dom.setTextContent;
    createAClearDiv = createAClearDiv ? createAClearDiv : src.base.helper.domCreation.createAClearDiv;

    var Current_ = src.base.control.zippyContainer;

    var container = createADiv({
      'id': options[Current_.ContainerId],
      'class': options[Current_.ContainerId]
    });

    var header = createADiv(
      {'class': Current_.HeaderClass}
    );

    var headerTitle = createADiv({
      'class': Current_.HeaderTitleClass
    });

    setTextContent(headerTitle, options[Current_.Title]);
    appendChild(header, headerTitle);

    var headerExpand = createADiv({
      'id': Current_.HeaderExpandClass,
      'class': Current_.HeaderExpandClass
    });
    appendChild(header, headerExpand);

    var clearDiv = createAClearDiv();
    appendChild(header, clearDiv);

    appendChild(container, header);

    var contentContainer = createADiv({
      'id': Current_.ContentContainerClass,
      'class': Current_.ContentContainerClass
    });
    appendChild(contentContainer, toHold);
    appendChild(container, contentContainer);

    new zippy(headerExpand, contentContainer);

    return container;
};

