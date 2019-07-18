const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const addToyForm = document.querySelector("form");

let addToy = false;
const API_URL = "http://localhost:3000/toys";

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
  } else {
    toyForm.style.display = "none";
  }
});

addToyForm.addEventListener("submit", function(e) {
  e.preventDefault();
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: e.target.children.name.value,
      image: e.target.children.image.value,
      likes: 0
    })
  }).then(response => response.json);
});

// OR HERE!
document.addEventListener("DOMContentLoaded", function(e) {
  fetch(API_URL)
    .then(response => response.json())
    .then(json => {
      renderToyCards(json);
    });
});

function renderToyCards(arr) {
  arr.forEach(function(element) {
    let div = document.createElement("div");
    div.setAttribute("class", "card");
    document.getElementById("toy-collection").appendChild(div);
    renderToy(div, element);
  });
}

function renderToy(div, element) {
  let h2 = document.createElement("h2");
  h2.innerText = element.name;
  div.appendChild(h2);
  let img = document.createElement("img");
  img.setAttribute("src", element.image);
  img.setAttribute("class", "toy-avatar");
  div.appendChild(img);
  let p = document.createElement("p");
  p.innerText = element.likes;
  div.appendChild(p);
  let btn = document.createElement("button");
  btn.innerText = "Like ❤";
  btn.setAttribute("class", "like-btn");
  div.appendChild(btn);

  btn.addEventListener("click", function(e) {
    fetch(API_URL + `/${element.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: element.name,
        image: element.image,
        likes: element.likes + 1
      })
    }).then(response => response.json);
  });
}
