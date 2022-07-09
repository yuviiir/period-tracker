docker build -t johannsbbd/bbd-grad-period-tracker-frontend:v1.2 client
docker push johannsbbd/bbd-grad-period-tracker-frontend:v1.2

docker build -t johannsbbd/bbd-grad-period-tracker-backend:v1.2 server
docker push johannsbbd/bbd-grad-period-tracker-backend:v1.2