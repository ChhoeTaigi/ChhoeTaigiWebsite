sudo rm -r /home/website/new_package
cd /home/website/ChhoeTaigiWebsite/
meteor build /home/website/new_package --server-only
sudo chown -R shiami:dev /home/website/new_package
sudo chmod 770 -R /home/website/new_package
cd /home/website/ChhoeTaigiWebsite/DeployTools
