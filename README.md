# React Orderable
## Demo
[Click here](http://clariussystems.github.io/react-orderable)

## Features
- Drag handle
- Animation
- Horizontal or vertical axis

## Usage
```javascript
import 'react-orderable/react-orderable.css';
import Orderable from 'react-orderable';
import React from 'react';

class Example extends React.Component {
  constructor(props) {
    super(props);

    // Normally you would store this state in a container such as Redux.
    this.state = {
      itemIds: [1, 2, 3, 4, 5],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Render item callback
  getItem(id, options) {
    // We will attach the mousedown handler to the drag handle.
    return (
      <div className="example-item">
        <div
          className="example-handle"
          onMouseDown={options.onMouseDown}
        />
        {id}
      </div>
    );
  }

  handleChange(itemIds) {
    this.setState({
      itemIds,
    });
  }

  render() {
    const { itemIds } = this.state;

    // Default axis is y (vertical ordering).
    // For y axis, itemSize is itemHeight. To provide width, set width via the className.
    // For x axis, itemSize is itemWidth. To provide height, set height via the className.

    return (
      <Orderable
        axis="y"
        className="example-orderable"
        itemGetter={this.getItem}
        itemIds={itemIds}
        itemSize={40}
        onChange={this.handleChange}
      />
    );
  }
}
```

## Why react-orderable?
Compared to [React DnD](https://github.com/gaearon/react-dnd), I wanted this component to be simple to use for the common case. Also, I did not want to use the DnD API. While DnD provides a standard UI for drag and drop (ghost image), I wanted more control over the appearance (movement along an axis, no ghosting).

Compared to [jQuery Sortable](https://jqueryui.com/sortable) and [Rubaxa Sortable](https://rubaxa.github.io/Sortable), the state of the component is passed in as props, rather than maintained internally. This allows the order of items to be stored in a state container such as Redux.
