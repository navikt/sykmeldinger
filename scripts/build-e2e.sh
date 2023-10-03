cp nais/envs/.env.demo .env.production
NEXT_PUBLIC_IS_E2E=true NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_ASSET_PREFIX= yarn build:only

if [ "$1" = "--docker" ]; then
  echo "Building docker image"
  docker build . -t e2e:latest
  exit 0
fi
