# Registration
* New users must register with an email address to receive an API key. 
* API access requires an API key as part of the request. Keys are issued [here](register.md) during the free registration process. Registration requires accepting terms and services, providing an email address, represented institution/organization, and a brief description of intended uses of the API.

# Parameters
* 13 services are currently linked into GRAIL and listed below. User's can query the API using any of the cooperating services, and request any service in the return. Services, and parameter names include:
* Searching the API is broken into 2 categories. Searching using an ID or namespace, and restricting results through requirement parameters

## ID Parameters
### Tracks
1. Spotify (spotify_track)
2. The Echo Nest (echonest_track)
3. MusicBrainz (musicbrainz_track)
4. Million Song Dataset (msd_track)
5. MusixMatch (musixmatch_ww_track)
6. LyricFind (lyricfind_us_track)

### Albums
1. Spotify (to be included)
2. MusicBrainz (to be included)

### Artist
1. Spotify (spotify_artist)
2. MusicBrainz (musicbrainz_artist)
3. MusixMatch (musixmatch_artist)
4. Jambase (jambase_artist)
5. OpenAura (openaura_artist)
6. SeatGeek (seatgeek_artist)
7. Seatwave (seatwave_artist)
8. LyricFind (lyricfind_us_artist)
9. Twitter (twitter_artist)
10. Facebook (facebook_artist)
11. Tumblr (tumblr_artist)
12. Free Music Archive (fma_artist)
13. 7digital (7digital_us_artist,7digital_uk_artist,7digital_au_artist)

## Requirement Parameters
### Tracks
1. Timestamp of record creation (createdat_track)
2. Timestamp of record update (updatedat_track)
3. MusicBrainz criteria level (musicbrainz_track_criteria)
4. Spotify criteria level (to be included)

### Albums
1. Timestamp of record creation (to be included)
2. Timestamp of record update (to be included)

### Artist
1. Timestamp of record creation (createdat_artist)
2. Timestamp of record update (updatedat_artist)

# Rate-limits
* GRAIL is limited in funding and resources. Rate-limits are subject to change based on the popularity of the service and our practical restrictions. Currently, users can query once every second.

# Methods
* Users can query for tracks using any of the services listed above. Below include a set of example search queries.

## Search Examples
* Get all MusicBrainz track IDs linked to a spotify track ID where the criteria linkage was at greater than 3:
```html
api.grail.com/search?spotify_track=SPOTIFY_TRACK&musicbrainz_track_criteria>3&inc=musicbrainz_track
'''

* Get all track IDs for a Facebook artist that were updated by a certain date:
```html
api.grail.com/search?facebook_artist=FACEBOOK_ARTIST&updatedat_criteria>2016-01-01
'''

# Current Response Example
To be added.


# Response In Development Example
* New response 

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
        "musicbrainz_track": [
            {
                "id": d935f566-7f02-45a1-9d33-2c3afd106473, 
                "confidence": 1,
                "created_at": 2016-09-01
            }
        ],
        "facebook_artist": [],
        "spotify_track": [
            {
                "id": 5oPK2qblqhhxl55i7t5MBT, 
                "confidence": 0.754,
                "created_at": 2016-09-01
            },
            {
                "id": 1KtIJtoeHUhLab8BLiBpct, 
                "confidence": 0.754,
                "created_at": 2016-09-01
            }
        ]
    }
}
```