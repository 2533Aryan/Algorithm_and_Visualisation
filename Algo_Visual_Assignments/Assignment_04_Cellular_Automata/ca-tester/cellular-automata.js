// const { config } = require("process");

function applyRule(config, rule) {
    // check if the input 'config' is an array containing only 0 or 1

    // if(config.isArray || config.every() == 0 && config.every() == 1)
    if(!Array.isArray(config) || !config.every(x => x === 0 || x === 1)) {
        throw new console.error("Invalid Input configuration");
    }
    
}

const testConfig = [0,1,0,0,1,1,0,0]
const testRule = 50

const testConfig2 =  [0,1,0,0,1,1,0,2]
const testRule2 = 350

applyRule(testConfig, testRule)


module.exports = { applyRule };