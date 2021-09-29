# afrmsandbox


## To run:
 ** Note this utilizes env vars set for Affirm pub/private API keys in the Dockerfile. You must modify to use your own keys. This is not a recommended/best practice -- use secrets management instead. ** 
1. `docker build -t flask_app:latest .`   
2. `docker run -p 5000:5000 --name test_app  flask_app`
3. Navigate to http://127.0.0.1:5000/
