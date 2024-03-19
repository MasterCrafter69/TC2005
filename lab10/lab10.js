const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  if (trimmedPath === '') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hola');
  }
 
  else if (trimmedPath === 'formulario' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<form action="/enviar-formulario" method="post">' +
            '<input type="text" name="dato" />' +
            '<input type="submit" value="Enviar"/>' +
            '</form>');
  }

  else if (trimmedPath === 'enviarFormulario' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = qs.parse(body);
      fs.writeFile('datos.txt', postData.dato, (err) => {
        if (err) throw err;
        console.log('Datos guardados.');
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Datos recibidos: ' + postData.dato);
      });
    });
  }

  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('404 No Encontrado');
  }
});

const port = 3000;
