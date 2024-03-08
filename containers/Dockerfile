FROM quay.io/keycloak/keycloak:22.0.4 as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor for PostgreSQL
ENV KC_DB=postgres

# ... (restante do Dockerfile permanece o mesmo)


WORKDIR /opt/keycloak
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Use ARG to accept environment variables during build
ARG KC_DB_URL
ARG KC_DB_USERNAME
ARG KC_DB_PASSWORD

# Set the environment variables with the values from the ARGs
ENV KC_DB_URL=$KC_DB_URL
ENV KC_DB_USERNAME=$KC_DB_USERNAME
ENV KC_DB_PASSWORD=$KC_DB_PASSWORD
ENV KC_DB=postgres
ENV KC_HOSTNAME=localhost

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
