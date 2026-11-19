podman kill users
podman build --tls-verify=false -t users .
podman run --rm -d --pod sae --name users users
