FROM hasura/graphql-engine:v2.46.0

RUN apt-get update && apt-get install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g hasura-cli@2.36.1
