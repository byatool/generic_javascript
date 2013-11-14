goog.require('goog.string');
goog.require('src.base.control.controlConstant');
goog.require('src.base.control.wall');
goog.require('src.base.control.wall.constant');

goog.provide('src.test.control.wall.whenCreatingTheMapping');

/**
 @export
 */
src.test.control.wall.whenCreatingTheMapping.describe = function () {
  
  //Using
  
  var Constant_ = src.base.control.wall.constant;
  var ControlConstant_ = src.base.control.controlConstant;
  var Current_ = src.base.control.wall;
  
  var GridBuilderConstant_ = src.base.control.gridBuilder.constant;
  
  
  //Fields
  
  
  //Test Hooks
  
  beforeEach(function() {
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.createTheMapping();
  };
  
  //Test Methods
  
  it('should contain one mapping.', function() {
    expect(callTheMethod_().length).toBe(1);
  });
  
  
  it('should have a fake header text.', function() {
    expect(callTheMethod_()[0][GridBuilderConstant_.HeaderText]).toBe('');
  });

  it('should have a fake property name.', function() {
    expect(callTheMethod_()[0][GridBuilderConstant_.PropertyName]).toBe('');
  });
  
  it('should have a fake class.', function() {
    expect(callTheMethod_()[0][ControlConstant_.Class]).toBe('');
  });
  
};

describe('When creating the mapping, it', function() {
  src.test.control.wall.whenCreatingTheMapping.describe();
});


//--namespace="src.test.control.wall.whenCreatingTheMapping" ^

