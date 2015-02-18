# Assumes we have a fresh install of ubuntu 12.04 operating system

# Steps to get TNT front end set up on Amazon EC2 machine

# I've moved the private key for the Amazon machine into the top level of the folder, it's called tnt.pem

# Connect to the EC2 machine like: 
# ssh -i tnt.pem ubuntu@ec2-54-78-145-48.eu-west-1.compute.amazonaws.com

sudo apt-get update

# Get the text editor vim, for convenience
sudo apt-get -y install vim

# Get git - version control software we're using
sudo apt-get -y install git

# Make sure we have full SSH support:
echo "TNTgo installing openssh client and server"
sudo apt-get -y install openssh-client
sudo apt-get -y install openssh-server

# Get some useful base upgrades to vim
curl http://j.mp/spf13-vim3 -L -o - | sh

# generate an SSH key for the machine you're installing on according to https://help.github.com/articles/generating-ssh-keys
echo "TNTgo Generating SSH key for this machine"
ssh-keygen -t rsa -C "thomas.grujic@gmail.com"

eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

# and add this key to your github account - copy paste output of this
echo "TNTgo - Add the following key to the github account:"
cat ~/.ssh/id_rsa.pub

# Now get the code
echo "" 
cd ~
git clone git@github.com:grujic/tnt.git

# Let's get pip, the python package manager
wget https://bootstrap.pypa.io/get-pip.py

sudo python get-pip.py

# Install virtualenvwrapper (this makes a nice clean isolated python environment for our project)
sudo pip install virtualenv virtualenvwrapper

# Installing the psycopg2 module to interact with the postgres database through python is annoying - first need some development tools
sudo apt-get install libpq-dev python-dev

# Make a directory to hold our virtual environment:
mkdir ~/.virtualenvs

# The following lines are appended to ~/.bashrc, which is a file run on starting a fresh shell (e.g. when opening a terminal):

echo "export WORKON_HOME=\$HOME/.virtualenvs
source /usr/local/bin/virtualenvwrapper.sh
export PIP_VIRTUALENV_BASE=\$WORKON_HOME

PYTHONPATH=\"\${PYTHONPATH}:\$HOME/tnt/\"
export PYTHONPATH
" >> ~/.bashrc

# Now 'run' this in the current terminal:
source ~/.bashrc

# Build a virtual environment for the code (this uses the file requirements.txt which has a list of required python libraries):

cd tnt

mkvirtualenv -a ~/tnt/ -r requirements.txt tnt 

echo "workon tnt" >> ~/.bashrc

# Start working in this virtual environment:
workon tnt 


# Now install psycopg2 python module
pip install psycopg2

# Network rules on the EC2 server (note that in the amazon console you'll need to have set up enabling traffic for ports 80 - default HTTP - and 8000 - for development testing)

sudo ufw status
sudo ufw logging on
sudo ufw allow 80
sudo ufw allow 8000
sudo ufw allow 22
sudo ufw enable
sudo ufw reload
sudo ufw status


# Installing the Postgres DB backend: 
sudo apt-get install postgresql postgresql-contrib

# Now need to create a DB and a database user (make it a superuser)

sudo su - postgres

createdb tnt_database

createuser -P

# At the prompts, create a database user (tnt, tnt)

# Now start the interactive prompt
psql

GRANT ALL PRIVILEGES ON DATABASE tnt_database TO tnt;

# Exit the interactive prompt
\q

# Create initial database tables: 
python manage.py syncdb

# Running development server:
python manage.py runserver 0.0.0.0:8000

# Getting the site running under supervisord and nginx setup
# Loosely following this blog: 
# http://michal.karzynski.pl/blog/2013/06/09/django-nginx-gunicorn-virtualenv-supervisor/


# Make a place to hold the master version of the project
sudo mkdir -p /webapps/

sudo chown -R ubuntu /webapps/

# Install dedicated application server called gunicorn
pip install gunicorn

# Want to have the master branch of the project in the /webapps/ folder

git clone git@github.com:grujic/tnt.git

# Start supervisord
supervisord
sudo supervisorctl reread
