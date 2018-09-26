# Shoping Cart + User dashboard

Made with pain, tears and React&Redux.
Sass for styles.

### How to

This app requires [Node.js](https://nodejs.org/) v6+ and [Yarn](https://yarnpkg.com/lang/en/) to run.

Install the dependencies:

```sh
$ cd react-profile
$ npm install
```

Start development mode:
```sh
$ yarn start
```

Build for production:
```sh
$ yarn build
```

To configure proxy just look at `package.json`.

### DOM Namespace

This section is focused on DOM classes and ids available to use.
It's better to use `<div></div>` element.

- `#` - for ids;
- `.` - for class;

- `#userIcon` - user profile icon and dropdown menu/auth;
- `#cartIcon` - cart icon and dropdown with cart items or notifications;
- `#profilePage` - for user dashboard app;
- `#cartPage` - for cart app;
- `#r-app-heading` - for current page title. Used only in cart;
- `.addToCart__button` - for add-to-cart button. Each element requires `data-sku` attribute with SKU of adding product;

Each `.addToCart__button` will check the `window.productdata` variables, that must be an ARRAY;
Each product should have an object described below:

```sh
window.productdata = [
    {
        availability: "InStock",
        btntext: "В корзину",
        sku: "JR0501",
        qty: 1,
        title: "BlackWidow Tournament Chroma V2 (Green Switch)",
        image: "/razer-blackwidow-chroma-v2/img/razer-blackwidow-chroma-switcher.png",
        link: "/products/tankbot-kit/razer-blackwidow-chroma-v2"
    },
    {
        ...
    }
]
```

Correct SKU passed as `data-sku` attribute will gather and match information from `window.productdata` and make add-to-cart request;
Check console if something gone wrong - there are lot of useful warnings waiting for you!

### Config file `cfg.json`

This file includes module's names (that effects on `document.title`, nav-menu items and routes heading), order of dashboard modules and list of all modules available to use;

- `rootPath` - is the main path for account and child routes like `/account/settings`;
- `cartRootPath` - is the main path for cart and child routes like `/cart/purchase`;
- `containerClass` - DOM class, that applies for each wrapper component;
- `navClass` - DOM class, that applies for side nav in user account;
- `defaultProductImage` - URL to image, that would apply for product after adding to cart, if own image is empty;
- `usericon.classname` - DOM class, that applies for user icon & dropdown wrapper;
- `carticon.classname` - DOM class, that applies for cart icon & dropdown wrapper;
- `privacyPolicyLink` - URL to Privacy and policy page, that appears on registration and order-submiting;
- `modules` - Part of config that describes included modules in Profile application;
- `modules[n].name` - Not used for now, but will be used in future;
- `modules[n].title` - Module's title that appears on `document.title`;
- `modules[n].path` - Module's url that will go after `rootPath`. Absolute-path style needed (`/settings` - is correct);
- `module[n].component` - DO NOT CHANGE. Used for component matching;
- `dashboard` - Part of config that describes included DASHBOARD modules in Profile application and also ordering;
- `dashboard[n].name` - Not used for now, but will be used in future;
- `dashboard[n].title` - Dashboard module's title that appears on Side-Nav menu and Dashboard module heading;
- `dashboard[n].component` - DO NOT CHANGE. Used for component matching;
- `dashboard[n].className` - DOM class, that applies for [n] dashboard component;
- `all_modules` - Part of config that could be deleted in production. Describes all module components;
