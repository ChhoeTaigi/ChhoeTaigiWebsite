cd /home/website/ChhoeTaigiWebsite/DeployTools
sudo rm -r new_package
meteor build --server-only /home/website/ChhoeTaigiWebsite/DeployTools/new_package
sudo chown -R root:dev /home/website/ChhoeTaigiWebsite/DeployTools/new_package
sudo chmod 770 -R /home/website/ChhoeTaigiWebsite/DeployTools/new_package
