class store {
  static getUpdates() {
    let news = [];
    if (localStorage.getItem("news") === null) {
      news = [];
    } else {
      news = JSON.parse(localStorage.getItem("news"));
    }
    return news;
  }
  static removeElement(element) {
    let news = store.getUpdates();
    news.forEach((ele, index) => {
      if (ele.id === element.id) {
        news.splice(index, 1);
      }
    });
    localStorage.setItem("news", JSON.stringify(news));
  }
}
let removingUpdateOnDates = () => {
  let d1 = new Date();
  d1 = `${d1.getFullYear()}-${d1.getMonth() + 1}-${d1.getDate()-1}`;
  let news = store.getUpdates();
  console.log(d1);
  news.forEach((element) => {
    //console.log(element);
    if (new Date(element.conferenceDate) < new Date(d1)) {
      //console.log(element);
      store.removeElement(element.id);
    }
  })
}
removingUpdateOnDates();
let newsUpdate = store.getUpdates();
newsUpdate.forEach((ele) => {
  let section = document.createElement("div");
  section.className = `col-md-3 mb-3 announce`;
  section.dataset.selection = ele.id;
  section.innerHTML = `<img src="${ele.imgLink}" class="col-md-12 pb-1 announce-img" height="200px" >
    <h6 class="pt-1"  style="border-top: 1px solid #aaaaaa;">${ele.name}</h6>`;
  section.style =
    "padding:0px; border: 1px solid #aaa; border-radius:10px; overflow:hidden; object-fit:cover;";
  $("#announce-container").append(section);
});

let news = document.querySelectorAll("[data-selection]");

news.forEach((selected) => {
  selected.addEventListener("click", (e) => {
    e.preventDefault();
    let id = selected.dataset.selection;
    let a = newsUpdate.find((e) => e.id == id);
    //console.log(a);
    announceDisplayFunction(a);
    linkActivate(a);
  });
});

let announceDisplayFunction = (a) => {
  document.querySelector(
    "#announce-display"
  ).style = `height:400px; border: 1px solid black;`;
  document.querySelector("#announce-area").style = `height:400px;`;
  $("#img-area").html(
    `<img src="${a.imgLink}" class="img-display" style="height:400px;">`
  );
  $("#announce-area").html(`
  <h3 class="pb-3 text-center" id="announce-title">${a.name}</h3>
<p><b>Last Date of Submission:</b> ${a.lastDateOfSubmission}</p>
<p><b>Date of conference:</b> ${a.conferenceDate}</p>
<p id="announce-summary"><b>Summary of conference:</b> ${a.summary}</p>
<a class="btn btn-link" id="link-sub">link to submission</a>
`);
};

document.querySelector("#close-btn").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#announce-display").style = `height:0px;`;
  document.querySelector("#announce-area").style = `height: 0px;`;
  $("#img-area").html(``);
  $("#announce-area").html(``);
});

let linkActivate = (a)=>{
document.getElementById("link-sub").addEventListener("click", (e) => {
  e.preventDefault();
  let link = a.name;
  localStorage.setItem('link',JSON.stringify(link));
  window.location.href = "D:/XAMPP/htdocs/project-work/Submission page/index(submission).html";
});
}
