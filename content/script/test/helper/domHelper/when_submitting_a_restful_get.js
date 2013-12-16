goog.require('goog.string');
goog.require('src.base.helper.domHelper');
goog.provide('src.test.helper.domHelper.whenSubmittingARestfulGet');

/**
 @export
 */
src.test.helper.domHelper.whenSubmittingARestfulGet.describe = function () {
  
  //Using
  
  var Current_ = src.base.helper.domHelper;
  
  
  //Fields
  
  var Url_ = goog.string.getRandomString();
  
  var createFromMap_;
  var createRequest_;
  var getResponseJson_;
  var listen_;
  var mainParameter_;
  var parameters_;
  var request_;
  var result_;
  var toString_;
  var successMethod_;
  
  
   //Test Hooks
  
  beforeEach(function() {
    mainParameter_ = null;
    
    request_ = {};
    request_.send = function() {};
    
    result_ = {};
    result_.target = {};
    result_.target.getResponseJson = function() {};
    
    createFromMap_ = function() {};
    createRequest_ = function(){ return request_; };
    listen_ = function(){};
    toString_ = function(){};
    successMethod_ = function(){};
    
  });
  
  
  //Support Methods
  
  var callTheMethod_ = function() {
    return Current_.submitRestfulGet(Url_, mainParameter_, parameters_, successMethod_, createRequest_,
                                     listen_, createFromMap_, toString_);
  };
  
  
  //Test Methods
  
  
  it('should create the request.', function() {
    var methodWasCalled = false;
    
    createRequest_ = function(){
      methodWasCalled = true;
      return request_;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
  it('should listen to the answer.', function() {
    var methodWasCalled = 0;
    var resultResponse = {};
  
    result_.target.getResponseJson = function(){
      methodWasCalled += 1;
      
      return resultResponse;
    };
    
    successMethod_ = function(jsonResponse){
      methodWasCalled += jsonResponse === resultResponse;
    };
    
    
    listen_ = function(request, eventName, toCall){
      methodWasCalled += request === request_ &&
        eventName === 'complete';
      toCall(result_);
    
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(3);
  });


  
  it('should append the main parameter  when not null', function() {
    var methodWasCalled = false;
    mainParameter_ = 'addfas';
    
    request_.send = function(url, method){
      methodWasCalled = url === Url_ + '/' + mainParameter_ &&
        method === 'GET';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
  
   it('should not add query items if parameters is null.', function() {
    var methodWasCalled = false;
     
    parameters_ = null;
     
    request_.send = function(url, method){
      methodWasCalled = url === Url_ &&
        method === 'GET';
    };
     
    callTheMethod_();
     
    expect(methodWasCalled).toBe(true);
   });
  
  
  it('should create the query item string if parameters is not null.', function() {
    var methodWasCalled = 0;
    var createdMap = {};
    
    parameters_ = {};
    
    toString_ = function(item) {
      methodWasCalled += item === createdMap;
    };
    
    createFromMap_ = function(parameters){
      methodWasCalled += parameters === parameters_;
      
      return createdMap;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(2);
  });
  
  
  it('should append the to string query items.', function() {
    var methodWasCalled = false;
    var toString = 'a';
    
    parameters_ = {};
    
    toString_ = function(){ return toString; };
    
    request_.send = function(url, method){
      methodWasCalled = url === Url_ + '?' + toString &&
        method === 'GET';
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
  
};


describe('When submitting a restful get, it', function() {
  
  src.test.helper.domHelper.whenSubmittingARestfulGet.describe();
  
});
