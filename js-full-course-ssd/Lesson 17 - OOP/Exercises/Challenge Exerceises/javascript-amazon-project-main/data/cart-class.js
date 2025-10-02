import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptionId.js";
class Cart {
  cartItems;
  #localStorageKey;
  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromLocalStorage();
  }
  #loadFromLocalStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  };
  saveToLocalStorage () {
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  };
  addToCart (productId) {
    const addToCartElement = document.querySelectorAll('.js-add-to-cart')
    addToCartElement.forEach((addBtn)=> {
      addBtn.addEventListener('click',()=> {
        const productId = addBtn.dataset.productId;
        let matchingItem;
        const selectorElement = document.querySelector(`.js-select-input-${productId}`)
        
        this.cartItems.forEach((cartItem)=> {
          if(productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        })

        if(matchingItem) {
          matchingItem.quantity += Number (selectorElement.value);
        }
        else {
          this.cartItems.push({
            productId: productId,
            quantity: Number (selectorElement.value),
            deliveryOptionId: "1"
          })
        }
        this.saveToLocalStorage();
        this.updateCartQuantity();
        this.displayAddMessage(productId);
      })
    })
  };
  addToCart1(productId) {
  let matchingItem;

  this.cartItems.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1; // chỉ tăng 1
  } else {
    this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1"
    });
  }

  this.saveToLocalStorage();
  };
  
  updateCartQuantity () {
      let cartQuantity = 0;
      this.cartItems.forEach((item)=> {
      cartQuantity += item.quantity;;
    })
      document.querySelector('.js-cart-quantity')
        .innerHTML = `${cartQuantity}`
    return cartQuantity;
  };

  removeFromCart(productId) {
  const newCart = [];
  this.cartItems.forEach((cartItem)=> {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  this.cartItems = newCart;
  this.saveToLocalStorage(cart);
  };

  totalCartQuantity () {
  let cartQuantity = 0; 
  this.cartItems.forEach((cartItem)=> {
    cartQuantity += cartItem.quantity
  })
  return cartQuantity;
  };

  displayAddMessage (productId) {
  const addedMessage = document.querySelector(`.added-to-cart-js-${productId}`);
  let addedMessageTimeoutId;
  addedMessage.classList.add('added-to-cart-js-visible');
  const timeOutId = setTimeout(()=> {
    if(addedMessageTimeoutId) {
      clearTimeout(addedMessageTimeoutId);
    }
    addedMessage.classList.remove('added-to-cart-js-visible');
  },2000)
  addedMessageTimeoutId = timeOutId;
  };

}



export const cart = new Cart ('cart-oop');




  




