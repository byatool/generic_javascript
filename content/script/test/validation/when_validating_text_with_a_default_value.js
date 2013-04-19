goog.require('goog.array');
goog.require('goog.string');
goog.require('src.site.validation.validateText');

goog.provide('src.test.validation.whenValidatingTextWithADefaultValue');

/**
 @export
 */
src.test.validation.whenValidatingTextWithADefaultValue.describe = function() {
    //Fields
    var Current = src.site.validation.validateText;
    
    var DefaultText_ = goog.string.getRandomString();
    
    //Test Hooks
    beforeEach(function() {
        
    });
    
    
    //Support Methods
    
    var callTheMethod_ = function(text) {
        return Current.isEmptyOrIsDefault(text, DefaultText_);
    };
    
    
    //Test Methods
    
    it('should succeed if there is no text.', function() {
        expect(callTheMethod_('')).toBe(true);
    });
    
    
    it('should succeed if there the text is the default text.', function() {
        expect(callTheMethod_(DefaultText_)).toBe(true);
    });
    
    
    it('should fail if the text is not the default or empty.', function() {
        expect(callTheMethod_('adfa')).toBe(false);
    });
};

describe('When validating text with a default value, it', function() {
    src.test.validation.whenValidatingTextWithADefaultValue.describe();
});
