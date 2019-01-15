document.addEventListener("DOMContentLoaded", function(){
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector("#toy-collection")
  const addToyForm = document.querySelector('.add-toy-form')
  let addToy = false
  
  getToyCollection = () => {
  return fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(myJson => {
    myJson.forEach(element => {
      toy_div = document.createElement("div")
      toy_div.className = "card"
      toy_div.dataset.id = element.id

      toy_headline = document.createElement("h2")
      toy_headline.className = "toy-name"
      toy_headline.append(`${element.name}`)
      
      toy_image = document.createElement("img")
      toy_image.src = `${element.image}`
      toy_image.className = "toy-avatar"

      toy_likes = document.createElement("p")
      toy_likes.className = "toy-likes"
      toy_div.dataset.likes = element.likes
      toy_likes.innerText = `${element.likes} Likes`
      toy_likes.setAttribute("id",`toy-likes-${element.id}`)

      like_button = document.createElement("button")
      like_button.className = "like-btn"
      like_button.innerText = "Like <3"
      like_button.dataset.likeId = element.id

      toyCollection.append(toy_div)
      toy_div.append(toy_headline)
      toy_div.append(toy_image)
      toy_div.append(toy_likes)
      toy_div.append(like_button)
      });
  })
}

getToyCollection()

toyCollection.addEventListener("click", function(eventClick) {
  // eventClick.preventDefault()
  let parent = eventClick.target.parentElement
  let id = parent.dataset.id
  let likes = parent.dataset.likes
  if (eventClick.target.className === 'like-btn'){
    likes++
    fetch (`http://localhost:3000/toys/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({'likes': likes}),
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          }
    })
    .then(()=> {
      parent.dataset.likes = likes
      let parent_id = parent.dataset.id
      document.getElementById(`toy-likes-${parent_id}`).innerText = `${likes} Likes`
    })

  }

})

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


function addNewToy(newToy){
  newToy.preventDefault()
  let toyName = newToy.target[0].value
  let toyImage = newToy.target[1].value

  toyObject = {'name': toyName, 'image':toyImage, 'likes':0}

  fetch('http://localhost:3000/toys', {
    method: 'Post',
    body:   JSON.stringify(toyObject),
    headers: {
      'Content-Type': 'application/json'
      }
  })
}

  addToyForm.addEventListener('submit', addNewToy)
})