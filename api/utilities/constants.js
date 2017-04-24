'use strict';


/////////////////////////////////////////////////
//  GRAIL Table Attributes
/////////////////////////////////////////////////

const grailTrackAttributes = [,
    "spotify",
    "echonest",
    "musicbrainz",
    "mixradio",
    "musixmatch",
    "lyricfind_us",
    "msd"
]

const grailArtistAttributes = [
    "spotify",
    "echonest",
    "mixradio",
    "musicbrainz",
    "musixmatch_ww",
    "digital7_us",
    "digital7_uk",
    "digital7_au",
    "lyricfind_us",
    "seatgeek",
    "seatwave",
    "facebook",
    "openaura",
    "twitter",
    "jambase",
    "tumblr",
    "rdio",
    "fma"
]

const grailReleaseAttributes = [
    "grail_release_id",
    "musicbrainz",
    "mixradio",
    "spotify"
]

exports.entityAttributes = {
    "track": grailTrackAttributes,
    "artist": grailArtistAttributes,
    "release": grailReleaseAttributes
}