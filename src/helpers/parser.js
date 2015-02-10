module.exports = function(rules) {
  var i = 'i';
  var re = null;
  var ruleSrc = [];
  var ruleMap = {};

  this.add = function( rules ){
    for( var rule in rules ){
      var source = rules[rule].source;
      ruleSrc.push(source);
      ruleMap[rule] = new RegExp('^('+ source +')$', i);
    }
    re = new RegExp(ruleSrc.join('|'), 'g' + i);
  };

  this.tokenize = function(input){
    return input.match(re);
  };

  this.identify = function(token){
    for(var rule in ruleMap){
      if(ruleMap[rule].test(token)){
        return rule;
      }
    }
  };

  this.add(rules);

  return this;
}
