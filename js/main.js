// Create the objects array
const posts = [
    {
        id: 1,
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
        tags: ['geo', 'tech', 'PROVA'],
        author: 'Diana Rossi',
        published: '2023-02-11',
        urlImg: './img/rubber-duck.jpg'
    },
    {
        id: 2,
        title: 'Esplorando le profondità marine: il mistero degli abissi',
        content: 'Esplorando le profondità marine: il mistero degli abissi',
        tags: ['viaggi', 'geo'],
        author: 'Fabio Mari',
        published: '2023-03-14',
        urlImg: './img/deep-sea.jpg'
    },
    {
        id: 3,
        title: 'Viaggio culinario: alla ricerca dei sapori perduti',
        content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
        tags: ['cucina'],
        author: 'Marta Bianchi',
        published: '2023-04-20',
        urlImg: './img/kitchen-food.jpg'
    },
    {
        id: 4,
        title: 'Arte moderna: oltre i confini convenzionali',
        content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
        tags: ['arte', 'tech', 'prova'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
        urlImg: './img/modern-art.jpg'
    }
];

//#region HEADER -----------------------------------------------------------------

// Create an array with all distinct tags in lowerCase
const uniqueTagsSet = [...new Set(posts.flatMap(post => post.tags.map(tag => tag.toLowerCase())))];

// Add 'all' option at the beginning of the array
uniqueTagsSet.unshift('all');

// Add empty tag to test the empty tag case
uniqueTagsSet.push('test-no-post');

// Select the select element
const selectEl = document.querySelector('select');

// Create the dynamic select options
uniqueTagsSet.forEach(tag => {

    // Create option element
    const optionEl = document.createElement('option');

    // Assign LowerCase tag to option value
    optionEl.value = tag.toLowerCase();

    // Teg with first lettere in UpperCase
    optionEl.innerHTML = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();

    // Append option element to the select one
    selectEl.appendChild(optionEl);

})

// Create eventListener to recalculate filtered posts to load
selectEl.addEventListener('change', function () {

    // Empty the main element
    mainEl.innerHTML = '';

    // Filter posts on user selection (check all tags in lowerCase)
    const postsFiltered = this.value === 'all' ? posts : posts.filter(post => post.tags.map(tag => tag.toLowerCase()).includes(this.value));


    // Generate filtered posts
    if (postsFiltered.length !== 0) {

        postsFiltered.forEach(post => {
            postGenerator(post);
        })

    } else {

        // If there are no post insert an element to display a message to user
        const messageEl = document.createElement('h2');
        messageEl.innerHTML = 'Nessun post presente';
        messageEl.style.color = 'white';
        mainEl.appendChild(messageEl);
    }

})

//#endregion ---------------------------------------------------------------------

//#region MAIN -------------------------------------------------------------------

// Select the main element
const mainEl = document.querySelector('main');

// Create variable to set favourite posts
let favouritePosts = [];

// Generate posts
posts.forEach(post => {
    postGenerator(post);
})

//#endregion ---------------------------------------------------------------------

//#region FUNCTIONS --------------------------------------------------------------

/**
 * ### postGenerator
 * To create the complete post element in the DOM
 * @param {object} post It's the post will be inserted
 */
function postGenerator(post) {

    // Create a variable for html markup
    const sectionMarkup = `
    <div class="title d-flex justify-content-between">
        <div class="section-left">
            <h2>${post.title}</h2>
            <h5>${post.author}</h5>
            <h6>in data ${post.published.substring(8, 10)}/${post.published.substring(5, 7)}/${post.published.substring(0, 4)}</h6>
        </div>
        ${!favouritePosts.includes(post.id) ? `<i class="fa-regular fa-bookmark" data-postid="${post.id}"></i>` : `<i class="fa-solid fa-bookmark" data-postid="${post.id}"></i>`}
    </div>
    <p>${post.content}</p>
    <img src="${post.urlImg}" alt="${post.urlImg.substring(6, post.urlImg.indexOf('.jpg'))}" class="w-100 object-fit-cover mb-3">
    <div class="tags d-flex">
    </div>
    `

    // Create the new section element
    const sectionEl = document.createElement('section');

    // Assign classes the to section element
    sectionEl.className = 'bg-light p-3 mb-4';

    // Insert markup into section element
    sectionEl.innerHTML = sectionMarkup;

    // Append section element to the main one
    mainEl.appendChild(sectionEl);

    // Comment markup to add
    const commentMarkup = `<!-- Section ${post.id} -->`;

    // Add comment at the end of sectionEl
    sectionEl.insertAdjacentHTML('afterend', commentMarkup);

    // Select i element
    const iEl = sectionEl.querySelector('i');

    // Add an eventListener to change icon class and add/remove the post id from favouritePosts array
    iEl.addEventListener('click', function () {

        toggleFavouritePosts(favouritePosts, post.id);

        this.classList.contains('fa-regular') ? this.className = 'fa-solid fa-bookmark' : this.className = 'fa-regular fa-bookmark';
    })

    // Select tags element
    const tagsEl = sectionEl.querySelector('.tags');

    // Invoke function to create all tags
    tagsGenerator(post.tags, tagsEl);

}

/**
 * ### tagsGenerator
 * To generate all tags elements
 * @param {array} arr The array with all tags
 * @param {object} tagsEl The element container of all tags
 */
function tagsGenerator(arr, domEl) {

    arr.forEach(tag => {

        const tagEl = document.createElement('div');

        tagEl.className = `tag-${tag.toLowerCase()} py-1 px-2 text-light rounded-3 me-2`;

        tagEl.innerHTML = tag.toLowerCase();

        domEl.appendChild(tagEl);
    })

}

/**
 * ### toggleFavouritePosts
 * Add or remove an element from the array checking if present or not
 * @param {array} arr The array where add or remove the id
 * @param {number} id The id has to be added or removed from the array
 */
function toggleFavouritePosts(arr, id) {

    const index = arr.indexOf(id);
    if (index > -1) { // only splice array when item is found
        arr.splice(index, 1); // 2nd parameter means remove one item only
    } else {
        arr.push(id);
    }
}

//#endregion ---------------------------------------------------------------------