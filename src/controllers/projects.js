import { getAllProjects, getProjectDetails, getUpcomingProjects } from '../models/projects.js';

let NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id; // extract ID from URL

    const project = await getProjectDetails(projectId);

    const title = project.title;

    res.render('project', { title, project });
};

export { showProjectsPage, showProjectDetailsPage };