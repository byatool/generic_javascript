goog.require('goog.string');
goog.require('src.base.control.redirectList');

goog.provide('src.test.control.redirectList.whenCreatingTheClickEvent');


/**
 @export
 */
src.test.control.redirectList.whenCreatingTheClickEvent.describe = function () {
    //Using
    
    var Current = src.base.control.redirectList;
    
    
    //Fields

    var ElementId_= goog.string.getRandomString();
    var Url_ = goog.string.getRandomString();
    var Value_ = goog.string.getRandomString();
    
    var button_ = {};
    var getValue_ = function() {};
    var redirect_ = function() {};
    
    
    //Test Hooks
    beforeEach(function() {
        button_ = {};
        
        getValue_ = function() { return Value_; };
        redirect_ = function() {};
        Url_ = {};
    });
    
    
    //Support Methods
    var callTheMethod_ = function() {
        Current.createTheClickEvent(ElementId_, Url_, getValue_, redirect_)();
    };
    
    
    //Test Methods
    
    it('should get the sister control value.', function() {
        var methodWasCalled = false;
        
        getValue_ = function(elementId){
            methodWasCalled = elementId === elementId;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });

    
    it('should redirect to the url.', function() {
        var methodWasCalled = false;
        
        redirect_ = function(url){
            methodWasCalled = url === Url_ + '?' + ElementId_ + '=' + Value_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
};


describe('When creating the click event, it', function() {
    src.test.control.redirectList.whenCreatingTheClickEvent.describe();
});
