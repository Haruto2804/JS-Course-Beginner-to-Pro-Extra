class Car {
  brand;
  model;
  speed;
  constructor (carDetails) {
    this.speed = 0;
    this.brand = carDetails.brand;
    this.model = carDetails.model;
    this.displayInfo();
  }
  displayInfo () {
    console.log(`${this.brand} ${this.model} ${this.speed} km/h`)
  }
  go () {
    this.speed +=5;
    if(this.speed>200) {
      this.speed = 200;
    }
}
  brake () {
    this.speed -=5;
    if(this.speed <0) {
      this.speed = 0;
    }
    
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

//speed car1 = 10km/h
car1.go();
car1.go();

//speed car1 = 20km/h
car2.go();
car2.go();
car2.go();
car2.go();


console.log(car1,car2);




