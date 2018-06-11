import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Editor } from 'slate-react';
import { Value } from 'slate';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              { text: 'A line of text in a paragraph.' },
            ],
          },
        ],
      },
    ],
  },
});

class App extends Component {
  state = {
    value: initialValue,
  };

  onChange = ({ value }) => {
    this.setState({ value });
  }

  onKeyDown = (event, change, state) => {
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        event.shiftKey ? console.log('OUTDENT') : console.log('INDENT');
        return state;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="app">
        <Editor
          className="editor"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

export default hot(module)(App);
