goog.require('goog.string');
goog.require('src.base.control.redirectList');

goog.provide('src.test.control.redirectList.whenCreatingTheClickEvent');


/**
 @export
 */
src.test.control.redirectList.whenCreatingTheClickEvent.describe = function() {
    //Using

    var Current = src.base.control.redirectList;


    //Fields

    var FirstElementId_ = goog.string.getRandomString();
    var FirstValue_ = goog.string.getRandomString();
    var SecondElementId_ = goog.string.getRandomString();
    var SecondValue_ = goog.string.getRandomString();
    var Url_ = goog.string.getRandomString();
     
    var button_;
    var elementIds_;
    var getValue_;
    var redirect_;
    
    
    //Test Hooks
    beforeEach(function() {
        button_ = {};
        elementIds_ = [FirstElementId_, SecondElementId_];
        
        var wasCalled = false;
        getValue_ = function() {
            var result = wasCalled ? SecondValue_ : FirstValue_;
            wasCalled = true;
            
            return result;
        };
        
        redirect_ = function() {};
    });
    
    
    //Support Methods
    var callTheMethod_ = function() {
        Current.createTheClickEvent(elementIds_, Url_, getValue_, redirect_)();
    };
    
    
    //Test Methods
    
    it('should get the needed control value.', function() {
        var methodWasCalled = 0;
        
        getValue_ = function(elementId) {
            methodWasCalled += elementId === FirstElementId_ ||
                elementId === SecondElementId_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(2);
    });
    
    
    it('should redirect to the url.', function() {
        var methodWasCalled = false;
        
        redirect_ = function(url) {
            methodWasCalled = url === Url_ + '?' + FirstElementId_ + '=' + FirstValue_ +
                '&' + SecondElementId_ + '=' + SecondValue_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
};


describe('When creating the click event, it', function() {
    src.test.control.redirectList.whenCreatingTheClickEvent.describe();
});
