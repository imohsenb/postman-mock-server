# Postman Mock Server
This tool helps you to mock Postman Json collection as a server.

### Download
Executable file is ready for download through these links:

- [windows][download-windows]
- [linux][download-linux]

### Run
First, export you collection in postman and save it to a file with json prefix.

Then run Postman Mock Server (pms) like below and it's a requirement to pass json collection path with `-i` argument.


```shell
$ pms -i ./sample.collection.json 
```

Also you can change server port with `-p` argument
```shell
$ pms -p 8080 -i ./sample.collection.json 
```

### Test Different Response Type
If you would like to test different response types, first you need to add more example response in your postman collection. Then you can send `x-response` in `header` with your reponse code that is expected. Default value for this header is `200`, therefor you get success result without sending this header. If your requested code doesn't exists in examples then service respond with `404` code and proper message.

```shell
curl -X GET http://localhost:8082/sample -H 'X-Response: 400'
```



License
-------

MIT License

Copyright (c) 2019 Mohsen Beiranvand

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[download-windows]: <https://github.com/imohsenb/postman-mock-server/raw/master/tools/pms.exe/>
[download-linux]: <https://github.com/imohsenb/postman-mock-server/raw/master/tools/pms/>