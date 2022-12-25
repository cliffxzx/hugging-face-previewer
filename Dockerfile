FROM python:3.8.16-slim-bullseye AS app
LABEL maintainer="Nick Janetakis <nick.janetakis@gmail.com>"

WORKDIR /app

ARG UID=1000
ARG GID=1000

RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential curl libpq-dev \
  && rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man \
  && apt-get clean \
  && groupadd -g "${GID}" python \
  && useradd --create-home --no-log-init -u "${UID}" -g "${GID}" python \
  && chown python:python -R /app

USER python

COPY --chown=python:python requirements*.txt ./
COPY --chown=python:python bin/ ./bin

RUN chmod 0755 bin/* && bin/pip3-install

ARG FLASK_DEBUG="false"
ENV FLASK_DEBUG="${FLASK_DEBUG}" \
  FLASK_APP="model_monkey.app" \
  FLASK_SKIP_DOTENV="true" \
  PYTHONUNBUFFERED="true" \
  PYTHONPATH="." \
  PATH="${PATH}:/home/python/.local/bin" \
  USER="python"

# COPY --chown=python:python /app/public /public
COPY --chown=python:python . .

RUN if [ "${FLASK_DEBUG}" != "true" ]; then \
  ln -s /public /app/public && flask digest compile && rm -rf /app/public; fi

ENTRYPOINT ["/app/bin/docker-entrypoint-web"]

EXPOSE 8000

CMD ["gunicorn", "-c", "python:config.gunicorn", "model_monkey.app:create_app()"]
