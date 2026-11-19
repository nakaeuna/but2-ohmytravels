podman kill gateway
podman build --tls-verify=false -t gateway .
podman run --rm -d --pod sae --name gateway gateway