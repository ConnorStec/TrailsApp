BEGIN;

-- Add extensions here
-- CREATE EXTENSION "uuid-ossp";

-- DB FUNCTIONS
CREATE OR REPLACE FUNCTION on_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated = NOW();
END;
$$ LANGUAGE 'plpgsql';


\i ./trails.sql
\i sample_data.sql
