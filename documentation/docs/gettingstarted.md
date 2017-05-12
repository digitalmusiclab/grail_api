# Registration
API access requires an API key as part of the request. Keys are issued [here](register.md) during the free registration process. Registration requires accepting terms and services, providing an email address, represented institution/organization, and a brief description of intended uses of the API.

# Rate-limits
Based on current server hardware restrictions, each API key has a default rate-limit set to 5 per second.

# Search Parameters
Any request to authorized endpoints must include an HTTP header, with "Authorization" key, and value "Bearer API_KEY", where API_KEY is the API key recieved during registration. 

```api.digitalmusiclab.org/search/ENTITY/?id=ID&namespace=ID_NAMESPACE&include_entity=REQUESTED_ENTITY&include_namespace=REQUESTED_ID```

<b>ENTITY:</b> The entity level you will use to search with. Can be: artist, release, track
id: ID of the entity used to query GRAIL API.<br>
<b>namespace:</b> The namespace of the ID you are using to query with. Can be any namespace included for entities in [linkage results](index.md).<br>
<b>include_entity:</b> The entity level you wish to retrieve.<br>
<b>include_namespace:</b> The namespace you wish to retrieve (can only retrieve one namespace at a time).<br>


# Example Query

```api.digitalmusiclab.org/search/artist/?id=000A0nOROfyFiKkdDK5zS4&namespace=spotify&include_entity=release&include_namespace=spotify```

# Response Example
```json
{
  "query": {
      "search_id": "000A0nOROfyFiKkdDK5zS4",
      "search_entity": "artist",
      "search_namespace": "spotify",
      "return_entity": "release",
      "return_namespace": "spotify"
       },
  
  "data": [{
      "spotify_release_id": "1T9DcvFX8B02vUPglLr3Ud",
      "spotify_release_criteria": {
        release_criteria_name: 0.78, release_criteria_track_names: 0.7, release_criteria_cardinality: 1.0, release_criteria_overall: 0.8266
        }
      },
      {
      "spotify_release_id": "0WRmiv4WZDOMY510JLfxdE",
      "spotify_release_criteria": {
        release_criteria_name: 0.5, release_criteria_track_names: 0.6 ,release_criteria_cardinalitys: 0.8, release_criteria_overall: 0.6333
        }
      }
  ]
}
```
