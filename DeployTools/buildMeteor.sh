cd /home/website/ChhoeTaigiWebsite/
meteor npm install bcrypt
meteor npm install
cd /home/website
sudo rm -r /home/website/new_package
meteor build --server-only /home/website/new_package
sudo chown -R root:dev /home/website/new_package
sudo chmod 770 -R /home/website/new_package
