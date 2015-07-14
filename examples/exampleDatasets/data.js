data = [
  {x: 0, y: 0, type: "0"}
];

var categories = 20; //change this number for more/less categories
var stack = 10; //change this number for more/less stack
var arr = [];

data = addCategories(categories);
data = addStacks(stack, categories);

//functions
function addCategories(categories){
  var arr1 = [];
  for(i = 0; i < categories; i++){
    var temp = JSON.parse(JSON.stringify(data[0]));
    temp.x = i;
    temp.y = i;
    arr1.push(temp);
  }
  return arr1;
}

function addStacks(numStack, numCategories){
  var arr2 = [];
  for(i = 0; i < numStack; i++){
    var temp = JSON.parse(JSON.stringify(data));
    for(j = 0; j < numCategories; j++){
        temp[j].type = i.toString();
    }
    arr2.push(temp);
  }
  return arr2;
}
