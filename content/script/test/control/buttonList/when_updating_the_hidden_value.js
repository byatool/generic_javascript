goog.require('goog.string');

goog.provide('src.test.control.buttonList.whenUpdatingTheHiddenValue');


/**
 @export
 */
src.test.control.buttonList.whenUpdatingTheHiddenValue.describe = function() {
    //Using
    var Current = src.base.control.buttonList;


    //Fields
    var contains_;
    var getValue_;
    var hiddenElement_;
    var isEmptySafe_;
    var removeValue_;
    var setValue_;
    var value_ = goog.string.getRandomString();


    //Test Hooks
    beforeEach(function() {
        hiddenElement_ = {value: ''};

        contains_ = function() { return false; };
        getValue_ = function() { return null; };
        setValue_ = function() {};
        isEmptySafe_ = function() { return true; };
        removeValue_ = function() { return ''; };
    });


    //Support Methods
    var callTheMethod_ = function() {
        return Current.updateHidden(hiddenElement_, value_, getValue_, isEmptySafe_, setValue_, contains_, removeValue_);
    };


    //Test Methods

    it('should get the current element value.', function() {
        var methodWasCalled = false;

        getValue_ = function(element) {
            methodWasCalled = element === hiddenElement_;
            return '';
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });


    it('should check the value for emptyness.', function() {
        var methodWasCalled = false;
        var result = goog.string.getRandomString();

        getValue_ = function() {return result;};

        isEmptySafe_ = function(value) {
            methodWasCalled = result === value;
            return true;
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });


    it('should set the value if there is none in existence.', function() {
        var methodWasCalled = false;

        setValue_ = function(element, value) {
            methodWasCalled = element === hiddenElement_ &&
                value === value_ + ' ';
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });


    it('should prepend the value if another exists.', function() {
        var methodWasCalled = false;
        var originalValue = goog.string.getRandomString();

        getValue_ = function() { return originalValue; };
        isEmptySafe_ = function() { return false; };

        setValue_ = function(element, value) {
            methodWasCalled = element === hiddenElement_ &&
                value === value_ + ' ' + originalValue;
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });


    it('should remove the value if it exists.', function() {
        var methodWasCalled = false;
        var originalValue = value_ + ' ';

        getValue_ = function() { return originalValue; };
        isEmptySafe_ = function() { return false; };
        contains_ = function() { return true; };

        removeValue_ = function(original, current) {
            methodWasCalled = current == value_ &&
                originalValue === original;
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });


    it('should set the value with the cleaned text.', function() {
        var methodWasCalled = false;

        var finalValue = goog.string.getRandomString();

        contains_ = function() { return true; };

        removeValue_ = function() {
            return finalValue;
        };

        setValue_ = function(element, value) {
            methodWasCalled = element === hiddenElement_ &&
                value === finalValue;
        };

        callTheMethod_()();

        expect(methodWasCalled).toBe(true);
    });

};


describe('When updating the hidden value, it', function() {
    src.test.control.buttonList.whenUpdatingTheHiddenValue.describe();
});
