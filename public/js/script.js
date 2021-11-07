class APIClass {
  constructor() {
    this.serverUrl = '127.0.0.1';
    this.headers = [];
    this.method = 'POST';
  }
  setServerUrl(serverUrl) {
    this.serverUrl = serverUrl;
  }
  getServerUrl() {
    return this.serverUrl;
  }
  addHeader(_key, _value) {
    this.headers.push({ key: _key, value: _value });
  }
  getHeader() {
    return this.headers;
  }
  setMethod(_method) {
    this.method = _method;
  }
  getMethod() {
    return this.method;
  }
  request(endPoint, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open(this.method, this.serverUrl + endPoint);

    this.headers.forEach((header) => {
      xhr.setRequestHeader(header.key, header.value);
    });

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        callback(this.responseText);
      }
    });

    xhr.send(data);
  }
  json(endPoint, objToSend, callback) {
    if(!this.headers.find(h=>(h.key=="content-type" && h.value== "application/json") )) {
        this.addHeader("content-type", "application/json");
    }
    // this.addHeader("cache-control", "no-cache");
    this.request(endPoint, JSON.stringify(objToSend), (responseText) => {
      callback(JSON.parse(responseText));
    });
  }
}

const API = new APIClass()

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
        btnLogin.querySelector('a').innerHTML = `Logout ${JSON.parse(user).session.userId}`
    } else {
        btnLogin.querySelector('a').innerHTML = 'Entrar'
    }
}

window.onload = (e)=>{
    const btnLogin = document.getElementById('btnLogin')

    verifyLogin()

    btnLogin.onclick = ()=>{
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