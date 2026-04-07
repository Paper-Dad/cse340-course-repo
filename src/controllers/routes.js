import express from 'express';
import { showOrganizationDetailsPage } from './organizations.js';
import { showHomePage } from './index.js';
import { showOrganizationsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './organizations.js';
import { showProjectDetailsPage, showProjectsPage, showNewProjectForm, processNewProjectForm, projectValidation, processEditProjectForm, showEditProjectForm } from './projects.js';
import { showCategoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm, showCreateCategoryForm, processCreateCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm } from './categories.js';
import { testErrorPage } from './errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsersPage, addVolunteer, removeVolunteer } from './users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
router.get('/users', requireRole('admin'), showUsersPage);

// Route for new organization page
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

router.get('/new-project', requireRole('admin'), showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

//Routes to handle the edit project form submission and display
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

// Route for new category form page and submission
router.get('/new-category', requireRole('admin'), showCreateCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processCreateCategoryForm);

// Routes to handle edit category form submission and display
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// Routes for volunteering and removing volunteer from project
router.post('/volunteer/:projectId', requireLogin, addVolunteer);
router.post('/unvolunteer/:projectId', requireLogin, removeVolunteer);


// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// error-handling routes
router.get('/test-error', testErrorPage);


// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetails);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

export default router;