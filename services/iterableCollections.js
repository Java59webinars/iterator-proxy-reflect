const simple = {a:1, b:2, c:3};

function simpleCollection(obj) {
    const keys = [];
    for (const key of Object.keys(obj)) {
            keys.push(key);
    }
    return keys;
}
console.log(simpleCollection(simple));

function collectionWithSymbols(obj) {
    const keys = [];
    for (const key of Reflect.ownKeys(obj)) {
        keys.push(key);
    }
    return keys;
}
const id = Symbol("id");
objWithSymbol = {a:1, b:2, [id]:3 };
console.log(collectionWithSymbols(objWithSymbol));

const person = {
    name: "Sara",
    age: 25,
    address: {
        country: "USA",
        city: "New York",
        address: "123 Main St",
        zip: 10001,
        location:{
            lat: 40.7128,
            long: -74.0060,
        }
    },
    contacts: {
        phone: "123-456-7890",
        email: "<EMAIL>"
    },
    emergencyContacts: {
        name: "John",
        phone: "123-456-7890",
        email: "<EMAIL>"
    },
    [id]: 12345
}
console.log(collectionWithSymbols(person));

function deepCollect(obj, keys = []) {
    for (const key of Reflect.ownKeys(obj)) {
        keys.push(key);
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            deepCollect(value, keys);
        }
    }
    return keys;
}
//person.self = person;
console.log(deepCollect(person));