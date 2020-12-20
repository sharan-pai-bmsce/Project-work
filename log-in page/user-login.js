class Store{
    static getUserInfo(){
        let userInfo = [];
        if(localStorage.getItem("userInfo")===null){
            userInfo = [];
        }else{
            userInfo = JSON.parse(localStorage.getItem("userInfo"));
        }
        return userInfo;
    }
    static deleteAll(){
        localStorage.setItem('userInfo',JSON.stringify([]));
    }
}
// Store.deleteAll();
document.getElementById('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let userBtn = document.getElementById('user-btn');
    if(userBtn.disabled===true){
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let userInfo = Store.getUserInfo();
        if(userInfo.some(user=>user.password===password.value&&user.email===email.value)){
            email.value = '';
            password = '';
            window.location.href = 'D:/XAMPP/htdocs/project-work/Home-Page/header.html';
        }else{
            let msg = document.getElementById('message');
            msg.innerHTML = `<h6>User-Name and Password don't match. If you haven't registered,kindly sign-in.</h6>`;
            msg.classList = `col-md-10 alert alert-danger`;
            setTimeout(()=>{
                msg.innerHTML = '';
                msg.classList = '';
            },5000);
            password.value = '';
        }
    }else{
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        if(email.value==='admin@bmsce.ac.in'&&password.value==='admin123'){
            email.value = '';
            password = '';
            window.location.href = 'D:/XAMPP/htdocs/project-work/Admin-home-page/Admin.html';
        }else{
            let msg = document.getElementById('message');
            msg.innerHTML = `<h6>User-Name and Password don't match.</h6>`;
            msg.classList = `col-md-10 alert alert-danger`;
            setTimeout(()=>{
                msg.innerHTML = '';
                msg.classList = '';
            },5000);
            password.value = '';
        }
    }
});