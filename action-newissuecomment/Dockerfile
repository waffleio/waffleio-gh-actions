FROM node:8-slim

LABEL "com.github.actions.name"="PR Appreciation"
LABEL "com.github.actions.description"="Appreciate the person who created a new PR!"
LABEL "com.github.actions.icon"="thumbs-up"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/waffleio/gh-actions"
LABEL "homepage"="http://www.waffle.io"
LABEL "maintainer"="Adam Zolyak <adam@waffle.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]