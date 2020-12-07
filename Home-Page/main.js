conferenceUpdate.forEach((ele)=>{
  let section = document.createElement('div');
  section.className = `col-md-3 mb-3 announce`;
  section.dataset.selection = ele.id;
  section.innerHTML = `<img src="${ele.imgLink}" class="col-md-12 pb-1 announce-img" height="200px" >
    <h6 class="pt-1"  style="border-top: 1px solid #aaaaaa;">${ele.name}</h6>`;
    section.style='padding:0px; border: 1px solid #aaa; object-fit:cover;';
    $('#announce-container').append(section);
});

let news = document.querySelectorAll('[data-selection]');

news.forEach((selected)=>{
  selected.addEventListener('click',(e)=>{
    e.preventDefault();
    let id = selected.dataset.selection;
    let a = conferenceUpdate.find(e=>e.id==id);
    //console.log(a);
    announceDisplayFunction(a);
  });
})

let announceDisplayFunction = (a) => {
  document.querySelector('#announce-display').style = `height:400px; border: 1px solid black;`;
  document.querySelector('#announce-area').style = `height:400px;`;
  $(
    "#img-area"
  ).html(`<img src="${a.imgLink}" class="img-display" style="height:400px;">`);
  $("#announce-area").html(`
  <h3 class="pb-3 text-center">${a.name}</h3>
<p><b>Last Date of Submission:</b> ${a.lastDateOfSubmission}</p>
<p><b>Date of conference:</b> ${a.conferenceDate}</p>
<p><b>Summary of conference:</b> ${a.summary}</p>`);
};

document.querySelector('#close-btn').addEventListener('click',(e)=>{
  e.preventDefault();
  document.querySelector('#announce-display').style = `height:0px;`;
  document.querySelector('#announce-area').style = `height: 0px;`;
  $(
    "#img-area"
  ).html(``);
  $("#announce-area").html(``);
})