# @alkeincodes/vuejs-pagination

## Install package
```
npm install @alkeincodes/vuejs-pagination --save
```

### Register the component globally ES6
```
import Pagination from '@alkeincodes/vuejs-pagination'
import '@alkeincodes/vuejs-pagination/dist/app.css'

Vue.use(Pagination)
```

### CDN
Include the source file.
```
<!-- use the latest release -->
<script src="https://unpkg.com/@alkeincodes/vuejs-pagination@latest"></script>
```

### Usage
```
<pagination :pages="20" :current-page="1" :pre-page-size="5" />
```