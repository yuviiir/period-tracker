docker build -t johannsbbd/bbd-grad-period-tracker-frontend:v1.1 client
docker push johannsbbd/bbd-grad-period-tracker-frontend:v1.1

docker build -t johannsbbd/bbd-grad-period-tracker-backend:v1.1 server
docker push johannsbbd/bbd-grad-period-tracker-backend:v1.1