cd /home/website
sudo chown -R root:dev /home/website/ChhoeTaigiWebsite
sudo chmod 770 -R /home/website/ChhoeTaigiWebsite
cd /home/website/ChhoeTaigiWebsite
git checkout master
git reset --hard
git pull
git branch
git show --summary
cd /home/website
sudo chown -R root:dev /home/website/ChhoeTaigiWebsite
sudo chmod 770 -R /home/website/ChhoeTaigiWebsite
cd /home/website/ChhoeTaigiWebsite/DeployTools
