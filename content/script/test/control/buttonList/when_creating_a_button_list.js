goog.require('goog.string');
goog.provide('src.test.control.buttonList.whenCreatingAButtonList');

/**
 @export
 */
src.test.control.buttonList.whenCreatingAButtonList.describe = function() {
    //Using
    var Current = src.base.control.buttonList;


    //Fields

    var ContainerClass_ = goog.string.getRandomString();
    var FirstText_ = goog.string.getRandomString();
    var FirstValue_ = goog.string.getRandomString();
    var ParentContainerId_ = goog.string.getRandomString();
    var SecondText_ = goog.string.getRandomString();
    var SecondValue_ = goog.string.getRandomString();

    var addElement_;
    var createAButton_;
    var firstButton_;
    var createADiv_;
    var createAHidden_;
    var options_;
    var parentContainer_;
    var secondButton_;
    var setClick_;
    var updateHidden_;

    //Test Hooks
    beforeEach(function() {

        options_ = {};
        options_[Current.ContainerClass] = ContainerClass_;
        options_[Current.ElementId] = ParentContainerId_;
        options_[Current.ButtonOptions] = [
            {'text': FirstText_, 'value': FirstValue_},
            {'text': SecondText_, 'value': SecondValue_}
        ];

        var firstTime = true;

        createAButton_ = function() {
            var result = firstTime ? firstButton_ : secondButton_;
            firstTime = false;

            return result;
        };


        createADiv_ = function() { return parentContainer_; };
        addElement_ = function() {};
        createAHidden_ = function() { return {}; };
        setClick_ = function() {};
        updateHidden_ = function() {};
    });


    //Support Methods
    var callTheMethod_ = function() {
        Current.createAButtonList(options_, createADiv_, createAHidden_, createAButton_, setClick_, updateHidden_, addElement_);
    };


    //Test Methods

    it('should create the main container.', function() {
        var methodWasCalled = false;

        createADiv_ = function(attributes, nonono) {
            methodWasCalled = attributes['id'] === ParentContainerId_ &&
                attributes['class'] === ContainerClass_;
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(true);
    });


    it('should create a hidden input.', function() {
        var methodWasCalled = false;

        createAHidden_ = function(attributes) {
            methodWasCalled = attributes[Current.ElementId] === ParentContainerId_;
            return {};
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(true);
    });


    it('should create a button per button list item ', function() {
        var methodWasCalled = 0;

        createAButton_ = function(attributes, text) {
            methodWasCalled += attributes['type'] === 'button' &&
                (text === FirstText_ || text === SecondText_);

            return {};
        };


        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    it('should set the button clicks.', function() {
        var methodWasCalled = 0;

        setClick_ = function(element, method) {
            methodWasCalled += (element === firstButton_ || element === secondButton_);
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    it('should add each button to the main container.', function() {
        var methodWasCalled = 0;

        addElement_ = function(parent, child) {
            methodWasCalled += parent === parentContainer_ &&
                (child === firstButton_ || child === secondButton_);
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });



    it('should set the click event for each of the buttons.', function() {
        expect('This').toBe('tested when possible.');
    });
};


describe('When creating a button list, it', function() {
    src.test.control.buttonList.whenCreatingAButtonList.describe();
});
