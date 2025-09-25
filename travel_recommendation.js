// Handle search and reset functionality for the navigation search bar

let destinations = null;
fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(jsonData => {
        destinations = jsonData;
        console.log(destinations);})
    .catch(error => {
        console.error('Error fetching travel recommendations:', error);
    });


function keywordSearch(){
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const keyWords = Object.keys(destinations);
    for (const key of keyWords) {
        if (key.toLowerCase().includes(searchInput)) {
            return destinations[key];
        }
    }
    return [];
}
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const results = keywordSearch();    
    displayDestinations(results);
});

function displayDestinations(destList) {
    const container = document.getElementById('destinationResults');
    container.innerHTML = '';

    if (!destList || destList.length === 0) {
        container.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Edge case: countries
    if (destList[0] && destList[0].cities) {
        // Flatten all cities from all countries
        destList = destList.flatMap(country => country.cities.map(city => ({
            name: city.name,
            imageUrl: city.imageUrl,
            description: city.description
        })));
    }

    destList.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'destination-card';

        const img = document.createElement('img');
        img.src = dest.imageUrl;
        img.alt = dest.name;
        img.className = 'destination-image';

        const title = document.createElement('h3');
        title.textContent = dest.name;
        title.className = 'destination-title';

        const desc = document.createElement('p');
        desc.textContent = dest.description;
        desc.className = 'destination-desc';

        const visitBtn = document.createElement('button');
        visitBtn.textContent = 'Visit';
        visitBtn.className = 'visit-btn';

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(visitBtn);

        container.appendChild(card);
    });
    console.log('Displayed destinations:', destList);
}

const resetBtn = document.getElementById('resetBtn');  
resetBtn.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('searchInput').value = '';
    document.getElementById('destinationResults').innerHTML = '';
} )
