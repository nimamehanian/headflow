import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import getCurrentItem from '../../utils/getCurrentItem';
import getPreviousItem from '../../utils/getPreviousItem';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'list_item',
        nodes: [
          {
            object: 'text',
            leaves: [
              { text: 'A line of text.' },
            ],
          },
        ],
      },
      {
        object: 'block',
        type: 'list_item',
        nodes: [
          {
            object: 'text',
            leaves: [
              { text: 'A second line of text.' },
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

  onKeyDown = (event, change, editor) => {
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        event.shiftKey ? this.outdent() : this.indent(change);
        return editor;
      default:
        return null;
    }
  }

  indent = (change) => {
    const currentItem = getCurrentItem(change);
    const previousItem = getPreviousItem(change);
    if (!currentItem || !previousItem) { return change; }

    const destination = change.value.document.getDescendant(previousItem.key);
    const lastIndex = destination.nodes.size;
    const lastChild = destination.nodes.last();
    console.log('lastChild', lastChild.type);
  }

  outdent = () => {
    console.log('OUTDENT');
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
