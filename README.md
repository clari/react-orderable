React Orderable
===
Features
---
- Drag handle
- Animation
- Vertical or horizontal axis

Why react-orderable?
---
Compared to [React DnD](https://github.com/gaearon/react-dnd), I wanted this component to be simple to use for the common case and I did not want to use the DnD API. I don't want an arbitrary placeable ghost image. Instead, I want the item to be constrained to a specific axis (vertical or horizontal).

Compared to [jQuery Sortable](https://jqueryui.com/sortable) and [Rubaxa's Sortable](https://rubaxa.github.io/Sortable), the ordering state of this component is externalized (provided by props). During the drag, the component itself manages the state in order to support animation (if we do the simple thing and require all item order changes to come from props, transitions won't work correctly). Once the drag is done, we pass the new order to the container so it can update its state. The container will also pass us the new order via props.

Usage
---
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

TODO
---
- Export css file
- npm build should only compile scss
