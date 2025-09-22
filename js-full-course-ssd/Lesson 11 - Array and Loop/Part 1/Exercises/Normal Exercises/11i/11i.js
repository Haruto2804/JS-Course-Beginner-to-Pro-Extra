function addNum(array,num) {
    let arrayAddNum = [];
    for(let i =0; i<array.length;i++) {
        arrayAddNum [i] = array[i]+num;
    }
    console.log(arrayAddNum);
}
addNum([1,2,3],2);
addNum([1,2,3],3);
addNum([-2,-1,0,99],2);