/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: 'true',
    spaceBetween: 16,
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`,{interval: 100})
sr.reveal(`.about__data, .discount__img`,{origin: 'left'})
sr.reveal(`.about__img, .discount__data`,{origin: 'right'})

document.addEventListener('DOMContentLoaded', function() {
    fetchNews();
});

function fetchNews() {
    const apiKey = '0d40fc489267451db9411501de3fd0a5'; // Your News API key
    const query = 'Microsoft'; // Example query
    const date = '2023-12-24'; // Example date
    const language = 'en'; // Example language
    const sortBy = 'publishedAt'; // Example sorting method

    const url = `https://newsapi.org/v2/everything?q=${query}&from=${date}&language=${language}&sortBy=${sortBy}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayNews(data.articles))
        .catch(error => {
            console.error('Error fetching news:', error);
            handleErrors(error);
        });
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(articleElement);
    });
}

function handleErrors(error) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `<p>Failed to load news: ${error.message}. Please try again later.</p>`;
}

// ... (any additional JavaScript code you may have) ...


document.addEventListener('DOMContentLoaded', function() {
    const globohireCountries = [
        'usa', 'canada', 'india', 'germany', 'australia', 'brazil', 
        'kenya', 'nigeria', 'japan', 'china', 'france', 'italy', 
        'spain', 'mexico', 'russia', 'south africa', 'egypt', 
        'argentina', 'indonesia', 'turkey', 'sweden', 
        'ghana', 'tanzania', 'south africa', 'egypt'
    ];
    let countriesData = {};

    Promise.all(globohireCountries.map(countryName => {
        return fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    countriesData[countryName] = data[0];
                }
            });
    })).then(() => {
        displayCountries(Object.values(countriesData));
    });

    document.getElementById('country-search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCountries = Object.values(countriesData).filter(country => 
            country.name.common.toLowerCase().includes(searchTerm));
        displayCountries(filteredCountries);
    });
});

function displayCountries(countries) {
    const container = document.getElementById('countries-section');
    container.innerHTML = countries.map(country => `
        <div class="country-card">
            <div class="country-flag">
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            </div>
            <div class="country-details">
                <h3 class="country-name">${country.name.common}</h3>
                <p class="country-info">Capital: ${country.capital}</p>
                <p class="country-info">Region: ${country.region}</p>
            </div>
        </div>
    `).join('');
}




document.addEventListener('DOMContentLoaded', () => {
    const phrases = ["Our Requirements", "Your Future", "Our Commitment"];
    const typingElement = document.getElementById("requirements-title");
    let currentPhrase = [];
    let deleting = false;
    let phraseIndex = 0;
    let letterIndex = 0;
    let typingSpeed = 120;
    let pauseEnd = 2000;
    let pauseStart = 500;

    function type() {
        if (phraseIndex === phrases.length) {
            phraseIndex = 0;
        }
        
        if (deleting) {
            if (letterIndex > 0) {
                currentPhrase.pop();
                letterIndex--;
                typingSpeed = 60;
            } else {
                deleting = false;
                phraseIndex++;
                typingSpeed = pauseStart;
            }
        } else {
            if (letterIndex < phrases[phraseIndex].length) {
                currentPhrase.push(phrases[phraseIndex][letterIndex]);
                letterIndex++;
                typingSpeed = 120;
            } else {
                typingSpeed = pauseEnd;
                deleting = true;
            }
        }

        typingElement.textContent = currentPhrase.join('');
        setTimeout(type, typingSpeed);
    }

    type();
});
