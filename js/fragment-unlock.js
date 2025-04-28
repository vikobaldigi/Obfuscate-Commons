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
      { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
  }
  
  async function decryptData(encryptedBase64, password) {
    const decoded = JSON.parse(atob(encryptedBase64));
    const salt = Uint8Array.from(atob(decoded.s), c => c.charCodeAt(0));
    const iv   = Uint8Array.from(atob(decoded.a), c => c.charCodeAt(0));
    const data = Uint8Array.from(atob(decoded.v), c => c.charCodeAt(0));
  
    const keyMaterial = await getKeyMaterial(password);
    const key = await getKey(keyMaterial, salt);
    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );
  
    return new TextDecoder().decode(decrypted);
  }
  
  function getPassphrase() {
    return new URLSearchParams(location.search).get("key") || "";
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
    const encrypted = document.getElementById("fragment-data").textContent.trim();
    const password  = getPassphrase();
    const container = document.getElementById("fragment-content");
  
    try {
      const plain = await decryptData(encrypted, password);
  
      // If your decrypted payload is a chatroom UI scaffold (wrapped
      // in a `<div id="chat-interface">…</div>`), inject it verbatim:
      if (plain.trim().startsWith("<div id=\"chat-interface\">")) {
        container.innerHTML = plain;
        initChat();     // hook into your chat-client bootstrap
      } else {
        // Otherwise treat it as plaintext fragment
        container.innerHTML = `<p>${plain}</p>`;
      }
  
    } catch (e) {
      container.innerHTML = `<p style="color:red;">
        Incorrect passphrase or corrupted data.
      </p>`;
    }
  });
  
  // Example stub for hooking your chat client on the decrypted HTML:
  function initChat() {
    const chatBox = document.getElementById("chat-interface");
    const input   = chatBox.querySelector("input");
    const sendBtn = chatBox.querySelector("button");
    const log     = chatBox.querySelector(".chat-log");
  
    // TODO: wire up your websocket / fetch() here
    sendBtn.addEventListener("click", () => {
      const msg = input.value.trim();
      if (!msg) return;
      // e.g. fetch("/api/chat/rigel", { method:"POST", body:JSON.stringify({msg}) })
      log.innerHTML += `<div class="msg me">${msg}</div>`;
      input.value = "";
    });
  }  