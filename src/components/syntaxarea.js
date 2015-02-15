require('../styles/main.css');

var React = require('react');
var Parser = require('../helpers/parser');
var Measurement = require('../helpers/measurement');
var TextArea = require('react-textarea-autosize');

var timers = [];

var Syntaxarea = React.createClass({

  displayName: 'syntaxtarea',

  _typingTimer: null,

  _onChange: function(e) {
    this.setState({value: e.target.value});
    this._updateCaretPosition(e);
  },

  _updateCaretPosition: function(e) {
    var coordinates = Measurement(e.target, e.target.selectionEnd);

    timers.forEach(function(timer) {
      clearTimeout(timer);
    });

    this.setState({
      caretTop: coordinates.top,
      caretLeft: coordinates.left,
      caretVisibilityClass: 'solid'
    });

    var setBlinker = function() {
      this.setState({
        caretVisibilityClass: 'blink'
      });
    }.bind(this);

    if (window.getSelection().type == 'Range') {
      this.setState({
        caretVisibilityClass: 'hidden'
      });
    } else if (window.getSelection().type == 'Caret') {
      var timer = setTimeout(setBlinker, 100);
      timers.push(timer);
    }
  },

  _hideCaret: function(e) {
    this.setState({
      caretVisibilityClass: 'hidden'
    });
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
      caretTop: 0,
      caretLeft: 0,
      caretVisibilityClass: 'blink'
    };
  },

  componentDidMount: function() {
    document.addEventListener('mousedown', this._hideCaret);
    document.addEventListener('select', this._hideCaret);
    document.addEventListener('mouseup', this._updateCaretPosition);
  },

  render: function() {
    var output = this._renderOutput();

    var caretStyle = {
      top: this.state.caretTop + 'px',
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
                  onKeyPress={this._updateCaretPosition}
                  onKeyUp={this._updateCaretPosition}
                  onKeyDown={this._updateCaretPosition}
                  onFocus={this._setCaretBlinker}
                  onClick={this._setCaretBlinker}
                  onChange={this._onChange}>
        </TextArea>

        <div className={'caret ' + this.state.caretVisibilityClass}
             style={caretStyle}></div>
      </div>
    );
  }

});

module.exports = Syntaxarea;
