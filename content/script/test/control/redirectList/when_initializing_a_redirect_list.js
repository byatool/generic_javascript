goog.require('goog.string');
goog.require('src.base.control.redirectList');

goog.provide('src.test.control.redirectList.whenInitializingARedirectList');

/**
 @export
 */
src.test.control.redirectList.whenInitializingARedirectList.describe = function() {
    //Using
    var Current = src.base.control.redirectList;


    //Fields
    var ContainerClass_ = goog.string.getRandomString();
    var FirstButtonId_ = goog.string.getRandomString();
    var FirstButtonText_ = goog.string.getRandomString();
    var FirstFor_ = goog.string.getRandomString();
    var FirstGoto_ = goog.string.getRandomString();
    var ParentContainerId_ = goog.string.getRandomString();

    var SecondButtonId_ = goog.string.getRandomString();
    var SecondButtonText_ = goog.string.getRandomString();
    var SecondFor_ = goog.string.getRandomString();
    var SecondGoto_ = goog.string.getRandomString();

    var buttonList_;
    var createAButton_;
    var createADiv_;
    var createTheClickEvent_;
    var firstButton_;
    var getValue_;
    var options_;
    var parentContainer_;
    var redirect_;
    var secondButton_;
    var setClickEvent_;


    //Test Hooks
    beforeEach(function() {
        var createFakeButtonAttributes = function(id, text, controlId, url) {
            var button = {};
            button[Current.ButtonId] = id;
            button[Current.ButtonText] = text;
            button[Current.For] = controlId;
            button[Current.Goto] = url;

            return button;
        };

        parentContainer_ = {};
        options_ = {};
        options_[Current.ContainerClass] = ContainerClass_;
        options_[Current.ContainerId] = ParentContainerId_;

        var firstButton = createFakeButtonAttributes(FirstButtonId_, FirstButtonText_, FirstFor_, FirstGoto_);
        var secondButton = createFakeButtonAttributes(SecondButtonId_, SecondButtonText_, SecondFor_, SecondGoto_);
        buttonList_ = [firstButton, secondButton];
        options_[Current.ButtonList] = buttonList_;

        var wasCalled = false;
        firstButton_ = {};
        secondButton_ = {};
        createAButton_ = function() {
            var result = wasCalled ? secondButton_ : firstButton_;
            wasCalled = true;

            return result;
        };

        createADiv_ = function() { return parentContainer_; };
        createTheClickEvent_ = function() {};
        getValue_ = function() { };
        redirect_ = function() {};
        setClickEvent_ = function() {};
    });


    //Support Methods
    var callTheMethod_ = function() {
        return Current.initialize(options_, createADiv_, createAButton_, createTheClickEvent_, getValue_, redirect_, setClickEvent_);
    };


    //Test Methods

    it('should create a parent container.', function() {
        var methodWasCalled = false;

        createADiv_ = function(attributes) {
            methodWasCalled = attributes['id'] === options_[Current.ContainerId] &&
                attributes['class'] === options_[Current.ContainerClass];

            return parentContainer_;
        };
        callTheMethod_();

        expect(methodWasCalled).toBe(true);
    });


    it('should return the parent container.', function() {
        expect(callTheMethod_()).toBe(parentContainer_);
    });


    it('should create the needed buttons.', function() {
        var methodWasCalled = 0;

        createAButton_ = function(attributes) {
            methodWasCalled += (attributes['id'] === FirstButtonId_ &&
                                attributes['value'] === FirstButtonText_) ||
                (attributes['id'] === SecondButtonId_ &&
                 attributes['value'] === SecondButtonText_);
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    it('should create the click event for all buttons.', function() {
        var methodWasCalled = 0;

        createTheClickEvent_ = function(button, elementId, url, getValue, redirect) {

            methodWasCalled += (button === firstButton_ &&
                                elementId === FirstFor_ &&
                                url === FirstGoto_ &&
                                getValue === getValue_ &&
                                redirect === redirect_) ||
                (button === secondButton_ &&
                 elementId === SecondFor_ &&
                 url === SecondGoto_ &&
                 getValue === getValue_ &&
                 redirect === redirect_);
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    it('should set the click event on the button.', function() {
        var methodWasCalled = 0;
        var wasCalled = false;
        var firstEvent = {};
        var secondEvent = {};

        createTheClickEvent_ = function() {
            var result = wasCalled ? secondEvent : firstEvent;
            wasCalled = true;

            return result;
        };

        setClickEvent_ = function(button, method) {
            methodWasCalled += (button === firstButton_ &&
                               method === firstEvent) ||
                (button === secondButton_ &&
                 method === secondEvent);

        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });

};


describe('When initializing an redirectList, it', function() {
    src.test.control.redirectList.whenInitializingARedirectList.describe();
});
