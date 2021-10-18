const socket = io();

const chatContext = document.querySelector('.chat-messages');

const nameOfRoom = document.querySelector('#room-name');

const listOfUsers = document.querySelector('#users');

const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix : true
});

socket.emit('userJoinRoom', {username, room})

socket.on('message', message =>{
    chatFunction(message);

    chatContext.scrollTop = chatContext.scrollHeight
});

const form = document.querySelector('#chat-form');

socket.on('userRoom', ({room,users})=>{
    roomName (room);
    usersFunc (users)
});

const roomName = (room)=>{
    nameOfRoom.innerText = room;
};

const usersFunc = (users)=>{
    listOfUsers.innerHTML = `${users.map (user => `<li>${user.username} </li>`).join('')}`
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    let message = event.target.elements.msg.value

    socket.emit('chatMessage', message);

    event.target.elements.msg.value = '' ; 
    event.target.elements.msg.focus();
});

const chatFunction = (message)=>{
    const div = document.createElement('div');

    div.classList.add('message');


    div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time}</span> </p>
    <p class="text">
    ${message.message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}