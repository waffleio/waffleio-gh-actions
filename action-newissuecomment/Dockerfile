FROM node:8-slim

LABEL "com.github.actions.name"="PR Appreciation"
LABEL "com.github.actions.description"="Appreciate the person who created a new PR!"
LABEL "com.github.actions.icon"="thumbs-up"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/adamzolyak/actions-helloworld"
LABEL "homepage"="http://www.tinkurlab.com"
LABEL "maintainer"="Octocat <adam@tinkurlab.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD index.js /action/index.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]