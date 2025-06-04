# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list



-frontend notes

For production modify directory home for 
backend\api\.htaccess
backend\.env
frontend\.env

-backend notes
composer dump-autoload


-Notes on adding new pages.

--frontend\src\app\routing\AppRoutes.tsx
This page is the main routing controller. Primary Function
It acts as a "traffic director" that determines which parts of your app users can access based on whether they're logged in or not.
Wraps everything in the main <App /> component
Delegates private route handling to a separate <PrivateRoutes /> component
Uses React Router's conditional rendering based on authentication state

--frontend\src\app\routing\PrivateRoutes.tsx
This page defines the protected/authenticated routes 
It handles all the routes that only logged-in users can access, wrapped within the main application layout.
Key Features
1. Layout Wrapper

All routes are wrapped in <MasterLayout /> - this provides the main app structure (header, sidebar, footer, etc.)

2. Route Definitions
Direct Routes (immediately loaded):

/dashboard → Main dashboard page
/builder → Layout builder tool
/menu-test → Menu testing page

Lazy-Loaded Routes (loaded on-demand for performance)


3. Performance Optimization

Uses lazy loading (React.lazy()) to split code into chunks
Pages only load when user navigates to them
Reduces initial bundle size and improves app startup time

4. Loading States

SuspensedView component shows a progress bar while lazy components load
Uses TopBarProgress for visual feedback during navigation

5. Redirect Logic

/auth/* → Redirects to dashboard (authenticated users shouldn't see login pages)
* (404) → Redirects to error page for invalid routes

This is essentially the "main application" that users see after logging in, with all the core school management features.



-e.g. 
frontend\src\app\modules\users\StaffPages.tsx

pages to consider
-frontend\src\_metronic\layout\components\aside\AsideMenuMain.tsx
-frontend\src\app\modules\profile\SchoolHeader.tsx





--Directory Structure
------------------------------------------------------------

frontend/src/app/modules/
└── staff/
    ├── StaffModule.tsx        # Main module wrapper
    ├── components/            # Reusable UI components
    │   ├── StaffTable.tsx
    │   ├── StaffFilters.tsx
    │   └── StaffCard.tsx
    ├── hooks/                 # Custom hooks
    │   └── useStaffData.ts
    ├── models/                # Types/interfaces
    │   └── staff.models.ts
    ├── api/                   # API calls
    │   └── staff.api.ts
    └── pages/                 # Page-level components
        ├── StaffListPage.tsx  # Main list view
        └── StaffViewPage.tsx  # Single staff view


frontend/src/_metronic/
└── layout/
    ├── components/
    │   └── staff/
    │       ├── StaffTable/              # Table with Metronic styling
    │       │   ├── StaffTable.tsx       # Main component
    │       │   ├── TableHeader.tsx      # Sub-components
    │       │   ├── TableRow.tsx
    │       │   └── styles.scss          # Component-specific styles
    │       │
    │       ├── StaffCards/              # Card view components
    │       │   ├── StaffCard.tsx
    │       │   ├── CardsGrid.tsx
    │       │   └── styles.scss
    │       │
    │       └── StaffFilters/            # Filter controls
    │           ├── FilterBar.tsx
    │           ├── PositionFilter.tsx
    │           └── styles.scss
    │
    └── partials/
        └── staff/
            ├── StaffToolbar/            # Toolbar with search/add buttons
            │   ├── Toolbar.tsx
            │   └── AddStaffModal.tsx
            │
            └── StaffPagination/         # Pagination controls
                ├── Pagination.tsx
                └── ItemsPerPage.tsx


frontend\src\_metronic\layout\components\aside\AsideMenuMain.tsx


Separation of Concerns

_metronic: Only cares about how things look

app/modules: Handles what data to show and business logic




frontend/src/
├── app/
│   └── modules/
│       └── {feature}/                  # e.g. "staff", "users", "products"
│           ├── {feature}.module.tsx    # Module exports
│           ├── hooks/
│           │   └── use{Feature}.ts     # Data fetching/logic
│           ├── models/
│           │   └── {feature}.model.ts  # TypeScript interfaces
│           └── pages/
│               └── {Feature}Page.tsx   # Main page wrapper
└── _metronic/
    └── layout/
        └── components/
            └── {feature}/             # UI components only
                ├── {Feature}Table.tsx
                └── {Feature}Card.tsx  # Optional



