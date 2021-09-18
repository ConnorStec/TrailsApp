BEGIN;

CREATE TABLE trails (
  id SERIAL PRIMARY KEY,
  name TEXT,
  url TEXT,
  "thumbUrl" TEXT,
  length TEXT,
  "elevationGain" TEXT,
  description TEXT,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP
);

CREATE TRIGGER trails_onupdate
BEFORE UPDATE ON trails
FOR EACH ROW
WHEN (OLD.* IS DISTINCT FROM NEW.*)
EXECUTE PROCEDURE on_update();