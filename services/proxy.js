// const user = {
//     age: 18,
//     name: "Peter"
// };
//
// const proxy = new Proxy(user, {
//     get (target, prop){
//         console.log(`Reading: ${prop}` );
//         return target[prop];
//     },
//     set (target, prop, value){
//         if (prop === "age" && value < 0) {
//             return false;
//         }
//         console.log(`Setting: ${prop} to ${value}`);
//         target[prop] = value;
//         return true;
//     }
// })
//
// console.log(proxy.name);
//
// proxy.age = -10;
// console.log(proxy.age);

const defaultScore = (target, defaultScore = 0) => {
    return new Proxy (target, {
        get (target, prop){
            if (prop in target){
                return target[prop];
            }
            return defaultScore;
        }
    })
}

const players = defaultScore({
    "Peter": 10,
    "John": 12
});
console.log(players.Peter);
console.log(players.John);
console.log(players.Bob);