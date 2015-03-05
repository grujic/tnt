TNTgo info
==========

Installation
------------

Step by step instructions for intalling the TNTgo front end can be found in `fresh_install_steps.sh`. 
These have been tested on a clean Ubuntu 14.04 Amazon EC2 instance. 

NB this is not an actual shell script despite the .sh extension.

Structure
---------

We’ve built TNTgo into two more or less separable ‘apps’. One is an API 
(Application Programming Interface) which serves up calculation data etc., 
some of whose functionality can be seen at [http://www.tntgo.org/api/v1.0/]. 
This app has root directory `tnt/apps/api/`

The other is responsible for the ‘GUI’ of the user facing ‘dashboard’ found at root [http://www.tntgo.org] 
The dashboard app serves up HTML and javascript which calls on the API behind the 
scenes. 
This app has root directory `tnt/apps/dashboard/`

Where are the most important parts of the project?
--------------------------------------------------
For convenience, we give a quick outline of the ‘moving parts’ of TNTgo. 
We can break things down into the HTML that gets served up, the javascript and javascript templates 
that do all the dynamic work, and the python backend code that listens for requests. 

### HTML
Most of the HTML skeletons can be found in `tnt/apps/dashboard/templates/dashboard/`. 
Filenames are mostly self-explanatory. 
However, the ‘new calculation’ page is so large that we’ve broken it up into multiple smaller files
which get included into one main `new_calculation.html` file. 
Many pages share a common ‘template’, `page_template.html` which defines menu bars etc. 

### Javascript
Almost all the workhorse Javascript is in a single file, 
`tnt/apps/dashboard/static/dashboard/js/main.js`

This main file relies on Handlebars templates (see below) to dynamically render data into HTML. 
These templates are found in `tnt/apps/dashboard/templates/dashboard/handlebars_templates/`

### Main python code
While there are numerous Python files making up the Django project, most logic is taken care of in
two so-called view files. These receive HTTP requests, do some stuff, 
then work out what to return (e.g. data or web pages). 
There is a view file for the API app at `tnt/apps/api/views.py` and one for the dashboard app at 
`tnt/apps/dashboard/views.py`

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
```
python manage.py shell
```

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
MyUser.objects.all()[0].delete()
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

Technologies TNTgo works with
-----------------------------
We use a few Javascript and Python libraries. 
Here we give a brief overview of what they are and how they help. 

### Javascript libraries

1. JQuery [http://jquery.com/] JQuery is almost mandatory in any modern web application. 
It makes manipulation of web page elements very simple. 

2. Underscore.js [http://www.underscorejs.org] This library can be seen as a complement to JQuery in many ways.
It provides  useful ways to iterate over, filter and construct Javascript lists. 

3. Handlebars [http://handlebarsjs.com] This library allows for easy and flexible HTML templating, 
i.e. mapping some JSON data to rendered HTML. Very useful for client-side (i.e. in the browser)
templating. 

### Python libraries
4. JSON [http://pymotw.com/2/json/] We heavily rely on this data interchange format to pass around all kinds of data in TNTgo. 
JSON (Javascript object notation) maps one-to-one to both Javascript and Python representations of objects and dictionaries, 
making it a good match for us. 

5. Fabic [http://www.fabfile.org/] A way to streamline system administration tasks. 
We use it to simplify all the steps required to push changes from development code
to a central Git repository, and a master production code branch, along with restarting servers etc.

6. requests [http://docs.python-requests.org/en/latest/] A library that makes performing HTTP calls
very simple. 
