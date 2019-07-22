# Tzstats build container
#
FROM          idx.trimmer.io/spang:1.1-alpine
MAINTAINER    Alexander Eichhorn <alex@kidtsunami.com>

ARG           BUILD_VERSION
ARG           BUILD_DATE
ARG           BUILD_ID

LABEL         vendor=KIDTSUNAMI\ UG \
              io.trimmer.service="tzstats" \
              io.trimmer.tier="frontend" \
              io.trimmer.arch="browser" \
              io.trimmer.os="multi" \
              io.trimmer.build-version=$BUILD_VERSION \
              io.trimmer.build-date=$BUILD_DATE \
              io.trimmer.build-id=$BUILD_ID

COPY          ./build/ /var/www/