goog.require('goog.array');
goog.require('goog.string');
goog.require('src.base.helper.arrayHelper');
goog.require('src.site.validation.validationInterpreter');

goog.provide('src.test.validation.validationInterpreter.whenInterpretingRules');


/**
 @export
 */
src.test.validation.validationInterpreter.whenInterpretingRules.describe = function() {
    //Using
    var Current = src.site.validation.validationInterpreter;
    
    //Fields

    var DefaultName_ = 'derp';
    var DefaultUsername_ = 'herp';

    var IsNotEmpty_ = goog.string.getRandomString();
    var IsNotLongerThan_ = goog.string.getRandomString();
    var Name_ = goog.string.getRandomString();
    var NameEmptyError_ = goog.string.getRandomString();
    var Username_ = goog.string.getRandomString();
    var UsernameEmptyError_ = goog.string.getRandomString();
    var UsernameTooLongError_ = goog.string.getRandomString();

    var car_;
    var cdr_;
    var createAValidationCall_;
    var flatten_;
    var isNotEmpty_;
    var isNotTooLong_;
    var methodList_;
    var rules_;
    var toCheck_;

    //Test Hooks
    beforeEach(function() {

        car_ = function() { return {}; };
        cdr_ = function() { return {}; };
        createAValidationCall_ = function() {};
        flatten_ = function() {return []; };
        isNotEmpty_ = function() {};
        isNotTooLong_ = function() {};

        toCheck_ = {};

        methodList_ = [
            [IsNotEmpty_, isNotEmpty_],
            [IsNotLongerThan_, isNotTooLong_]];
        
        rules_ = [
            [Username_,
             [IsNotEmpty_, UsernameEmptyError_],
             [IsNotLongerThan_, 7, UsernameTooLongError_]],
            [Name_,
             [IsNotEmpty_, NameEmptyError_]]];
    });
    

    //Support Methods
    var callTheMethod_ = function() {
        var result = Current.interpret(rules_, methodList_, createAValidationCall_, car_, cdr_, flatten_);
        
        return result;
    };
    
    
    //Test Methods
    
    it('should retrieve the property name for each rule.', function() {
        var methodWasCalled = 0;
        
        car_ = function(list) {
            methodWasCalled += list === rules_[0] ||
                list === rules_[1];
            return {};
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    it('should retrieve the rest of the list.', function() {
        var methodWasCalled = 0;

        cdr_ = function(list) {
            methodWasCalled += list === rules_[0] ||
                list === rules_[1];
            return {};
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    it('should create a method for each rule.', function() {
        var methodWasCalled = 0;

        rules_ = [
            [Username_,
             [IsNotEmpty_, UsernameEmptyError_],
             [IsNotLongerThan_, UsernameTooLongError_]]];

        var firstRules = rules_[0][1];
        var secondRules = rules_[0][2];

        car_ = function() {
            return Username_;
        };

        cdr_ = function() {
            return src.base.helper.arrayHelper.cdr(rules_[0]);
        };

        createAValidationCall_ = function(propertyName, methods, innerRule, find, car, peek, sink) {
            methodWasCalled += (propertyName === Username_ &&
                                goog.array.equals(methods, methodList_) &&
                                goog.array.equals(innerRule, firstRules) &&
                                find === goog.array.find &&
                                car === car_ &&
                                peek === goog.array.peek &&
                                sink === null) || (propertyName === Username_ &&
                                                   goog.array.equals(methods, methodList_) &&
                                                   goog.array.equals(innerRule, secondRules) &&
                                                   find === goog.array.find &&
                                                   car === car_ &&
                                                   peek === goog.array.peek &&
                                                   sink === null);
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(2);
    });


    // it('should call the method correctly.', function() {
    //     var methodWasCalled = false;

    //     flatten_ = function(list) {
    //         return goog.array.flatten(list);
    //     };

    //     isNotEmpty_ = function(toCheck, propertyName, error, rest) {
    //         methodWasCalled = toCheck === toCheck_ &&
    //             propertyName === Username_ &&
    //             error === UsernameEmptyError_ &&
    //             goog.array.equals(rest, []);
    //     };

    //     methodList_ = [[IsNotEmpty_, isNotEmpty_]];

    //     rules_ = [
    //         [Username_,
    //          [IsNotEmpty_, UsernameEmptyError_]]];

    //     var result = callTheMethod_();
    //     var method = result[0](toCheck_);

    //     expect(methodWasCalled).toBe(true);
    // });



    // it('should flatten the results.', function() {
    //     var methodWasCalled = false;

    //     flatten_ = function(finalList) {
    //         methodWasCalled = true;
    //         return [];
    //     };

    //     callTheMethod_();

    //     expect(methodWasCalled).toBe(true);
    // });

    // it('should have the correct number of method calls returned.', function() {
    //     flatten_ = goog.array.flatten;

    //     var result = callTheMethod_();

    //     expect(result.length).toBe(3);
    // });

    // //Temporary integration tests

    // it('should find an empty string', function() {
    //     toCheck_ = {};
    //     toCheck_[Name_] = '';
    //     toCheck_[Username_] = '';

    //     var result = Current.interpret(rules_, methodList_);

    //     result = goog.array.map(result, function(currentItem) {
    //         return currentItem(toCheck_);
    //     });

    //     result = goog.array.filter(result, function(currentItem) {
    //         return !goog.string.isEmptySafe(currentItem);
    //     });

    //     expect(goog.array.count(result, function(item) {
    //         return item === UsernameEmptyError_ ||
    //             item === NameEmptyError_;
    //     })).toBe(2);
    // });


    // it('should find string that is too long', function() {
    //   toCheck_ = {
    //     'Name': 'hi',
    //     'Username': '1234567'
    //   };

    //   var result = callTheMethod_();

    //   expect(result.length === 1 &&
    //          goog.array.count(result, function(item) {
    //            return item === UsernameTooLongError_;
    //          })).toBe(1);
    // });

};


describe('When interpreting rules, it', function() {
    src.test.validation.validationInterpreter.whenInterpretingRules.describe();
});
