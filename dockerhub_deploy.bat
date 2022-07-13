docker build -t johannsbbd/bbd-grad-period-tracker-frontend:v1.3 client
docker push johannsbbd/bbd-grad-period-tracker-frontend:v1.3

docker build -t johannsbbd/bbd-grad-period-tracker-backend:v1.3 server
docker push johannsbbd/bbd-grad-period-tracker-backend:v1.3

docker build -t johannsbbd/bbd-grad-period-tracker-proxy:v1.3 proxy
docker push johannsbbd/bbd-grad-period-tracker-proxy:v1.3