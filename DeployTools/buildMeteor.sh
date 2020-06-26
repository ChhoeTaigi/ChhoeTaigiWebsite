cd /home/website/ChhoeTaigiWebsite/
sudo npm install -g npm@latest
sudo npm install --unsafe-perm
meteor npm install --save bcrypt-nodejs
meteor npm uninstall --save bcrypt
sudo rm -r /home/website/new_package
sudo npm install --production
meteor build /home/website/new_package --server-only
sudo chown -R root:dev /home/website/new_package
sudo chmod 770 -R /home/website/new_package
cd /home/website/ChhoeTaigiWebsite/DeployTools
