goog.require('goog.string');
goog.require('src.base.control.autocomplete');

goog.provide('src.test.control.autocomplete.whenRenderingARow');


/**
 @export
 */
src.test.control.autocomplete.whenRenderingARow.describe = function () {
    //Using
    
    var Current = src.base.control.autocomplete;
    
    //Fields
    
    var Id_ = goog.string.getRandomString();
    var RowClassName_ = goog.string.getRandomString();
    
    var createADiv_;
    var createdRow_;
    var generateId_;
    var renderer_;
    var row_;
    var token_;


    //Test Hooks
    beforeEach(function() {
        createdRow_ = {};
        renderer_ = {};
        renderer_.rowClassName = RowClassName_;
        row_ = {};
        token_ = {};
        
        generateId_ = function(){ return Id_; };
        createADiv_ = function(){ return row_; };
    });
    
    
    //Support Methods
    var callTheMethod_ = function() {
        return Current.renderRowHtml(renderer_, row_, token_, generateId_, createADiv_);
    };
    
    
    //Test Methods
    
    it('should create the node for the current row.', function() {
        var methodWasCalled = false;
        
        createADiv_  = function(attributes){
            methodWasCalled = attributes['className'] === RowClassName_ &&
                attributes['id'] === Id_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
};


describe('When rendering the row, it', function() {
    src.test.control.autocomplete.whenRenderingARow.describe();
});
