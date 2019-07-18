const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let url = 'http://localhost:3000/toys'


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})
//-------------------fetchToys----------------------------
function fetchToys(){
   fetch(url)
  .then(response => response.json())
  .then(json => renderToys(json));
}
//--------------renderToys------------------------------
function renderToys(json){
  console.log(json[0]);
  for (var i = 0; i < json.length; i++) {

    let toyName =  json[i].name
    let toyUrl = json[i].image
    let toyLikes = json[i].likes
    let toyId = json[i].id
    createDivCard(toyName, toyUrl, toyLikes, toyId);
  }
}

//--------------createDivCard------------------
function createDivCard(toyName, toyUrl, toyLikes, toyId){
  let toycollection = document.getElementById('toy-collection');
  let card = document.createElement("DIV");
  card.className = "card";
  toycollection.appendChild(card);
  nameHeader = document.createElement('h2');
  imgEle = document.createElement('img');
  para = document.createElement('p');
  button = document.createElement('Button');
  button.className = "like-btn";
  button.innerText = "Like  ❤ ";
  button.addEventListener("click", function(e) {
      toyLikes = toyLikes + 1
      console.log(toyLikes)
      return fetch(url + "/" + toyId,  {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            name: toyName,
            image: toyUrl,
            likes: toyLikes}
      ),
      })
      .then(response => response.json());

  })

  nameHeader.innerText = toyName;
  imgEle.src = toyUrl;
  imgEle.className = "toy-avatar"
  para.innerText =  toyLikes + " Likes";
  card.appendChild(nameHeader)
  card.appendChild(imgEle)
  card.appendChild(para)
  card.appendChild(button)
}

  let form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    name = e.target.children.name.value;
    image = e.target.children.image.value;
    createNewToy(name, image)
  // image =
})

//-------------createToy-----------------
function createNewToy(toyName, toyImage) {
  return fetch(url,  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      { name: toyName,
        image: toyImage,
        likes: 0}
  ),
  })
  .then(response => response.json());
  }
//--------------------likes-----------------------------






//---main------------------------------------------------


fetchToys();


// OR HERE!
