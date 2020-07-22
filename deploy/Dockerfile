# TzStats build container
#
FROM          idx.trimmer.io/serve:v1.2.3-alpine
MAINTAINER    Alexander Eichhorn <alex@blockwatch.cc>

ARG           BUILD_VERSION
ARG           BUILD_DATE
ARG           BUILD_ID

LABEL         vendor=BLOCKWATCH\ DATA\ INC \
              io.trimmer.service="tzstats" \
              io.trimmer.tier="frontend" \
              io.trimmer.arch="browser" \
              io.trimmer.os="multi" \
              io.trimmer.build-version=$BUILD_VERSION \
              io.trimmer.build-date=$BUILD_DATE \
              io.trimmer.build-id=$BUILD_ID

COPY          ./build/ /var/www/