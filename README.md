# Zooduck Icons
Sample library of scalable CSS icons built as pure <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank">HTML Web Components</a>.

![alt text](https://github.com/zooduck/screenshots/blob/master/zooduck-icons/zooduck-icons-v0.4.0-alpha.png)

## Examples
https://zooduck.github.io/zooduck-icons/dist/examples.html

## Usage
Include the following `<script>` tag in the `<head>` of your page:

```html
<script src="https://cdn.jsdelivr.net/gh/zooduck/zooduck-icons/dist/zooduck-icons.min.js"></script>
```

Then, either:

```html
<zooduck-icon-skyduck
    size="100"
    color="rebeccapurple"
    backgroundcolor="cornflowerblue">
</zooduck-icon-skyduck>
```

or:

```html
<zooduck-icon-skyduck></zooduck-icon-skyduck>

<script>
  const icon = document.querySelector('zooduck-icon-skyduck');
  icon.size = '100';
  icon.color = 'rebeccapurple';
  icon.backgroundcolor = 'cornflowerblue';
</script>
```

## Supported attributes
|Tag|Attributes|
|---|----------|
|zooduck-icon-circle|backgroundcolor, color, size|
|zooduck-icon-location|backgroundcolor, color, size|
|zooduck-icon-menu|backgroundcolor, color, size|
|zooduck-icon-skyduck|backgroundcolor, color, size|
|zooduck-icon-skyduck-alt|backgroundcolor, color, size|
|zooduck-icon-skyduck-in-flight|background-color, color, size|
|zooduck-icon-toggle|size, toggleoffcolor, toggleofftext, toggleoncolor, toggleontext, togglestate, toggleswitchcolor|
