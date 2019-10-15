
const fs = require('fs');
const path = require('path');

/**
 * Option Class
 * This class parse arguments and hold them as option
 * @author Mohsen Beiranvand
 */
class Option {
    
    constructor() {}

    init(argv, cb)
    {
        this.argv = argv;
        this.cb = cb;
        this._parsePort();
        this._parseInputFile();
    }

    /**
     * Parse port entry
     */
    _parsePort() 
    {
        this.port = this.argv['port'] || this.argv['p'] || 8082
    }

    /**
     * Parse and check exists input file
     */
    _parseInputFile()
    {
        var file = this.argv['input'] || this.argv['i']
        this.path = path.join(__dirname, file);
        fs.exists(this.path, res => {            
            this.cb(res)
        })
    }

}

var option = new Option()
module.exports = option;