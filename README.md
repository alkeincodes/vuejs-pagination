# vuejs-pagination
a simple pagination component made for VueJS

### See it in action
<img src="https://media.giphy.com/media/tqMpuy5dDhpj6axyPL/giphy.gif" width="550" />

## Install package
```
npm install @alkeincodes/vuejs-pagination --save
```

### Register the component globally ES6
```js
import Pagination from '@alkeincodes/vuejs-pagination'
import '@alkeincodes/vuejs-pagination/dist/app.css'

Vue.use(Pagination)
```

### CDN
Include the source file.
```html
<!-- use the latest release -->
<script src="https://unpkg.com/@alkeincodes/vuejs-pagination@latest"></script>
```

### Usage
```js
<pagination :pages="20" :current-page="1" :per-page-size="5" @switch-page="myFunction" />
```

### Props
- `first-label`: `String` | Optional
- `last-label`: `String` | Optional
- `pages`: `Number` | Required | Total number of pages
- `current-page`: `Number` | Required | Current highlighted page number
- `per-page-size`: `Number` | Required | Page number shown
- `show-tray`: `Boolean` | Optional | Show the Previous and Next Page Trays
- `has-vue-router`: `Boolean` | Optional | If you have vue-router installed, this will help you push the current page number in to your route

### Event
- `switch-page`: triggers after selecting a page
