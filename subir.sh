eval $(minikube docker-env) 
docker build -t vam-frontend:1.0 .
kubectl apply -f frontend-deployment.yaml
eval $(minikube docker-env -u) 