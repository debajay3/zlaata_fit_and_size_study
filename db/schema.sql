CREATE TABLE IF NOT EXISTS responses (
 id uuid PRIMARY KEY,
 created_at timestamptz NOT NULL,
 answers jsonb NOT NULL,
 employee_name varchar(120) NOT NULL,
 phone_number varchar(50)
);
