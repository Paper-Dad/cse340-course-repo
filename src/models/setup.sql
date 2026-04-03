CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

/*Week Two Team Activity*/

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description VARCHAR(255) NOT NULL,
    location VARCHAR(200) NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
-- BrightFuture Builders (1)
(1, 'Community Park Renovation', 'Volunteers help repair playground equipment and rebuild park benches.', 'Calgary Community Park', '2026-05-10'),
(1, 'Affordable Housing Build', 'Assist with building affordable housing units for low-income families.', 'Calgary Southeast', '2026-06-15'),
(1, 'School Repair Day', 'Repair damaged classrooms and repaint hallways in a local elementary school.', 'Riverside Elementary', '2026-04-20'),
(1, 'Neighborhood Cleanup Construction', 'Remove debris and repair sidewalks in a high traffic neighborhood.', 'Downtown Calgary', '2026-07-12'),
(1, 'Senior Center Maintenance', 'Install ramps and perform maintenance to improve accessibility.', 'Calgary Senior Center', '2026-08-05'),

-- GreenHarvest Growers (2)
(2, 'Community Garden Planting', 'Help plant vegetables and herbs for the neighborhood community garden.', 'Hillcrest Community Garden', '2026-05-03'),
(2, 'Urban Farming Workshop', 'Teach residents how to grow food in small urban spaces.', 'GreenHarvest Training Center', '2026-06-07'),
(2, 'School Garden Build', 'Create a learning garden for students to study sustainable agriculture.', 'Westview High School', '2026-04-28'),
(2, 'Harvest Food Drive', 'Collect and distribute fresh produce to local food banks.', 'GreenHarvest Warehouse', '2026-09-10'),
(2, 'Composting Education Day', 'Volunteers teach composting techniques to community members.', 'Central Community Center', '2026-07-18'),

-- UnityServe Volunteers (3)
(3, 'Food Bank Sorting Day', 'Organize and package donated food items for families in need.', 'Calgary Food Bank', '2026-05-12'),
(3, 'Charity Run Support', 'Volunteers manage registration tables and water stations.', 'City Marathon Route', '2026-06-20'),
(3, 'Senior Companion Visit', 'Spend time visiting seniors in assisted living facilities.', 'Maple Grove Assisted Living', '2026-04-25'),
(3, 'Clothing Donation Drive', 'Collect and sort donated clothing for shelters.', 'UnityServe Center', '2026-08-14'),
(3, 'Holiday Toy Drive', 'Wrap and organize toys for children in need during the holidays.', 'UnityServe Warehouse', '2026-12-05');


/*Week Two Final Assignment*/

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES project(project_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO categories (category_name)
VALUES
('Construction'),
('Food Assistance'),
('Community Outreach'),
('Education'),
('Environmental');

INSERT INTO project_category (project_id, category_id)
VALUES
(1,1),
(1,3),
(2,1),
(2,3),
(3,1),
(3,4),
(4,1),
(4,5),
(5,1),
(5,3),
(6,2),
(6,3),
(6,5),
(7,2),
(7,4),
(7,5),
(8,4),
(8,5),
(9,2),
(9,3),
(10,3),
(10,4),
(10,5),
(11,2),
(11,3),
(12,3),
(13,3),
(14,3),
(15,3);


CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

SELECT * FROM roles;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);