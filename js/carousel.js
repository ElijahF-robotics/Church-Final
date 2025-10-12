// const AIRTABLE_TOKEN = "patE2pSe0j0oZHfEk.8fc8ef7cca07724abe6f348aa413e6b69a1e1787752c14e42bc26e1326546e5a";
// const BASE_ID = 'your_base_id_here';
// const TABLE_NAME = 'Carousel Images'; // Your table name

var titles = ["Advance to serve", "Title 2", "Title 3", "Title 4", "Title 5"];
var images = ["img/Carousel/1.jpg", "img/Carousel/2.jpg", "img/Carousel/3.jpg", "img/Carousel/4.jpg", "img/Carousel/5.jpg"];
var descriptions = ["Advance to serve", "cool", "nice", "why", "because"];


const SHARE_ID = 'shrR8swNMBPisZlB3'; // Your share ID from the link
const API_URL = `https://airtable.com/v0.3/view/${SHARE_ID}/read`;

async function fetchCarouselData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Clear arrays
        titles = [];
        descriptions = [];
        images = [];

        // Populate arrays from Airtable records
        data.rows.forEach(row => {
            titles.push(row.cellValuesByColumnId[data.columns[0].id]); // Title column
            descriptions.push(row.cellValuesByColumnId[data.columns[1].id]); // Description column
            images.push(row.cellValuesByColumnId[data.columns[2].id][0].url); // Image attachment URL
        });

        console.log('Titles:', titles);
        console.log('Descriptions:', descriptions);
        console.log('Images:', images);

        return true;

    } catch (error) {
        console.error('Error fetching from Airtable:', error);
        return false;
    }
}

// Initialize
async function initCarousel() {
    await fetchCarouselData();
    buildTrack();
}

initCarousel();


// Carousel Data itself
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevCarouselBtn');
const nextBtn = document.getElementById('nextCarouselBtn');
var slides = document.querySelectorAll('.carouselSlide');
const title = document.getElementById('carouselTitle');

let currentIndex = 0;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    title.innerHTML = `<h1>${titles[currentIndex]}|</h1>
                       <p>${descriptions[currentIndex]}</p>`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
    console.log("Pressed next")
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
    console.log("Pressed prev")
}

function buildTrack() {
    track.innerHTML = ''

    images.forEach(image => {
        const slide = document.createElement('div');
        slide.classList.add('carouselSlide');

        slide.innerHTML = `<img src="${image}">`;

        track.appendChild(slide);
    })

    slides = document.querySelectorAll('.carouselSlide');

}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

updateCarousel();
