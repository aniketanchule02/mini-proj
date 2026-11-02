# Urine Test Strip Reader — React Mini Project

This is the cleaned, VS Code-ready version of the uploaded repository.

## Tech stack
- React 18
- Vite 5
- React Router DOM 6
- Lucide React icons

## Folder structure

```text
urine-test-strip-reader-react/
├── public/
├── src/
│   ├── api/
│   │   └── analysisApi.js
│   ├── assets/
│   │   └── sample-strip.svg
│   ├── components/
│   ├── context/
│   │   └── PatientContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Upload.jsx
│   │   ├── TestForm.jsx
│   │   └── Results.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

## Run in VS Code

Open this folder in VS Code, then open the terminal:

```bash
npm install
npm run dev
```

Then open the local Vite address shown in the terminal (normally http://localhost:3000).

## Notes

The original repository had the JSX files at the repository root while many imports expected
a `src/components`, `src/pages`, `src/context`, and `src/api` structure. The files have been
placed into that expected Vite/React structure.

The existing TestForm page also referenced `setFormData`, which was missing from the original
PatientContext. That function has been added so the existing page can work if its route is used.

The existing upload flow still goes directly from strip upload to results, matching the original
App/Upload behavior. The TestForm route is now available separately at:

`/test-form/:patientId`
