goog.require('goog.string');
goog.require('src.base.control.autocomplete');

goog.provide('src.test.control.autocomplete.whenInitializingAnAutocomplete');


/**
 @export
 */
src.test.control.autocomplete.whenInitializingAnAutocomplete.describe = function() {
    //Using
    var Current = src.base.control.autocomplete;
    

    //Fields
    var ParentContainerId_ = goog.string.getRandomString();

    var appendChild_;
    var createADiv_;
    var createATextbox_;
    var label_;
    var options_;
    var parentCall_;
    var parentContainer_;
    var textbox_;


    //Test Hooks
    beforeEach(function() {
        label_ = {};
        parentContainer_ = {};
        textbox_ = {};

        options_ = {};
        options_[Current.ContainerId] = ParentContainerId_;

        parentCall_ = true;
        createADiv_ = function() { return returnADiv_(); };

        appendChild_ = function() {};
        createATextbox_ = function() { return textbox_; };
    });


    //Support Methods
    var callTheMethod_ = function() {
        return Current.initialize(options_, createADiv_, createATextbox_, appendChild_);
    };

    var returnADiv_ = function() {
        var result = parentCall_ ? parentContainer_ : label_;
        parentCall_ = false;
        
        return result;
    };
    
    //Test Methods
    
    it('should create a parent container.', function() {
        var methodWasCalled = false;
        
        createADiv_ = function(attributes) {
            methodWasCalled = methodWasCalled ||
                attributes['id'] === options_[Current.ContainerId];
            
            return returnADiv_();
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    

    it('should return the parent container.', function() {
        expect(callTheMethod_()).toBe(parentContainer_);
    });

    
    it('should create a textbox.', function() {
        var methodWasCalled = false;

        createATextbox_ = function(attributes) {
            methodWasCalled = attributes['id'] === Current.TextboxId;
            return textbox_;
        };

        callTheMethod_();

        expect(methodWasCalled).toBe(true);
    });

    
    it('should add the textbox to the parent container.', function() {
        var methodWasCalled = false;
        
        appendChild_ = function(parent, child) {
            methodWasCalled = methodWasCalled ||
                (parent === parentContainer_ &&
                 child === textbox_);
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    
    it('should create a div for the selected text.', function() {
        var methodWasCalled = false;
        
        createADiv_ = function(attributes) {
            methodWasCalled = methodWasCalled || attributes['id'] === Current.LabelId;
            return returnADiv_();
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    it('should add the label to the parent container.', function() {
        var methodWasCalled = false;
        
        appendChild_ = function(parent, child) {
            methodWasCalled = methodWasCalled ||
                (parent === parentContainer_ &&
                 child === label_);
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });

    
};


describe('When initializing an autocomplete, it', function() {
    src.test.control.autocomplete.whenInitializingAnAutocomplete.describe();
});
