###Para iniciar servidor:

Pasar argumentos de esta forma:
Se deben pasar:
-port
-mode ("fork" o "cluster")

#Iniciar con nodemon:
-nodemon server.js --mode fork --port 3000
-nodemon server.js --mode cluster --port 3000

#Iniciar con forever:
-forever start server.js --mode fork --port 3000
-forever start server.js --mode cluster --port 3000

#Iniciar con pm2:
------------MODO FORK---------------
-pm2 start server.js --name="Serverx" --watch --
-pm2 start server.js --name="Serverx" --watch -i max
