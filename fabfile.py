from fabric.api import local, lcd
import os
import requests

def deploy():
    print("Adding and committing all changes...\n")
    try:
        local("git add -A")
        local("git commit")
    except:
        print("Problem with committing locally, maybe nothing's changed!\n\n")
    local("git push")

    with lcd("/webapps/tnt/"):

        print("Checking out dev branch...\n")
        local("git checkout dev")
        print("Pulling dev changes...\n")
        local("git pull")
        print("Checking out master again...\n")
        local("git checkout master")
        print("Merging master with dev...\n")
        local("git merge dev")
        print("Collecting static files...\n")
        local("python manage.py collectstatic")
        print("Restarting supervisord app...\n")
        local("supervisorctl restart tnt")

        resp = requests.get("http://www.tntgo.org") # First request to warm up the server

