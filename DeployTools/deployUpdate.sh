sudo mkdir /var/www/ChhoeTaigi
cd /var/www/ChhoeTaigi
sudo rm -rf tmp
sudo mkdir -p tmp
cd tmp
sudo tar xzf /home/website/new_package/ChhoeTaigiWebsite.tar.gz
cd /var/www/ChhoeTaigi/tmp/bundle/programs/server
sudo npm install --production
sudo mv /var/www/ChhoeTaigi/bundle /var/www/ChhoeTaigi/bundle.old
sudo mv /var/www/ChhoeTaigi/tmp/bundle /var/www/ChhoeTaigi/bundle
passenger-config restart-app /var/www/ChhoeTaigi/bundle
sudo rm -rf /var/www/ChhoeTaigi/bundle.old
cd /home/website/ChhoeTaigiWebsite/DeployTools
