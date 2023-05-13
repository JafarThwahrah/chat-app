const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const chatForm = document.getElementById('chat-form')
const {username , room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

//join room
socket.emit('joinRoom',{username , room})

socket.on('message', (message)=>{
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage',msg)
    e.target.elements.msg.value=""
    e.target.elements.msg.focus()

})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText =`${message.username}`;
    p.innerHTML += `<span> ${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }
  fileForm = document.getElementById('file-form')
  fileForm.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('uploaded', fileInput.files[0]);
    fetch("http://localhost:3000/upload-file", {
        method: 'POST',
        body: formData
      })
        .then(response => console.log(response))
        .catch(error => console.error(error));
  })