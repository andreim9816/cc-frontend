# Local development

To start the application:

```
npm run start
```

The application uses a proxy to redirect the traffic to `localhost:8080`. If the port changes, you have to update
the target port (`target: 'http://localhost:<NEW_PORT>'`)

# Production development

Gui can be found here: http://34.172.253.150

Or else:

```
kubectl get svc frontend-service
```

And in the browser, go to `<EXTERNAL-IP>:80`

# How to build docker image

First, you need to:

1. Open Docker Desktop
2. Login to your Docker account. If you don't have access, you may follow the instructions at this
   link: https://docs.docker.com/docker-hub/access-tokens/
3. Enter the following commands:

```
docker image build -t andreim98/banking-frontend .
docker push andreim98/banking-frontend
```


