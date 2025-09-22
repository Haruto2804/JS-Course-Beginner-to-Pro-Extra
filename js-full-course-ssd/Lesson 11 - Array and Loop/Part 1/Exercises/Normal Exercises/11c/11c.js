const myTodoList = ['wash dinner',
   'wash dishes',
   'play game',
   'watch TV'];
   arraySwap(myTodoList); 
   console.log(myTodoList);
function arraySwap(array) {
  let n = array.length;
  let temp = array[0];
  array[0] = array[n-1];
  array[n-1] = temp;
}