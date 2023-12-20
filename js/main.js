// Create the objects array
const posts = [
    {
        id: 1,
        title: 'Scoperta di una nuova specie di papera di gomma',
        content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
        tags: ['geo', 'tech'],
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
        tags: ['arte', 'tech'],
        author: 'Gabriele Neri',
        published: '2023-05-29',
        urlImg: './img/modern-art.jpg'
    }
];

console.log(posts);

// Select the main element
const mainEl = document.querySelector('main');

posts.forEach(post => {
    postGenerator(post);
})

//-----------//
// Functions //
//-----------//

function postGenerator(post) {

    // Create a variable for html markup
    const sectionMarkup = `
    <div class="title d-flex justify-content-between">
        <div class="section-left">
            <h2>${post.title}</h2>
            <h5>${post.author}</h5>
            <h6>in data ${post.published}</h6>
        </div>
        <i class="fa-regular fa-bookmark"></i>
    </div>
    <p>${post.content}</p>
    <img src="${post.urlImg}" alt="${post.urlImg.substring(6, post.urlImg.indexOf('.jpg'))}" class="w-100 object-fit-cover mb-3">
    <div class="tags d-flex">
        <div class="tag-geo py-1 px-2 text-light rounded-3 me-2">Geo</div>
        <div class="tag-tech py-1 px-2 text-light rounded-3">Tech</div>
    </div>
    <!-- Section ${post.id} -->
    `

    // Create the new section element
    const sectionEl = document.createElement('section');

    // Assign classes the to section element
    sectionEl.className = 'bg-light p-3 mb-4';

    // Insert markup into section element
    sectionEl.innerHTML = sectionMarkup;

    // Append section element to the main one
    mainEl.appendChild(sectionEl);

}