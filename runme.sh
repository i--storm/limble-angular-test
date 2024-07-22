#!/bin/bash

docker build . -t limble-angular-test
docker run -p 127.0.0.1:4200:4200 limble-angular-test

