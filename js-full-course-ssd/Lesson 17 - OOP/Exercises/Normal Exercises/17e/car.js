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

class RaceCar extends Car {
  acceleration;
  constructor (carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration; // lay data acceleration tu xe
  }
  go () {
    this.speed += this.acceleration; // override
    if(this.speed > 300) { // gioi han xe
      this.speed = 300;
    }
  }
  openTrunk () {
    console.log('Race cars do not have a trunk');
  }
  closeTrunk () {
    console.log('Race cars do not have a trunk');
  }
}
const raceCar = new RaceCar ({
  brand: 'MCLaren',
  model: 'F1',
  acceleration: 20
})



//test code
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();




