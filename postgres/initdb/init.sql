-- Initialize database, users and schemas for Keycloak and Nuxt app
-- Run as part of Postgres container initialization

-- Create application roles
CREATE ROLE kc_user WITH LOGIN PASSWORD 'kc_pass';
CREATE ROLE app_user WITH LOGIN PASSWORD 'app_pass';

-- Create schemas owned by respective roles
CREATE SCHEMA IF NOT EXISTS keycloak AUTHORIZATION kc_user;
CREATE SCHEMA IF NOT EXISTS app AUTHORIZATION app_user;

-- Grant privileges
GRANT ALL ON SCHEMA keycloak TO kc_user;
GRANT ALL ON SCHEMA app TO app_user;

-- Set default search_path for roles so they operate within their schema
ALTER ROLE kc_user SET search_path = keycloak,public;
ALTER ROLE app_user SET search_path = app,public;

-- Ensure CONNECT privileges on the database (database name comes from POSTGRES_DB env)
GRANT CONNECT ON DATABASE keycloak_auth TO kc_user;
GRANT CONNECT ON DATABASE keycloak_auth TO app_user;
