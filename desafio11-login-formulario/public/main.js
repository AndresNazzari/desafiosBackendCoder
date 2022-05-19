const socket = io();

function addMessage(e) {
    const mensaje = {
        author: {
            id: document.getElementById('id').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            alias: document.getElementById('alias').value,
            edad: document.getElementById('edad').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('texto').value,
        date: new Date().toLocaleString(),
    };
    socket.emit('newMessage', mensaje);
    return false;
}

function renderMessages(data) {
    const html = data.messages
        .map((elem, index) => {
            return `<div>
            <strong style="color:blue">${elem.author.id}</strong>
            <em style="color:brown">${elem.date}</em>: 
            <em style="color:green">${elem.text}</em>
            <img src=${elem.author.avatar} alt='' style="height:50px"/>
            </div>`;
        })
        .join(' ');
    document.getElementById('messages').innerHTML = html;
}

function addItem(e) {
    const item = {
        title: document.getElementById('itemTitle').value,
        price: document.getElementById('itemPrice').value,
        thumbnail: document.getElementById('itemThumbnail').value,
    };
    socket.emit('addItem', item);
    return false;
}

function renderProductos(data) {
    const html = data
        .map((elem, index) => {
            return `  
        <tr>
        <td>${elem.title}</td>
        <td>${elem.price}</td>
        <td><img src=${elem.thumbnail} alt='' style="height:50px"/> </td>
        </tr>`;
        })
        .join(' ');
    document.getElementById('tablaProductos').innerHTML = html;
}

socket.on('messages', (data) => renderMessages(data));
socket.on('productos', (data) => renderProductos(data));
