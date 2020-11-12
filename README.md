# vuejs-pagination
a simple pagination component made for VueJS

### See it in action
<img src="https://raw.githubusercontent.com/lokyoung/vuejs-paginate/master/img/pagination-show.gif" width="550" />

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
<pagination :pages="20" :current-page="1" :per-page-size="5" />
```

### Props
- `first-label`: `String` | Optional
- `last-label`: `String` | Optional
- `pages`: `Number` | Required | Total number of pages
- `current-page`: `Number` | Required | Current highlighted page number
- `per-page-size`: `Number` | Required | Page number shown
- `has-vue-router`: `Boolean` | Optional | If you have vue-router installed, this will help you push the current page number in to your route
