goog.require('goog.array');

goog.provide('src.site.validation.validationInterpreter');


/**
 @param {Array.<Array>} rules description.
 @param {Array.<function>} methods description.
 @return {fuction(Object) : Array.<string>} description.
 @export
 */
src.site.validation.validationInterpreter.interpret = function(rules, methods) {
    var methodsToCall = goog.array.map(rules, function(currentRule){
        var methodToUse = goog.array.find(methods, function(method) {
            return method[0] === currentRule[0];
        })[1];
        
        var toCheck = goog.array.splice(currentRule, 1);
        
        var toCall = goog.array.map(toCheck, function(innerRule){
            return methodToUse(innerRule);
        });
        
        return toCall;
    });
    
    return goog.array.flatten(methodsToCall);
};
// /*
//  --  ['Username',
//  --    [isAlphaNumberic, 'Username must only container letters and numbers'],
//  --    [requires 'Name', 'Username and Name must be filled in.'],
//  --    [[requires 'Name'], 'Username and Name must be filled in.'],
//  --    ]

/*
 --  [isNotEmpty(
 --    ['UserName', 'Error'],
 --    ['Name', 'Error'])
 --  ],
 --  [requires(
 --    ['UserName', 'Name', 'Error'],
 --    ['FirstName', 'Name', 'Error'])
 --  ]
 */

/*
 --  ['isNotEmpty',
 --    ['UserName', 'Error'],
 --    ['Name', 'Error']
 --  ],
 --  ['requires',
 --    ['UserName', 'Name', 'Error'],
 --    ['FirstName', 'Name', 'Error']
 --  ]
 */


/*
 
 -- function interpret(rules) {
 --
 --   var methods = [
 --     ['isNotEmpty', isNotEmpty],
 --     ['requires', requires]];
 
 --   map(rules) {
 --     var currentRule = methods[car rule];
 --     var toCall = map(cdr rule)
 --       currentRule(innerRule)
 --   }
 --}
 
 -- function isNotEmpty(pairs)
 --   return
 --     map(pairs) {
 --       return function(object) {
 --         var result = '';
 --         if(object[pair[0]] === null)
 --           result.push(pair[1]);
 --         return result;
 --      };
 --    }
 
 -- function requires(pairs)
 --   return map(pairs){
 --     return function(object) {
 --       var result = pair[2];
 --         if(object[pair[0]] &&  object[pair[1]])
 --           result = ''
 --       return result;
 --     }
 --   }
 
 -- interpreter
 */


//  --  function requires(object, required, error)
//  --    var result = []
//  --    if(object[required] is null
//  --      push result[error]
//  --    return result

//  */
// src.base.helper.validationInterpreter.interpret = function(dsl) {
// };

