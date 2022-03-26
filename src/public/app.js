const socket = io()

const name = prompt('Enter your name')

socket.emit('new-user', name)

const join = document.getElementById('name')
join.innerHTML += "You joined"

socket.on('joined-user', data => {
    const item = document.createElement('h4')
    item.setAttribute('class', 'item2')
    item.innerHTML += `${data} joined`
    list.appendChild(item)
})

const form = document.querySelector('.form')
const input = document.querySelector('.input')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const item = document.createElement('h4')
    item.setAttribute('class', "item")
    item.innerHTML += `You: ${input.value}`
    list.appendChild(item)
    
    socket.emit('message', {
        massage: input.value,
        name
    })

    input.value = null
})

socket.on('new-message', ({name, massage}) => {
    const item = document.createElement('h4')
    item.setAttribute('class', "item")
    item.innerHTML += `${name}: ${massage}`
    list.appendChild(item)
})