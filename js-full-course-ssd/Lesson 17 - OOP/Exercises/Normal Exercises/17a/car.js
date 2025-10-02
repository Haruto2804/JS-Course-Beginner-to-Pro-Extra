class Car {
  brand;
  model;
  constructor (carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }
}
const car1 = new Car ({
  brand: 'Toyota',
  model:  'Corolla'
})

const car2 = new Car ({
  brand: 'Tesla',
  model:  '3'
})
console.log(car1,car2);

