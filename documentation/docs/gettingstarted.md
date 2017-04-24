# Registration
API access requires an API key as part of the request. Keys are issued [here](register.md) during the free registration process. Registration requires accepting terms and services, providing an email address, represented institution/organization, and a brief description of intended uses of the API.

# Rate-limits

# Methods

# Response Example
```json
{
    "query": {
        "id": 123123123,
        "q_namespace": "spotify_artist",
        "parameters": {
            "ordering": "created_at",
            "include": [
                "id", "confidence", "created_at"
            ],
            "min_confidence": 0.5,
            "r_namespace": [
                "musicbrainz",
                "echonest",
                "acousticbrainz"
            ]
        }
    },
    "results": {
        "musicbrainz": [
            {
                "id": 12312321, 
                "confidence": 0.754,
                "created_at": 2016-09-01
            }
        ],
        "echonest": [],
        "acousticbrainz": [
            {
                "id": 12312312, 
                "confidence": 0.754,
                "created_at": 2016-09-01
            },
            {
                "id": 1231, 
                "confidence": 0.754,
                "created_at": 2016-09-01
            }
        ]
    }
}
```
