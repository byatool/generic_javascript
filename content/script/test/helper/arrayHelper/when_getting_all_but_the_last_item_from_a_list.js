goog.require('goog.array');
goog.require('src.base.helper.arrayHelper');

goog.provide('src.test.helper.arrayHelper.whenGettingAllButTheLastItemFromTheList');

/**
 @export
 */
src.test.helper.arrayHelper.whenGettingAllButTheLastItemFromTheList.describe = function() {
   //Using
    var Current = src.base.helper.arrayHelper;


    //Fields
    var listToCheck_;

    //Test Hooks
    beforeEach(function() {

    });

    //Support Methods
    var callTheMethod_ = function() {
        return Current.sink(listToCheck_);
    };


    //Test Methods

    it('should return null if the list is null.', function() {
        listToCheck_ = null;
        expect(callTheMethod_()).toBe(null);
    });


    it('should return null if there is only one item.', function() {
        listToCheck_ = [];
        expect(callTheMethod_()).toBe(null);
    });


    it('should return all but the last item.', function() {
        listToCheck_ = [1, 2, 3];
        expect(goog.array.equals(callTheMethod_(), [1, 2])).toBe(true);
    });
};


describe('When getting all but the last item from a list, it', function() {
    src.test.helper.arrayHelper.whenGettingAllButTheLastItemFromTheList.describe();
});
