class Store{
    static getUpdate(name){
        let submissions = [];
        if(localStorage.getItem(`${name}`)===null){
            submissions = [];
        }else{
            submissions = JSON.parse(localStorage.getItem(`${name}`));
        }
        return submissions;
    }

    static getNews(){
        let news = [];
        if(localStorage.getItem('news')===null){
            news = [];
        }else{
            news = JSON.parse(localStorage.getItem('news'));
        }
        return news;
    }

    static addSubmissions(submission,name){
        let submissions = Store.getUpdate(name);
        submissions.push(submission);
        localStorage.setItem(`${name}`,JSON.stringify(submissions));
        console.log(localStorage);
    }

    static removeAll(){
        localStorage.removeItem('environment conference');
        localStorage.removeItem('energy conference');
    } 
}
//Store.removeAll();
let updateEvent = ()=>{
    let link = JSON.parse(localStorage.getItem('link'));
    console.log(link);
    let conference=document.getElementById('conference-name-input');
    if(link!=null){
        link = link.charAt(0).toUpperCase()+link.substring(1);
        conference.value = link;
        //conference.disabled = true;
        localStorage.removeItem('link');
    }
}

window.addEventListener('DOMContentLoaded',(e)=>{
    updateEvent();
})

document.getElementById('submission-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    let prefix = document.getElementById('prefix-input');
    let firstName = document.getElementById('first-name-input');
    let lastName = document.getElementById('last-name-input');
    let conferenceName = document.getElementById('conference-name-input');
    let email = document.getElementById('email-input');
    let mobile = document.getElementById('mobile-input');
    let paperTitle = document.getElementById('paper-title-input');
    let paperAbstract = document.getElementById('paper-abstract-input');
    let news = Store.getNews();
    //console.log(news[0].name);
    //console.log(conferenceName.value.toLowerCase());
    if(news.some((ele)=>ele.name===conferenceName.value.toLowerCase())){
        let id = Store.getUpdate(conferenceName.value.toLowerCase()).length+1;
        let submission = {
            id:id,
            name:`${prefix.value} ${firstName.value} ${lastName.value}`,
            email:email.value,
            mobile:mobile.value,
            paperTitle:paperTitle.value,
            paperAbstract:paperAbstract.value
        }
        Store.addSubmissions(submission,conferenceName.value.toLowerCase());
        prefix.value="Dr.";
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        mobile.value = "";
        paperTitle.value = "";
        paperAbstract.value = "";
        conferenceName.value="";
        document.getElementById('state-input').value="";
        document.getElementById('institution-input').value="";
        document.getElementById('Nationality-input').value="";
        document.getElementById('address-input').value="";
        document.getElementById('co-authors-input').value="";
        document.getElementById('paper-upload-input').value="";
        document.getElementById('terms-condition').value="";
        let div = document.getElementById('msg-div');
        div.innerHTML = `<h5>Your Conference Paper has been submitted. You will get the response on the registered email id</h5>`;
        window.scrollTo(0,0);
        div.classList = 'alert alert-success text-center mt-2';
        setTimeout(()=>{
            let div = document.getElementById('msg-div');
            div.innerHTML = ``;
            div.classList = '';
        },10000);
    }else{
        let div = document.getElementById('msg-div');
        div.innerHTML = `<h5>Conference name does not match any of ongoing Conferences.<br><p class="text-left">Available Confereces:<p></h5>`;
        window.scrollTo(0,0);
        let news = Store.getNews();
        news.forEach((ele)=>{
            let h5 = document.createElement('li');
            h5.innerHTML = `${ele.name}`;
            h5.classList = "text-left";
            div.appendChild(h5);
        });
        div.classList = 'alert alert-danger text-center mt-3';
        setTimeout(()=>{
            let div = document.getElementById('msg-div');
            div.innerHTML = ``;
            div.classList = '';
        },10000);
    }
});