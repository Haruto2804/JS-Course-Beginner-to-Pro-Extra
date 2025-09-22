const nums = [1,2,3];
const numsPlus1 = [];
//11g
console.log('=========11g==========');
for(let i =0;i<nums.length;i++) {
    numsPlus1[i] = nums[i] +1;
}
console.log('Nums:',nums);
console.log('Nums + 1',numsPlus1);


//11h
console.log('=========11g==========');
function addOne (array) {
    let arrayPlus1 = [];
    for(let i =0;i<array.length;i++) {
    arrayPlus1[i] = array[i] +1;
}
console.log('Array After Plus 1:',arrayPlus1);
}
// check ket qua
addOne ([1,2,3]);
addOne([-2,-1,0,99]);