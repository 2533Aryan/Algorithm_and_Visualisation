// const { config } = require("process");

function applyRule(config, rule) {

    // check if the input 'config' is an array containing only 0 or 1
    if(!Array.isArray(config) || !config.every(x => x === 0 || x === 1)) {
        throw new console.error("Invalid Input configuration");
    }

    // check if the input 'rule' is an integer in range (0,255)
    if (!Number.isInteger(rule) || rule < 0 || rule > 255) {
        throw new Error('Invalid rule');
    }
    
}

const testConfig = [0,1,0,0,1,1,0,0]
const testRule = 50

applyRule(testConfig, testRule)


module.exports = { applyRule };