import express from 'express';
import { showOrganizationDetailsPage } from './organizations.js';
import { showHomePage } from './index.js';
import { showOrganizationsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './organizations.js';
import { showProjectDetailsPage, showProjectsPage, showNewProjectForm, processNewProjectForm, projectValidation, processEditProjectForm, showEditProjectForm } from './projects.js';
import { showCategoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm, showCreateCategoryForm, processCreateCategoryForm, categoryValidation, showEditCategoryForm, processEditCategoryForm } from './categories.js';
import { testErrorPage } from './errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard } from './users.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

router.get('/new-project', showNewProjectForm);
// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

//Routes to handle the edit project form submission and display
router.post('/edit-project/:id', projectValidation, processEditProjectForm);
router.get('/edit-project/:id', showEditProjectForm);

// Route for new category form page and submission
router.get('/new-category', showCreateCategoryForm);
router.post('/new-category', categoryValidation, processCreateCategoryForm);

// Routes to handle edit category form submission and display
router.get('/edit-category/:id', showEditCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

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