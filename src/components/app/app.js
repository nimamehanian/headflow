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
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange({ value }) {
    this.setState({ value });
  }

  render() {
    return (
      <div className="app">
        YOLO
        <Editor
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default hot(module)(App);
