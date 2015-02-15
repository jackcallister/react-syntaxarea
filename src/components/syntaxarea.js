require('../styles/main.css');

var React = require('react');
var Parser = require('../helpers/parser');
var Measurement = require('../helpers/measurement');
var TextArea = require('react-textarea-autosize');

var Syntaxarea = React.createClass({

  displayName: 'syntaxtarea',

  _onChange: function(e) {
    this.setState({
      value: e.target.value
    });
    this._updateCaretPosition(e);
  },

  _updateCaretPosition: function(e) {
    var coordinates = Measurement(e.target, e.target.selectionEnd);

    this.setState({
      caretTop: coordinates.top,
      caretLeft: coordinates.left
    });

    if (window.getSelection().type == 'Range') {
      this.setState({
        caretVisibilityClass: 'hidden'
      });
    } else {
      this.setState({
        caretVisibilityClass: 'solid'
      });
    }
  },

  _hideCaret: function(e) {
    this.setState({
      caretVisibilityClass: 'hidden'
    });
  },

  _showCaret: function(e) {
    if (window.getSelection().type != 'Range') {
      this.setState({
        caretVisibilityClass: 'solid'
      });
    }
  },

  _renderOutput: function() {
    var parser = Parser(this.props.rules);
    var tokens = parser.tokenize(this.state.value);

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
      caretTop: 0,
      caretLeft: 0,
      caretVisibilityClass: 'solid'
    };
  },

  componentDidMount: function() {
    document.addEventListener('select', this._hideCaret);
    document.addEventListener('keyup', this._updateCaretPosition);
    document.addEventListener('mouseup', this._updateCaretPosition);
  },

  render: function() {
    var output = this._renderOutput();

    var caretStyle = {
      top: (this.state.caretTop - 3) + 'px',
      left: this.state.caretLeft + 'px'
    }

    return (
      <div className='syntaxarea'>
        <div className='output'>
          {output}
        </div>

        <TextArea className='input'
                  ref='input'
                  autoFocus={true}
                  value={this.state.value}
                  onChange={this._onChange}>
        </TextArea>

        <div className={'caret ' + this.state.caretVisibilityClass}
             style={caretStyle}></div>
      </div>
    );
  }

});

module.exports = Syntaxarea;
