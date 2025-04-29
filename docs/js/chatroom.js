// chatroom.js — very basic in-page mock chat

document.addEventListener('DOMContentLoaded',()=>{
  const form = document.getElementById('chat-form');
  const list = document.getElementById('chat-list');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const txt = form.elements['message'].value.trim();
    if(!txt) return;
    const li = document.createElement('li');
    li.textContent = txt;
    list.appendChild(li);
    form.reset();
    list.scrollTop = list.scrollHeight;
  });
});