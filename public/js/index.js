const API_KEY = 'N2YyZmMxYzItODgxNy00ZWY4LWE4YTEtNGMwMDBkMDZjNWFi'

API.setServerUrl('https://api.m3o.com/v1/')
API.addHeader('Authorization', `Bearer ${API_KEY}`)
API.addHeader('Host', `api.m3o.com`)
API.addHeader('Accept', `*/*`)

//ENDPOINT TO CREATE USER =>> https://api.m3o.com/v1/user/Create
//DATA: 
/* 
{
  "email": "guilherme@example.com",
  "id": "guihgoId2",
  "password": "mySecretPass123",
  "username": "guihgo"
}
*/

const verifyLogin = () => {
    const user = window.localStorage.getItem('user')
    
    if(user) {
        btnLoginModal.querySelector('a').innerHTML = `Logout ${JSON.parse(user).session.userId}`
    } else {
        btnLoginModal.querySelector('a').innerHTML = 'Entrar'
    }
}

window.onload = (e)=>{
    const loginModal = document.getElementById('loginModal')
    const btnLoginModal = document.getElementById('btnLoginModal')
    const btnLogin = document.getElementById('btnLogin')

    verifyLogin()

    loginModal.onclick = (e)=>{
      loginModal.style.display = 'none'
    } 

    loginModal.querySelector('.box span').onclick = (e)=>{
      loginModal.style.display = 'none'
    } 

    loginModal.querySelector('.box').onclick = (e)=>{
      e.stopPropagation()
    }

    btnLoginModal.onclick = (e) => {
      e.preventDefault()

      if(loginModal.style.display==='none' || loginModal.style.display==='') {
        loginModal.style.display = 'block'
      } else {
        loginModal.style.display = 'none'
      }
    }
    
    btnLogin.onclick = (e)=>{
        e.preventDefault()
        const user = window.localStorage.getItem('user')
        // console.log(user)
        if(user)  { //if already logged, logout!
            window.localStorage.removeItem('user')
            btnLogin.querySelector('a').innerHTML = 'Entrar'
            return alert('Logout with success!')
        }

        API.setMethod('POST')
        API.json('user/Login', {
            "email": "guilherme@example.com",
            "password": "mySecretPass123"
            }, (r)=>{
                console.log(r)
            window.localStorage.setItem('user', JSON.stringify(r))
            verifyLogin()
        })

    }
}