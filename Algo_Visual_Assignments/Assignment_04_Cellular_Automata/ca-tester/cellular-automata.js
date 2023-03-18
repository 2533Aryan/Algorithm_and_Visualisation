// const { config } = require("process");

function applyRule(config, rule) {

    // check if the input 'config' is an array containing only 0 or 1
    if(!Array.isArray(config) || !config.every(x => x === 0 || x === 1)) {
        throw new console.error("Invalid Input Configuration");
    }

    // check if the input 'rule' is an integer in range (0,255)
    if (!Number.isInteger(rule) || rule < 0 || rule > 255) {
        throw new Error('Invalid Rule');
    }

    // new array updatedConfig of same size as config 
    const n = config.length
    const updatedConfig = new Array(n)
    
    
}

const testConfig = [0,1,0,0,1,1,0,0]
const testRule = 50

applyRule(testConfig, testRule)


module.exports = { applyRule };