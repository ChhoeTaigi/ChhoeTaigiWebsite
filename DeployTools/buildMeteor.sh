cd /home/website/ChhoeTaigiWebsite/
meteor npm install bcrypt
meteor npm install
sudo rm -r /home/website/new_package
cd /home/website
meteor build --server-only new_package
sudo chown -R root:dev /home/website/new_package
sudo chmod 770 -R /home/website/new_package
