const AIRTABLE_TOKEN = "patE2pSe0j0oZHfEk.8fc8ef7cca07724abe6f348aa413e6b69a1e1787752c14e42bc26e1326546e5a";
const BASE_ID = 'appwTdrup8dT6Rgug';
const TABLE_NAME = 'tbljboyQCh473N6JG'; // Your table name

var titles = ["Advance to serve", "Title 2", "Title 3", "Title 4", "Title 5"];
var images = ["img/Carousel/1.jpg", "img/Carousel/2.jpg", "img/Carousel/3.jpg", "img/Carousel/4.jpg", "img/Carousel/5.jpg"];
var descriptions = ["Advance to serve", "cool", "nice", "why", "because"];

async function fetchCarouselData() {
    try {
        const response = await fetch(
            `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`,
            {
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_TOKEN}`
                }
            }
        );

        const data = await response.json();

        console.log(data.records);

        // Clear arrays
        titles = [];
        descriptions = [];
        images = [];

        // Populate arrays from Airtable records
        data.records.forEach(record => {
            titles.push(record.fields.Title); // Title column
            descriptions.push(record.fields.ImageDescription); // Description column
            images.push(record.fields.Image[0].url); // Image attachment URL
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
