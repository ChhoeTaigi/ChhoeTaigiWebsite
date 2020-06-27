# https://www.phusionpassenger.com/library/walkthroughs/deploy/meteor/
sudo mkdir -p /var/www/ChhoeTaigi
cd /var/www/ChhoeTaigi
sudo rm -rf /var/www/ChhoeTaigi/tmp
sudo mkdir -p /var/www/ChhoeTaigi/tmp
cd /var/www/ChhoeTaigi/tmp
sudo tar xzf /home/website/new_package/ChhoeTaigiWebsite.tar.gz
# cd /var/www/ChhoeTaigi/tmp/bundle/programs/server
# sudo npm install --production
# sudo npm prune --production
sudo chown -R myappuser: /var/www/ChhoeTaigi/tmp/bundle
sudo mv /var/www/ChhoeTaigi/bundle /var/www/ChhoeTaigi/bundle.old
sudo mv /var/www/ChhoeTaigi/tmp/bundle /var/www/ChhoeTaigi/bundle
sudo -u myappuser -H bash -l
cd /var/www/ChhoeTaigi/bundle/programs/server
npm install --production
exit

passenger-config restart-app /var/www/ChhoeTaigi/bundle
sudo rm -rf /var/www/ChhoeTaigi/bundle.old
cd /home/website/ChhoeTaigiWebsite/DeployTools
