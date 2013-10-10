goog.require('goog.dom');
goog.require('src.base.helper.domCreation');
goog.require('src.base.helper.domHelper');


goog.provide('src.test.helper.domHelper.whenRetrievingAChildById');

/**
 @export
 */
src.test.helper.domHelper.whenRetrievingAChildById.describe = function() {
  var ChildId = 'child';
  
  var Div = src.base.helper.domCreation.div;
  var Helper = src.base.helper.domHelper;
  var parentDiv = Div({id: 'parent'},
                      [
                        Div({id: ChildId})
                      ]);
  
  it('will not retrieve anything if the id does not match.', function() {
    expect(Helper.retrieveChildById(parentDiv, 'nonono')).toBe(null);
  });
  
  it('will retrieve the child if it exists.', function() {
    expect(Helper.retrieveChildById(parentDiv, ChildId).id).toBe(ChildId);
  });
  
  it('will throw an exception if there are more that one child found for the same id.', function() {
    var secondChild = Div({id: ChildId});
    goog.dom.appendChild(parentDiv, secondChild);
    
    expect(function() {
      expect(Helper.retrieveChildById(parentDiv, ChildId).id).toBe(ChildId);
    }).toThrow(new Error('Duplicate child found.'));
  });
};

describe('When retrieving a child by id, it', function() {
  src.test.helper.domHelper.whenRetrievingAChildById.describe();
});
