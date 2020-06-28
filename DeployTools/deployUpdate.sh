# https://www.phusionpassenger.com/library/walkthroughs/deploy/meteor/
sudo mkdir -p /var/www/ChhoeTaigi
cd /var/www/ChhoeTaigi
sudo chown -R myappuser:dev /var/www/ChhoeTaigi
sudo chmod 770 -R /var/www/ChhoeTaigi
sudo rm -rf /var/www/ChhoeTaigi/tmp
sudo mkdir -p /var/www/ChhoeTaigi/tmp
cd /var/www/ChhoeTaigi/tmp
sudo tar xzf /home/website/new_package/ChhoeTaigiWebsite.tar.gz
sudo chown -R myappuser:dev /var/www/ChhoeTaigi/tmp/bundle
sudo mv /var/www/ChhoeTaigi/bundle /var/www/ChhoeTaigi/bundle.old
sudo mv /var/www/ChhoeTaigi/tmp/bundle /var/www/ChhoeTaigi/bundle
cd /var/www/ChhoeTaigi/bundle/programs/server
sudo chown -R myappuser:dev /var/www/ChhoeTaigi
sudo chmod 770 -R /var/www/ChhoeTaigi
sudo passenger stop
sudo passenger start
# sleep 3
# passenger-config restart-app /var/www/ChhoeTaigi/bundle
sudo rm -rf /var/www/ChhoeTaigi/bundle.old
cd /home/website/ChhoeTaigiWebsite/DeployTools
