// Get the add to cart buttons
var addToCartButtons = document.getElementsByClassName('add-to-cart');

// Add event listeners to the add to cart buttons
for (var i = 0; i < addToCartButtons.length; i++) {
	addToCartButtons[i].addEventListener('click', addToCartClicked);
}

// Function to handle the add to cart button clicks
function addToCartClicked(event) {
	var button = event.target;
	var name = button.getAttribute('data-name');
	var price = button.getAttribute('data-price');
	addItemToCart(name, price);
	updateCartTotal();
}

// Function to add an item to the cart
function addItemToCart(name, price) {
	var cartRow = document.createElement('li');
	cartRow.classList.add('cart-row');
	var cartItems = document.getElementsByClassName('cart-items')[0];
	var cartItemNames = cartItems.getElementsByClassName('cart-item');
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText === name) {
			alert('This item is already added to the cart');
			return;
		}
	}
	var cartRowContents = `
					<span class="cart-item cart-column">${name}</span>
					<span class="cart-price cart-column">${price}</span>
					<button class="remove-item cart-column" style="background-color: #333;">Remove</button>
				`;
	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);
	cartRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem);
}

// Function to update the cart total
function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName('cart-items')[0];
	var cartRows = cartItemContainer.getElementsByClassName('cart-row');
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName('cart-price')[0];
		var price = parseFloat(priceElement.innerText.replace('$', ''));
		total += price;
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName('cart-total-price')[0].innerText ="Total- "+ '$' + total;
}

// Function to remove an item from the cart
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updateCartTotal();
}

