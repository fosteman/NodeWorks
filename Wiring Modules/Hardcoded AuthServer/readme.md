Usage of this app:
>node app
curl -X POST -d '{"username": "Tim", "password":"secret"}'
   http://localhost:3000/login -H "Content-Type: application/json"

curl -X GET -H "Accept: application/json"
   http://localhost:3000/checkToken?token=<TOKEN HERE>

Patterns:

Constructor injection: In this type of DI, the dependencies are passed to a constructor at the moment of its creation
Property injection: In this type of DI, the dependencies are attached to an object after its creation