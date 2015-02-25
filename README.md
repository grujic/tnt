TNTgo info
==========

Installation
------------

Step by step instructions for intalling the TNTgo front end can be found in `fresh_install_steps.sh`. 
These have been tested on a clean Ubuntu 14.04 Amazon EC2 instance. 

NB this is not an actual shell script despite the .sh extension

Structure
---------

We’ve built TNTgo into two more or less separable ‘apps’. One is an API 
(Application Programming Interface) which serves up calculation data etc., and 
the other is responsible for the ‘GUI’ of the user facing ‘dashboard’. 
The dashboard app serves up HTML and javascript which calls on the API behind the 
scenes. 


Notes on using Django
---------------------

Django is the Python based web framework used to serve up the TNTgo site. 

### Development server
We are running a development server on port 8000 inside a Unix screen for convenience. 
This screen can be accessed via `screen -x -R django`

The development server can be interrupted by `Ctrl-C`. 
It can be restarted using `python manage.py runserver 0.0.0:8000`
Occasionally, if any ‘static files’ (i.e. CSS files, images etc.) 
are not showing up properly on the development server, you may need to stop it and run 
`python manage.py collectstatic`.

