# wireme dashboard

running
```
npm install
bower install
npm start
```
visit `http://localhost:3000`.


mqtt details:
```
host: wireme.projects.mrt.ac.lk: 8883
user: test
pass: test123
```

test mqtt commands
```
mqtt publish -h "broker.hivemq.com" -p 1883 -t "wathmal/out1" -m "{\"value\": 11}" -v
mqtt subscribe -h "wireme.projects.mrt.ac.lk" -p 1883 -t "wathmal/cbulb" -u "test" -P "test123"
```