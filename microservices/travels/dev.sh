podman kill travels
podman build --tls-verify=false -t travels .
podman run --pod sae --rm -d --name travels travels
