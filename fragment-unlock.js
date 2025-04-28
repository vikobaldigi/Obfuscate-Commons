/* your AES-GCM decryptor from before */
async function getKeyMaterial(password) { … }
async function getKey(keyMaterial,salt){ … }
async function decryptData(encryptedBase64,password){ … }
function getPassphrase(){
  let params=new URLSearchParams(window.location.search);
  return params.get('key')||'';
}
window.addEventListener('DOMContentLoaded',async()=>{
  const enc=document.getElementById('fragment-data').textContent.trim();
  const pwd=getPassphrase(), out=document.getElementById('fragment-content');
  try {
    out.innerHTML=`<p>${await decryptData(enc,pwd)}</p>`;
  } catch {
    out.innerHTML=`<p style="color:red">Incorrect or corrupted fragment.</p>`;
  }
});