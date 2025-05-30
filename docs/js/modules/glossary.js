// /docs/js/modules/glossary.js
// Fixed version with better term linking and debugging

console.clear();
console.log("[glossary] Enhanced system loading for module:", document.querySelector('meta[name="module"]')?.content);

document.addEventListener("DOMContentLoaded", () => {
  // ──────────────────────────────────────────
  // 1. Master glossary map: term → anchor ID
  // ──────────────────────────────────────────
  const glossaryMaster = {
    // CPU module terms
    "encryption": "encryption",
    "cipher": "cipher",
    "ciphers": "cipher",
    "obfuscation": "obfuscation",
    "symmetric encryption": "symmetric-encryption",
    "asymmetric encryption": "asymmetric-encryption",
    "aes": "aes",
    "chacha20": "chacha20",
    "rsa": "rsa",
    "ecc": "ecc",
    "digital resistance": "digital-resistance",
    "cryptanalysis": "cryptanalysis",
    "plaintext": "encryption",
    "ciphertext": "encryption",
    "key": "encryption",
    "keys": "encryption",

    // SEC module terms
    "cryptographic failure": "cryptographic-failure",
    "cryptographic failures": "cryptographic-failure",
    "infrastructure": "infrastructure",
    "des": "des",
    "md5": "md5",
    "ssl": "infrastructure",
    "tls": "infrastructure",
    "vulnerability": "cryptographic-failure",
    "vulnerabilities": "cryptographic-failure",
    "implementation": "infrastructure",
    "certificate": "certificate-authority",
    "certificates": "certificate-authority",

    // Keypair module terms
    "keypair": "keypair",
    "keypairs": "keypair",
    "digital signature": "digital-signature",
    "digital signatures": "digital-signature",
    "public-key cryptography": "public-key-cryptography",
    "public key": "keypair",
    "private key": "keypair",
    "man-in-the-middle": "man-in-the-middle",
    "certificate authority": "certificate-authority",
    "diffie-hellman": "keypair",
    "asymmetric": "keypair",

    // Cypher module terms
    "frequency analysis": "frequency-analysis",
    "vigenere cipher": "vigenere-cipher",
    "vigenère cipher": "vigenere-cipher",
    "caesar cipher": "cipher",
    "caesar": "cipher",
    "enigma": "enigma",
    "substitution": "cipher",
    "polyalphabetic": "vigenere-cipher",
    "monoalphabetic": "frequency-analysis",
    "playfair": "cipher",
    "rotor": "enigma",

    // NET module terms
    "metadata": "metadata",
    "access": "access",
    "backdoor": "backdoor",
    "decentralization": "decentralization",
    "privacy": "privacy",
    "surveillance capitalism": "surveillance-capitalism",
    "surveillance": "surveillance-capitalism",
    "trust": "trust",
    "ethical encryption": "ethical-encryption",
    "transparency": "transparency",
    "visibility": "privacy",

    // GUIDE module terms
    "terminal": "terminal",
    "cli": "cli",
    "bash": "bash",
    "shell": "shell",
    "command line": "cli",
    "command-line": "cli",
    "directory": "terminal",
    "file": "terminal",
    "script": "terminal",
    "command": "cli",
    "unix": "terminal",
    "linux": "terminal",
    "path": "terminal",
    "filesystem": "terminal",

    // BLOCKCHAIN module terms
    "blockchain": "blockchain",
    "consensus mechanism": "consensus-mechanism",
    "cryptographic hash": "cryptographic-hash",
    "hash function": "hash-function",
    "merkle tree": "merkle-tree",
    "digital identity": "digital-identity",
    "dao": "dao",
    "smart contract": "smart-contract",
    "proof of work": "proof-of-work",
    "proof of stake": "proof-of-stake",
    "zero-knowledge proof": "zero-knowledge-proof",
    "zero-knowledge": "zero-knowledge-proof",
    "zk-snarks": "zero-knowledge-proof",
    "zk-starks": "zero-knowledge-proof",
    "cryptocurrency": "blockchain",
    "bitcoin": "blockchain",
    "ethereum": "blockchain",
    "mining": "proof-of-work",

    // TOOLS module terms
    "pgp": "pgp",
    "gpg": "pgp",
    "pretty good privacy": "pgp",
    "gnupg": "pgp",
    "veracrypt": "veracrypt",
    "signal": "signal",
    "briar": "signal",
    "session": "signal",
    "tor": "tor",
    "tor browser": "tor",
    "onion routing": "tor",
    "thunderbird": "pgp",
    "enigmail": "pgp",
    "tutanota": "pgp",
    "protonmail": "pgp",
    "cryptomator": "veracrypt",
    "age": "pgp",
    "openssl": "infrastructure",
    "librewolf": "tor",
    "grapheneos": "signal",
    "brave": "tor",
    "duckduckgo": "privacy",

    // ETHICS module terms
    "ethics": "ethical-encryption",
    "legal": "legal-framework",
    "law": "legal-framework",
    "policy": "legal-framework",
    "regulation": "legal-framework",
    "government": "legal-framework",
    "authority": "legal-framework",
    "rights": "privacy",
    "surveillance state": "surveillance-capitalism",
    "civil liberties": "privacy",
    "fifth amendment": "legal-framework",
    "fourth amendment": "privacy",
    "apple vs fbi": "legal-framework",
    "encryption ban": "legal-framework",
    "backdoors": "backdoor",
    "key escrow": "backdoor",
    "crypto wars": "legal-framework",
    "earn it act": "legal-framework",
    "going dark": "legal-framework",

    // ALGEBRA module terms
    "group": "group",
    "groups": "group",
    "field": "prime-field",
    "fields": "prime-field",
    "prime field": "prime-field",
    "modular arithmetic": "modular-arithmetic",
    "modular": "modular-arithmetic",
    "modulus": "modular-arithmetic",
    "elliptic curve": "ecc",
    "elliptic curves": "ecc",
    "elliptic curve cryptography": "ecc",
    "one-way function": "one-way-function",
    "one-way functions": "one-way-function",
    "discrete logarithm": "one-way-function",
    "factoring": "rsa",
    "prime factorization": "rsa",
    "cyclic group": "group",
    "cyclic groups": "group",
    "inverse": "group",
    "inverses": "group",
    "generator": "group",
    "finite field": "prime-field",
    "galois field": "prime-field",
    "abstract algebra": "group",
    "number theory": "prime-field"
  };

  // ──────────────────────────────────────────
  // 2. Term ownership by module (PER-MODULE LINKING)
  // ──────────────────────────────────────────
  const termOwnership = {
    // CPU terms
    "encryption": "cpu",
    "cipher": "cpu",
    "ciphers": "cpu",
    "obfuscation": "cpu",
    "symmetric encryption": "cpu",
    "asymmetric encryption": "cpu",
    "aes": "cpu",
    "chacha20": "cpu",
    "rsa": "cpu",
    "ecc": "cpu",
    "digital resistance": "cpu",
    "cryptanalysis": "cpu",
    "plaintext": "cpu",
    "ciphertext": "cpu",
    "key": "cpu",
    "keys": "cpu",

    // SEC terms
    "cryptographic failure": "sec",
    "cryptographic failures": "sec",
    "infrastructure": "sec",
    "des": "sec",
    "md5": "sec",
    "ssl": "sec",
    "tls": "sec",
    "vulnerability": "sec",
    "vulnerabilities": "sec",
    "implementation": "sec",
    "certificate": "sec",
    "certificates": "sec",

    // Keypair terms
    "keypair": "keypair",
    "keypairs": "keypair",
    "digital signature": "keypair",
    "digital signatures": "keypair",
    "public-key cryptography": "keypair",
    "public key": "keypair",
    "private key": "keypair",
    "man-in-the-middle": "keypair",
    "certificate authority": "keypair",
    "diffie-hellman": "keypair",
    "asymmetric": "keypair",

    // Cypher terms
    "frequency analysis": "cypher",
    "vigenere cipher": "cypher",
    "vigenère cipher": "cypher",
    "caesar cipher": "cypher",
    "caesar": "cypher",
    "enigma": "cypher",
    "substitution": "cypher",
    "polyalphabetic": "cypher",
    "monoalphabetic": "cypher",
    "playfair": "cypher",
    "rotor": "cypher",

    // NET terms
    "metadata": "net",
    "access": "net",
    "backdoor": "net",
    "decentralization": "net",
    "privacy": "net",
    "surveillance capitalism": "net",
    "surveillance": "net",
    "trust": "net",
    "ethical encryption": "net",
    "transparency": "net",
    "visibility": "net",

    // GUIDE terms
    "terminal": "guide",
    "cli": "guide",
    "bash": "guide",
    "shell": "guide",
    "command line": "guide",
    "command-line": "guide",
    "directory": "guide",
    "file": "guide",
    "script": "guide",
    "command": "guide",
    "unix": "guide",
    "linux": "guide",
    "path": "guide",
    "filesystem": "guide",

    // BLOCKCHAIN terms
    "blockchain": "blockchain",
    "consensus mechanism": "blockchain",
    "cryptographic hash": "blockchain",
    "hash function": "blockchain",
    "merkle tree": "blockchain",
    "digital identity": "blockchain",
    "dao": "blockchain",
    "smart contract": "blockchain",
    "proof of work": "blockchain",
    "proof of stake": "blockchain",
    "zero-knowledge proof": "blockchain",
    "zero-knowledge": "blockchain",
    "zk-snarks": "blockchain",
    "zk-starks": "blockchain",
    "cryptocurrency": "blockchain",
    "bitcoin": "blockchain",
    "ethereum": "blockchain",
    "mining": "blockchain",

    // TOOLS terms
    "pgp": "tools",
    "gpg": "tools",
    "pretty good privacy": "tools",
    "gnupg": "tools",
    "veracrypt": "tools",
    "signal": "tools",
    "briar": "tools",
    "session": "tools",
    "tor": "tools",
    "tor browser": "tools",
    "onion routing": "tools",
    "thunderbird": "tools",
    "enigmail": "tools",
    "tutanota": "tools",
    "protonmail": "tools",
    "cryptomator": "tools",
    "age": "tools",
    "openssl": "tools",
    "librewolf": "tools",
    "grapheneos": "tools",
    "brave": "tools",
    "duckduckgo": "tools",

    // ETHICS terms
    "ethics": "ethics",
    "legal": "ethics",
    "law": "ethics",
    "policy": "ethics",
    "regulation": "ethics",
    "government": "ethics",
    "authority": "ethics",
    "rights": "ethics",
    "surveillance state": "ethics",
    "civil liberties": "ethics",
    "fifth amendment": "ethics",
    "fourth amendment": "ethics",
    "apple vs fbi": "ethics",
    "encryption ban": "ethics",
    "backdoors": "ethics",
    "key escrow": "ethics",
    "crypto wars": "ethics",
    "earn it act": "ethics",
    "going dark": "ethics",

    // ALGEBRA terms
    "group": "algebra",
    "groups": "algebra",
    "field": "algebra",
    "fields": "algebra",
    "prime field": "algebra",
    "modular arithmetic": "algebra",
    "modular": "algebra",
    "modulus": "algebra",
    "elliptic curve": "algebra",
    "elliptic curves": "algebra",
    "elliptic curve cryptography": "algebra",
    "one-way function": "algebra",
    "one-way functions": "algebra",
    "discrete logarithm": "algebra",
    "factoring": "algebra",
    "prime factorization": "algebra",
    "cyclic group": "algebra",
    "cyclic groups": "algebra",
    "inverse": "algebra",
    "inverses": "algebra",
    "generator": "algebra",
    "finite field": "algebra",
    "galois field": "algebra",
    "abstract algebra": "algebra",
    "number theory": "algebra"
  };

  // ──────────────────────────────────────────
  // 3. Detect current module from meta tag
  // ──────────────────────────────────────────
  const moduleName = document
    .querySelector('meta[name="module"]')
    ?.content
    .toLowerCase() || "";

  console.log("[glossary] Current module:", moduleName);

  // ──────────────────────────────────────────
  // 4. CHANGED: Per-module storage instead of global
  // ──────────────────────────────────────────
  const storageKey = `obfuscateOS-linkedTerms-${moduleName}`;
  let alreadyLinked = new Set();
  
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      alreadyLinked = new Set(JSON.parse(stored));
    }
  } catch (error) {
    console.warn("[glossary] Error loading stored terms:", error);
    alreadyLinked = new Set();
  }

  // ──────────────────────────────────────────
  // 5. Get terms owned by current module
  // ──────────────────────────────────────────
  const allowedTerms = Object
    .keys(termOwnership)
    .filter(term => termOwnership[term] === moduleName);

  console.log("[glossary] Terms available for linking:", allowedTerms.length, "terms");
  console.log("[glossary] Already linked on this module:", alreadyLinked.size, "terms");

  // ──────────────────────────────────────────
  // 6. ENHANCED: Better term linking with more aggressive targeting
  // ──────────────────────────────────────────
  function linkTerm(term) {
    const termKey = `${moduleName}-${term}`;
    if (alreadyLinked.has(termKey)) {
      console.log(`[glossary] Term "${term}" already linked on this module`);
      return false;
    }

    const anchor = glossaryMaster[term];
    if (!anchor) {
      console.warn(`[glossary] No anchor found for term: ${term}`);
      return false;
    }

    // More aggressive content targeting
    const targetSelectors = [
      'main p',
      'main li', 
      'section p',
      '.module-content p',
      '.module-content li',
      '.fade-in-up p',
      '.fade-in-up li',
      '.key-concepts p',
      '.concept-item',
      'td' // Include table cells
    ];
    
    const nodes = [];
    targetSelectors.forEach(selector => {
      nodes.push(...Array.from(document.querySelectorAll(selector)));
    });

    console.log(`[glossary] Found ${nodes.length} potential target nodes`);

    // Less restrictive filtering
    const validNodes = nodes.filter(node => {
      // Skip navigation and footer areas
      if (node.closest('.nav-section, footer, #site-footer, .nav-button-container, .nav-back')) return false;
      
      // Skip "Further Reading" sections only
      const section = node.closest('section.fade-in-up, section');
      if (section) {
        const heading = section.querySelector('h2, .section-heading')?.textContent?.toLowerCase() || '';
        if (heading.includes('further reading')) return false;
      }
      
      // Allow nodes with existing links, but not glossary links to this term
      const existingGlossaryLink = node.querySelector(`a[href*="glossary.html"][data-term="${term}"]`);
      if (existingGlossaryLink) return false;
      
      return true;
    });

    console.log(`[glossary] ${validNodes.length} valid nodes after filtering`);

    // Create case-insensitive regex with word boundaries
    const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escapedTerm}\\b`, 'gi');

    // Find first matching node and link it
    for (let i = 0; i < validNodes.length; i++) {
      const node = validNodes[i];
      const textContent = node.textContent;
      
      if (!regex.test(textContent)) continue;

      console.log(`[glossary] Found "${term}" in node ${i}:`, textContent.substring(0, 100) + "...");
      
      // Create the link
      const linkHtml = `<a href="../glossary/glossary.html#${anchor}" class="glossary-link" data-term="${term}" title="View in glossary: ${term}">$&</a>`;
      
      // Replace first occurrence only
      const newHTML = node.innerHTML.replace(regex, linkHtml);
      if (newHTML !== node.innerHTML) {
        node.innerHTML = newHTML;
        alreadyLinked.add(termKey);
        console.log(`[glossary] ✅ Successfully linked "${term}"`);
        return true;
      }
    }

    console.log(`[glossary] ❌ No suitable location found for term: ${term}`);
    return false;
  }

  // ──────────────────────────────────────────
  // 7. Link all allowed terms for this module
  // ──────────────────────────────────────────
  let linkedCount = 0;
  
  // Sort terms by length (longest first) to avoid partial matches
  const sortedTerms = allowedTerms.sort((a, b) => b.length - a.length);
  
  sortedTerms.forEach(term => {
    if (linkTerm(term)) {
      linkedCount++;
    }
  });

  console.log(`[glossary] Successfully linked ${linkedCount} terms for module: ${moduleName}`);

  // ──────────────────────────────────────────
  // 8. Save updated linked terms (per-module)
  // ──────────────────────────────────────────
  try {
    localStorage.setItem(storageKey, JSON.stringify([...alreadyLinked]));
  } catch (error) {
    console.warn("[glossary] Error saving linked terms:", error);
  }

  // ──────────────────────────────────────────
  // 9. Enhanced debugging
  // ──────────────────────────────────────────
  console.log(`[glossary] === FINAL STATS ===`);
  console.log(`[glossary] Module: ${moduleName}`);
  console.log(`[glossary] Available terms: ${allowedTerms.length}`);
  console.log(`[glossary] Successfully linked: ${linkedCount}`);
  console.log(`[glossary] Terms linked on this module: ${alreadyLinked.size}`);
  
  // Add global reset function for debugging
  window.resetGlossaryForModule = function(module = moduleName) {
    const key = `obfuscateOS-linkedTerms-${module}`;
    localStorage.removeItem(key);
    console.log(`✅ Reset glossary storage for module: ${module}`);
    console.log('Reload the page to re-link terms.');
  };
  
  window.debugGlossarySystem = function() {
    console.log('=== GLOSSARY DEBUG INFO ===');
    console.log('Current module:', moduleName);
    console.log('Storage key:', storageKey);
    console.log('Terms for this module:', allowedTerms);
    console.log('Already linked:', [...alreadyLinked]);
    
    // Test first few terms
    const testTerms = allowedTerms.slice(0, 3);
    testTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const found = document.body.textContent.match(regex);
      console.log(`Term "${term}" appears ${found ? found.length : 0} times in page content`);
    });
  };
  
  // Add module identifier to body
  if (moduleName) {
    document.body.classList.add(`module-${moduleName}`);
  }
});