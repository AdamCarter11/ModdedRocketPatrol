console.log("hello");
//shift tab to un-tab a highlighted group of code

let arrayVar = ["firstVal","secondVal"];

arrayVar.unshift("zeroVal"); // adds to front of array
arrayVar.push("thirdVal"); // adds to back of array

for(let i = 0; i < 10; i++){
    console.log(arrayVar[i]);
}

let my_obj = {
    name: 'obj1',
    val: 0,
    nums: ['1','2']
};
console.log(my_obj);

function funTest(obj){
    obj.val += 10;
    return obj.val;
}