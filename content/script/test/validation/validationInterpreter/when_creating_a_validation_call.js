goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenCreatingAValidtionCall');

/**
 @export
 */
src.test.validation.validationInterpreter.whenCreatingAValidtionCall.describe = function() {
    //Using
    var Current = src.site.validation.validationInterpreter;

    //Fields

    var Error_ = goog.string.getRandomString();
    var FakeMethodName_ = goog.string.getRandomString();
    var PropertyName_ = goog.string.getRandomString();

    var car_;
    var fakeMethod_;
    var find_;
    var innerRule_;
    var methodPair_;
    var methods_;
    var peek_;
    var sink_;


    //Test Hooks
    beforeEach(function() {
        methodPair_ = [FakeMethodName_, fakeMethod_];

        car_ = function() { };
        fakeMethod_ = function() { };
        find_ = function() { return methodPair_; };
        innerRule_ = [FakeMethodName_, 7, Error_];
        methods_ = [methodPair_];
        peek_ = function() { return fakeMethod_; };
        sink_ = function() { return [7]; };
    });


    //Support Methods
    var callTheMethod_ = function() {
        return Current.createAValidationCall(PropertyName_, methods_, innerRule_, find_, car_, peek_, sink_);
    };


    //Test Methods

    it('should find the needed method.', function() {
        var methodWasCalled = false;

        find_ = function(methods, toRun) {
            methodWasCalled = goog.array.equals(methods, methods_) &&
                toRun(methods[0]) === true;

            return methods_[0];
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(true);
    });

    it('should find the method to use from the found pair.', function() {
        var methodWasCalled = false;

        peek_ = function(list) {
            methodWasCalled = methodWasCalled || goog.array.equals(list, methodPair_);
            return fakeMethod_;
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(true);
    });


    it('should find the error.', function() {
        var methodWasCalled = false;

        peek_ = function(list) {
            methodWasCalled = methodWasCalled || goog.array.equals(list, innerRule_);
            return fakeMethod_;
        };

        callTheMethod_()({});

        expect(methodWasCalled).toBe(true);
    });


    it('should find the values to use.', function() {
        var methodWasCalled = false;

        sink_ = function(rule) {
            methodWasCalled = goog.array.equals(rule, innerRule_);
        };

        callTheMethod_()({});

        expect(methodWasCalled).toBe(true);
    });


    it('should call the created method correctly.', function() {
        var methodWasCalled = false;
        var input = {};
        var firstTime = true;

        peek_ = function() {
            var result = firstTime ? fakeMethod_ : Error_;
            firstTime = false;

            return result;
        };

        fakeMethod_ = function(obj, propertyName, error, value) {
            methodWasCalled = obj === input &&
                propertyName === PropertyName_ &&
                error === Error_ &&
                goog.array.equals(value, [7]);
        };


        callTheMethod_()(input);

        expect(methodWasCalled).toBe(true);
    });
};




describe('When  creating a validtion call, it', function() {
    src.test.validation.validationInterpreter.whenCreatingAValidtionCall.describe();
});

