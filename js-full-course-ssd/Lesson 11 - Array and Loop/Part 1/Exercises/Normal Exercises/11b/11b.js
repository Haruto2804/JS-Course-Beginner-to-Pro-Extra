const myTodoList = ['wash dinner', 'wash dishes', 'play game','watch TV'];
const lastValue = getLastValue(myTodoList);
console.log('LastValue is:',lastValue);

function getLastValue(array) {
  for(let i = 0;i<array.length ;i++) {
    if(i==array.length-1) {
      return array[i];
    }
  }
}