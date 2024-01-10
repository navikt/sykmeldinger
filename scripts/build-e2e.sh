cp nais/envs/.env.demo .env.production
NEXT_PUBLIC_IS_E2E=true NEXT_PUBLIC_BASE_PATH= NEXT_PUBLIC_ASSET_PREFIX= yarn build:only
cp -R .next/static .next/standalone/.next
cp src/server/graphql/typedef/*.graphqls .next/standalone
