export function sanitizeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
