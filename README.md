# Ripple for the cursor
The ripple-cursor react component adds a blue ripple component for mouse and touch events. By default it is bound to the entire window. This compoent works for desktop and mobile web.

## How to use
Add a `<Ripple />` to your JSX.
Optional parameter:
- `size` - Size of ripple
- `color` - Color of the ripple
- `scope` - Default: `window`, element where the ripple should show. This is also useful if you want to show different ripple effects on different places on the web page.

### Issues
Open a ticket or feel free to contribute if you know the fix.

### Todos
- Tests
- Optimize CSS insertion
- Still to test in Android Native & IE browsers
- Optimizing for performance
