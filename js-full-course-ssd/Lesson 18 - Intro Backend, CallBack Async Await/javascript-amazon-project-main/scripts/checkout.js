import {renderOrderSummary} from '../scripts/checkout/orderSummary.js'
import {renderPaymentSummary} from '../scripts/checkout/paymentSummary.js'
// /import '../data/cart-class.js'
import { loadProducts } from '../data/products.js';
import '../data/backend-practice.js'
import {loadCart} from '../data/cart-class.js';


/*
new Promise ((resolve)=> {
  console.log('start promise');
  loadProducts(()=> {
    resolve();
  });
}).then(()=> {
  console.log('da load products');
  renderOrderSummary();
  renderPaymentSummary();
})

*/

Promise.all([
  new Promise ((resolve) => {
  loadProducts(()=> {
    resolve('value1');
    })
  }),
  new Promise((resolve)=> {
      loadCart(()=> {
      resolve();
    });
  })
]).then ((value) => {
  console.log(value)
  renderOrderSummary();
  renderPaymentSummary();
});





// new Promise ((resolve)=> {
//   loadProducts(()=> {
//     resolve();
//   })
// }).then (()=> {
//   return new Promise((resolve)=> {
//     loadCart(()=> {
//       resolve();
//     });
//   });
// }).then(()=> {
//   renderOrderSummary();
//   renderPaymentSummary();
// })



//  loadProducts(()=> {
//   loadCart(()=> {
//      renderOrderSummary();
//      renderPaymentSummary();
//   });
//  });
