// Initialize the app
const gridViewTab = document.getElementById('gridViewTab');
const listViewTab = document.getElementById('listViewTab');
const cryptoContainer = document.getElementById('cryptoContainer');
let activeTab = 'grid';
let cryptoData = []; 

// Fetch data from the CoinGecko API
async function fetchCryptoData() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  // Display crypto data in Grid View
  function displayGrid(data) {
    const cryptoGrid = document.createElement('div');
    cryptoGrid.classList.add('crypto-grid');
  
    data.forEach(crypto => {
      const cryptoCard = document.createElement('div');
      cryptoCard.classList.add('crypto-card');
  
      cryptoCard.innerHTML = `
        <img src="${crypto.image}" alt="${crypto.name}">
        <h2>${crypto.name}</h2>
        <p>Price: $${crypto.current_price}</p>
        <p>Market Cap: $${crypto.market_cap}</p>
        <p>Change (24h): ${crypto.price_change_percentage_24h}%</p>
      `;
  
      cryptoGrid.appendChild(cryptoCard);
    });
  
    cryptoContainer.innerHTML = ''; // Clear previous content
    cryptoContainer.appendChild(cryptoGrid);
  }
  
  // Display crypto data in List View
  function displayList(data) {
    const cryptoTable = document.createElement('table');
    cryptoTable.classList.add('crypto-table');
  
    // Table header
    const tableHeader = `
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Change (24h)</th>
      </tr>
    `;
    cryptoTable.innerHTML = tableHeader;
  
    // Table rows
    data.forEach(crypto => {
      const cryptoRow = document.createElement('tr');
      cryptoRow.innerHTML = `
        <td>${crypto.name}</td>
        <td>$${crypto.current_price}</td>
        <td>$${crypto.market_cap}</td>
        <td>${crypto.price_change_percentage_24h}%</td>
      `;
      cryptoTable.appendChild(cryptoRow);
    });
  
    cryptoContainer.innerHTML = ''; // Clear previous content
    cryptoContainer.appendChild(cryptoTable);
  }
  
  // Switch between Grid View and List View when tabs are clicked
  function switchView() {
    if (activeTab === 'grid') {
      gridViewTab.classList.add('active');
      listViewTab.classList.remove('active');
      displayGrid(cryptoData);
    } else {
      gridViewTab.classList.remove('active');
      listViewTab.classList.add('active');
      displayList(cryptoData);
    }
  }
  
  // Event listeners for tab clicks
  gridViewTab.addEventListener('click', () => {
    activeTab = 'grid';
    switchView();
  });
  
  listViewTab.addEventListener('click', () => {
    activeTab = 'list';
    switchView();
  });
  
  fetchCryptoData().then((data) => {
    cryptoData = data;
    switchView(); // Display default view on app load
  });
  