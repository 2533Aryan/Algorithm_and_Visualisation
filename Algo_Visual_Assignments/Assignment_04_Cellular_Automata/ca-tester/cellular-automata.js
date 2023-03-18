function applyRule(config, rule) {

    // Check if the input 'config' is an array containing only 0 or 1
    if(!Array.isArray(config) || !config.every(x => x === 0 || x === 1)) {
        throw new console.error("Invalid Input Configuration");
    }

    // Check if the input 'rule' is an integer in range (0,255)
    if (!Number.isInteger(rule) || rule < 0 || rule > 255) {
        throw new Error('Invalid Rule');
    }

    // New array updatedConfig of same size as config 
    const n = config.length;
    const updatedConfig = new Array(n);
    
    
    // Apply rule to each cell and its neighbors
    for (let i = 0; i < n; i++) {
        const left = config[(i+n-1) % n];
        const center = config[i];
        const right = config[(i+1) % n];
        const index = (left << 2) | (center << 1) | right;
        updatedConfig[i] = (rule >> index) & 1;
    }

    // Return updated configuration
    return updatedConfig;

}

module.exports = { applyRule };

// const testConfig = [0,1,0,0,1,1,0,0]
// const testRule = 50

// const newconfig = applyRule(testConfig, testRule)
// console.log(newconfig)

// module.exports = { applyRule };