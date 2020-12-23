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
    static addUser(user){
        let userInfo = Store.getUserInfo();
        console.log(userInfo);
        userInfo.push(user);
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
    }
    static removeUser(){
        let userInfo = Store.getUserInfo();
        userInfo = [];
        localStorage.setItem('userInfo',JSON.stringify(userInfo));
    }
}
//Store.removeUser();
document.getElementById('user-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('password-confirm').value;
    if(password===passwordConfirm){
        let user = {
            name:name,
            email:email,
            password:password
        }
        Store.addUser(user);
        name = "";
        email = "";
        password = "";
        passwordConfirm = "";
        window.location.href = 'D:/XAMPP/htdocs/project-work/Home-Page/header.html';
    }else{
        let msg = document.getElementById('msg');
        msg.classList = 'alert alert-danger';
        msg.innerHTML = `<h6>Password and Password Verification is not the same</h6>`;
        setTimeout(()=>{
            msg.innerHTML = '';
            msg.classList = '';
        },2000);
    }
})