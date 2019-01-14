FROM node:8-slim

LABEL "com.github.actions.name"="PR Closed Labeler"
LABEL "com.github.actions.description"="Labeling closed PRs as merged or not merged."
LABEL "com.github.actions.icon"="git-merge"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/waffleio/gh-actions"
LABEL "homepage"="http://www.waffle.io"
LABEL "maintainer"="Adam Zolyak <adam@waffle.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD helpers.js /action/helpers.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]