// /docs/js/modules/glossary.js
console.log("[glossary] loading for module:", document.querySelector('meta[name=\"module\"]')?.content);
document.addEventListener("DOMContentLoaded", () => {
  const glossaryMaster = {
    "encryption":                  "encryption",
    "cipher":                      "cipher",
    "obfuscation":                 "obfuscation",
    "symmetric encryption":        "symmetric-encryption",
    "asymmetric encryption":       "asymmetric-encryption",
    "aes":                         "aes",
    "chacha20":                    "chacha20",
    "rsa":                         "rsa",
    "ecc":                         "ecc",
    "keypair":                     "keypair",
    "digital signature":           "digital-signature",
    "man-in-the-middle":           "man-in-the-middle",
    "certificate authority":       "certificate-authority",
    "public-key cryptography":     "public-key-cryptography",
    "cryptanalysis":               "cryptanalysis",
    "cryptographic failure":       "cryptographic-failure",
    "infrastructure":              "infrastructure",
    "des":                         "des",
    "md5":                         "md5",
    "digital resistance":          "digital-resistance"
  };

  const termOwnership = {
    // CPU
    "encryption":               "cpu",
    "cipher":                   "cpu",
    "obfuscation":              "cpu",
    "symmetric encryption":     "cpu",
    "asymmetric encryption":    "cpu",
    "aes":                      "cpu",
    "chacha20":                 "cpu",
    "rsa":                      "cpu",
    "ecc":                      "cpu",
    "digital resistance":       "cpu",
    "cryptanalysis":            "cpu",

    // SEC
    "cryptographic failure":    "sec",
    "infrastructure":           "sec",
    "des":                      "sec",
    "md5":                      "sec",

    // KEYPAIR
    "keypair":                  "keypair",
    "digital signature":        "keypair",
    "public-key cryptography":  "keypair",
    "man-in-the-middle":        "keypair",
    "certificate authority":    "keypair"
  };

  // 1️⃣ Detect current module
  const moduleMeta = document.querySelector('meta[name="module"]');
  const moduleName = (moduleMeta?.content || "").toLowerCase();

  // 2️⃣ Load which terms have *ever* been linked
  const storageKey = "obfuscateOS-linkedGlossaryTerms";
  let alreadyLinked = new Set();
  try {
    alreadyLinked = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));
  } catch {}

  // 3️⃣ Whitelist only the terms owned by this module
  const allowedTerms = Object.keys(termOwnership)
    .filter(term => termOwnership[term] === moduleName);

  // 4️⃣ Build term→anchor map
  const glossaryTerms = Object.fromEntries(
    allowedTerms.map(term => [term, glossaryMaster[term]])
                .filter(([, id]) => id)
  );

  // 5️⃣ Walk a node and link *all* first‐occurrences of our terms
  function walkAndLink(node) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);

    // Each textNode in here may contain multiple terms.
    while (walker.nextNode()) {
      const textNode = walker.currentNode;
      const parent   = textNode.parentNode;

      // Skip inside links, code, summaries, etc.
      if (parent.closest("a, summary, details, code, pre")) continue;

      let txt = textNode.nodeValue;
      // We'll build up new nodes as we go
      const frag = document.createDocumentFragment();
      let lastIndex = 0;

      // For each term, see if it matches somewhere in txt
      // but only if we haven't linked it yet
      allowedTerms.forEach(term => {
        if (alreadyLinked.has(term)) return;

        // match singular or trailing 's' (e.g. "failure" or "failures")
        const regex = new RegExp(`\\b${term}s?\\b`, "i");
        const m = regex.exec(txt);
        if (m) {
          const anchor = glossaryMaster[term];
          // take everything up to this match
          frag.appendChild(document.createTextNode(txt.slice(0, m.index)));
          // the matched text (with optional 's')
          const link = document.createElement("a");
          link.href = `../glossary/glossary.html#${anchor}`;
          link.textContent = m[0];
          frag.appendChild(link);

          alreadyLinked.add(term);
          // chop off what we've consumed
          txt = txt.slice(m.index + m[0].length);
        }
      });

      // append whatever remains
      frag.appendChild(document.createTextNode(txt));
      // replace the original textNode
      parent.replaceChild(frag, textNode);
    }
  }

  // 6️⃣ Apply to both <p> and <li> inside <main>
  document.querySelectorAll("main p, main li").forEach(node => {
    if (!node.closest("summary") && !node.closest("details")) {
      walkAndLink(node);
    }
  });

  // 7️⃣ Persist for next page load
  localStorage.setItem(storageKey, JSON.stringify([...alreadyLinked]));
});