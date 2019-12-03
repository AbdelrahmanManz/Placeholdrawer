## PlaceHoldrawer
PlaceHoldrawer is an app dedicated to developers who need to find custom-sized placeholder images to place in site, while waiting for designers to send the original designs.

This app uses the set of following dependencies

    certifi==2019.9.11
    chardet==3.0.4
    Click==7.0
    dnspython==1.16.0
    Flask==1.1.1
    idna==2.8
    itsdangerous==1.1.0
    Jinja2==2.10.3
    MarkupSafe==1.1.1
    pymongo==3.9.0
    python-dotenv==0.10.3
    requests==2.22.0
    urllib3==1.25.6
    Werkzeug==0.16.0
    
This app requires a config file named ".env" that has the following variable:

> URI="mongodb+srv://ENTER THE CORRECT URL HERE"

*PS. this config file can be replaced by setting the environment variable directly on the machine.* 

1- You can run the app by typing the following command:

    python main.py
2- or by using Docker to run the web app only:

    docker build -t placeholdrawer:latest .
 
 After the build completes, we can run the container:

    docker run -d -p 5000:5000 placeholdrawer

3- or by using docker-compose to run the whole app with multiple containers:

    docker-compose up

Live Version: http://rebrand.ly/humblegucteam
