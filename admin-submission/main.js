class Store{
    static getSubmission(name){
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

    static removeNews(id,name){
        let submissions = Store.getSubmission(name);
        submissions.forEach((element,index) => {
            if(element.id===id){
                submissions.splice(index,1);
            }
        });
        localStorage.setItem(`${name}`,JSON.stringify(submissions));
        console.log(localStorage);
    }
}

let displayTable = ()=>{
    let news = Store.getNews();
    let subTable = document.getElementById('submission-container');
    news.forEach((element)=>{
        let div = document.createElement('div');
        div.innerHTML = `<h3 class="text-center" id="Title">${element.name}</h3>`;
        let table = document.createElement('table');
        let head = document.createElement('thead');
        let row = document.createElement('tr');
        head.classList = 'text-center';
        table.classList = 'table table-striped';
        table.style =`font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial,sans-serif; border:1px solid #444`;
        div.style = 'border: 1px solid #111;';
        row.innerHTML = `<th><h5>Name</h5></th>
        <th><h5>Email Address</h5></th>
        <th><h5>Mobile no.</h5></th>
        <th><h5>Paper title</h5></th>
        <th><h5>Abstract</h5></th>`;
        head.appendChild(row);
        table.appendChild(head);
        let submission = Store.getSubmission(element.name);
        let tbody = document.createElement('tbody');
        tbody.classList = 'text-center';
        submission.forEach((ele)=>{
            let row = document.createElement('tr');
            row.innerHTML = `<td><h5>${ele.name}</h5></td>
            <td><h5>${ele.email}</h5></td>
            <td><h5>${ele.mobile}</h5></td>
            <td><h5>${ele.paperTitle}</h5></td>
            <td><h5>${ele.paperAbstract}</h5></td>`;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        subTable.appendChild(div);
        subTable.appendChild(table);
    });
}

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();
    displayTable();
});