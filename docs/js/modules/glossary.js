// /docs/js/modules/glossary.js
// Dynamically link each glossary term once per site, organized by module

// Clear the console each time the module loads to isolate glossary logs
console.clear();
console.log("[glossary] loading for module:", document.querySelector('meta[name="module"]')?.content);

document.addEventListener("DOMContentLoaded", () => {
  // ──────────────────────────────────────────
  // 1. Master glossary map: term → anchor ID
  //    (includes both singular and plural where needed)
  // ──────────────────────────────────────────
  const glossaryMaster = {
    // CPU
    "encryption":             "encryption",
    "cipher":                 "cipher",
    "obfuscation":            "obfuscation",
    "symmetric encryption":   "symmetric-encryption",
    "asymmetric encryption":  "asymmetric-encryption",
    "aes":                    "aes",
    "chacha20":               "chacha20",
    "rsa":                    "rsa",
    "ecc":                    "ecc",
    "digital resistance":     "digital-resistance",
    "cryptanalysis":          "cryptanalysis",

    // SEC
    "cryptographic failure":  "cryptographic-failure",
    "cryptographic failures": "cryptographic-failure",
    "infrastructure":         "infrastructure",
    "des":                    "des",
    "md5":                    "md5",

    // Keypair
    "keypair":                "keypair",
    "digital signature":      "digital-signature",
    "public-key cryptography":"public-key-cryptography",
    "man-in-the-middle":      "man-in-the-middle",
    "certificate authority":  "certificate-authority",

    // Cypher
    "frequency analysis":     "frequency-analysis",
    "vigenere cipher":        "vigenere-cipher",
    "vigenère cipher":        "vigenere-cipher",
    "enigma":                 "enigma",

    // NET (Metadata Awareness)
    "metadata":               "metadata",
    "access":                 "access",
    "backdoor":               "backdoor",
    "decentralization":       "decentralization",
    "privacy":                "privacy",
    "surveillance capitalism": "surveillance-capitalism",
    "trust":                  "trust",
    "ethical encryption":     "ethical-encryption",

    // GUIDE (Terminal Basics)
    "terminal":               "terminal",
    "cli":                    "cli",
    "bash":                   "bash",
    "shell":                  "shell",
    "command line":           "command-line",
    "directory":              "directory",
    "file":                   "file",
    "environment variable":   "environment-variable",
    "path":                   "path",
    "script":                 "script",
    "command":                "command",

    // BLOCKCHAIN & Cryptocurrency
    "blockchain":             "blockchain",
    "consensus mechanism":    "consensus-mechanism",
    "cryptographic hash":     "cryptographic-hash",
    "hash function":          "hash-function",
    "merkle tree":            "merkle-tree",
    "digital identity":       "digital-identity",
    "dao":                    "dao",
    "smart contract":         "smart-contract",
    "proof of work":          "proof-of-work",
    "proof of stake":         "proof-of-stake",
    "zero-knowledge proof":   "zero-knowledge-proof"
  };

  // ──────────────────────────────────────────
  // 2. Term ownership by module
  // ──────────────────────────────────────────
  const termOwnership = {
    // CPU
    "encryption":             "cpu",
    "cipher":                 "cpu",
    "obfuscation":            "cpu",
    "symmetric encryption":   "cpu",
    "asymmetric encryption":  "cpu",
    "aes":                    "cpu",
    "chacha20":               "cpu",
    "rsa":                    "cpu",
    "ecc":                    "cpu",
    "digital resistance":     "cpu",
    "cryptanalysis":          "cpu",

    // SEC
    "cryptographic failure":  "sec",
    "cryptographic failures": "sec",
    "infrastructure":         "sec",
    "des":                    "sec",
    "md5":                    "sec",

    // Keypair
    "keypair":                "keypair",
    "digital signature":      "keypair",
    "public-key cryptography":"keypair",
    "man-in-the-middle":      "keypair",
    "certificate authority":  "keypair",

    // Cypher
    "frequency analysis":     "cypher",
    "vigenere cipher":        "cypher",
    "vigenère cipher":        "cypher",
    "enigma":                 "cypher",

    // NET (Metadata Awareness)
    "metadata":               "net",
    "access":                 "net",
    "backdoor":               "net",
    "decentralization":       "net",
    "privacy":                "net",
    "surveillance capitalism": "net",
    "trust":                  "net",
    "ethical encryption":     "net",

    // GUIDE (Terminal Basics)
    "terminal":               "guide",
    "cli":                    "guide",
    "bash":                   "guide",
    "shell":                  "guide",
    "command line":           "guide",
    "directory":              "guide",
    "file":                   "guide",
    "environment variable":   "guide",
    "path":                   "guide",
    "script":                 "guide",
    "command":                "guide",

    // BLOCKCHAIN & Cryptocurrency
    "blockchain":             "blockchain",
    "consensus mechanism":    "blockchain",
    "cryptographic hash":     "blockchain",
    "hash function":          "blockchain",
    "merkle tree":            "blockchain",
    "digital identity":       "blockchain",
    "dao":                    "blockchain",
    "smart contract":         "blockchain",
    "proof of work":          "blockchain",
    "proof of stake":         "blockchain",
    "zero-knowledge proof":   "blockchain"
  };

  // ──────────────────────────────────────────
  // 3. Detect current module (from <meta name="module">)
  // ──────────────────────────────────────────
  const moduleName = document
    .querySelector('meta[name="module"]')
    ?.content
    .toLowerCase() || "";

  // ──────────────────────────────────────────
  // 4. Load site-wide 'already-linked' set
  // ──────────────────────────────────────────
  const storageKey = "obfuscateOS-linkedGlossaryTerms";
  let alreadyLinked = new Set();
  try {
    alreadyLinked = new Set(
      JSON.parse(localStorage.getItem(storageKey) || "[]")
    );
  } catch {}

  // ──────────────────────────────────────────
  // 5. Gather terms owned by this module
  // ──────────────────────────────────────────
  const allowedTerms = Object
    .keys(termOwnership)
    .filter(term => termOwnership[term] === moduleName);

  // ──────────────────────────────────────────
  // 6. Link each term once per module globally
  // ──────────────────────────────────────────
  allowedTerms.forEach(term => {
    if (alreadyLinked.has(term)) return;
    const anchor = glossaryMaster[term];
    if (!anchor) return;

    const nodes = Array.from(
      document.querySelectorAll("main p, main li")
    );

    for (const node of nodes) {
      if (node.closest("summary, details")) continue;
      const section = node.closest("section.fade-in-up");
      if (section) {
        const heading = section
          .querySelector("h2.section-heading")
          ?.textContent
          .toLowerCase() || "";
        if (heading.includes("further reading")) continue;
      }

      const regex = new RegExp(`\\b${term.replace(/[-\\/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i");
      if (!regex.test(node.textContent)) continue;

      node.innerHTML = node.innerHTML.replace(
        regex,
        `<a href=\"../glossary/glossary.html#${anchor}\">$&</a>`
      );
      alreadyLinked.add(term);
      break;
    }
  });

  // ──────────────────────────────────────────
  // 7. Persist updated set
  // ──────────────────────────────────────────
  localStorage.setItem(storageKey, JSON.stringify([...alreadyLinked]));
});