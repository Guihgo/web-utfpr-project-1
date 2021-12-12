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

    const signinModal = document.getElementById('signinModal')
    const btnSigninModal = document.getElementById('btnSigninModal')
    const btnSignin = document.getElementById('btnSignin')

    const addModal = document.getElementById('addModal')
    const btnAddModal = document.getElementById('btnAddModal')
    const btnAdd = document.getElementById('btnAdd')

    document.querySelectorAll('.modal .box').forEach(b=>{
      b.onclick = (e)=>{
        e.stopPropagation()
      }
    })

    document.querySelectorAll('.modal').forEach(m=>{
      m.onclick
      = (e)=>{
        e.target.style.display = 'none'
      } 
    })
    
    document.querySelectorAll('.modal .box .close').forEach(i=>{
      i.onclick = (e)=>{
        document.querySelectorAll('.modal').forEach(modal=>{
          modal.style.display = 'none'
        })
      }
    })
    
    const showModal = (modal, event) => {
      event.preventDefault()

      if(modal.style.display==='none' || modal.style.display==='') {
        modal.style.display = 'block'
      } else {
        modal.style.display = 'none'
      }
    }

    btnLoginModal.onclick = (e) => {
      showModal(loginModal, e)
    }
    btnSigninModal.onclick = (e) => {
      showModal(signinModal, e)
    }

    btnAddModal.onclick = (e) => {
      showModal(addModal, e)
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

    btnSignin.onclick = (e)=>{
      e.preventDefault()
    }

    
    verifyLogin()
}