# React Orderable
## TODO
- gh-pages build
- npm build

## Demo
[Try it](http://clariussystems.github.io/react-orderable)

## Features
- Horizontal or vertical layout
- Drag handle
- Animation
- Ghost item
- Item movement is constrained to a single axis (x or y)

## Usage
```javascript
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

The following props are supported by Orderable.

| Property | Required | Default | Description |
| --- | --- |
| animated | N | false | Whether to animate item position during a drag |
| className | N | | Class name for the Orderable component's div |
| ghost | N | false | Whether to show a ghost item when an item is being dragged |
| horizontal | N | false | Whether this is a horizontal or vertical list |
| itemSize | Y | | Item height for vertical lists, item width for horizontal lists |
| onChange | Y | | Callback that receives an ordered list of item ids when a drag completes |

### Item interface

This is the interface required of the item components.

| Property | Description |
| --- | --- |
| className | Class name for the item's div |
| dragging | Whether this item is being dragged |
| ghost | Whether this is a ghost item |
| onHandleMouseDown | Mouse down handler for the item's handle (this can be the item itself) |
| style | Style for the item's div |

## Who's using React Orderable?
- [Clari](http://www.clari.com)

## Comparison to other libraries
- Unlike [jQuery Sortable](https://jqueryui.com/sortable) and [RubaXa Sortable](https://github.com/RubaXa/Sortable), React Orderable manipulates the DOM purely through React.
- Compared to [React DnD](https://github.com/gaearon/react-dnd), (a) React Orderable is usable out of the box for reordering and (b) React Orderable does not use the DnD API. Instead, we use mouse events. This means we don't have to override the browser's default ghost image or configure drop targets.

## Candidates for improvements
- Variable item size
- Item size from element bounds
- If I have variable item size, do I support changing item size during a drag?
- Margin between items
- Dragging items between groups
