#!/bin/bash
kubectl set image deployments/counterapp counterapp=fleeing/counternodeapp:base
sleep 10
kubectl set image deployments/counterapp counterapp=fleeing/counternodeapp:latest
sleep 10