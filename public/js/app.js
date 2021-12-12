window.addEventListener('load', (e)=>{
    const loginModal = document.getElementById('loginModal')
    const emailLogin = document.getElementById('emailLogin')
    const passwordLogin = document.getElementById('passwordLogin')
    const btnLogin = document.getElementById('btnLogin')

    btnLogin.onclick = (e)=>{
        e.preventDefault()
        // const user = window.localStorage.getItem('user')
        // console.log(user)
        // if(user)  { //if already logged, logout!
        //     window.localStorage.removeItem('user')
        //     btnLogin.querySelector('a').innerHTML = 'Entrar'
        //     return alert('Logout with success!')
        // }

        API.setMethod('POST')
        API.json('auth/login', {
            "email": emailLogin.value,
            "password": passwordLogin.value
            }, (r)=>{
                console.log(r)
                if(!r.token) {
                    alert('Email/senha não conincidem')
                   return logout()
                }

                window.localStorage.setItem('user', JSON.stringify(r.token))
                verifyLogin()
           
        })
    }
})