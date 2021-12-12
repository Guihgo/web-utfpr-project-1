const API_KEY = 'N2YyZmMxYzItODgxNy00ZWY4LWE4YTEtNGMwMDBkMDZjNWFi'

API.setServerUrl('http://127.0.0.1:8080/api/')
// API.setServerUrl('https://api.m3o.com/v1/')
// API.addHeader('Authorization', `Bearer ${API_KEY}`)
API.addHeader('Host', `127.0.0.1`)
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
        btnLoginModal.querySelector('a').innerHTML = `Logout`
        btnSignupModal.style.display = 'none'
        app.style.display = 'block'
        container.style.display = 'none'
        closeModal(document.getElementById('loginModal'))
    } else {
        btnSignupModal.style.display = 'inline'
        app.style.display = 'none'
        container.style.display = 'block'
        btnLoginModal.querySelector('a').innerHTML = 'Login'
    }

    
}

const closeModal = (modal)=> {
  modal.style.display = 'none'
}

const logout = ()=>{
  window.localStorage.removeItem('user')
  verifyLogin()
}

window.addEventListener('load', (e)=>{
  const app = document.getElementById('app')
  const container = document.getElementById('container')

  /* Login */
  const loginModal = document.getElementById('loginModal')
  const btnLoginModal = document.getElementById('btnLoginModal')
  const btnLogin = document.getElementById('btnLogin')
  const emailLogin = document.getElementById('emailLogin')
  const passwordLogin = document.getElementById('passwordLogin')

  /* SignUp */
  const signupModal = document.getElementById('signupModal')
  const btnSignupModal = document.getElementById('btnSignupModal')
  const btnSignup = document.getElementById('btnSignup')
  const nameSignup = document.getElementById('nameSignup')
  const emailSignup = document.getElementById('emailSignup')
  const passwordSignup = document.getElementById('passwordSignup')

  /* APP */
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
      closeModal(e.target)
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
    const user = window.localStorage.getItem('user')
    if(user) {
      return logout()
    }
    showModal(loginModal, e)
  }
  
  btnSignupModal.onclick = (e) => {
    showModal(signupModal, e)
  }

  btnAddModal.onclick = (e) => {
    showModal(addModal, e)
  }
  
  verifyLogin()
})