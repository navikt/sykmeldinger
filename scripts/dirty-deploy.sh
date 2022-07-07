#!/bin/bash
APPLICATION="sykmeldinger"
NAMESPACE="teamsykmelding"
CONTEXT="dev-gcp"
TAG="$USER-$(date +"%s")"
IMAGE="ghcr.io/navikt/sykmeldinger:$TAG"

set -e

echo -e "\033[0;32m 1. Updating GraphQL codegen \033[0m"
yarn gen

echo -e "\033[0;32m 2. Removing assetPrefix \033[0m"
sed -i 's|assetPrefix|//assetPrefix|g' next.config.js

echo -e "\033[0;32m 3. Building App \033[0m"
yarn build

echo -e "\033[0;32m 5. Building $IMAGE \033[0m"
docker build -t $IMAGE .

echo -e "\033[0;32m 4. Restoring assetPrefix \033[0m"
sed -i 's|//assetPrefix|assetPrefix|g' next.config.js

echo -e "\033[0;32m 6. Pushing $IMAGE \033[0m"
docker push $IMAGE

echo -e "\033[0;32m 7. Pathing kubernetes \033[0m"
kubectl patch -n $NAMESPACE --context $CONTEXT app $APPLICATION --type='json' -p '[{"op": "replace", "path": "/spec/image", "value":"'$IMAGE'"}]'

echo -e "\033[0;32m 8. Dirty deploy complete \033[0m"
