// Generate URL slug from a developer key (как в Navigation):
// "Eagle Hills" → "eagle-hills", "B.N.H Developers" → "b-n-h-developers".
export function devSlug(key) {
  return key.toLowerCase().replace(/[\s.&]+/g, "-");
}

// Resolve a slug back to the original developer key from the developers map.
export function devKeyFromSlug(slug, developers) {
  return Object.keys(developers).find((k) => devSlug(k) === slug);
}

// Build the canonical developer detail URL.
export function devHref(key) {
  return `/developers/${devSlug(key)}`;
}
