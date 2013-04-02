goog.require('goog.string');
goog.require('src.base.control.buttonList');


goog.provide('src.test.control.buttonList.whenTogglingAClass');


/**
 @export
 */
src.test.control.buttonList.whenTogglingAClass.describe = function() {
    //Using
    var Current = src.base.control.buttonList;


    //Fields
    var CssClass_ = goog.string.getRandomString();

    var element_;
    var toggleMethod_;

    //Test Hooks
    beforeEach(function() {
        element_ = {};
    });

    //Support Methods
    var callTheMethod_ = function() {
        return Current.toggleClass(element_, CssClass_, toggleMethod_);
    };


    //Test Methods

    it('should call the toggle method correctly.', function() {
        var methodWasCalled = false;

        toggleMethod_ = function(element, cssClass) {
            methodWasCalled = element === element_ &&
                cssClass === CssClass_;
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });
};


describe('When toggling a class, it', function() {
    src.test.control.buttonList.whenTogglingAClass.describe();
});
