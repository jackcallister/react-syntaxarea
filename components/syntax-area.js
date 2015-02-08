var React = require('react');
var Parser = require('../helpers/parser');

var SyntaxArea = React.createClass({

  displayName: 'syntaxt-area',

  _onChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },

  _renderOutput: function() {
    var parser = Parser(this.props.rules);
    var tokens = parser.tokenize(this.state.value);

    if (tokens) {
      var spans = tokens.map(function(token, index) {
        return <span className={parser.identify(tokens[index])}>{tokens[index]}</span>
      });

      return spans;
    }
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  render: function() {
    var output = this._renderOutput();
    return (
      <div className='syntax-area'>
        <div className='output'>
          {output}
        </div>

        <textarea value={this.state.value} onChange={this._onChange} />
      </div>
    );
  }

});

module.exports = SyntaxArea;
