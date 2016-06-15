# Solr+Flask based API 
Testing approaches for a Flask+SolR-based API

## SolR instance running in OS X (10.10.5)

```
brew install solr
solr create -c grail  # create core named grail
mv schema.xml ./solr/grail/conf # move the schema into the conf folder in the running solr server
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
python api.py
```

Users are add via POSTmessages
```
curl -i -X POST -H "Content-Type: application/json" -d '{"username":"joe","password":"changeme"}' http://127.0.0.1:5000/api/users
```

If token-based authentication is wanted

```
curl -u joe:changeme -i -X GET http://127.0.0.1:5000/api/token
```

Returns a JSON file with the token, which expires in 10 minutes

Then, typing in the terminal: 
```
curl -u joe:changeme -i -X GET http://127.0.0.1:5000/api?artist_name=Mansun
curl -u joe:changeme -i -X GET http://127.0.0.1:5000/api?isrc=GBAYE0000395
```
or 
```
curl -u token:unused -i -X GET http://127.0.0.1:5000/api?isrc=GBAYE0000395
```

Will return a JSON file with the entries belonging to the artist Mansun, and the artist with the corresponding ISRC. In the previous call example, the token returned to the GET call before is passed as a username, and there is no need for password (that is why 'unused' appears in that field)