async function getKeyMaterial(password) {
  return window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
}

async function getKey(keyMaterial, salt) {
  return window.crypto.subtle.deriveKey(
    { name:"PBKDF2", salt, iterations:100000, hash:"SHA-256" },
    keyMaterial,
    { name:"AES-GCM", length:256 },
    false,
    ["decrypt"]
  );
}

async function decryptData(encryptedBase64, password) {
  const decoded = JSON.parse(atob(encryptedBase64));
  const salt = Uint8Array.from(atob(decoded.s), c=>c.charCodeAt(0));
  const iv   = Uint8Array.from(atob(decoded.a), c=>c.charCodeAt(0));
  const data = Uint8Array.from(atob(decoded.v), c=>c.charCodeAt(0));

  const keyMat = await getKeyMaterial(password);
  const key    = await getKey(keyMat, salt);
  const decrypted = await window.crypto.subtle.decrypt(
    { name:"AES-GCM", iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}

function getPassphrase() {
  return new URLSearchParams(window.location.search).get("key") || "";
}

window.addEventListener("DOMContentLoaded", async()=>{
  const enc   = document.getElementById("fragment-data").textContent.trim();
  const pass  = getPassphrase();
  const cont  = document.getElementById("fragment-content");
  try {
    const plain = await decryptData(enc, pass);
    cont.innerHTML = `<p>${plain}</p>`;
  } catch {
    cont.innerHTML = `<p style="color:red;">Incorrect passphrase or corrupted data.</p>`;
  }
});