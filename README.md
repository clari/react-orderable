# React Orderable
[Reorderable list component](http://clariussystems.github.io/react-orderable)

## Features
- Drag handle
- Animation
- Vertical or horizontal axis

## Why react-orderable?
Compared to [React DnD](https://github.com/gaearon/react-dnd), I wanted this component to be simple to use for the common case and I did not want to use the DnD API.

Compared to [jQuery Sortable](https://jqueryui.com/sortable) and [Rubaxa's Sortable](https://rubaxa.github.io/Sortable), you pass the order of the items into the component as props, and when the order changes, the component fires a callback with the changed ordering. This allows the order of items to be stored in a state container such as Redux.

## Usage
```javascript
import 'react-orderable/react-orderable.css';
import React from 'react';
import Reorderable from 'react-orderable';

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
    // Attach the mousedown handler to the drag handle.
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

    // Default axis is y (vertical reorderable).
    // itemIds supports any iterable (array, Immutable.List).
    // For y axis, itemSize is itemHeight. To provide width, set width via the className.
    // For x axis, itemSize is itemWidth. To provide height, set width via the className.

    return (
      <Reorderable
        axis="y"
        className="example-reorderable"
        itemGetter={this.getItem}
        itemIds={itemIds}
        itemSize={40}
        onChange={this.handleChange}
      />
    );
  }
}
```

## TODO
- Export css file
- npm build should not require babel or scss
- If I'm publishing a frontend library, should I make everything a peerdep?
