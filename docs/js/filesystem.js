// /docs/js/filesystem.js
// Virtual CLI-readable filesystem for Obfuscate-OS

window.ObfuscateFS = {
  currentPath: "/",
  structure: {
    "/": ["cpu", "crypto", "net", "guide", "blockchain"],
    "/cpu": ["cpu.txt", "sec.txt"],
    "/crypto": ["keypair.txt", "cypher.txt", "tools.txt", "ethics.txt"],
    "/net": ["net.txt"],
    "/guide": ["guide.txt"],
    "/blockchain": ["blockchain.txt"]
  },
  files: {
    "/cpu/cpu.txt": `# Module 1: CPU — Introduction to Encryption
Encryption turns readable data (plaintext) into unreadable noise (ciphertext).
It allows secure communication, protects privacy, and enables authentication.

Try: cd crypto → cat keypair.txt`,

    "/cpu/sec.txt": `# Module 2: SEC — Cryptographic Failures
Even strong algorithms can fail if implemented poorly or used incorrectly.

Try: cd net → cat net.txt`,

    "/crypto/keypair.txt": `# Public-Key Cryptography
Asymmetric encryption uses a keypair: public to encrypt, private to decrypt.

Try: cd crypto → cat cypher.txt`,

    "/crypto/cypher.txt": `# Symmetric Encryption
AES, DES, and other symmetric algorithms use one shared secret key.

Try: cd guide → cat guide.txt`,

    "/crypto/tools.txt": `# Encryption Tools
Explore tools like GPG, age, Veracrypt, and Signal.

Try: cd crypto → cat ethics.txt`,

    "/crypto/ethics.txt": `# Encryption Ethics
Encryption shapes power. Who gets to hide, and who gets exposed?

Try: cd blockchain → cat blockchain.txt`,

    "/net/net.txt": `# Metadata Awareness
Metadata reveals who talks to whom, when, and where.

Try: cd guide → cat guide.txt`,

    "/guide/guide.txt": `# Terminal Basics
Learn Bash-style commands to navigate and decrypt Obfuscate-OS.

Try: cd cpu → cat cpu.txt`,

    "/blockchain/blockchain.txt": `# Blockchain & Cryptocurrency
Blockchains use encryption to build trust without central authority.
Public-key cryptography, digital signatures, and hashing power decentralized ledgers.

Try: open blockchain`
  }
};