React Orderable
===
TODO
---
- gh-pages build
- npm build

Demo
---
[Try it](http://clariussystems.github.io/react-orderable)

Features
---
- Horizontal or vertical layout
- Drag handle
- Animation
- Ghost item
- Item movement is constrained to a single axis (x or y)

Usage
---
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

[Full example](blob/master/app/containers/Welcome.js)

Who's using React Orderable?
---
- [Clari](http://www.clari.com)

Comparison to other libraries
---
- Unlike [jQuery Sortable](https://jqueryui.com/sortable) and [RubaXa Sortable](https://github.com/RubaXa/Sortable), React Orderable manipulates the DOM purely through React.
- Compared to [React DnD](https://github.com/gaearon/react-dnd), (a) React Orderable is usable out of the box for reordering and (b) React Orderable does not use the DnD API. Instead, we use mouse events. This means we don't have to override the browser's default ghost image or configure drop targets.

Candidates for improvements
---
- Variable item size
- Item size from element bounds
- If I have variable item size, do I support changing item size during a drag?
- Margin between items
- Dragging items between groups
