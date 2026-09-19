# Sarcasm Marking Desk (React)

A standalone React app that detects sarcasm, classifies its type, and explains why —
entirely in the browser, no backend or GPU required.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To build a static production bundle you can host anywhere:

```bash
npm run build
```

This outputs a `dist/` folder you can open directly or deploy to any static host.

## How it works

- `src/models/stage1_model.json` and `src/models/stage2_model.json` are TF-IDF
  vocabularies + Logistic Regression weights exported from scikit-learn models
  trained on the full iSarcasm training set (see the notebook's Section 14 for the
  training/export code).
- `src/inference.js` reimplements scikit-learn's `TfidfVectorizer.transform()` +
  `LogisticRegression.predict_proba()` in plain JavaScript, verified against the
  original Python output to 5+ decimal places, plus a rule-based explanation module.
- `src/App.jsx` is the UI: type text, click "Mark this text", and see the sarcasm
  verdict, type breakdown, and explanation.

Nothing typed into this app is sent anywhere — all inference runs client-side.

## Regenerating the models

If you retrain the baseline models (e.g. after editing the notebook), re-run the
export cells in Section 14 of `Explainable_Sarcasm_Detection.ipynb` and copy the two
resulting JSON files into `src/models/`, replacing the existing ones.
