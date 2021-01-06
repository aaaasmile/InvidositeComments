#!/bin/bash

echo "Builds app. go build is running..."
go build -o InvidositeComments.bin

cd ./deploy

echo "build the zip package"
./deploy.bin -target pi3 -outdir ~/app/InvidositeComments/zips/
cd ~/app/InvidositeComments/

echo "update the service"
./update-service.sh

echo "Ready to fly"