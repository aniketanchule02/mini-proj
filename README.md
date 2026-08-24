# Urine Test Strip Reader — Point-of-Care Colorimetry System
**AI Use Case KJS-HC-03**  
*Developed with reference to Dr. Ninad Mehendale, K J Somaiya Hospital*

A multi-page React web application designed for point-of-care digital urinalysis. The system visibly demonstrates four fundamental React curriculum experiments connected in a single clinical workflow.

---

## 🔬 Four-Experiment React Showcase & Rubric Mapping

| Page Route | Component / Feature | React Concept Demonstrated (Rubric) |
| :--- | :--- | :--- |
| **Page 1: `/register`** | `RegistrationForm`, `PatientCard`, `PatientDashboard`, `StatusBadge` | **Experiment 1:** JSX, Props passing, Component Composition, List rendering |
| **Page 2: `/upload/:id`** | `ImageUploadBox`, `ImagePreview`, `CalibrationLoader`, `PatientSummaryHeader` | **Experiment 2:** React Hooks (`useState`, `useEffect` with `URL.revokeObjectURL` cleanup & mount lifecycle) |
| **Page 3: `/test-form/:id`** | `TestForm`, `FormField` (DRY wrapper), `FieldError` | **Experiment 3:** Controlled components (`value` + `onChange`), strict inline field-level validation |
| **Page 4: `/results/:id`** | `AnalysisLoader`, `ErrorState`, `DiagnosticReportCard` | **Experiment 4:** API Integration, asynchronous `fetch` lifecycle (loading, error with retry, success) |

---

## 🛠 Tech Stack

- **React 18** (Functional components only)
- **Vite** (Next-generation frontend tooling)
- **React Router DOM v6** (Multi-page routing with route guards)
- **Context API** (`PatientContext.jsx` with `useContext` for cross-page session management)
- **Plain CSS Design System** (Teal/blue clinical palette `#0d9488`, modern cards, soft shadows, responsive typography)
- **Lucide React** (Medical & interface iconography)
- **Zero Heavy UI Kits** (Hand-crafted accessible components)

---

## 🚀 Quickstart & Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🩺 Application Workflow

1. **Patient Registration (`/register`)**: Register a patient with clinical demographics, symptoms, and medical history. The patient is dynamically added to the patient registry dashboard.
2. **Strip Upload (`/upload/:patientId`)**: Upload or select a sample urine reagent strip. Demonstrates `URL.createObjectURL` along with automatic `URL.revokeObjectURL` cleanup in `useEffect`, followed by an ~800ms calibration reference loader.
3. **Clinical Test Form (`/test-form/:patientId`)**: Enter test date, panel type, manual pH (4.5–8.5), hydration level, and consent. Validated with inline `<FieldError />` alerts before advancing.
4. **AI Diagnostics & Report (`/results/:patientId`)**: Mounts an asynchronous fetch call showing a multi-stage colorimetry scan animation (`<AnalysisLoader />`), handles error state with retry (`<ErrorState />`), and presents a comprehensive diagnostic report (`<DiagnosticReportCard />`).

---

## 📂 Project Architecture

```
mini_wp2/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── sample-strip.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── PatientContext.jsx          # App-wide patient store & active test session
    ├── api/
    │   └── analysisApi.js              # Isolated async API service with network latency & retry
    ├── components/
    │   ├── Header.jsx                  # Top clinical branding & rubric modal
    │   ├── Stepper.jsx                 # Persistent 4-step progress indicator
    │   ├── StatusBadge.jsx             # Status badge (Registered, Ready, Analyzed, Flagged)
    │   ├── PatientCard.jsx             # Props-driven reusable card (Exp 1)
    │   ├── PatientDashboard.jsx        # Patient registry list with search/filter (Exp 1)
    │   ├── PatientSummaryHeader.jsx    # Compact patient banner (Pages 2-4)
    │   ├── ImageUploadBox.jsx          # Drag-and-drop & sample strip generator
    │   ├── ImagePreview.jsx            # Strip image display with color pads overlay
    │   ├── CalibrationLoader.jsx       # 800ms reference loader effect (Exp 2)
    │   ├── FormField.jsx               # DRY reusable input wrapper (Exp 3)
    │   ├── FieldError.jsx              # Accessible inline validation message (Exp 3)
    │   ├── AnalysisLoader.jsx          # Multi-parameter spectrum scanner (Exp 4)
    │   ├── ErrorState.jsx              # Network error & retry component (Exp 4)
    │   ├── DiagnosticReportCard.jsx    # Clinical report card with metrics & print (Exp 4)
    │   └── ConceptModal.jsx            # Educational rubric guide modal
    └── pages/
        ├── Register.jsx                # Page 1: /register
        ├── Upload.jsx                  # Page 2: /upload/:patientId
        ├── TestForm.jsx                # Page 3: /test-form/:patientId
        └── Results.jsx                 # Page 4: /results/:patientId
```
