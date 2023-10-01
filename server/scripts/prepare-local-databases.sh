#!/bin/sh

docker-compose up -d postgres
npm run migrate