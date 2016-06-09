# Solr+Flask based API 
Testing approaches for a Flask+SolR-based API

## SolR instance running in OS X (10.10.5)

```
brew install solr
solr create -c grail  # create core named grail
curl http://localhost:8983/solr/grail/schema -X POST -H 'Content-type:application/json' --data-binary '{\n    
	"add-field" : {\n        
		"name":"track_id",\n        
		"type":"text_general",\n        
		"stored":true\n    },\n    
	"add-field" : {\n        
		"name":"track_name",\n        
		"type":"text_general",\n        
		"stored":true\n    },\n    
	"add-field" : {\n        
		"name":"artist_name",\n        
		"type":"text_general",\n        
		"stored":true\n    },\n    
	"add-field" : {\n        
		"name":"echonest",\n        
		"type":"text_general",\n        
		"stored":true\n    },\n   
	"add-field" : {\n        
		"name":"spotify",\n        
		"type":"text_general",\n        
		"stored":true\n    },\n   
	 "add-field" : {\n        
	 	"name":"rdio",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"musicbrainz",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"spotify_album",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"spotify_artist",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"musixmatch",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"musixmatch_artist",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"musicbrainz_artist",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"rdio_artist",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    },\n    
	 "add-field" : {\n        
	 	"name":"msd_id",\n        
	 	"type":"text_general",\n        
	 	"stored":true\n    }           \n}'  # create schema
post -c grail ./grail_10_rows.csv  # load data in CSV format in core named grail
```
Test Solr install and data loading
```
curl http://localhost:8983/solr/grail/select\?indent\=on\&q\=\*:\*\&wt\=json
```
Should return a JSON file with the number of entries in the loaded file


## Adding a webserver layer with Flash

Resources:
- RESTful API: http://blog.luisrei.com/articles/flaskrest.html
- RESTful Auth with Flask: http://blog.miguelgrinberg.com/post/restful-authentication-with-flask

```
pip install flask
python grail_api_app.py
curl -i -X POST -H "Content-Type: application/json" -d '{"username":"joe","password":"changeme"}' http://127.0.0.1:5000/api/users
```

Then, typing in the terminal: 
```
curl -X PATCH http://127.0.0.1:5000/grail?artist_name=Mansun
```

Should return a JSON file with the entries belonging to the artist Mansun.