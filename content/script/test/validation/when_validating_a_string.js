goog.require('src.site.validation.validateText');

goog.provide('src.test.validation.whenValidatingAString');

/**
 @export
 */
src.test.validation.whenValidatingAString.describe = function() {
    //Fields
    var ConceptName = 'First Name:';
    var ValidateText = src.site.validation.validateText;
    
    //Test Hooks
    beforeEach(function() {
        
    });
    
    //Support Methods
    
    //Test Methods
    
    
    it('should fail if the text is null.', function() {
        var result = ValidateText.isEmpty(null, ConceptName);
        expect(result).toBe(true);
    });
    
    
    it('should fail if the text is emtpy.', function() {
        var result = ValidateText.isEmpty('', ConceptName);
        expect(result).toBe(true);
    });
    
    
    it('should fail if there is text..', function() {
        var result = ValidateText.isEmpty('derp', ConceptName);
        expect(result).toBe(false);
    });
};

describe('When validating text, it', function() {
    src.test.validation.whenValidatingAString.describe();
});
