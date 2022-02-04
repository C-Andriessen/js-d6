const formLogin = document.getElementById('login')

formLogin.addEventListener('submit', async (ev) =>  {
    ev.preventDefault();
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/login', {
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
        console.log('Got the token: ', result.data);
    } else {
        alert(result.error)
    }

    console.log(result);
})