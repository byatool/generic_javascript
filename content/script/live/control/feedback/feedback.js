//goog.ui.LabelInput
// var li2 = new goog.ui.LabelInput('Search, add, or invite 2');
// var el = li2.render($('d'));
// li2.getElement().name = 'dynamic';

goog.require('src.base.control.feedback.constant');

goog.provide('src.base.control.feedback');


/**
 @param {Array} options The needed options to build the form.
 @param {?function} createADiv The method used  to create a 
 div element.
 @return {Object} The created control.
 @export
 */
src.base.control.feedback.initialize = function(options, createADiv) {
  createADiv = createADiv ?
    createADiv :
    src.base.helper.domCreation.div;
  
  var current = src.base.control.feedback;
  var constant = src.base.control.feedback.constant;
  
  var container = createADiv({
    'id': options[constant.ContainerId],
    'class': options[constant.ContainerClass]
  });
  
  return container;
};
