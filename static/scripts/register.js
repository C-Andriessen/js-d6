const formRegister = document.getElementById('reg-form')

formRegister.addEventListener('submit', async (ev) =>  {
    ev.preventDefault();
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        //alles gaat goed
    } else {
        alert(result.error)
    }

    console.log(result);
})