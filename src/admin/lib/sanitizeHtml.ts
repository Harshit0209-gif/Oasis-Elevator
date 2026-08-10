const ALLOWED_TAGS = new Set(["P", "B", "STRONG", "I", "EM", "UL", "OL", "LI", "A", "BR"]);

/**
 * Allow-list HTML sanitizer for the constrained rich-text field. Strips any
 * tag not in ALLOWED_TAGS (unwrapping its contents rather than discarding
 * them) and any attribute on `<a>` other than a safe `href`. Runs entirely
 * via the DOM (DOMParser), no external dependency — deliberately small
 * surface area since the only place this content renders is our own site.
 */
export function sanitizeHtml(dirty: string): string {
  const doc = new DOMParser().parseFromString(dirty, "text/html");

  function clean(node: Node) {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) continue;

      if (child.nodeType !== Node.ELEMENT_NODE) {
        child.remove();
        continue;
      }

      const el = child as Element;
      clean(el);

      if (!ALLOWED_TAGS.has(el.tagName)) {
        // Unwrap: keep the text/children, drop the disallowed wrapper.
        while (el.firstChild) el.parentNode?.insertBefore(el.firstChild, el);
        el.remove();
        continue;
      }

      for (const attr of Array.from(el.attributes)) {
        if (el.tagName === "A" && attr.name === "href") {
          // Block javascript: / data: URIs — only allow real links.
          if (/^\s*(javascript|data):/i.test(attr.value)) el.removeAttribute(attr.name);
          continue;
        }
        el.removeAttribute(attr.name);
      }

      if (el.tagName === "A") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  }

  clean(doc.body);
  return doc.body.innerHTML;
}
