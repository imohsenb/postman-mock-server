
const argv = require('yargs').argv
const option = require('./option.util')
const server = require('./server');


option.init(argv, result => {
    if(result)
    {
        console.log("Initialized...")
        server.init(option);
    } else {
        throw new Error("unable to find input file!")
    }
});







// app.use(cors({ origin: true, credentials: true }));


// var collection = {};
// fs.readFile(path.join(__dirname, 'Chardivari-api.postman_collection.json'), 'utf8', function (err, data) {
//   if (err) throw err;
//   collection = JSON.parse(data);
//   collection.item.map(folder => {
//       var items = folder.item || []
//       items.map(item => {
//         var request = item.request
//         var response = item.response
//         var path = request.url.path.join("/");

//         var resp = {};
//         var code = 404;

//         response.map(res => {
//             if(`${res.code}`.startsWith("20")) {
//                 code = res.code;
//                 resp = JSON.parse(res.body)
//             }
//         })

//         switch(request.method) {
//             case 'POST':
//                 app.post(`/${path}`, (req, res) => res.status(code).json(resp))
//             break;
//             case 'PUT':
//                 app.put(`/${path}`, (req, res) => res.status(code).json(resp))
//             break;
//             case 'PATCH':
//                 app.patch(`/${path}`, (req, res) => res.status(code).json(resp))
//             break;
//             case 'DELETE':
//                 app.delete(`/${path}`, (req, res) => res.status(code).json(resp))
//             break;
//             default:
//                 app.get(`/${path}`, (req, res) => res.status(code).json(resp))
//             break;
//         }
          
//       })
//   })
// });

// app.get('/', (req, res) => res.json(collection))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))