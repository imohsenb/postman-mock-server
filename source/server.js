const cors = require('cors');
const express = require('express');
const fs = require('fs');

/**
 * Server Class
 * this class serv collection
 * @author Mohsen Beiranvand
 */
class Server {

    constructor(){
        this.app = express();
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.set('view engine', 'pug')
        this.collection = {};
    }

    init(option)
    {        
        this.option = option
        this._initServer();
    }

    /**
     * Initialize server
     */
    _initServer()
    {
        this.app.listen(this.option.port, () => {
            console.log(`Server listening on port ${this.option.port}!`)
            this._parseCollection();
        })
    }

    /**
     * load and parse collection from file
     */
    _parseCollection()
    {
        var that = this;
        fs.readFile(this.option.path, 'utf8', function (err, data) {
            if (err) throw err;
            that.collection = JSON.parse(data);
            that._serveCollection();
        })
    }

    /**
     * Serv collection requests
     */
    _serveCollection()
    {
        const name = this.collection.info.name;
        const description = this.collection.info.description;

        this.app.get('/', (req, res) => res.render('index', 
            {
                title: `${name} Mock Server`,
                header: `${name}`,
                description: `${description}`,
                doc: ""
            }
        ));

        this.collection.item.map(item => {
            if(item.hasOwnProperty('item')) {
                this._parseFolder(item)
            } else {
                this._servRequest(item)
            }
        })
    }

    _parseFolder(items) {
        items.item.map(item => {
            if(item.hasOwnProperty('item')) {
                this._parseFolder(item)
            } else {
                this._servRequest(item)
            }
        })
    }

    _servRequest(item) {
        var request = item.request
        var response = item.response
        var path = `/${request.url.path.join("/")}`;

        response.map(resp => {

            switch(request.method) {
                case 'POST':
                    this._servPost(resp, path)
                break;
                case 'PUT':
                    this._servPut(resp, path)
                break;
                case 'PATCH':
                    this._servPatch(resp, path)
                break;
                case 'DELETE':
                    this._servDelete(resp, path)
                break;
                default:
                    this._servGet(resp, path)
                break;
            }

        })
    }

    _servGet(resp, path)
    {
        var code = JSON.parse(resp.code)
        var body = JSON.parse(resp.body)
        this.app.get(`${path}`, (req, res) => res.status(code).json(resp))
    }

    _servPost(resp, path)
    {
        var code = JSON.parse(resp.code)
        var body = JSON.parse(resp.body)
        this.app.post(`${path}`, (req, res) => res.status(code).json(resp))
    }

    _servPut(resp, path)
    {
        var code = JSON.parse(resp.code)
        var body = JSON.parse(resp.body)
        this.app.put(`${path}`, (req, res) => res.status(code).json(resp))
    }

    _servPatch(resp, path)
    {
        var code = JSON.parse(resp.code)
        var body = JSON.parse(resp.body)
        this.app.patch(`${path}`, (req, res) => res.status(code).json(resp))
    }
}

const server = new Server();

module.exports = server