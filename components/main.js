var React = require('react');
var Markdown = require('../helpers/markdown');
var Syntaxarea = require('./syntaxarea');

var rules = Markdown.rules;

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

