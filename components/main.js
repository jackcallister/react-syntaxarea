var React = require('react');
var Syntaxarea = require('./syntaxarea');

var rules = {
  whitespace: /\s+/,
  red: /red/,
  orange: /orange/,
  yellow: /yellow/,
  green: /green/,
  blue: /blue/,
  indigo: /indigo/,
  violet: /violet/,
  other: /\S+/
}

var App = React.createClass({

  render: function() {
    return (
      <div className='example-app'>
        <Syntaxarea rules={rules} />
      </div>
    )
  }
});

React.render(<App />, document.body);

