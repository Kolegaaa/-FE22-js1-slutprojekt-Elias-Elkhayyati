const btn = document.querySelector("#getImage");
const searchInput = document.querySelector("#myInput");
const numberInput = document.querySelector('#amount');
const dateInput = document.querySelector('#Sortera')
const imgContainer = document.getElementById('img-container')
const spin = document.querySelector(".spin");
console.log(dateInput);
let page = 1;

let sizeSuffix;
let soktext = "";


  

btn.addEventListener("click", (e) => {
  e.preventDefault()
  getPictures();
});

function getPictures() {
  if (searchInput.value.trim() === "") {
    Toastify({

      text: "Du måste ange söktext",
      duration: 3000,
      close: true,
      style: {
        background: "red",
      }
      
      }).showToast();
      return;
  }

  if (numberInput.value<0) {
    Toastify({

      text: "Antalet måste vara positivt!!!!",
      duration: 5000,
      close: true,
      style: {
        background: "red",
      }
      
      }).showToast();
      return;
  }
  
  let select = dateInput.value;
  console.log(select);
  let amount = numberInput.value;
  soktext = searchInput.value;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=5e34ba21e90e1dfefa75bcffc497b660&text=${soktext}&page=${page}&per_page=${amount}&sort=${select}&format=json&nojsoncallback=1`;
  console.log(url);
  const sizeInputs = document.getElementsByName("my_size");
  sizeInputs.forEach((sizeInput) => {
    if (sizeInput.checked) {
      return (sizeSuffix = sizeInput.value);
    }
  });
  let serverId;
  let id;
  let secret;
  let imgUrl;

  console.log(soktext);
  imgContainer.innerHTML = '';  
  spin.style.display = "block"
  
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      spin.style.display = "none"
      console.log(data);
      for (let i = 0; i < data.photos.photo.length; i++) {
        // console.log(data.photos.photo[i]);
        id = data.photos.photo[i].id;
        secret = data.photos.photo[i].secret;
        serverId = data.photos.photo[i].server;
        imgUrl = `https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg`;

        // serve images
        console.log(imgUrl);
        const imgElement = document.createElement('img')
        imgContainer.append(imgElement)
        imgElement.src = imgUrl
      }
      if (data.photos.photo.length == 0) {
        Toastify({
    
          text: "Finns inga bilder för sökning",
          duration: 5000,
          close: true,
          style: {
            background: "red",
          }
          
          }).showToast();
          return;
      }

      Toastify({

        text: "Sökningen lyckades",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
        
        }).showToast();
    })
    .catch((error) => {
      spin.style.display = "none"
      Toastify({

        text: "Något gick fel",
        duration: 3000,
        close: true,
        style: {
          background: "red",
        }
        
        }).showToast();
    })

}
