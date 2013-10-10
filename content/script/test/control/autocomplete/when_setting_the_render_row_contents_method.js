goog.require('goog.string');
goog.require('src.base.control.autocomplete');

goog.provide('src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod');

/**
 @export
 */
src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod.describe = function () {
    //Using
    
    var Current = src.base.control.autocomplete;
    
    
    //Fields
    
    var FormatResult_ = goog.string.getRandomString();
    
    var createADiv_;
    var createdDiv_;
    var currentRow_;
    var formatTheResultText_;
    var getOuterHtml_;
    var node_;
    var renderer_;
    var token_;
    
    
    //Test Hooks
    beforeEach(function() {
        currentRow_ = {};
        createdDiv_ = {};
        
        node_ = {'innerHTML': ''};
        renderer_ = {};
        renderer_.renderRowContents_ = function() {};
        token_ = {};
        
        createADiv_ = function(){ return createdDiv_; };
        formatTheResultText_ = function(){ return FormatResult_;};
        getOuterHtml_ = function(){ };
    });
    
    
    //Support Methods
    var callTheMethod_ = function() {
        Current.setRenderRowContents(renderer_, createADiv_, getOuterHtml_, formatTheResultText_);
        renderer_.renderRowContents_(currentRow_, token_, node_);
        
        return renderer_;
    };
    
    
    //Test Methods
    
    
    it('should format the current row.', function() {
        var methodWasCalled = false;
        
        formatTheResultText_ = function(row, format) {
            methodWasCalled = row === currentRow_['data'] &&
                format === goog.string.format;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    it('should create a container div.', function() {
        var methodWasCalled = false;
        createADiv_ = function(attributes, text) {
            methodWasCalled = text === FormatResult_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    
    it('should convert the div to html.', function() {
        var methodWasCalled = false;
        
        getOuterHtml_ = function(div){
            methodWasCalled = div === createdDiv_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    
    it('should set the node innterHTML.', function() {
        var html = goog.string.getRandomString();
        
        getOuterHtml_ = function() { return html; };
        callTheMethod_();
        expect(node_.innerHTML).toBe(html);
    });
};


describe('When setting the render row contents method, it', function() {
    src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod.describe();
});
