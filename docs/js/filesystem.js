// /docs/js/filesystem.js
// Virtual CLI-readable filesystem for Obfuscate-OS

window.ObfuscateFS = {
  currentPath: "/",
  structure: {
    "/": ["cpu", "crypto", "net", "guide"],
    "/cpu": ["cpu.txt", "sec.txt"],
    "/crypto": ["keypair.txt", "cypher.txt", "tools.txt", "ethics.txt"],
    "/net": ["net.txt"],
    "/guide": ["guide.txt"]
  },
  files: {} // Loaded dynamically
};

// Function to load external .txt files into memory
async function loadTextFile(path, url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    window.ObfuscateFS.files[path] = text;
  } catch (error) {
    console.error(`Failed to load ${url}`, error);
    window.ObfuscateFS.files[path] = `ERROR: Could not load ${url}`;
  }
}

// Map CLI file paths to URLs
const txtFiles = {
  "/cpu/cpu.txt": "modules/cpu/cpu.txt",
  "/cpu/sec.txt": "modules/cpu/sec.txt",
  "/crypto/keypair.txt": "modules/crypto/keypair.txt",
  "/crypto/cypher.txt": "modules/crypto/cypher.txt",
  "/crypto/tools.txt": "modules/crypto/tools.txt",
  "/crypto/ethics.txt": "modules/crypto/ethics.txt",
  "/net/net.txt": "modules/net/net.txt",
  "/guide/guide.txt": "modules/guide/guide.txt"
};

// Preload all text files into memory
Object.entries(txtFiles).forEach(([path, url]) => {
  loadTextFile(path, url);
});