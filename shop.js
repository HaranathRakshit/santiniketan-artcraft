// Shop Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Shopping Cart
    let cart = [];
    let cartTotal = 0;

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img').src;
            const artisan = productCard.querySelector('.artisan').textContent;
            
            // Add to cart
            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                artisan: artisan,
                quantity: 1
            };
            
            cart.push(product);
            cartTotal += parseInt(productPrice.replace('₹', '').replace(',', ''));
            
            // Update cart count
            updateCartCount();
            
            // Show notification
            showNotification(`${productName} added to cart!`);
            
            // Update cart display
            updateCartDisplay();
        });
    });

    // Update cart count
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #2c5530;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Update cart display
    function updateCartDisplay() {
        const cartItems = document.getElementById('cartItems');
        const cartSubtotal = document.getElementById('cartSubtotal');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (cartItems) {
            cartItems.innerHTML = '';
            
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.artisan}</p>
                        <p>${item.price}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">&times;</button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
        
        if (cartSubtotal) {
            cartSubtotal.textContent = `₹${cartTotal}`;
        }
        
        if (cartTotalElement) {
            cartTotalElement.textContent = `₹${cartTotal + 100}`; // Adding shipping
        }
    }

    // Remove from cart (global function)
    window.removeFromCart = function(index) {
        const removedItem = cart[index];
        cartTotal -= parseInt(removedItem.price.replace('₹', '').replace(',', ''));
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
        showNotification(`${removedItem.name} removed from cart`);
    };

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                const artisanName = card.querySelector('.artisan').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || artisanName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === '' || cardCategory === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Price filter
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter) {
        priceFilter.addEventListener('change', function() {
            const selectedPrice = this.value;
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const cardPrice = parseInt(card.getAttribute('data-price'));
                
                if (selectedPrice === '') {
                    card.style.display = 'block';
                } else if (selectedPrice === '0-500' && cardPrice <= 500) {
                    card.style.display = 'block';
                } else if (selectedPrice === '500-1000' && cardPrice > 500 && cardPrice <= 1000) {
                    card.style.display = 'block';
                } else if (selectedPrice === '1000-2000' && cardPrice > 1000 && cardPrice <= 2000) {
                    card.style.display = 'block';
                } else if (selectedPrice === '2000+' && cardPrice > 2000) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Cart toggle
    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', function() {
            cartSidebar.classList.add('active');
        });
    }
    
    if (closeCart && cartSidebar) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });
    }

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const artisan = productCard.querySelector('.artisan').textContent;
            
            showNotification(`Quick view: ${productName} - ${productPrice}`);
        });
    });

    // Load more products
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            showNotification('Loading more products...');
            // Here you would typically load more products from a server
        });
    }

    // Checkout functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
            } else {
                showNotification('Proceeding to checkout...');
                // Here you would typically redirect to a checkout page
            }
        });
    }
}); 