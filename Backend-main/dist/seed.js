const axios = require('axios');
const API_BASE_URL = 'http://localhost:5000';
const adminEmail = 'admin@admin.com';
const adminPassword = 'qwertyuiop';
let adminAccessToken = '';
const getImageUrl = (seed) => `https://picsum.photos/seed/${seed}/200/200`;
async function loginAdmin() {
    try {
        console.log('Attempting to log in admin...');
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, {
            email: adminEmail,
            password: adminPassword,
        });
        adminAccessToken = response.data.tokens.accessToken;
        console.log('Admin logged in successfully!');
    }
    catch (error) {
        console.error('Admin login failed:', error.response ? error.response.data : error.message);
        throw new Error('Failed to log in admin.');
    }
}
async function createAdminUser() {
    try {
        console.log('Creating admin user...');
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, {
            name: 'Admin User',
            image: getImageUrl(100),
            email: adminEmail,
            password: adminPassword,
            roles: ['admin', 'professor'],
            isValidated: true,
        });
        console.log('Admin user created successfully!');
        await loginAdmin();
        return response.data.user;
    }
    catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === 'User already exists') {
            console.log('Admin user already exists. Proceeding with login.');
            await loginAdmin();
        }
        else {
            console.error('Error creating admin user:', error.response ? error.response.data : error.message);
            throw new Error('Failed to create admin user.');
        }
    }
}
async function createEntity(endpoint, data, token) {
    var _a;
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, { headers });
        console.log(`Created ${endpoint}:`, ((_a = response.data.user) === null || _a === void 0 ? void 0 : _a.email) || response.data.nameCourse || response.data.summary || 'entity');
        return response.data;
    }
    catch (error) {
        console.error(`Error creating ${endpoint}:`, error.response ? error.response.data : error.message);
        return null;
    }
}
async function updateEntity(endpoint, data, token) {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.patch(`${API_BASE_URL}${endpoint}`, data, { headers });
        console.log(`Updated ${endpoint}:`, response.data.name || response.data.nameCourse || 'entity');
        return response.data;
    }
    catch (error) {
        console.error(`Error updating ${endpoint}:`, error.response ? error.response.data : error.message);
        return null;
    }
}
async function seedDatabase() {
    console.log('Starting database seeding...');
    const adminUserResult = await createAdminUser();
    if (!adminUserResult) {
        console.error('Failed to get admin user, cannot proceed with seeding.');
        return;
    }
    console.log('Admin setup complete.');
    const professors = [];
    const students = [];
    const courses = [];
    const lectures = [];
    const professorNames = ['Dr. Alice Johnson', 'Prof. Bob Smith', 'Dr. Carol Williams', 'Prof. David Brown', 'Dr. Emily Davis'];
    for (let i = 0; i < professorNames.length; i++) {
        const profEmail = `prof${i + 1}@elearning.com`;
        const { user: prof } = await createEntity('/auth/signup', {
            name: professorNames[i],
            image: getImageUrl(i + 200),
            email: profEmail,
            password: 'professorpassword',
            roles: ['professor'],
            isValidated: true,
        }, null);
        if (prof) {
            professors.push(prof);
            console.log(`Created Professor: ${prof.name}`);
        }
    }
    const studentNames = [
        'Frank Miller', 'Grace Wilson', 'Harry Moore', 'Ivy Taylor', 'Jack Anderson',
        'Kelly Thomas', 'Leo Jackson', 'Mia White', 'Noah Harris', 'Olivia Martin',
        'Paul Walker', 'Quinn Young', 'Ryan King', 'Sophia Scott', 'Tyler Green',
        'Uma Adams', 'Victor Baker', 'Wendy Gonzalez', 'Xander Nelson', 'Yara Carter',
        'Zoe Perez', 'Adam Davis', 'Bella Evans', 'Caleb Garcia', 'Diana Hall',
        'Ethan King', 'Fiona Lewis', 'George Moore', 'Hannah Green', 'Ian Clark'
    ];
    for (let i = 0; i < studentNames.length; i++) {
        const studentEmail = `student${i + 1}@elearning.com`;
        const { user: student } = await createEntity('/auth/signup', {
            name: studentNames[i],
            image: getImageUrl(i + 300),
            email: studentEmail,
            password: 'studentpassword',
            roles: ['student'],
            isValidated: true,
        }, null);
        if (student) {
            students.push(student);
            console.log(`Created Student: ${student.name}`);
        }
    }
    console.log('User creation complete.');
    const courseTitles = [
        'Introduction to Web Development', 'Advanced Backend with NestJS', 'Frontend Masterclass with React',
        'Database Management Systems', 'E-learning Best Practices', 'Mobile App Development with Flutter',
        'Cloud Computing with AWS', 'Data Science Fundamentals', 'Cybersecurity Essentials',
        'UI/UX Design Principles', 'Artificial Intelligence Basics', 'Machine Learning for Beginners',
        'DevOps Practices and Tools', 'Network Security Fundamentals', 'Game Development with Unity',
        'Blockchain Fundamentals', 'Quantum Computing Concepts', 'Virtual Reality Development',
        'Ethical Hacking', 'Advanced Algorithms', 'Natural Language Processing', 'Computer Vision',
        'Big Data Analytics', 'Internet of Things', 'Robotics and AI'
    ];
    for (let i = 0; i < courseTitles.length; i++) {
        const prof = professors[i % professors.length];
        if (prof) {
            const course = await createEntity('/course/create', { nameCourse: courseTitles[i], open: true, user: [prof._id] }, adminAccessToken);
            if (course) {
                courses.push(course);
                console.log(`Created Course: ${course.nameCourse} by ${prof.name}`);
            }
        }
    }
    console.log('Course creation complete.');
    const lectureSummaries = [
        'Module 1: Getting Started', 'Module 2: Core Concepts', 'Module 3: Advanced Topics',
        'Project Work & Review', 'Midterm Exam Prep', 'Final Project Guidelines',
        'Case Study Analysis', 'Guest Lecture Series'
    ];
    for (const course of courses) {
        if (course) {
            for (let i = 0; i < lectureSummaries.length; i++) {
                const lecture = await createEntity('/lectures/create', {
                    summary: `${course.nameCourse}: ${lectureSummaries[i]}`,
                    description: `Detailed description for ${course.nameCourse} - ${lectureSummaries[i]}.`,
                    finished: i < 4,
                }, adminAccessToken);
                if (lecture) {
                    lectures.push(lecture);
                    await updateEntity(`/course/${course._id}/add-lecture/${lecture._id}`, {}, adminAccessToken);
                    console.log(`Added Lecture "${lecture.summary}" to "${course.nameCourse}"`);
                }
            }
        }
    }
    console.log('Lecture creation complete.');
    for (const student of students) {
        if (student) {
            const numCoursesToEnroll = Math.floor(Math.random() * 6) + 3;
            const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
            const coursesToEnroll = shuffledCourses.slice(0, numCoursesToEnroll);
            for (const course of coursesToEnroll) {
                if (course) {
                    await updateEntity(`/users/${student._id}/add-course/${course._id}`, {}, adminAccessToken);
                    console.log(`Enrolled ${student.name} in ${course.nameCourse}`);
                    for (const lecture of course.lecture) {
                        if (lecture) {
                            const assessmentValue = Math.floor(Math.random() * 50) + 50;
                            const assessment = await createEntity('/assessments/create', { assessmentValue: assessmentValue, userEmail: student.email }, adminAccessToken);
                            if (assessment) {
                                await updateEntity(`/lectures/${lecture._id}/add-assessment/${assessment._id}`, {}, adminAccessToken);
                                console.log(`Student ${student.name} got ${assessmentValue} in ${lecture.summary}`);
                            }
                            if (Math.random() > 0.3) {
                                const work = await createEntity('/work/create', {
                                    filename: `${student.name.replace(/\s/g, '_')}_${lecture.summary.replace(/\s/g, '_')}_assignment.pdf`,
                                    filepath: `/uploads/${student.name.replace(/\s/g, '_')}_${lecture.summary.replace(/\s/g, '_')}_assignment.pdf`,
                                    owner: student.email,
                                }, adminAccessToken);
                                if (work) {
                                    await updateEntity(`/lectures/${lecture._id}/add-work/${work._id}`, {}, adminAccessToken);
                                    console.log(`Student ${student.name} submitted work for ${lecture.summary}`);
                                }
                            }
                            if (Math.random() > 0.5) {
                                const attendance = await createEntity('/attendance/create', {
                                    attendance: false,
                                    validation: false,
                                    filename: `${student.name.replace(/\s/g, '_')}_${lecture.summary.replace(/\s/g, '_')}_justification.jpg`,
                                    filepath: `/uploads/${student.name.replace(/\s/g, '_')}_${lecture.summary.replace(/\s/g, '_')}_justification.jpg`,
                                    owner: student.email,
                                }, adminAccessToken);
                                if (attendance) {
                                    await updateEntity(`/lectures/${lecture._id}`, { attendance: attendance._id }, adminAccessToken);
                                    console.log(`Student ${student.name} submitted justification for ${lecture.summary}`);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    console.log('Student enrollment and data complete.');
    console.log('Database seeding complete!');
}
seedDatabase().catch(console.error);
//# sourceMappingURL=seed.js.map