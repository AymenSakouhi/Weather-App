console.log("starting app");

setTimeout(() => {
    console.log("inside of call back");
},2000);

setTimeout( () => {
    console.log("second time out");
},0);

console.log("finishing app");