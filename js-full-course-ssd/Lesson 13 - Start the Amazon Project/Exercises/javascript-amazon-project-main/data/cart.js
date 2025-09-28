import { products } from "./products.js";
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

  //CART FUNCTION=====================================
  export function addtoCart (productId,selectorElement) {
      let matchingItem;
      cart.forEach((cartItem)=> {
        if(productId === cartItem.productID) {
              matchingItem=cartItem;
        }
      })
        if(matchingItem) {
          matchingItem.quantity+= Number(selectorElement.value);
          
        }else {
          cart.push({
          productId: productId,
          quantity: Number(selectorElement.value)
          })
        }
        saveToLocalStorage();
  }
  export function updateCartQuantity () {
      let cartQuantity = 0;
      localStorage.getItem('cart');
      cart.forEach((item)=> {
      cartQuantity += item.quantity;
      document.querySelector('.js-cart-quantity')
        .innerHTML = `${cartQuantity}`;
    })
  }
  export function displayAddMessage (productId) {
    const addedMessage = document.querySelector(`.added-to-cart-js-${productId}`);
    console.log(addedMessage)
    let addedMessageTimeoutId;
    addedMessage.classList.add('added-to-cart-js-visible');
    const timeOutId = setTimeout(()=> {
      if(addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }
      addedMessage.classList.remove('added-to-cart-js-visible');
    },2000)
    addedMessageTimeoutId = timeOutId;
  }
  //CART FUNCTION===================================
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem)=> {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToLocalStorage(cart);
}

function saveToLocalStorage () {
  localStorage.setItem('cart',JSON.stringify(cart));
}