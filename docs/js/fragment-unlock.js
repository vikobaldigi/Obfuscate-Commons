async function getKeyMaterial(password) {
  return window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
}
// …rest of your existing code…
window.addEventListener("DOMContentLoaded", async()=>{
  const enc   = document.getElementById("fragment-data").textContent.trim();
  const pass  = new URLSearchParams(window.location.search).get("key") || "";
  const cont  = document.getElementById("fragment-content");
  try {
    const plain = await decryptData(enc, pass);
    cont.innerHTML = `<p>${plain}</p>`;
  } catch {
    cont.innerHTML = `<p style="color:red;">Incorrect passphrase or corrupted data.</p>`;
  }
});