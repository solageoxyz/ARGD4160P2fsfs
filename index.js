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

let catData = [];

// Fetch data from data.json
async function loadCatData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load cat data');
        }
        catData = await response.json();
        
        // Initialize the app once data is loaded
        populateBreeds();
        renderArchive();
    } catch (error) {
        console.error('Error fetching cat data:', error);
        recordCount.textContent = 'Error loading cats 😿';
    }
}

function populateBreeds() {
    const breeds = [...new Set(catData.map(cat => cat.Breed))].sort();
    breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
        breedFilter.appendChild(option);
    });
}

function openCatModal(cat) {
    modalImage.src = cat.path;
    modalImage.alt = cat.Name;
    modalCaption.textContent = `${cat.Name} 🐾`;
    catModal.classList.remove('hidden');
}

function closeCatModal() {
    catModal.classList.add('hidden');
}

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

searchInput.addEventListener('input', renderArchive);
genderFilter.addEventListener('change', renderArchive);
breedFilter.addEventListener('change', renderArchive);
sortSelect.addEventListener('change', renderArchive);

closeModal.addEventListener('click', closeCatModal);
catModal.addEventListener('click', (e) => {
    // Close if clicking outside the image container
    if (e.target === catModal) {
        closeCatModal();
    }
});

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

loadCatData();