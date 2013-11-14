goog.require('goog.dom');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.gridBuilder');
goog.require('src.base.helper.domCreation');

goog.provide('src.base.control.wall.row');

/**
 @param {Object} currentItem The data row to be transformed.
 @param {Object} options The overall grid options.
 @param {function} refreshGrid The function used to refresh
 the parent grid.
 @param {?function} createADiv description.
 @param {?function} setTextContent The function uses to
 set the text on the text container.
 @param {?function} appendChild The function used to add
 the content to the row.
 @return {Object} The created row.
 @protected
 */
src.base.control.wall.row.createARow =
  function(currentItem, options, refreshGrid,
           createADiv, createEditableDiv, setTextContent,
           appendChild) {
    
    createADiv = createADiv ?
      createADiv :
      src.base.helper.domCreation.div;

    
    createEditableDiv = createEditableDiv ? 
      createEditableDiv : 
      src.base.control.editableDiv.initialize;
    
    setTextContent = setTextContent ?
      setTextContent :
      goog.dom.setTextContent;
    
    appendChild = appendChild ?
      appendChild :
      goog.dom.appendChild;
    
    
    /* Start */
    
    var Constant_ = src.base.control.wall.constant;
    var ControlConstant_ = src.base.control.controlConstant;
    var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
    
    
    var containerRowAttributes = {};
    containerRowAttributes[ControlConstant_.Class] = GridBuilderConstant_.RowClass;
    var containerRow = createADiv(containerRowAttributes);
    
    var textContainer = createEditableDiv(currentItem[Constant_.FieldId],
                                          currentItem[Constant_.FieldText],
                                          currentItem[Constant_.FieldId],
                                          options[Constant_.EditableUrl]);
    
    var infoContainerAttributes = {};
    infoContainerAttributes[ControlConstant_.Class] = Constant_.WallInformation;
    var infoContainer = createADiv(infoContainerAttributes);
    setTextContent(infoContainer,
                   currentItem[Constant_.FieldUsername] +
                   ' on ' +
                   currentItem[Constant_.FieldDate]);
    
    appendChild(containerRow,
                infoContainer);
    
    appendChild(containerRow,
                textContainer);

    return containerRow;

  };
