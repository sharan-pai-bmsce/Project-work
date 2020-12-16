class Store{
    static getUpdate(){
        let contact = [];
        if(localStorage.getItem('contact')===null){
            contact = [];
        }else{
            contact = JSON.parse(localStorage.getItem('contact'));
        }
        return contact;
    }
    static removeUpdate(id){
        let contact = Store.getUpdate();
        contact.forEach((ele,index)=>{
            if(ele.id===id){
                contact.splice(index,1);
            }
        });
        localStorage.setItem('contact',JSON.stringify(contact));
    }
    static removeAll(){
        localStorage.setItem('contact',JSON.stringify([]));
    }
}

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    updateTable();
})

let updateTable = ()=>{
    let msgs = Store.getUpdate();

    let contactResponses = document.getElementById('Contact-Us-response');
    msgs.forEach(msg=>{
        let tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${msg.id}<td>${msg.name}</td><td>${msg.email}</td><td>${msg.subject}</td><td>${msg.message}</td><td><button class = "btn btn-danger delete-btn">X</button></td>`;
        contactResponses.appendChild(tableRow); 
    });
}

document.getElementById('Contact-Us-response').addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('delete-btn')){
        let element = e.target.parentElement.parentElement;
        let msg = document.getElementById('msg-div');
        msg.innerHTML = `<h6>message by ${element.children[1].innerText} with email id ${element.children[2].innerText} has been dealt with</h6>`;
        msg.classList = "alert alert-success text-center";
        console.log(element)
        let id = JSON.parse(element.children[0].innerText);
        Store.removeUpdate(id);
        element.remove();
        setTimeout(()=>{
            msg.innerHTML = '';
            msg.classList = "";
        },2000);
    }
})