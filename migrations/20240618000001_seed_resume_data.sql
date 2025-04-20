-- Seed data for yk_ tables
INSERT INTO yk_resume (name, contact) VALUES (
  'Yazan Kittaneh',
  '{
    "website": "https://yazan.io",
    "phone": "(312) 785-4427",
    "github": "github.com/yazankittaneh",
    "email": "hi@yazan.io",
    "blog": "https://blog.yazan.io"
  }'
);

-- Insert experiences
INSERT INTO yk_experiences (company, company_url, title, location, period, achievements) VALUES
('VerySweet', 'verysweet.co', 'Senior Full Stack Developer', 'New York City NY (remote)', 'November 2024 - Present', ARRAY[
  '**Sensitive Data Ingestion:** Implemented a resumable file uploading feature...',
  '**AI Augmentation:** Fine-tuned DeepSeek R1 model to efficiently ingest any CSV or PDF...'
]),
('Route', 'getroute.com', 'Senior Full Stack Developer', 'Chicago, IL', 'December 2023 - November 2024', ARRAY[
  '**Legacy Application Revamp:** Lead a 3-person team in overhauling a React 16 application...',
  '**Backend Optimization:** Migrated backend to use Edge Network services...'
]);

-- Insert projects
INSERT INTO yk_projects (title, url, year, description, challenge, category, approach, result, images) VALUES
('Jail App', 'https://jail.app', '2023', 'An AI voice platform to enable US Inmates to communicate with their loved ones.', 
 'The client needed a website that would break industry conventions...',
 ARRAY['AI VOICE MESSAGES', 'OFFLINE'],
 'I stripped away unnecessary decoration and focused on raw content presentation...',
 'The redesigned website increased user engagement by 45%...',
 ARRAY['subletinn_1.png', 'subletinn_2.png']);

-- Insert education
INSERT INTO yk_education (institution, degree, location, graduation_date) VALUES
('Grinnell College', 'Computer Science B.A', 'Grinnell, IA', 'May 2017');

-- Insert technology categories
INSERT INTO yk_technology_categories (category, skills) VALUES
('Languages', ARRAY['JavaScript', 'TypeScript', 'Python', 'Ruby', 'GOlang', 'Kotlin', 'Spanish', 'Bash']),
('Frontend', ARRAY['React (Next, Astro, React Router)', 'Svelte.js', 'Vue.js/Nuxt', 'Angular']);
