async function loadProjects() {
    try {
        const response = await fetch('http://localhost:3000/projects');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const result = await response.json();
        const data = result.data;
        displayProjects(data);
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = '<p>Error loading projects. Please try again later.</p>';
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    const table = document.createElement('table');
    table.className = 'projects-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Stack</th>
                <th>Info</th>
                <th>Authors</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
    const tbody = table.querySelector('tbody');
    projects.forEach(project => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" target="_blank">${project.name}</a></td>
            <td>${project.stack}</td>
            <td>${project.info}</td>
            <td>${project.authors}</td>
        `;
        tbody.appendChild(row);
    });
    container.innerHTML = '';
    container.appendChild(table);
}

// Load initially
loadProjects();

// Periodic update every 5 minutes
setInterval(loadProjects, 5 * 60 * 1000);