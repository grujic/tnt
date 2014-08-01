#!/bin/bash
 
NAME="tnt"                                  # Name of the application
DJANGODIR=/webapps/tnt             # Django project directory
SOCKFILE=/webapps/tnt/run/gunicorn.sock  # we will communicate using this unix socket
# USER=hello                                        # the user to run as
# GROUP=webapps                                     # the group to run as
NUM_WORKERS=3                                     # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=tnt.settings  # which settings file should Django use
DJANGO_WSGI_MODULE=tnt.wsgi    # WSGI module name
 
echo "Starting $NAME as `whoami`"
 
# Activate the virtual environment
#cd $DJANGODIR
#source ../bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH
 
# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR
 
# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)

cd $DJANGODIR

exec /home/tom/.virtualenvs/tnt/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --log-level=debug \
  --bind=unix:$SOCKFILE
  #--user=$USER --group=$GROUP \
