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



-frontend
Modify directory home for 
backend\api\.htaccess
frontend\.env

-backend
composer dump-autoload

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



