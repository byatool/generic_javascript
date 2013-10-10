goog.require('goog.string');
goog.require('src.base.control.autocomplete');

goog.provide('src.test.control.autocomplete.whenFormattingTheAutocompleteResultText');

/**
 @export
 */
src.test.control.autocomplete.whenFormattingTheAutocompleteResultText.describe = function() {
    //Using
    var Current = src.base.control.autocomplete;
    

    //Fields
    
    var Name_ = goog.string.getRandomString();
    
    var currentRow_;
    var format_;
    
    //Test Hooks
    beforeEach(function() {
        currentRow_ = {};
        
        currentRow_[Current.Name] = Name_;
    });
    
    //Support Methods
    
    var callTheMethod_ = function() {
        return Current.formatTheAutocompleteResultText(currentRow_, format_);
    };
    
    
    //Test Methods
    
    it('should call the format method.', function() {
        var methodWasCalled = false;
        
        format_ = function(format, name) {
            methodWasCalled = format === '%s' &&
                name === Name_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    
    it('should return the format result.', function() {
        var formatResult = goog.string.getRandomString();
        
        format_ = function() {
            return formatResult;
        };
        
        expect(callTheMethod_()).toBe(formatResult);
    });
};


describe('When formatting the autocomplete result text, it', function() {
    src.test.control.autocomplete.whenFormattingTheAutocompleteResultText.describe();
});
