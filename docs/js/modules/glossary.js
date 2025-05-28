document.addEventListener("DOMContentLoaded", () => {
  const glossaryMaster = {
    "encryption": "encryption",
    "cipher": "cipher",
    "obfuscation": "obfuscation",
    "symmetric encryption": "symmetric-encryption",
    "asymmetric encryption": "asymmetric-encryption",
    "aes": "aes",
    "chacha20": "chacha20",
    "rsa": "rsa",
    "ecc": "ecc",
    "digital resistance": "digital-resistance",
    "cryptanalysis": "cryptanalysis",
    "cryptographic failure": "cryptographic-failure",
    "infrastructure": "infrastructure",
    "des": "des",
    "md5": "md5"
    // add more terms as needed
  };

  const allowed = window.allowedGlossaryTerms || [];
  const glossaryTerms = Object.fromEntries(
    allowed.map(term => [term, glossaryMaster[term]]).filter(([, id]) => id)
  );

  const linkedTerms = new Set();

  document.querySelectorAll("main p").forEach(p => {
    let html = p.innerHTML;

    Object.entries(glossaryTerms).forEach(([term, id]) => {
      if (linkedTerms.has(term)) return;
      const regex = new RegExp(`\\b(${term})\\b`, "i");
      if (regex.test(html)) {
        html = html.replace(regex, `<a href="../glossary/glossary.html#${id}">$1</a>`);
        linkedTerms.add(term);
      }
    });

    p.innerHTML = html;
  });
});