window.addEventListener("DOMContentLoaded", (e) => {
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
  }
  static removeElement(id) {
    let news = store.getUpdates();
    news.forEach((ele, index) => {
      if (ele.id === id) {
        news.splice(index, 1);
      }
    });
    //console.log(news);
    localStorage.setItem("news", JSON.stringify(news));
  }
}
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
    id.value =""; 
    name.value = "" ;
    lastDateOfSubmission.value = "";
    conferenceDate.value = "";
    summary.value = "";
    imgLink.value = "";    
  }
});

let date = new Date();
//javascript counts months from 0 to 11 so for december we will get 11.
console.log(
  "date:" +
    date.getDate() +
    "/" +
    (date.getUTCMonth() + 1) +
    "/" +
    date.getFullYear()
);

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
  let element = e.target.parentElement.parentElement;
  let id = JSON.parse(element.children[0].innerText);
  console.log(id);
  store.removeElement(id);
  element.remove();
});
