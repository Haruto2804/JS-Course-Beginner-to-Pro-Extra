class Car {
  brand;
  model;
  speed;
  isTrunkOpen = false;
  constructor (carDetails) {
    this.speed = 0;
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }
  displayInfo () {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'close'
    console.log(`${this.brand} ${this.model} ${this.speed} km/h, Trunk: ${trunkStatus}`)
  }
  go () {
    if(!this.isTrunkOpen) { //if trunk close
      this.speed +=5;
    }

    //Limit speed
    if(this.speed>200) {
      this.speed = 200;
    }
}
  brake () {
    this.speed -=5;

    //Limit speed
    if(this.speed <0) {
      this.speed = 0;
    }  
  }
  openTrunk () {
    if(this.speed ===0) {
      this.isTrunkOpen = true;
    }
  }
  closeTrunk () {
    this.isTrunkOpen = false;
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
// car1.go();
// car1.go();
//speed car1 = 20km/h


// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();
console.log(car1,car2);




