window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  loadUserLogin();
});
let loadUserLogin = () => {
  let outputDiv = document.getElementById("login-description");
  let userBtn = document.getElementById("user-btn");
  let adminBtn = document.getElementById("admin-btn");
  document.getElementById("user-img").innerHTML = `<img
    src="user-login.jpg"
    alt="login"
    class="login-card-img"
  />`;
  outputDiv.innerHTML = ` <div style="margin:auto;" id = 'message'></div>
  <p class="login-card-description">Sign into your account</p>
     `;
  outputDiv = document.getElementById("login-footer");
  outputDiv.innerHTML = `<p class="login-card-footer-text">
      Don't have an account?
      <a href="D:/XAMPP/htdocs/project-work/sign-in page/index(sign-up).html" class="text-reset">Register here</a>
    </p>`;
  userBtn.style.backgroundColor = "#fff";
  adminBtn.style.backgroundColor = "#eee";
  adminBtn.style.border = "rounded";
  userBtn.disabled = true;
  adminBtn.disabled = false;
};

let loadAdminLogin = () => {
  let outputDiv = document.getElementById("login-description");
  let userBtn = document.getElementById("user-btn");
  let adminBtn = document.getElementById("admin-btn");
  document.getElementById("user-img").innerHTML = `<img
    src="admin-login.jpg"
    alt="login"
    class="login-card-img"
  />`;
  adminBtn.style.backgroundColor = "#fff";
  userBtn.style.backgroundColor = "#eee";
  document.getElementById("user-btn").style.border = "rounded";
  userBtn.disabled = false;
  adminBtn.disabled = true;
  outputDiv.innerHTML = ` <div style="margin:auto;" id = 'message'></div><p class="login-card-description">Sign into your account</p>`;
  outputDiv = document.getElementById("login-footer");
  outputDiv.innerHTML = "";
};

document.getElementById("admin-btn").addEventListener("click", (e) => {
  e.preventDefault();
  loadAdminLogin();
});

document.getElementById("user-btn").addEventListener("click", (e) => {
  e.preventDefault();
  loadUserLogin();
});
