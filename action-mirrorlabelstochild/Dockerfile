FROM node:8-slim

LABEL "com.github.actions.name"="Mirror Labels to Child"
LABEL "com.github.actions.description"="A GitHub Action to mirror labels to child."
LABEL "com.github.actions.icon"="copy"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="http://github.com/waffleio/gh-actions"
LABEL "homepage"="http://www.waffle.io"
LABEL "maintainer"="Adam Zolyak <adam@waffle.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD helpers.js /action/helpers.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]