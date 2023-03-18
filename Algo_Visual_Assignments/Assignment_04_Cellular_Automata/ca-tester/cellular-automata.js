// const { config } = require("process");

function applyRule(config, rule) {
    // check if the input 'config' is an array containing only 0 or 1

    // if(config.isArray || config.every() == 0 && config.every() == 1)
    if(Array.isArray(config)) {
        console.log("is Array")
    }
    
    console.log("Fail")



    module.exports = { applyRule };
}

const testConfig = [0,1,0,0,1,1,0,0]
const testRule = 50

const testConfig2 = "string"
const testRule2 = 350

applyRule(testConfig2, testRule)