require('../styles/main.css');

var React = require('react');
var Parser = require('../helpers/parser');
var Measurement = require('../helpers/measurement');

var Syntaxarea = React.createClass({

  displayName: 'syntaxtarea',

  _onChange: function(e) {
    this.setState({value: e.target.value});
    this._updateCaretPosition(e);
  },

  _onKeyDown: function(e) {
    console.log('key down');
  },

  _updateCaretPosition: function(e) {
    var coordinates = Measurement(e.target, e.target.selectionEnd);

    this.setState({
      caretTop: coordinates.top - 4,
      caretLeft: coordinates.left,
      caretVisibilityClass: 'solid'
    });

    var selection = window.getSelection().type;
    var t = this;
    switch(selection) {
      case 'None':
        setTimeout(function() {
          t.setState({
            caretVisibilityClass: 'blink'
          });
        }, 500);
        break;
      case 'Range':
        setTimeout(function() {
          t.setState({
            caretVisibilityClass: 'solid'
          });
        }, 500);
        break;
      case 'Caret':
        setTimeout(function() {
          t.setState({
            caretVisibilityClass: 'blink'
          });
        }, 500);
        break;
    }
  },

  _renderOutput: function() {
    var parser = Parser(this.props.rules);
    var tokens = parser.tokenize(this.state.value);
    var caretIndex;

    if (this.refs.input) {
      caretIndex = this.refs.input.getDOMNode().selectionStart;
    }

    if (tokens) {
      return spans = tokens.map(function(token, index) {
        return (
          <span className={parser.identify(tokens[index])}
                key={'token-' + index}>
            {tokens[index]}
          </span>
        )
      });
    }
  },

  getInitialState: function() {
    return {
      value: '',
      caretTop: null,
      caretLeft: null,
      caretVisibilityClass: 'blink'
    };
  },

  render: function() {
    var output = this._renderOutput();

    var caretStyle = {
      top: this.state.caretTop + 'px',
      left: this.state.caretLeft + 'px'
    }

    return (
      <div className='syntaxarea'>
        <pre>
          {output}
        </pre>

        <textarea ref='input' value={this.state.value}
                              onKeyPress={this._updateCaretPosition}
                              onKeyUp={this._updateCaretPosition}
                              onKeyDown={this._updateCaretPosition}
                              onFocus={this._updateCaretPosition}
                              onClick={this._updateCaretPosition}
                              onChange={this._onChange} />

        <div className={'caret ' + this.state.caretVisibilityClass} style={caretStyle}></div>
      </div>
    );
  }

});

module.exports = Syntaxarea;
