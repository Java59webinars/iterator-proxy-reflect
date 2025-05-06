const simple = {a:1, b:2, c:3};

function simpleCollection(obj) {
    const keys = [];
    for (const key of Object.keys(obj)) {
            keys.push(key);
    }
    return keys;
}
//console.log(simpleCollection(simple));

function collectionWithSymbols(obj) {
    const keys = [];
    for (const key of Reflect.ownKeys(obj)) {
        keys.push(key);
    }
    return keys;
}
const id = Symbol("id");
objWithSymbol = {a:1, b:2, [id]:3 };
//console.log(collectionWithSymbols(objWithSymbol));

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
//console.log(collectionWithSymbols(person));

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
person.self = person;
//console.log(deepCollect(person));
function deepCollectSafe(obj, keys = [], seen = new WeakSet()) {
    if(obj===null || typeof obj !== 'object' || seen.has(obj)) {
        return keys;
    }
    seen.add(obj);
    for (const key of Reflect.ownKeys(obj)) {
        keys.push(key);
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            deepCollectSafe(value, keys, seen);
        }
    }
    return keys;
}
//console.log(deepCollectSafe(person));

function deepCollectWithPaths(obj, keys = [], seen = new WeakSet(), path= ''){
    if(obj===null || typeof obj !== 'object' || seen.has(obj)) {
        return keys;
    }
    seen.add(obj);
    for (const key of Reflect.ownKeys(obj)) {
        const newPath = path ? `${path}.${key.toString()}` : key.toString();
        keys.push(newPath);
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
            deepCollectWithPaths(value, keys, seen, newPath);
        }
    }
    return keys;
}
//console.log(deepCollectWithPaths(person));

function deepCollectPathsAndValues(obj, map = new Map(), seen = new WeakSet(), path = '') {
    if(obj===null || typeof obj !== 'object' || seen.has(obj)) {
        return map;
    }
    seen.add(obj);
    for (const key of Reflect.ownKeys(obj)) {
        const newPath = path ? `${path}.${key.toString()}` : key.toString();
        const value = obj[key];
        map.set(newPath, value);
        if (typeof value === "object" && value !== null) {
            deepCollectPathsAndValues(value, map, seen, newPath);
        }
    }
    return map;
}
//console.log(deepCollectPathsAndValues(person));

function deepCollectPrimitiveFields(obj, map = new Map(), seen = new WeakSet(), path = '') {
    if(obj===null || typeof obj !== 'object' || seen.has(obj)) {
        return map;
    }
    seen.add(obj);
    for (const key of Reflect.ownKeys(obj)) {
        const newPath = path ? `${path}.${key.toString()}` : key.toString();
        const value = obj[key];
        if (value === null || typeof value !== 'object') {
            map.set(newPath, value);
        } else  {
            deepCollectPrimitiveFields(value, map, seen, newPath);
        }
    }
    return map;
}
console.log(deepCollectPrimitiveFields(person));


function saveMapToFile(map, filename = 'fields.json') {
    let json = '{\n';

    let i = 0;
    for (const [key, value] of map) {
        const line = `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`;
        json += line;
        if (i < map.size - 1) json += ',\n';
        i++;
    }

    json += '\n}';

    const fs = require('fs');
    fs.writeFileSync(filename, json, 'utf-8');

    console.log(`Saved to ${filename}`);
}
saveMapToFile(deepCollectPrimitiveFields(person));

const fs = require('fs');

function restoreNestedObjectFromFile(filename) {
    const json = fs.readFileSync(filename, 'utf-8');
    const flatObj = JSON.parse(json);
    const result = {};

    for (const [path, value] of Object.entries(flatObj)) {
        const keys = path.split('.');
        let current = result;

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (i === keys.length - 1) {
                current[key] = value;
            } else {
                if (!(key in current)) {
                    current[key] = {};
                }
                current = current[key];
            }
        }
    }

    return result;
}
console.log(restoreNestedObjectFromFile('fields.json'));
