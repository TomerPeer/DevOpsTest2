#!/bin/bash
kubectl set image deployments/counterapp counterapp=fleeing/counternodeapp:base
sleep 20
kubectl set image deployments/counterapp counterapp=fleeing/counternodeapp:latest
sleep 20