# vuejs-pagination

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
<pagination :pages="20" :current-page="1" :pre-page-size="5" />
```