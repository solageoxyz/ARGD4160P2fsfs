const catData = [
  { 
    "Name": "snow", 
    "Gender": "male", 
    "Breed": "flame point", 
    "Age": 5 ,
    "path": "images/snowyposter.jpg"
  },
   { 
    "Name": "Boreum", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 4 ,
    "path": "images/boreum.jpg"
  },
 { 
    "Name": "gojo", 
    "Gender": "male", 
    "Breed": "flame point", 
    "Age": 5 ,
    "path": "images/gojo.PNG"
  },
   { 
    "Name": "magic", 
    "Gender": "female", 
    "Breed": "tuxedo", 
    "Age": 3 ,
    "path": "images/magic.jpg"
  },
   { 
    "Name": "bub", 
    "Gender": "male", 
    "Breed": "shorthair", 
    "Age": 5 ,
    "path": "images/bub.jpg"
  },
   { 
    "Name": "cala", 
    "Gender": "female", 
    "Breed": "tabby", 
    "Age": 7 ,
    "path": "images/cala.jpeg"
  },
   { 
    "Name": "soonie", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 15 ,
    "path": "images/soonie.jpg"
  },
   { 
    "Name": "doongie", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 13 ,
    "path": "images/doongie.jpeg"
  },
   { 
    "Name": "dori", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 7 ,
    "path": "images/dori.jpeg"
  },
   { 
    "Name": "brandon", 
    "Gender": "female", 
    "Breed": "tabby", 
    "Age": 4 ,
    "path": "images/brandon.jpg"
  },
   { 
    "Name": "mango", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 3 ,
    "path": "images/mango.jpeg"
  },
   { 
    "Name": "eepy", 
    "Gender": "female", 
    "Breed": "tabby", 
    "Age": 1 ,
    "path": "images/eepy.jpeg"
  },
   { 
    "Name": "girl", 
    "Gender": "female", 
    "Breed": "turtleshell", 
    "Age": 4 ,
    "path": "images/girl.jpeg"
  },
   { 
    "Name": "grr", 
    "Gender": "female", 
    "Breed": "shorthair", 
    "Age": 3 ,
    "path": "images/grr.jpeg"
  },
   { 
    "Name": "huh", 
    "Gender": "male", 
    "Breed": "shorthair", 
    "Age": 5 ,
    "path": "images/huh.jpeg"
  },
   { 
    "Name": "kitten", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 6 ,
    "path": "images/kitten.jpg"
  },
   { 
    "Name": "luna", 
    "Gender": "female", 
    "Breed": "shorthair", 
    "Age": 8 ,
    "path": "images/luna.jpeg"
  },
   { 
    "Name": "maxwell", 
    "Gender": "male", 
    "Breed": "tuxedo", 
    "Age": 3 ,
    "path": "images/maxwell.jpeg"
  },
   { 
    "Name": "mr boom", 
    "Gender": "male", 
    "Breed": "siamese", 
    "Age": 4 ,
    "path": "images/mr boom.jpeg"
  },
   { 
    "Name": "jiggy", 
    "Gender": "female", 
    "Breed": "dwarf", 
    "Age": 6 ,
    "path": "images/jiggy.jpeg"
  },
   { 
    "Name": "narum", 
    "Gender": "female", 
    "Breed": "shorthair", 
    "Age": 4 ,
    "path": "images/narum.jpg"
  },
   { 
    "Name": "natsu", 
    "Gender": "female", 
    "Breed": "shorthair", 
    "Age": 7 ,
    "path": "images/natsu.jpg"
  },
   { 
    "Name": "oye", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 12 ,
    "path": "images/oye.jpeg"
  },
   { 
    "Name": "trex", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 7 ,
    "path": "images/trex.jpeg"
  },
   { 
    "Name": "uncle bao", 
    "Gender": "male", 
    "Breed": "tabby", 
    "Age": 13 ,
    "path": "images/uncle bao.jpg"
  },
   { 
    "Name": "uni", 
    "Gender": "female", 
    "Breed": "turtleshell", 
    "Age": 4 ,
    "path": "images/uni.jpeg"
  },
   { 
    "Name": "wisp", 
    "Gender": "female", 
    "Breed": "flame point", 
    "Age": 2 ,
    "path": "images/wisp.jpeg"
  },
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const genderFilter = document.getElementById('genderFilter');
const breedFilter = document.getElementById('breedFilter');
const sortSelect = document.getElementById('sortSelect');
const cardContainer = document.getElementById('cardContainer');
const tableContainer = document.getElementById('tableContainer');
const tableBody = document.getElementById('tableBody');
const recordCount = document.getElementById('recordCount');
const cardViewBtn = document.getElementById('cardViewBtn');
const tableViewBtn = document.getElementById('tableViewBtn');

// Modal Elements
const catModal = document.getElementById('catModal');
const closeModal = document.getElementById('closeModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');

// Initialize options for breed filter dropdown
function populateBreeds() {
    const breeds = [...new Set(catData.map(cat => cat.Breed))].sort();
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedFilter.appendChild(option);
    });
}

// Function to open the modal with just the cat's image
function openCatModal(cat) {
    modalImage.src = cat.path;
    modalImage.alt = cat.Name;
    modalCaption.textContent = `${cat.Name} 🐾`;
    catModal.classList.remove('hidden');
}

// Function to close modal
function closeCatModal() {
    catModal.classList.add('hidden');
}

// Render data based on filters and sorting
function renderArchive() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGender = genderFilter.value;
    const selectedBreed = breedFilter.value;
    const sortValue = sortSelect.value;

    // Filter
    let filtered = catData.filter(cat => {
        const matchesSearch = cat.Name.toLowerCase().includes(searchTerm) || 
                              cat.Breed.toLowerCase().includes(searchTerm);
        const matchesGender = selectedGender === "" || cat.Gender === selectedGender;
        const matchesBreed = selectedBreed === "" || cat.Breed === selectedBreed;
        return matchesSearch && matchesGender && matchesBreed;
    });

    // Sort
    filtered.sort((a, b) => {
        if (sortValue === 'name-asc') {
            return a.Name.localeCompare(b.Name);
        } else if (sortValue === 'age-asc') {
            return a.Age - b.Age;
        } else if (sortValue === 'age-desc') {
            return b.Age - a.Age;
        }
    });

    // Update count
    recordCount.textContent = filtered.length;

    // Render Cards
    cardContainer.innerHTML = '';
    filtered.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'archive-card';
        card.innerHTML = `
            <img src="${cat.path}" alt="${cat.Name}">
            <div class="archive-card-body">
                <h3>${cat.Name}</h3>
                <p><strong>Breed:</strong> ${cat.Breed}</p>
                <p><strong>Gender:</strong> ${cat.Gender}</p>
                <p><strong>Age:</strong> ${cat.Age} yrs</p>
            </div>
        `;
        // Click card to open image popup
        card.addEventListener('click', () => openCatModal(cat));
        cardContainer.appendChild(card);
    });

    // Render table
    tableBody.innerHTML = '';
    filtered.forEach(cat => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${cat.path}" alt="${cat.Name}" style="width:40px;height:40px;object-fit:cover;border-radius:50%;"></td>
            <td>${cat.Name}</td>
            <td>${cat.Gender}</td>
            <td>${cat.Breed}</td>
            <td>${cat.Age}</td>
        `;
        // Click row to open image popup
        row.addEventListener('click', () => openCatModal(cat));
        tableBody.appendChild(row);
    });
}

// Event listeners
searchInput.addEventListener('input', renderArchive);
genderFilter.addEventListener('change', renderArchive);
breedFilter.addEventListener('change', renderArchive);
sortSelect.addEventListener('change', renderArchive);

// Modal Event Listeners
closeModal.addEventListener('click', closeCatModal);
catModal.addEventListener('click', (e) => {
    // Close if clicking outside the image container
    if (e.target === catModal) {
        closeCatModal();
    }
});

// View toggle (fixed to use .hidden class properly)
cardViewBtn.addEventListener('click', () => {
    cardContainer.classList.remove('hidden');
    tableContainer.classList.add('hidden');
    cardViewBtn.classList.add('active');
    tableViewBtn.classList.remove('active');
});

tableViewBtn.addEventListener('click', () => {
    tableContainer.classList.remove('hidden');
    cardContainer.classList.add('hidden');
    cardViewBtn.classList.remove('active');
    tableViewBtn.classList.add('active');
});

// Initial load
populateBreeds();
renderArchive();