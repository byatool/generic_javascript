goog.require('goog.string');
goog.require('src.base.helper.domHelper');
goog.provide('src.test.helper.domHelper.whenSubmittingToAGetUrl');

/**
 @export
 */
src.test.helper.domHelper.whenSubmittingToAGetUrl.describe = function () {
  
  //Using
  
  var Current_ = src.base.helper.domHelper;
  
  
  //Fields
  
  var Url_ = goog.string.getRandomString();
  
  var createRequest_;
  var getResponseJson_;
  var listen_;
  var request_;
  var result_;
  var successMethod_;
  
  
   //Test Hooks
  beforeEach(function() {
    request_ = {};
    request_.send = function() {};
    
    result_ = {};
    result_.target = {};
    result_.target.getResponseJson = function() {};
    
    createRequest_ = function(){ return request_; };
    listen_ = function(){};
    successMethod_ = function(){};
    
  });
  
  //Support Methods
  var callTheMethod_ = function() {
    return Current_.submitToGetUrl(Url_, successMethod_, createRequest_,
                                listen_);
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
  
  
  it('should send the request', function() {
    var methodWasCalled = false;

    request_.send = function(){
      methodWasCalled = true;
    };
    
    callTheMethod_();
    
    expect(methodWasCalled).toBe(true);
  });
};


describe('When submitting to a get url, it', function() {
  
  src.test.helper.domHelper.whenSubmittingToAGetUrl.describe();
  
});
