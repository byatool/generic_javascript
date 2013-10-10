goog.require('src.base.control.pager');

goog.provide('src.test.control.pager.whenTogglingEnabledOnAButton');


/**
 @export
 */
src.test.control.pager.whenTogglingEnabledOnAButton.describe = function() {
  //Using
  var Current_ = src.base.control.pager;


  //Fields

  var button_;
  var isPrevious_;
  var pageNumber_;
  var swap_;
  var totalCountOfPages_;


  //Test Hooks
  beforeEach(function() {
    button_ = {};
    swap_ = function() {};
  });


  //Support Methods
  var callTheMethod_ = function() {
    Current_.toggleEnabledOnAButton(button_, isPrevious_, pageNumber_,
                                    totalCountOfPages_, swap_);
  };


  //Test Methods
  it('should set the previous button to disabled if the current page is 0.', function() {
    var methodWasCalled = false;

    isPrevious_ = true;
    pageNumber_ = 0;

    swap_ = function(button, enabledClass, disabledClass) {
      methodWasCalled = methodWasCalled ||
        (button == button &&
         enabledClass == Current_.PagerClass &&
         disabledClass === Current_.DisabledPagerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the previous button to enabled if the current page is not 0.', function() {
    var methodWasCalled = false;

    isPrevious_ = true;
    pageNumber_ = 1;

    swap_ = function(button, enabledClass, disabledClass) {
      methodWasCalled = methodWasCalled ||
        (button == button &&
         enabledClass == Current_.DisabledPagerClass &&
         disabledClass === Current_.PagerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the next button to enabled if the total count of pages is 0.', function() {
    var methodWasCalled = false;

    isPrevious_ = false;
    totalCountOfPages_ = 0;

    swap_ = function(button, toRemove, toAdd) {
      methodWasCalled = methodWasCalled ||
        (button == button &&
         toRemove == Current_.PagerClass &&
         toAdd === Current_.DisabledPagerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });


  it('should set the next button to enabled if the page number is one less than total count of pages.',
     function() {
       var methodWasCalled = false;

       isPrevious_ = false;
       pageNumber_ = 10;
       totalCountOfPages_ = pageNumber_ + 1;

       swap_ = function(button, toRemove, toAdd) {
         methodWasCalled = methodWasCalled ||
           (button == button &&
            toRemove == Current_.PagerClass &&
            toAdd === Current_.DisabledPagerClass);
       };

       callTheMethod_();

       expect(methodWasCalled).toBe(true);
     });



  it('should set the next button to enabled otherwise.', function() {
    var methodWasCalled = false;

    isPrevious_ = false;
    pageNumber_ = 2;
    totalCountOfPages_ = 10;

    swap_ = function(button, toRemove, toAdd) {
      methodWasCalled = methodWasCalled ||
        (button == button &&
         toRemove == Current_.DisabledPagerClass &&
         toAdd === Current_.PagerClass);
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });

};


describe('When toggling enabled on a button, it', function() {

  src.test.control.pager.whenTogglingEnabledOnAButton.describe();

});
