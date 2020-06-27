# https://www.phusionpassenger.com/library/walkthroughs/deploy/meteor/
sudo mkdir -p /var/www/ChhoeTaigi
cd /var/www/ChhoeTaigi
sudo rm -rf /var/www/ChhoeTaigi/tmp
sudo mkdir -p /var/www/ChhoeTaigi/tmp
cd /var/www/ChhoeTaigi/tmp
sudo tar xzf /home/website/new_package/ChhoeTaigiWebsite.tar.gz
sudo chown -R myappuser: /var/www/ChhoeTaigi/tmp/bundle
sudo mv /var/www/ChhoeTaigi/bundle /var/www/ChhoeTaigi/bundle.old
sudo mv /var/www/ChhoeTaigi/tmp/bundle /var/www/ChhoeTaigi/bundle
cd /var/www/ChhoeTaigi/bundle/programs/server
sudo node-gyp rebuild -g --unsafe-perm
sudo npm install --production
passenger-config restart-app /var/www/ChhoeTaigi/bundle
sudo rm -rf /var/www/ChhoeTaigi/bundle.old
cd /home/website/ChhoeTaigiWebsite/DeployTools
