# React Orderable
## Checklist before 0.2.0 release
- Determine best way to keep itemIds and children in sync
- Improve demo page (add examples of different kinds of uses)
- Make demo page responsive

## Demo
[Try it](http://clariussystems.github.io/react-orderable)

## Features
- Horizontal or vertical layout
- Drag handle
- Animation
- Ghost item
- Item movement is constrained to a single axis (x or y)
- Touch support

## Usage
```javascript
import 'babel-polyfill'; // Orderable requires an ES6 polyfill
import 'react-orderable/react-orderable.css';
import Orderable from 'react-orderable';
import React from 'react';

// ...

<Orderable
  animated
  className={styles.songs}
  ghost
  itemSize={90}
  onChange={this.handleChange}
>
  {songs.map(song => {
    return (
      <Song
        className={styles.song}
        id={song.get('name')}
        key={song.get('name')}
        song={song}
      />
    );
  })}
</Orderable>
```

[Full example](https://github.com/clariussystems/react-orderable/blob/master/app/welcome/containers/Welcome.js)

### Orderable interface

| Property | Required | Default | Description |
| --- | --- | --- | --- |
| animated | N | false | Whether to animate item position during a drag |
| children | N | | The items to order |
| className | N | | Class name for the Orderable component's div |
| ghost | N | false | Whether to show a ghost item when an item is being dragged |
| horizontal | N | false | Whether this is a horizontal or vertical list |
| itemSize | Y | | Item height for vertical lists, item width for horizontal lists |
| onChange | Y | | Callback that receives an ordered array of item ids when a drag completes |

Items inside an Orderable must have an id property (similar to key) which is used to keep track of item order.

### Item interface

These are the props the item component must support.

| Property | Required | Description |
| --- | --- | --- |
| className | Y | Class name for the item's div |
| dragging | N | Whether this item is being dragged |
| ghost | N | Whether this is a ghost item |
| onDragStart | Y | Mouse down or touch start handler for the item's handle (this can be the item itself) |
| style | Y | Style for the item's div |

## Candidates for improvements
- Variable item size
- Item size from element bounds
- If I have variable item size, do I support changing item size during a drag?
- Margin between items
- Dragging items between groups
- Touch cancel
