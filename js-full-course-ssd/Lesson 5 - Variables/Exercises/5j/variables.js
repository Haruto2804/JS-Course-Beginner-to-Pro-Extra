let cartQuantityElement = document.getElementById('show-Quantity');
let addToCartElement = document.getElementById('add-to-cart');
let plus2BtnElement = document.getElementById('plus2');
let plus3BtnElement = document.getElementById('plus3');
let plus4BtnElement = document.getElementById('plus4');
let plus5BtnElement = document.getElementById('plus5');
let minus2BtnElement = document.getElementById('minus2');
let minus3BtnElement = document.getElementById('minus3');
let resetBtnElement = document.getElementById('resetBtn');
let removeFromCartElement = document.getElementById('remove-from-cart');
let cartQuantity = 0;

cartQuantityElement.addEventListener('click', ()=>{
  console.log(`Show Quantity: ${cartQuantityElement.value}`);
})

if(cartQuantity >=0) {
  
}
addToCartElement.addEventListener('click', () => {
  cartQuantity++;
  cartQuantityElement.textContent = cartQuantity;
})

plus2BtnElement.addEventListener('click', ()=> {
  cartQuantity +=2;
  cartQuantityElement.textContent = cartQuantity;
})

plus3BtnElement.addEventListener('click', ()=> {
  cartQuantity+=3;
  cartQuantityElement.textContent = cartQuantity;
})
minus2BtnElement.addEventListener('click', ()=> {
  cartQuantity -=2;
  cartQuantityElement.textContent = cartQuantity;
})

minus3BtnElement.addEventListener('click', ()=> {
  cartQuantity-=3;
  cartQuantityElement.textContent = cartQuantity;
})
plus4BtnElement.addEventListener('click', ()=> {
  cartQuantity+=4;
  cartQuantityElement.textContent = cartQuantity;
})
plus5BtnElement.addEventListener('click', ()=> {
  cartQuantity+=5;
  cartQuantityElement.textContent = cartQuantity;
})

resetBtnElement.addEventListener('click', ()=> {
  cartQuantity = 0;
  cartQuantityElement.textContent = cartQuantity;
})
removeFromCartElement.addEventListener('click', ()=> {
  if(cartQuantity >= 0) {
    cartQuantity--;
    cartQuantityElement.textContent = cartQuantity;
  }else {
    alert('The quantity is 0 now, error!');
    cartQuantityElement.textContent = 0;
  }
})