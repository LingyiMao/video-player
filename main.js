const modal = document.querySelector(".modal");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector('#search-input');
const aboutButton = document.querySelector('#about-button');
const homeButton = document.querySelector('#home-button');
const about = document.querySelector('.aboutpage');
const homePage = document.querySelector('.homepage');
let videoArray;
let categoryArray;

async function getVideos() {
    let response = await fetch("./video.json");
    let data = await response.json();
    videoArray = data.video;
    categoryArray = data.categories;

    prepareSearch();
    displayVideoThumbnails(videoArray);
    displayCategories(categoryArray);
}


function displayVideoThumbnails(array) {
    let videoHtml = "";
    for (let videoData of array) {
        const thumbnailUrl = "http://i3.ytimg.com/vi/" + videoData.id + "/hqdefault.jpg";
        const imageElement = `<div data-id="${videoData.id}" class="thumbnail"><img class="thumbnail-image" src="${thumbnailUrl}" alt=""><h3>${videoData.title}</h3></div>`;
        videoHtml += imageElement
    }

    document.querySelector('.video-thumbnails').innerHTML = videoHtml;

    const videoList = document.querySelectorAll('.thumbnail');
    for (let video of videoList) {
        video.addEventListener('click', function (event) {
            const videoIdString = event.currentTarget.dataset.id;
            playVideo(videoIdString);
        })
    }
}


function displayCategories(array) {
    let categoryHtml = "<li class='category' data-id='all'>All</li>";
    for (let category of array) {
        categoryHtml += `<li class="category" data-id="${category.id}">${category.name}</li>`;
    }
    document.querySelector(".search-section__keywords").innerHTML = categoryHtml;

    let categoryList = document.querySelectorAll('.category');
    for(let category of categoryList) {
        category.addEventListener('click', function(){
            filterVideoCategory(category);
        })
    }
}


function playVideo(videoId) {
    modal.classList.remove("hidden");
    modal.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
}


function hideVideo() {
    modal.addEventListener('click', function () {
        modal.classList.add("hidden");
        modal.innerHTML = ``;
    })
}


function prepareSearch() {
    searchButton.addEventListener('click', function() {
        filterVideoCards(searchInput.value);
    });
    // searchInput.addEventListener('input', function(event){
    //     filterVideoCards(searchInput.value);
    // });
    searchInput.addEventListener('keyup', function(event){
        if (event.key === 'Enter') {
            filterVideoCards(searchInput.value);
        }    
    });
}

function filterVideoCards(filterString) {
    let matches = [];
    for(let video of videoArray) {
        if (video.title.toLowerCase().includes(filterString.toLowerCase())) {
            matches.push(video);
        }
    }
    displayVideoThumbnails(matches);
}


function filterVideoCategory(category) {
    if(category.dataset.id === "all") {
        displayVideoThumbnails(videoArray);
    } else {
        let videoCategory = [];
        for(let video of videoArray) {
            if(String(video.categoryID) === category.dataset.id) {
                videoCategory.push(video);
            }
        }
        displayVideoThumbnails(videoCategory);
    }
}


function showAbout() {
    aboutButton.addEventListener('click', function(){
        homePage.classList.add('hidden');
        about.classList.remove('hidden');
    })
}

function showHome() {
    homeButton.addEventListener('click', function(){
        homePage.classList.remove('hidden');
        about.classList.add('hidden');
    })
}


getVideos();
hideVideo();
showAbout();
showHome();
