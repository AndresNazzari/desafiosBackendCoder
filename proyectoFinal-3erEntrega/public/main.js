// const socket = io();

// function addMessage(e) {
//     const mensaje = {
//         email: document.getElementById('email').value,
//         date: new Date().toLocaleString(),
//         text: document.getElementById('texto').value,
//     };
//     socket.emit('newMessage', mensaje);
//     return false;
// }

// function renderMessages(data) {
//     const html = data.messages
//         .map((elem, index) => {
//             return `<div>
//             <strong style="color:blue">${elem.email}</strong>
//             <em style="color:brown">${elem.date}</em>:
//             <em style="color:green">${elem.text}</em>
//             </div>`;
//         })
//         .join(' ');
//     document.getElementById('messages').innerHTML = html;
// }

// function addItem(e) {
//     const item = {
//         title: document.getElementById('itemTitle').value,
//         price: document.getElementById('itemPrice').value,
//         thumbnail: document.getElementById('itemThumbnail').value,
//     };
//     socket.emit('addItem', item);
//     return false;
// }

// function renderProductos(data) {
//     const html = data.productos
//         .map((elem, index) => {
//             return `
//         <tr>
//         <th scope='row'>${elem.id}</th>
//         <td>${elem.title}</td>
//         <td>${elem.price}</td>
//         <td><img src=${elem.thumbnail} alt='' style="height:50px"/> </td>
//         </tr>`;
//         })
//         .join(' ');
//     document.getElementById('tablaProductos').innerHTML = html;
// }

// socket.on('messages', (data) => renderMessages(data));
// socket.on('productos', (data) => renderProductos(data));
