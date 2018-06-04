# prevent-bounce
simple prevent iOS dismiss event for web application.

# How to Use
#### Browser
```html
<script src="./prevent-bounce.js"></script>
<script>
    var preventBounce = new PreventBounce();
    preventBounce.attach();
</script>
```

#### ES6
```javascript
import PreventBounce from 'prevent-bounce';

const preventBounce = new PreventBounce();
preventBounce.attach();
```

# Method
#### attach(element)
attach prevent event the element. if element is blank, default attached `document`.

#### remove()
remove prevent event.


