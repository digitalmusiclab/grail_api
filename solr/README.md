1. Launch SOLR Docker Container
	- With Volume Mapping to Schema.xml, and import data
2. Create solr core in container
	- $ solr create -c grail_search
3. Import CSV data into SOLR
	- post -c grail_search grail/data.csv

** If we want to preserve SOLR indexes, we need to map the grail_search
directory a volume on the host