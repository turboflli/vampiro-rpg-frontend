eval $(minikube docker-env) 
docker build --no-cache -t vam-frontend:1.0.1 .
kubectl apply -f frontend-deployment.yaml
eval $(minikube docker-env -u) 