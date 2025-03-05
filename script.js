// Global variable to store data fetched from the API
let cryptoData = [];

// Fetch data using .then() method
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(cryptoData);
        })
        .catch(error => console.log("Error fetching data:", error));
}

// Fetch data using async/await method
async function fetchDataWithAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

// Function to render the table
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear previous data

    data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin.name}</td>
            <td>${coin.symbol}</td>
            <td>$${coin.current_price.toFixed(2)}</td>
            <td>${coin.market_cap.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchQuery = e.target.value.toLowerCase();
    const filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchQuery)
    );
    renderTable(filteredData);
});

// Sort by Market Cap
function sortByMarketCap() {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
}

// Sort by Percentage Change
function sortByPercentageChange() {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
}

// Call the fetchData function when the page loads (choose either .then or async/await method)
fetchDataWithThen();
// OR
// fetchDataWithAsyncAwait();
