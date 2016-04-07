React Orderable
===
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