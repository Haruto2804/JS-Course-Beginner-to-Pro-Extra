class Car {
  brand;
  model;
  constructor(cardDetails) {
    this.brand = cardDetails.brand;
    this.model = cardDetails.model;
  }
}

const car1 = new Car ({
  brand: 'Toyota',
  model: 'Corolla'
})

const car2 = new Car ({
  brand: 'Tesla',
  model: '3'
})

console.log(car1,car1);

