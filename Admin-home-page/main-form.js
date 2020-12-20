window.addEventListener("DOMContentLoaded", (e) => {
  removingUpdateOnDates();
  updateList();
});
class store {
  static getUpdates() {
    let news;
    if (localStorage.getItem("news") === null) {
      news = [];
    } else {
      news = JSON.parse(localStorage.getItem("news"));
    }
    return news;
  }
  static addNews(news1) {
    const news = store.getUpdates();
    news.push(news1);
    console.log(news);
    localStorage.setItem("news", JSON.stringify(news));
    console.log(localStorage);
  }
  static removeElement(id) {
    let news = store.getUpdates();
    news.forEach((ele, index) => {
      if (ele.id === id) {
        //let name = ele.name.toLowerCase();
        store.removeSubmissions(ele.name);
        news.splice(index, 1);
        for (let i = index; i < news.length; i++) {
          news[i].id = index + 1;
          //document.getElementById('id-event').innerHTML = JSON.stringify(news[i].id);
        }
      }
    });
    localStorage.setItem("news", JSON.stringify(news));
    console.log(localStorage);
  }

  static removeSubmissions(name){
    localStorage.removeItem(`${name}`);
  }

  static updateModal(id) {
    let news = store.getUpdates();
    news.forEach((ele) => {
      if (ele.id === id) {
        document.getElementById("id-edit").value = ele.id;
        document.getElementById("name-edit").value = ele.name;
        document.getElementById("sub-date-edit").value =
          ele.lastDateOfSubmission;
        document.getElementById("conf-date-edit").value = ele.conferenceDate;
        document.getElementById("summary-edit").value = ele.summary;
        document.getElementById("img-link-edit").value = ele.imgLink;
      }
    });
  }

  static editElement(id) {
    let news = store.getUpdates();
    news.forEach((ele) => {
      if (ele.id === id) {
        let subDate = document.getElementById("sub-date-edit").value;
        let confDate = document.getElementById("conf-date-edit").value;
        let summary = document.getElementById("summary-edit").value;
        let imgLink = document.getElementById("img-link-edit").value;
        ele.lastDateOfSubmission = subDate;
        ele.conferenceDate = confDate;
        ele.summary = summary;
        ele.imgLink = imgLink;
        console.log(news);
      }
    });
    localStorage.setItem("news", JSON.stringify(news));
  }

  static deleteAll() {
    localStorage.setItem("news", JSON.stringify([]));
  }
}
//store.deleteAll();
let removingUpdateOnDates = () => {
  let d1 = new Date();
  d1 = `${d1.getFullYear()}-${d1.getMonth() + 1}-${d1.getDate() + 2}`;
  let news = store.getUpdates();
  console.log(d1);
  news.forEach((element) => {
    console.log(element);
    if (element.conferenceDate === d1) {
      console.log(element);
      store.removeElement(element.id);
    }
  });
};

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  let id = store.getUpdates().length + 1;
  let name = document.getElementById("name");
  let lastDateOfSubmission = document.getElementById("lastDateOfSubmission");
  let conferenceDate = document.getElementById("conferenceDate");
  let summary = document.getElementById("summary");
  let imgLink = document.getElementById("img-link");
  if (
    id.value !== "" &&
    name.value !== "" &&
    lastDateOfSubmission.value !== "" &&
    conferenceDate.value !== "" &&
    summary.value !== "" &&
    imgLink.value !== ""
  ) {
    let news = {
      id: id,
      name: name.value,
      lastDateOfSubmission: lastDateOfSubmission.value,
      conferenceDate: conferenceDate.value,
      summary: summary.value,
      imgLink: imgLink.value,
    };
    store.addNews(news);
    updateList();
    id.value = "";
    name.value = "";
    lastDateOfSubmission.value = "";
    conferenceDate.value = "";
    summary.value = "";
    imgLink.value = "";
    let msg = document.getElementById("msg-div");
    msg.innerHTML = `<h6>New Conference has been updated.</h6>`;
    window.scrollBy(0, -600);
    msg.classList = "alert alert-success text-center";
    setTimeout(() => {
      msg.innerHTML = "";
      msg.classList = "";
    }, 5000);
  } else {
    let msg = document.getElementById("msg-div");
    msg.innerHTML = `<h6>Kindly enter all fields to post</h6>`;
    window.scrollBy(0, -600);
    msg.classList = "alert alert-danger text-center";
    setTimeout(() => {
      msg.innerHTML = "";
      msg.classList = "";
    }, 5000);
  }
});

let date = new Date();
//javascript counts months from 0 to 11 so for december we will get 11.
let updateList = () => {
  let news = store.getUpdates();
  let announcesection = document.getElementById("book-list");
  announcesection.innerHTML = "";
  news.forEach((element) => {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td id="id-event">${element.id}</td><td>${element.name}</td><td>${element.lastDateOfSubmission}</td><td>${element.conferenceDate}</td><td><svg class="edit-btn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" data-toggle="modal" data-target="#exampleModal" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg></td><td><button class = "btn delete-btn">X</button></td>`;
    announcesection.appendChild(tableRow);
  });
};

document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("delete-btn")) {
    let element = e.target.parentElement.parentElement;
    let id = JSON.parse(element.children[0].innerText);
    console.log(id);
    store.removeElement(id);
    //element.remove();
    updateList();
    //store.updateModal(id);
  }
});

document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("edit-btn")) {
    let element = e.target.parentElement.parentElement;
    let id = JSON.parse(element.children[0].innerText);
    store.updateModal(id);
  }
});

document.getElementById("save-changes").addEventListener("click", (e) => {
  e.preventDefault();
  let id = JSON.parse(document.getElementById("id-edit").value);
  //console.log(id);
  store.editElement(id);
  updateList();
});
