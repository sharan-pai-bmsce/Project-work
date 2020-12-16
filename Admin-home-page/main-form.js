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
    let name = news1.name.toLowerCase();
    localStorage.setItem(`${name}`, JSON.stringify([]));
    console.log(name);
    console.log(news);
    localStorage.setItem("news", JSON.stringify(news));
    console.log(localStorage);
  }
  static removeElement(id) {
    let news = store.getUpdates();
    news.forEach((ele, index) => {
      if (ele.id === id) {
        let name = ele.name.toLowerCase();
        localStorage.removeItem(`${name}`);
        news.splice(index, 1);
      }
    });
    localStorage.setItem("news", JSON.stringify(news));
    console.log(localStorage);
  }
}

let removingUpdateOnDates = () => {
  let d1 = new Date();
  d1 = `${d1.getFullYear()}-${d1.getMonth() + 1}-${d1.getDate() + 9}`;
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
//localStorage.setItem("news",JSON.stringify([]));
//store.removeNews();
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
    msg.classList = "alert alert-success text-center";
    setTimeout(() => {
      msg.innerHTML = "";
      msg.classList = "";
    }, 5000);
  } else {
    let msg = document.getElementById("msg-div");
    msg.innerHTML = `<h6>Kindly enter all fields to post</h6>`;
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
    tableRow.innerHTML = `<td>${element.id}</td><td>${element.name}</td><td>${element.lastDateOfSubmission}</td><td>${element.conferenceDate}</td><td><button class = "btn btn-danger delete-btn">X</button></td>`;
    announcesection.appendChild(tableRow);
  });
};

document.getElementById("book-list").addEventListener("click", (e) => {
  e.preventDefault();
  if(e.target.classList.contains('delete-btn')){
    let element = e.target.parentElement.parentElement;
    let id = JSON.parse(element.children[0].innerText);
    console.log(id);
    store.removeElement(id);
    element.remove();
  }
});
