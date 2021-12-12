window.addEventListener('load', (e) => {

    btnLogin.onclick = (e) => {
        e.preventDefault()

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

    btnSignup.onclick = (e)=>{
        e.preventDefault()

        API.setMethod('POST')
        API.json('user', {
            "name": nameSignup.value,
            "email": emailSignup.value,
            "password": passwordSignup.value
        }, (r)=>{
                if(r.error) {
                   return alert(r.error)
                }

                alert(`User created with success!`)
                closeModal(signupModal)
        })


    }

})