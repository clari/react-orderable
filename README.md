React Orderable
===
TODO
---
- gh-pages build
- npm build

Features
---
- Horizontal or vertical layout
- Drag handle
- Animation
- Ghost item
- Item movement is constrained to a single axis (x or y)

Who's using React Orderable?
---
- [Clari](http://www.clari.com)

Comparison to other libraries
---
- Unlike [jQuery Sortable](https://jqueryui.com/sortable), React Orderable manipulates the DOM purely through React.
- Unlike [RubaXa Sortable](https://github.com/RubaXa/Sortable), React Orderable manipulates the DOM purely through React.
- [React DnD](https://github.com/gaearon/react-dnd) is a wrapper around the DnD API. React Orderable doesn't use DnD. Instead, we implement reordering using mouse events. I think this is a simpler and more direct approach because we don't want to show the browser's ghost image and we don't want to configure separate drop targets.

Candidates for improvements
---
- Variable item size
- Item size from element bounds
- If I have variable item size, do I support changing item size during a drag?
- Margin between items
- Dragging items between groups