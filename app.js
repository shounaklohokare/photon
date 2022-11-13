const auth = '563492ad6f91700001000001cfc8a6a188054d97b00ac6188afc9d17';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue, currSearch;
let pno = 1;
let fetchLink;


searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", e => {
    e.preventDefault();
    currSearch = searchValue;
    searchPhotos(searchValue);
});

more.addEventListener('click', loadMore);

function updateInput(e){
    searchValue = e.target.value;
}


async function fetchApi(url){
    const dataFetch = await fetch(url, {
        method : "GET",
        headers : {
            Accept : "application/json",
            Authorization : auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
        gallery.appendChild(galleryImg);
    })
    
}

async function curatedPhotos(){ 
    fetchLink ='https://api.pexels.com/v1/curated?per_page=15&page=1';
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink)
    console.log(data);
   generatePictures(data);
}

function clear(){
    gallery.innerHTML = "";
    searchInput.value='';
}

async function loadMore(){
    pno++;
    if(currSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${currSearch}&per_page=15&page=${pno}`;
    }else{
        fetchLink =`https://api.pexels.com/v1/curated?per_page=15&page=${pno}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}

curatedPhotos();

