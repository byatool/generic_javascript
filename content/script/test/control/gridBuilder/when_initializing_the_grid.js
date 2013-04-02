goog.require('goog.string');
goog.require('src.base.control.buttonList');

goog.provide('src.test.control.gridBuilder.whenInitializingTheGrid');

/**
 @export
 */
src.test.control.gridBuilder.whenInitializingTheGrid.describe = function () {
    //Using
    
    var Current = src.base.control.gridBuilder;
    
    
    //Fields
    
    var ContainerClass_ = goog.string.getRandomString();
    var ContainerId_ = goog.string.getRandomString();
    
    var createADiv_;
    var options_;
    var parentContainer_;

    
    //Test Hooks

    beforeEach(function() {
        options_ = {};
        options_[Current.ContainerClass] = ContainerClass_;
        options_[Current.ContainerId] = ContainerId_;
        
        createADiv_ = function() {
            return parentContainer_;
        };
    });
    
    
    //Support Methods

    var callTheMethod_ = function() {
        return src.base.control.gridBuilder.initialize(options_, createADiv_);
    };
    
    
    //Test Methods
     
    it('should create the container div.', function() {
        var methodWasCalled = false;
        
        createADiv_ = function(attributes) {
            methodWasCalled = attributes['id'] === ContainerId_ &&
                attributes['class'] === ContainerClass_;
        };
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
    
    
    it('should return the container div.', function() {
        expect(callTheMethod_()).toBe(parentContainer_);
    });

    
    it('should create a column for every column item.', function() {
        var methodWasCalled = false;
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });

    
    it('should create a row for every data item', function() {
        var methodWasCalled = false;
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });

    
    it('should set the click event for every row.', function() {
        var methodWasCalled = false;
        
        callTheMethod_();
        
        expect(methodWasCalled).toBe(true);
    });
};


describe('When initializing the grid, it', function() {
    src.test.control.gridBuilder.whenInitializingTheGrid.describe();
});
