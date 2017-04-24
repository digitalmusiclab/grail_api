#Criteria Description
## Nokia Music to Spotify
To be included: The Spotify API is queried at the track level using ISRCs. Track names are compared between Nokia Music and Spotify. Strings are compared using the SequenceMatcher function of Python's difflib package.  String comparisons's are scored as a ratio betwen 0.0-1.0. Exact string matches are scored as 1.0. A score of 0.5 means that 50% of the characters are shared between Nokia Music and MixRadio track titles.

## Nokia Music to MusicBrainz
* Tracks are matched at the album level.  All criteria require that the Nokia Music release and the MusicBrainz release maintain cardinality (agreement regarding total tracks). Criteria 1 requires Nokia Music and MusicBrainz to be in maintain exact string matches and track ordering. Requirements loosen as criteria fail; criteria 4 requires that all tracks must be present across both releases, ignoring track ordering, and passes the fuzzy string matching procedure described above. 

Criterion | Cardinality | Ordering | String Match
---- | ---- | ---- | ----
1 | 1 | 1 | 1 
---- | ---- | ---- | ----
2 | 1 | 0 | 1
---- | ---- | ---- | ----
3 | 1 | 1 | 0
---- | ---- | ---- | ----
4 | 1 | 0 | 0
---- | ---- | ---- | ----
* Matching criteria table for MusicBrainz linkage process. Cardinality and ordering with a value of 1 represents True. String Match values of 1 represent exact (case insenstive) matches, 0 represents fuzzy string matching.