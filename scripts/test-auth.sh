#!/bin/sh
# Password can be set via
# read -s SLS_PASS
# export SLS_PASS

if [[ "${SLS_PASS}" == "" ]]; then
  echo Need to set SLS_PASS
  exit -1
fi

source .script-vars

npx aws-api-gateway-cli-test \
  --username="${USER_EMAIL}" \
  --password="${SLS_PASS}" \
  --user-pool-id="${USER_POOL_ID}" \
  --app-client-id="${APP_CLIENT_ID}" \
  --cognito-region="${AWS_REGION}" \
  --identity-pool-id="${IDENTITY_POOL_ID}" \
  --invoke-url="${GATEWAY_URL}" \
  --api-gateway-region="${AWS_REGION}" \
  --path-template='/notes' \
  --method='POST' \
  --body='{"content":"hello world","attachment":"hello.jpg"}'
