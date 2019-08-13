# Dockerfile
# For ChhoeTaigi Website on GCP VM

FROM ubuntu:18.04
MAINTAINER Hê-bí

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update

# Install basic
#
# sudo apt-get install curl nano git nodejs npm apache2 apache2-dev
#
RUN apt-get install -y \
curl \
nano \
git \
nodejs \
npm \
apache2 \
apache2-dev

# Install Postgres
#
# sudo apt-get install postgresql postgresql-contrib
#
RUN apt-get install -y postgresql \
postgresql-contrib

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Install & Start Passenger
# https://www.phusionpassenger.com/library/walkthroughs/deploy/meteor/ownserver/apache/oss/bionic/deploy_app.html
RUN apt-get install -y dirmngr gnupg
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
RUN apt-get install -y apt-transport-https ca-certificates
RUN sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger bionic main > /etc/apt/sources.list.d/passenger.list'
RUN apt-get update && apt-get install -y libapache2-mod-passenger
RUN a2enmod passenger && apache2ctl restart
RUN /usr/bin/passenger-config validate-install && /usr/sbin/passenger-memory-stats

# Install Certbot
# https://certbot.eff.org/lets-encrypt/ubuntubionic-apache

# Set permission
RUN addgroup dev
# RUN adduser username dev

# Get source code of website
WORKDIR /home
RUN mkdir website
WORKDIR /home/website
RUN git clone -b develop https://github.com/ChhoeTaigi/ChhoeTaigiWebsite.git
WORKDIR /home/website/ChhoeTaigiWebsite/DeployTools
