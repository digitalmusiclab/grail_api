# Purpose

The General Recorded Audio Identity Linker (GRAIL) is a music metadata ID-linking API that: i) connects International Standard Recording Codes (ISRCs) to music metadata IDs from services such as MusicBrainz, Spotify, and Last.FM; ii) provides these ID linkages as a publicly available resource; iii) confirms linkage accuracy using continuous metadata crawling from music-service APIs; and iv) derives consistency values (CV) for linkages by means of a set of quantifiable criteria. To date, more than 35M tracks, 8M releases, and 900K artists from 16 services have been ingested into GRAIL.


# GRAIL Objectives
1. Support historic research efforts by linking data collected from deprecated services (e.g. Rdio) to operational (e.g. Spotify)</br>
2. Enable future research by linking data from ontologically distinct resources</br>
3. Provide a public resource for cross-validation of metadata provided by music services</br>

# Linkage Results and Services
To date, more than 30 million tracks, 2.7 million releases (albums), and 28 million artists IDs have been ingested into GRAIL, making it possibly one of the largest open-access music metadata resources available to date.

Service | Linkages
---- | -----  
Spotify track ID | 17.5M
Mixradio track ID* | 11.8M
Echo Nest track ID* | 6.5M
MusicBrainz track ID | 465K
Million Song Dataset track ID | 521K
MusixMatch track ID | 3.8M
LyricFind track ID | 1.5M
---- | -----
Spotify release ID | 1.5M
MixRadio release ID* | & 1.6M
MusicBrainz release ID | 1.6M
---- | ----
Spotify Artist ID | 6.6M
MusicBrainz Artist ID | 203K
MixRadio artist ID* | 357K
MusixMatch Artist ID | 2.1M
Jambase Artist ID | 860K
OpenAura Artist ID | 3.7M
SeatGeek Artist ID | 2.8M
Seatwave Artist ID | 740K
LyricFind Artist ID | 1.5M
Twitter Artist ID | 670K
Facebook Artist ID | 3.7M
Tumblr Artist ID | 27K
Free Music Archive Artist ID | 240K
7digital Artist ID | 5.5M

\* Deprecated services

# Future Linkage Projects
* Expansion of crawlers to other APIs. Some services include: MusixMatch, 7digital, GraceNote GNMID14 public dataset
* Improve search optimization and methods
* Refine confidence value metrics
