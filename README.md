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

Notes on Git
------------
The project is set up with two branches, ‘dev’ for development and ‘master’ for production. 
It’s intended that the Git repo at `~/tnt` is on the dev branch, while the repo at /webapps/tnt/ 
is on the master branch. 

Changes should be made in ~/tnt on the dev branch, and when they are satisfactory, can be 
pushed to production using the automated Fabric script invoked with
```
fab deploy
```

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

### Database
Django provides a nice abstraction around the underlying database storing user information, 
calculation details, etc. The database backend we are using is Postgres. 
Here we show some basic ways to use Django’s ORM (object relational model) to 
interact with the database. 

To open up an interactive prompt set with the right Django environment variables: 
`python manage.py shell`. 

#### Working with system Users
Import our custom User model:
```python
from userprofile.models import MyUser
```
Get a list of all Users:
```python
MyUser.objects.all()
```
Get a User with a particular email address:
```
MyUser.objects.get(email=’XXX@abc.com’)
```
Manually create a new User:
```python
MyUser.objects.create_user(email=’XXX@abc.com’, password=’XXX’)
```
Delete the first User:
```python
MyUser.objects.all().delete()
```
#### Working with Calculation objects
Import the object representation of a Calculation:
```python
from tnt.apps.api.models import Calculation
```
Get all Calculations from user with ID 1:
```python
Calculation.objects.filter(user_id=1)
```
Get the Calculation with a specific ID, e.g.:
```python
Calculation.objects.filter(id=’10d740a5-8112-42e8-aa0c-0ba0a937a98b’)[0]
```
You can play around with an individual Calculation object to see the fields it has defined. 
