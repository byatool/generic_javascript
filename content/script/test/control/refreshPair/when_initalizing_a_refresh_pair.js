goog.require('goog.string');
goog.require('src.base.control.refreshPair');

goog.provide('src.test.control.refreshPair.whenInitializingARefreshPair');

/**
 @export
 */
src.test.control.refreshPair.whenInitializingARefreshPair.describe = function() {
  //Using
  var Current_ = src.base.control.refreshPair;


  //Fields
   
  var ParameterName_ = goog.string.getRandomString();
  var ToUpdate_ = goog.string.getRandomString();
  var ToWatch_ = goog.string.getRandomString();
  var ToWatchValue_ = goog.string.getRandomString();
  var Url_ = goog.string.getRandomString();
  
  var createOnChangeHandler_;
  var createUrlSubmitHandler_;
  var getElement_;
  var getValue_;
  var onChangeHandler_;
  var setOnChange_;
  var setValue_;
  var submitToUrl_;
  var urlSubmitHandler_;
  
  
  //Test Hooks
  beforeEach(function() {
    onChangeHandler_ = function() {};
    setValue_ = {};
    urlSubmitHandler_ = function() {};
    
    getElement_ = function() {};
    getValue_ = function() { return ToWatchValue_;};
    createUrlSubmitHandler_ = function() { return urlSubmitHandler_;};
    submitToUrl_ = function() {};
    createOnChangeHandler_ = function() { return onChangeHandler_;};
    setOnChange_ = function() {};
  });
  
  
  //Support Methods
  var callTheMethod_ = function() {
    Current_.initialize(ToWatch_, ToUpdate_, Url_, getElement_, getValue_, createUrlSubmitHandler_, setValue_, createOnChangeHandler_, setOnChange_, submitToUrl_);
  };
  
  
  //Test Methods
  
  it('should find the element to watch.', function() {
    var methodWasCalled = false;
    
    getElement_ = function(id) {
      methodWasCalled = methodWasCalled || id === ToWatch_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should find the element to update.', function() {
    var methodWasCalled = false;
    
    getElement_ = function(id) {
      methodWasCalled = methodWasCalled || id === ToUpdate_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  it('should create the url submit function.', function() {
    var methodWasCalled = false;
    var toUpdate = {};
    
    getElement_ = function(id) {
      return id === ToUpdate_ ? toUpdate : {};
    };
    
    createUrlSubmitHandler_ = function(element, setValue) {
      methodWasCalled = element === toUpdate &&
        setValue === setValue_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should create the change event handler.', function() {
    var methodWasCalled = false;
    var toWatch = {};
    
    getElement_ = function(id) {
      return id === ToWatch_ ? toWatch : {};
    };
    
    createOnChangeHandler_ = function(url, toWatchElement, getValue, submitUrl, submitResultHandler) {
      methodWasCalled = url === Url_ &&
        //parameterName === ParameterName_ &&
        toWatchElement === toWatch &&
        getValue === getValue_ &&
        submitUrl === submitToUrl_ &&
        submitResultHandler === urlSubmitHandler_;
      
      return onChangeHandler_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should set the on change.', function() {
    var methodWasCalled = false;
    var toWatch = {};
    
    getElement_ = function(id) {
      return id === ToWatch_ ? toWatch : {};
    };
    
    setOnChange_ = function(toWatch, onChangeHandler) {
      methodWasCalled = toWatch === toWatch &&
        onChangeHandler === onChangeHandler_;
    };

    callTheMethod_();

    expect(methodWasCalled).toBe(true);
  });
};


describe('When initializing an refreshPair, it', function() {
  src.test.control.refreshPair.whenInitializingARefreshPair.describe();
});





