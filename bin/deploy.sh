#!/bin/bash

set -e

STAGE="production"
FIREBASE_PROJECT="spender-d58bb"

COMMIT_HASH=$(git rev-parse --short HEAD 2> /dev/null)

cat <<-EOF


🚧  Building $(tput setaf 6)${STAGE}$(tput sgr0) ...

EOF

npm run build

cat <<-EOF


🚚  Deploying commit $(tput setaf 6)${COMMIT_HASH}$(tput sgr0) to $(tput setaf 6)${FIREBASE_PROJECT}$(tput sgr0)

EOF


# firebase use ${FIREBASE_PROJECT} --token $FIREBASE_TOKEN
firebase use ${FIREBASE_PROJECT}
firebase deploy

