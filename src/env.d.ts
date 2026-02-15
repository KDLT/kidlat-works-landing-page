interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// tell the lsp when you see a any module.css import
// expect it to send an object with string values, see lead.view.js
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
