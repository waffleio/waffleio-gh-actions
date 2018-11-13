FROM node:8-slim

LABEL "com.github.actions.name"="Commit Issue Commenter"
LABEL "com.github.actions.description"="Comment on issue from commit messages."
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="http://github.com/waffleio/gh-actions"
LABEL "homepage"="http://www.waffle.io"
LABEL "maintainer"="Octocat <adam@waffle.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js
ADD helpers.js /action/helpers.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]