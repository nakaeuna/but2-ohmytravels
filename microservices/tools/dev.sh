podman kill tools
podman build --tls-verify=false -t tools .
podman run --rm -d --pod sae --name tools tools
