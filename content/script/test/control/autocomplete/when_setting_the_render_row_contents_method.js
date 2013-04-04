goog.require('goog.string');
goog.require('src.base.control.autocomplete');

goog.provide('src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod');

/**
 @export
 */
src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod.describe = function() {
    //Using

    //Fields

    var Name_ = goog.string.getRandomString();
    var OuterHtml_ = goog.string.getRandomString();

    var createADiv_;
    var createdDiv_;
    var getOuterHtml_;
    var node_;
    var renderer_;
    var row_;
    var token_;

    //Test Hooks
    beforeEach(function() {
        node_ = {};
        node_.innerHTML = '';

        createdDiv_ = {};
        renderer_ = {};
        renderer_.renderRowContents_ = null;
        row_ = {};
        row_['data'] = {'Name': Name_};
        token_ = {};

        createADiv_ = function() {
            return createdDiv_;
        };

        getOuterHtml_ = function() {
            return OuterHtml_;
        };
    });

    //Support Methods
    var callTheMethod_ = function() {
        return src.base.control.autocomplete.setRenderRowContents(renderer_, createADiv_, getOuterHtml_);
    };

    //Test Methods

    it('should set the renderer method.', function() {
        callTheMethod_();
        expect(renderer_.renderRowContents_).not.toBe(null);
    });


    it('should create a div.', function() {
        var methodWasCalled = false;

        createADiv_ = function(attributes, text) {
            methodWasCalled = text === Name_;
            return createdDiv_;
        };

        callTheMethod_();
        renderer_.renderRowContents_(row_, token_, node_);

        expect(methodWasCalled).toBe(true);
    });

    it('should get the outer html for the created div.', function() {
        var methodWasCalled = false;

        getOuterHtml_ = function(div) {
            methodWasCalled = div === createdDiv_;
            return OuterHtml_;
        };

        callTheMethod_();
        renderer_.renderRowContents_(row_, token_, node_);

        expect(methodWasCalled).toBe(true);
    });


    it('should set the node inner html.', function() {
        callTheMethod_();
        renderer_.renderRowContents_(row_, token_, node_);

        expect(node_.innerHTML).toBe(OuterHtml_);
    });
};


describe('When setting the render row contents method, it', function() {
    src.test.control.autocomplete.whenSettingTheRenderRowContentsMethod.describe();
});
