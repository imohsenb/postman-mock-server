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

        switch(request.method) {
            case 'POST':
                this._servPost(response, request, path)
            break;
            case 'PUT':
                this._servPut(response, request, path)
            break;
            case 'PATCH':
                this._servPatch(response, request, path)
            break;
            case 'DELETE':
                this._servDelete(response, request, path)
            break;
            default:
                this._servGet(response, request, path)
            break;
        }
    }

    reply(req, res, originalResp, originalReq) {

        var responses= {};

        originalResp.map(item => {
            responses[item.code] = item
        })

        var code = 200;
        if (req.headers.hasOwnProperty('x-response')) {
            code = parseInt(req.headers['x-response']);
        }
        if (responses.hasOwnProperty(code)) {
            var body = responses[code].body;
            try {
                body = JSON.parse(body);
            }
            catch (e) { }
            res.status(code).json(body);
        }
        else {
            res.status(404).json({
                "message": "code not found!"
            });
        }
    }

    _servGet(originalResp, originalReq, path)
    {
        this.app.get(`${path}`, (req, res) => { 
            this.reply(req, res, originalResp, originalReq);
        }) 
    }

    _servPost(originalResp, originalReq, path)
    {
        this.app.post(`${path}`, (req, res) => { 
            this.reply(req, res, originalResp, originalReq);
        }) 
    }

    _servPut(originalResp, originalReq, path)
    {
        this.app.put(`${path}`, (req, res) => { 
            this.reply(req, res, originalResp, originalReq);
        }) 
    }

    _servPatch(originalResp, originalReq, path)
    {
        this.app.patch(`${path}`, (req, res) => { 
            this.reply(req, res, originalResp, originalReq);
        }) 
    }
    
}

const server = new Server();

module.exports = server