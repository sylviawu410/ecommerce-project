class ShoppingCart {
    constructor() {
      this.items = new Map();
      this.loadFromStorage()
      this.bindEvents();
    }
    loadFromStorage() {
        // Implement the logic to load items from localStorage
        const storedItems = localStorage.getItem('shopping-cart');
        if (storedItems) {
          this.items = new Map(JSON.parse(storedItems));
        }
      }

    bindEvents() {
      // Add to cart button clicks
      document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
          const pid = e.target.dataset.pid;
          this.addItem(pid);
        });
      });
  
      // Quantity controls
      console.log("ID cart items", document.getElementById('cart-items'))

      document.getElementById('cart-items').addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item');
        if (!item) return;
        const pid = item.dataset.pid;
        if (e.target.classList.contains('increment')) {
          this.updateQuantity(pid, 1);
        } else if (e.target.classList.contains('decrement')) {
          this.updateQuantity(pid, -1);
        } else if (e.target.classList.contains('remove-item')) {
          this.removeItem(pid);
        }
      });
  
    }
  
    async fetchProductDetails(pid) {
      try {
        const response = await fetch(`/api/product/${pid}`);
        if (!response.ok) throw new Error('Product not found');
        const product = await response.json();
        const item = this.items.get(pid);
        item.name = product.name;
        item.price = product.price;
        this.updateUI();
        this.saveToStorage();
      } catch (error) {
        console.error('Failed to fetch:', error);
        this.items.delete(pid);
        alert('Failed to load product details');
      }
    }
    saveToStorage() {
      const data = Array.from(this.items.entries())
        .map(([pid, item]) => ({
          pid,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        }));
      localStorage.setItem('shopping-cart',
        JSON.stringify(data));
    }
  
    addItem(pid) {
      if (this.items.has(pid)) {
        const item = this.items.get(pid);
        item.quantity++;
      } else {
        this.items.set(pid, {
          quantity: 1, price: 0,
          name: ""
        });
        this.fetchProductDetails(pid);
      }
      this.updateUI();
      this.saveToStorage();
    }
  
    updateQuantity(pid, change) {
      const item = this.items.get(pid);
      item.quantity = Math.max(1, item.quantity + change);
      this.updateUI();
      this.saveToStorage();
    }
  
    removeItem(pid) {
      this.items.delete(pid);
      this.updateUI();
      this.saveToStorage();
    }
  
    updateUI() {
      const container = document.getElementById('cart-items');
      container.innerHTML = '';
      let total = 0;
      this.items.forEach((item, pid) => {
        const template = document.getElementById('cart-item-template');
        const clone = template.content.cloneNode(true);
        const itemElement = clone.querySelector('.cart-item');
        itemElement.dataset.pid = pid;
        itemElement.querySelector('.item-name')
          .textContent = item.name;
        itemElement.querySelector('.quantity').value = item.quantity;
        itemElement.querySelector('item.price').textContent =
          `$${(item.price * item.quantity).toFixed(2)}`;
        total += item.price * item.quantity;
        container.appendChild(clone);
      });
      document.getElementById('total-amount').textContent = total.toFixed(2);
    }
  
  }

  export default ShoppingCart;