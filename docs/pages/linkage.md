#Linkage Process
## Nokia Music to Spotify
* 27 million tracks linked to track-level catalog information, including international standard recording codes (ISRCs), were made available to the Digital Music Lab as part of a data-sharing agreement with Nokia Music. The unique mapping of ISRCs to Nokia Music is used as a starting point for GRAIL. 

* Spotify track IDs were collected from the Spotify API using 
```python
x='https://api.spotify.com/v1/tracks/?isrc:ISRC'
'''

* 17,713,247 Spotify tracks were linked to ISRCs using this method

## Spotify to The Echo Nest
* Prior to The Echo Nest's deprecation, the 17.7 million linked Spotify track IDs were used to query artist-level identifiers available from the Rosetta Stone project.
* Spotify tracks were used to query The Echo Nest API using the method:
```html
http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV&track_id=spotify:SPOTIFY_TRACK&format=json
'''

* 11,205,282 of the 17.7 million tracks returned artist, and track ID information from the query.  
* 12 artist-level IDs were linked into GRAIL. Available for IDs for artists vary, for a summary of available IDs see [documentation](documentation.md)

## MixRadio to MusicBrainz
* Spotify and Nokia Music album metadata was used to query MusicBrainz [search server](https://musicbrainz.org/doc/Search_Server).
* In order to create track-level MusicBrainz linkages, MusicBrainz release metadata was compared to Nokia Music release metadata.
* Tracks must satisfy 1 of 4 levels of reducing matching criteria in order to be linked into GRAIL. Criteria 1 represents the strongest match, 4 represents the weakest. For a detailed description of the MixRadio to MusicBrainz matching procedure, see [criteria](criteria.md)
* Methods that restrict responses to only include tracks which meet specific criteria are [available](documentation)

## MixRadio to Million Song Dataset
* To be included.