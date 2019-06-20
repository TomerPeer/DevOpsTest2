if [ "$(docker ps -aq -f name=prod)" > 0 ]; then
    docker stop prod
    docker rm prod
    docker rmi fleeing/counternodeapp
fi

docker pull fleeing/counternodeapp
docker run -p 3000:3000 --name prod -d fleeing/counternodeapp
