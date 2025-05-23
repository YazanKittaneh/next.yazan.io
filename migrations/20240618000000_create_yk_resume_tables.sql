-- Create tables for resume data with yk_ prefix
CREATE TABLE IF NOT EXISTS yk_experiences (
  id SERIAL PRIMARY KEY,
  company TEXT NOT NULL,
  company_url TEXT,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  period TEXT NOT NULL,
  achievements TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS yk_projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT NOT NULL,
  category TEXT[] NOT NULL,
  approach TEXT NOT NULL,
  result TEXT NOT NULL,
  images TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS yk_education (
  id SERIAL PRIMARY KEY,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  location TEXT NOT NULL,
  graduation_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS yk_technology_categories (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS yk_resume (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
