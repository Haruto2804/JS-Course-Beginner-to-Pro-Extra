function addArrays(array1,array2) {
    let newArray = [];
    for(let i = 0;i<array1.length;i++) {
        newArray[i] = array1[i]+ array2[i];
    }
    console.log(newArray);
}
addArrays([1,1,2],[1,1,3]);
addArrays([1,2,3],[4,5,6]);