const API_KEY = 'N2YyZmMxYzItODgxNy00ZWY4LWE4YTEtNGMwMDBkMDZjNWFi'

API.setServerUrl(HTTP_URL)
// API.setServerUrl('https://api.m3o.com/v1/')
// API.addHeader('Authorization', `Bearer ${API_KEY}`)
// API.addHeader('Host', `127.0.0.1`)
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
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const verifyLogin = () => {
    let user = window.localStorage.getItem('user')
    
    if(user) {
        user = JSON.parse(user)
        API.setHeader('Authorization', `Bearer ${user.token}`)
        btnLoginModal.querySelector('a').innerHTML = `Logout`
        btnSignupModal.style.display = 'none'
        app.style.display = 'block'
        container.style.display = 'none'
        closeModal(document.getElementById('loginModal'))
        if(user.isAdmin) {
          btnAddModal.style.display = 'inline'
        } else {
          btnAddModal.style.display = 'none'
        }
        searchContent()
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
  API.setHeader('Authorization', '')
  verifyLogin()
}

const antiJSInject = (text) => {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const searchContent = ()=>{
  const search = searchInput.value

  API.setMethod('GET')
  API.json(`content?search=${search}`, {}, (r)=>{
    if(r.error || !Array.isArray(r)) {
        return alert(`An error occurred while get contents. Please, try again.`)
    } 

    let contents = ``
    r.forEach((c)=>{
      contents += `
         <div class="card">
              <div>
                  <i class="fa ${antiJSInject(c.type)} fa-4x icon-accent" aria-hidden="true"></i>
              </div>
              <div class="desc">
                  <h3>${antiJSInject(c.title)}</h3>
                  <p>${antiJSInject(c.description)}</p>
              </div>
          </div>
      `
    })

    // <h3>${(c.title)}</h3>
    //  <h3>${antiJSInject(c.title)}</h3>
    
    list.innerHTML = contents

  })
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
  const list = document.getElementById('list')
  const searchInput = document.getElementById('searchInput')
  const btnSearch = document.getElementById('btnSearch')
  const addModal = document.getElementById('addModal')
  const btnAddModal = document.getElementById('btnAddModal')
  const btnAdd = document.getElementById('btnAdd')
  const nameAdd = document.getElementById('nameAdd')
  const descriptionAdd = document.getElementById('descriptionAdd')
  const typeAdd = document.getElementById('typeAdd')


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

  btnLogin.onclick = (e) => {
      e.preventDefault()

      if(!emailLogin.value) {
        return alert('Name Required field')
      }

      if(!passwordLogin.value) {
        return alert('Email Required field')
      }
      

      if(!validateEmail(emailLogin.value)) {
        return alert('Email isn`t valid')
      }
      
      API.setMethod('POST')
      API.json('auth/login', {
          "email": emailLogin.value,
          "password": passwordLogin.value
      }, (r)=>{
              if(!r.token) {
                  alert('Email/senha n??o conincidem')
                  return logout()
              }

              window.localStorage.setItem('user', JSON.stringify(r))
              verifyLogin()
      })
  }

  btnSignup.onclick = (e)=>{
      e.preventDefault()
          
    
      if(!nameSignup.value) {
        return alert('Name Required field')
      }

      if(!emailSignup.value) {
        return alert('Email Required field')
      }

      if(!validateEmail(emailSignup.value)) {
        return alert('Email isn`t valid')
      }
      
      if(!passwordSignup.value) {
        return alert('Password Required field')
      }

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

  btnAdd.onclick = (e)=>{
      e.preventDefault()

      API.setMethod('POST')
      API.json('content', {
          "title": nameAdd.value,
          "description": descriptionAdd.value,
          "type": typeAdd.value
      }, (r)=>{
              if(r.error) {
                  return alert(r.error)
              }

              alert(`Template added with success!`)
              closeModal(addModal)
              searchInput.value = ''
              searchContent()
      })
  }

  btnSearch.onclick = (e)=>{
    searchContent()
  }

  searchInput.addEventListener('keyup', (e)=>{
    searchContent()
  })

  
  verifyLogin()
})