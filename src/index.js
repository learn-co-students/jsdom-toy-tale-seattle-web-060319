const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toysUrl = "http://localhost:3000/toys"

let TOYS = []

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


function fetchToy() {
  fetch(toysUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      renderToys(json)
      // console.log(renderToys(json))
    });
}

// fetchToy();

  function renderToys(json) {
    TOYS = json
    addToys(TOYS);
  }

function createLikeButton(toyContainer, toys, name, image) {
  // let name = toys.name;
  // let image = toys.image;
  let toyId =toys.id;


  const likesButton = document.createElement("button")
  likesButton.className = "like-btn"
  likesButton.innerText = "Like <3"
  toyContainer.appendChild(likesButton)

  likesButton.addEventListener("click", function (e) {

    const numLikes = toys.likes
    console.log(numLikes)
    return fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: numLikes + 1
      }),
    })
    .then(response => response.json())
  })
}


function handleSubmit(ev){
  ev.preventDefault()

   let name = document.querySelector("input[name = 'name']").value;
   let image = document.querySelector("input[name = 'image']").value;


   saveToy(name, image)
   .then(toy => {

   })
   .catch(err => {
     displayError(err)
   })

}

function addToys(json) {
    const container = document.querySelector("#toy-collection")
    json.forEach(toys => {
      const toyContainer = document.createElement("div")
      toyContainer.className = "card"
      container.appendChild(toyContainer)
      const toyName = document.createElement("h2")
      toyName.innerText = toys.name
      toyContainer.appendChild(toyName)
      const toyImg = document.createElement("img")
      toyImg.src = toys.image
      // toyImg.setAttribute('src', toys.image)
      toyImg.className = "toy-avatar"
      toyContainer.appendChild(toyImg)
      const toyLikes = document.createElement("p")
      toyLikes.innerText = toys.likes + " likes"
      toyContainer.appendChild(toyLikes)
      let name = toys.name;
      let image = toys.image;
      createLikeButton(toyContainer, toys, name, image)
  });
}

function saveToy(name, image){
  return fetch(toysUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image
    })
  })
  .then(response => response.json())
}

function clearToyList() {
  let toysList = document.getElementById('toy-collection')
  while (toysList.firstChild) {
    toysList.firstChild.remove()
  }
}

document.addEventListener('DOMContentLoaded', function (){
  fetchToy();
  const form = document.querySelector(".add-toy-form")
  form.addEventListener('submit', handleSubmit)
})
