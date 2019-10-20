
const argv = require('yargs').argv
const option = require('./option.util')
const server = require('./server');


option.init(argv, result => {
    if(result)
    {
        console.log("Initialized...")
        server.init(option);
    } else {
        console.error("unable to find input file!");
        process.exit();
    }
});