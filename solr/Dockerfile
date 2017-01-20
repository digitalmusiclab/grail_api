###############################################################################
#
# Use official Solr v6.1.0 as Base Image
#
###############################################################################

FROM solr:6.1.0

MAINTAINER Kurt DaCosta (kurtbradd@gmail.com)


###############################################################################
#
# Update Apt & Install Dependencies
#
###############################################################################

RUN apt-get update && apt-get install -y \
	sudo \
	git \
	zsh \
	curl \
	python-pip \
	python-dev \
	build-essential \
	nginx \
	&& rm -rf /var/lib/apt/lists/*

# Install Oh-My-Zsh
RUN sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"


###############################################################################
#
# Configure Restricted Access User
#
###############################################################################

RUN useradd -m deploy
RUN echo "deploy:deploy" | chpasswd
RUN adduser deploy sudo
USER deploy

###############################################################################
#
# Configure Solr Installation
#
###############################################################################

RUN groupadd -r -g $SOLR_UID $SOLR_USER && \
	useradd -r -u $SOLR_UID -g $SOLR_USER $SOLR_USER


# SHELL ["/bin/zsh", "-c"]
# ENTRYPOINT ["/bin/zsh"]

# Set Volume Mount Points
VOLUME ["/data"]

# Expose Container Port 8080
# ie. Docker listens on Post 8080 at runtime
EXPOSE 8080, 5432


# Common Docker Instructions
# LABEL
# USER
# WORKDIR
# VOLUME
# STOPSIGNAL

# Copy index.html from host folder
# Compare vs Docker ADD command
# COPY index.html /usr/share/nginx/html/

# Run Command
# CMD ["executable","param1","param2"]
