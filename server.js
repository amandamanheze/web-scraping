document.getElementById('scrape').addEventListener('click', async (event) => {
    event.preventDefault();

    const keyword = document.getElementById('keyword').value;
    if (!keyword) {
      document.getElementById('error').textContent = 'The keyword cannot be empty';
      document.getElementById('error').style.display = 'block';
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/scrape?keyword=${keyword}`);
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.error);
      }

      document.getElementById('results').innerHTML = '';
      document.getElementById('error').style.display = 'none';

      data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'card m-3';
        productDiv.style.width = '18rem';
        productDiv.innerHTML = `
          <a href="${product.productLink}" target="_blank">
            <img src="${product.imageUrl}" class="card-img-top img-thumbnail" alt="${product.title}">
          </a>
          <div class="card-body">
          <a href="${product.productLink}" target="_blank" style="text-decoration: none; color: black;">
            <h5 class="card-title">${product.title}</h5>
          </a>
            <p class="card-text"><b>Rating: </b>${product.rating}</p>
            <p class="card-text"><b>Review Count: </b>${product.reviewCount} </p>
          </div>
        `;
        document.getElementById('results').appendChild(productDiv);
      });
    } catch (error) {
      document.getElementById('error').textContent = error.message;
      document.getElementById('error').style.display = 'block';
    }
  });