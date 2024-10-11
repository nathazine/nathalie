// Get cart from local storage (if available)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items
function displayCartItems() {
    const cartList = document.querySelector('.cart__list');
    cartList.innerHTML = ''; // Clear the cart list before updating it
    cart.forEach((product, index) => {
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `
        <img src="${product.image}" alt="product image">
        <h2>${product.title}</h2>
        <span>${product.price}</span>
        <button class="remove-from-cart">Remove from Cart</button>
      `;
      cartItem.dataset.productIndex = index; // Add a data attribute to store the product index
      cartList.appendChild(cartItem);
    });
  
    // Add event listener to remove from cart buttons
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.parentNode.dataset.productIndex);
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
      });
    });
     // Display total cost
  const totalCostElement = document.getElementById('total-cost');
  totalCostElement.innerText = calculateTotal();
  }

  displayCartItems();

  // Calculate total cost
function calculateTotal() {
    let total = 0;
    cart.forEach((product) => {
      const priceString = product.price.replace('Ksh ', '').replace(',', ''); // Remove "Ksh" prefix and comma
      const price = parseFloat(priceString);
      if (isNaN(price)) {
        console.error(`Invalid price string: Ksh{priceString}`);
        return NaN; // Return NaN if price string is invalid
      }
      total += price;
    });
    return total.toFixed(2);
  }
