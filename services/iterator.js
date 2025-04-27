const fruitBox = {
    0: "apple",
    1: "banana",
    2: "orange",
    3: "grape",
    length: 4,
[Symbol.iterator] () {
        let index = 0;
        const self = this;
        return {
            next () {
                if (index < self.length) {
                    return {
                        value: self[index++],
                        done: false
                    }
                }else {
                        return {
                            done: true
                        }
                    }
                }

            }
        }

}

for (const fruit of fruitBox) {
    console.log(fruit);
}

const fruitColors = {
    apple: "red",
    banana: "yellow",
    orange: "orange",
    grape: "purple",
    [Symbol.iterator] ()
{
    const keys = Object.keys(this);
    let index = 0;
    const self = this;
    return {
        next () {
            if (index < keys.length) {
              const key = keys[index++];
              return { value: {key, value: self[key]}, done: false}
            } else {
                return {
                    done: true
                }
            }
        }
    }
}
}
for (const {key, value} of fruitColors) {
    console.log(key, value);
}