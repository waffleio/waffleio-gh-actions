FROM node:8-slim

LABEL "com.github.actions.name"="Bulk Labels"
LABEL "com.github.actions.description"="A GitHub Action to bulk add labels when creating a new issue."
LABEL "com.github.actions.icon"="tag"
LABEL "com.github.actions.color"="yellow"

LABEL "repository"="http://github.com/waffleio/gh-actions"
LABEL "homepage"="http://www.waffle.io"
LABEL "maintainer"="Adam Zolyak <adam@waffle.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD helpers.js /action/helpers.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]