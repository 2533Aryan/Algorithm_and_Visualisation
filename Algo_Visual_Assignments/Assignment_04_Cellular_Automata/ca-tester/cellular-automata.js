// const { config } = require("process");

function applyRule(config, rule) {
    // check if the input 'config' is an array containing only 0 or 1

    // if(config.isArray || config.every() == 0 && config.every() == 1)
    if(Array.isArray(config)) {
        console.log("is Array")
    } else{console.log("Fail")}

    console.log(config.every(x => x === 0 || x === 1))
}

const testConfig = [0,1,0,0,1,1,0,0]
const testRule = 50

const testConfig2 = "string"
const testRule2 = 350

applyRule(testConfig, testRule)


module.exports = { applyRule };