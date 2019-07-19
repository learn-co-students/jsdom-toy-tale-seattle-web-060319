const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false

const theURL = 'http://localhost:3000/toys'


// -----display toy list on doc load
document.addEventListener("DOMContentLoaded", function(){
  fetch(theURL)
    .then(resp => resp.json())
    .then(json => renderToys(json));
});


addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});


// -----submit event listener for create form
toyForm.addEventListener('submit', function(e) {
  e.preventDefault();
  let formName = e.target.name.value;
  let formImg = e.target.image.value;
  addNewToy(formName, formImg);
 });


// -----rendering list of toys
function renderToys(data){
  data.forEach(element => createToyList(element));
}


// -----defines each toy element within list
function createToyList(toy){
  if (toy.name != undefined) {
  const toyInfo = document.createElement('div');
    toyInfo.setAttribute('class', 'card');
  const name = document.createElement('h2');
    name.innerText = toy.name;
    toyInfo.appendChild(name);
  const image = document.createElement('IMG');
    image.setAttribute('src', toy.image);
    toyInfo.appendChild(image);
  const likes = document.createElement('p');
    likes.innerText = toy.likes;
    toyInfo.appendChild(likes);
//----- like button made here----------- >
    let likeButton = document.createElement('button');
      likeButton.textContent = "Like"
      likeButton.addEventListener('click', addLikes(toy));
      toyInfo.appendChild(likeButton);

    let toyBox= document.getElementById("toy-collection");
      toyBox.appendChild(toyInfo);
    };
};


// ---- post fetch for form submission
function addNewToy(name, image){
  let formData = {
    name: name,
    image: image,
    likes: 0
  };
  let configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(theURL, configObject)
    .then(resp => resp.json())
    // .then(console.log)
    .then(json => appendToy(json))
    .catch(function(error) {
      console.log("Crap!");
    });
};

function appendToy(toy){
  const toyInfo = document.createElement("div");
    toyInfo.setAttribute("class", "card");
  const toyName = document.createElement("h2");
    toyName.innerText = toy.name;
    toyInfo.appendChild(toyName);
  const toyImg = document.createElement("IMG");
    toyImg.setAttribute('src', toy.image);
    toyInfo.appendChild(toyImg);
  const toyLikes = document.createElement("p");
    toyLikes.innerText = toy.likes;
    toyInfo.appendChild(toyLikes);
    let likeButton = document.createElement('button');
      likeButton.textContent = "Like"
      likeButton.addEventListener('click', addLikes(toy));
      toyInfo.appendChild(likeButton);
  let toyBox= document.getElementById("toy-collection");
    toyBox.appendChild(toyInfo);
};

function addLikes(toy) {
  console.log(toy);
  let newLikes = (toy.likes += 1);
  let formData = {
    likes: newLikes
  };
  let configObject = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(theURL + "/" + toy.id, configObject)
    .then(resp => resp.json())
    .then(console.log)
    .catch(function(error) {
      console.log("Crap!");
    });
};
