window.addEventListener('load',(e)=>{
    e.preventDefault();
    loadUserLogin();
});
let outputDiv= document.getElementById("login");
let loadUserLogin = ()=>{
    let userBtn=document.getElementById('user-btn');
    let adminBtn=document.getElementById('admin-btn');
    document.getElementById('user-img').innerHTML=`<img
    src="user-login.jpg"
    alt="login"
    class="login-card-img"
  />`;
    outputDiv.innerHTML=`<p class="login-card-description">Sign into your account</p>
    <form action="#!" style="margin: auto">
      <div class="form-group">
        <label for="username" class="sr-only">Email</label>
        <input
          type="username"
          name="email"
          id="email"
          class="form-control"
          placeholder="E-mail"
        />
      </div>
      <div class="form-group mb-4">
        <label for="password" class="sr-only">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="form-control"
          placeholder="***********"
        />
      </div>
      <input
        name="login"
        id="login"
        class="btn btn-block login-btn mb-4"
        type="button"
        value="Login"
      />
    </form>
    <!--<a href="#!" class="forgot-password-link">Forgot password?</a>-->
    <p class="login-card-footer-text">
      Don't have an account?
      <a href="E://Java Script (projectwork)/sign-in page/index(sign-up).html" class="text-reset">Register here</a>
    </p>`
    userBtn.style.backgroundColor="#fff";
    adminBtn.style.backgroundColor="#eee";
    adminBtn.style.border="rounded";
  userBtn.disabled=true;
  adminBtn.disabled=false;
}

let loadAdminLogin=()=>{
  let userBtn=document.getElementById('user-btn');
    let adminBtn=document.getElementById('admin-btn');
    document.getElementById('user-img').innerHTML=`<img
    src="admin-login.jpg"
    alt="login"
    class="login-card-img"
  />`;
  outputDiv.innerHTML=outputDiv.innerHTML=`<p class="login-card-description">Sign into your account</p>
  <form action="#!" style="margin: auto">
    <div class="form-group">
      <label for="username" class="sr-only">Email</label>
      <input
        type="username"
        name="email"
        id="email"
        class="form-control"
        placeholder="E-mail"
      />
    </div>
    <div class="form-group mb-4">
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        placeholder="***********"
      />
    </div>
    <input
      name="login"
      id="login"
      class="btn btn-block login-btn mb-4"
      type="button"
      value="Login"
    />`
      adminBtn.style.backgroundColor="#fff";
      userBtn.style.backgroundColor="#eee";
      document.getElementById('user-btn').style.border="rounded";
  userBtn.disabled=false;
  adminBtn.disabled=true;
}

document.getElementById('admin-btn').addEventListener("click",(e)=>{
  e.preventDefault();
  loadAdminLogin();
});

document.getElementById('user-btn').addEventListener("click",(e)=>{
  e.preventDefault();
  loadUserLogin();
});