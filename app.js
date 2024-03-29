const http = require('http');
const fs = require('fs');
const json = require('./form.json');
var file;


const server = http.createServer(function(req, res){
	let file

	try{
		file = fs.readFileSync('./index.html');
	}
	catch(e){
		res.writeHead(404, {'content-type': 'text/plain'});
		res.write('404 File Not Found!');
		res.end();
		return;
	}

	if(file){
		res.writeHead(200, {'content-type': 'text/html'});
		res.write(file);
		res.end();
	}

/*******GETS THE FORM DATA************/
	req.on('data', (data)=>{
		var arr = decodeURIComponent(data).replace(/\+/g, ' ').replace('UserName=', '')
				.replace('Email=', '').replace('message=', '').split('&');

		var node = json.user;
		var next;
        
/****TURNS JSON INTO LINKED LIST OF FORM INPUT********/
	while(node){
		next = node.user;

		if(node.user== null){
			node.user = { name: arr[0], email: arr[1], message: arr[2]};

/**********WRITES THE NEW JSON TO THE JSON FILE****************/
			fs.writeFile('./form.json', JSON.stringify(json, null, 2), (err)=>{
				if(err){
					throw err;
				}
			});
			break;
		}
		else {
			node = next;
		}
	}

	});

}).listen(3000, ()=>{console.log('Server running on 3000');});