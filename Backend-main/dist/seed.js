const axios = require('axios');
const API_BASE_URL = 'http://localhost:5000';
const adminEmail = 'admin@admin.com';
const adminPassword = 'qwertyuiop';
let adminAccessToken = '';
const getImageUrl = (seed) => `https://picsum.photos/seed/${seed}/200/200`;
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});
async function loginAdmin() {
    let attempts = 0;
    while (attempts < 3) {
        try {
            console.log(`Attempting to log in admin (Attempt ${attempts + 1})...`);
            const response = await apiClient.post('/auth/signin', {
                email: adminEmail,
                password: adminPassword,
            });
            adminAccessToken = response.data.tokens.accessToken;
            console.log('Admin logged in successfully!');
            return;
        }
        catch (error) {
            console.error('Admin login failed:', error.response ? error.response.data : error.message);
            attempts++;
            if (attempts >= 3)
                throw new Error('Failed to log in admin after 3 attempts.');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}
async function createAdminUser() {
    let attempts = 0;
    while (attempts < 3) {
        try {
            console.log(`Creating admin user (Attempt ${attempts + 1})...`);
            const response = await apiClient.post('/auth/signup', {
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
                try {
                    const userResponse = await apiClient.get('/auth/whoami', {
                        headers: { Authorization: `Bearer ${adminAccessToken}` }
                    });
                    return userResponse.data;
                }
                catch (fetchError) {
                    console.error('Failed to fetch existing admin details:', fetchError.message);
                    return { _id: 'dummy_admin_id' };
                }
            }
            console.error('Error creating admin user:', error.response ? error.response.data : error.message);
            attempts++;
            if (attempts >= 3)
                throw new Error('Failed to create admin user after 3 attempts.');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}
async function createEntity(endpoint, data, token) {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await apiClient.post(endpoint, data, { headers });
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
        const response = await apiClient.patch(endpoint, data, { headers });
        return response.data;
    }
    catch (error) {
        console.error(`Error updating ${endpoint}:`, error.response ? error.response.data : error.message);
        return null;
    }
}
async function seedDatabase() {
    console.log('Starting database seeding...');
    const adminUser = await createAdminUser();
    if (!adminUser) {
        console.error('Failed to get admin user, cannot proceed with seeding.');
        return;
    }
    console.log(`Admin setup complete. ID: ${adminUser._id}`);
    const professors = [];
    const students = [];
    const courses = [];
    const professorNames = ['Dr. Alice Johnson', 'Prof. Bob Smith', 'Dr. Carol Williams', 'Prof. David Brown', 'Dr. Emily Davis'];
    for (let i = 0; i < professorNames.length; i++) {
        const profEmail = `prof${i + 1}@elearning.com`;
        let prof = await createEntity('/auth/signup', {
            name: professorNames[i],
            image: getImageUrl(i + 200),
            email: profEmail,
            password: 'professorpassword',
            roles: ['professor'],
            isValidated: true,
        }, null);
        if (!prof && i === 0) {
            console.log("Professor might already exist, skipping creation logic for existing ones in this simple script.");
        }
        if (prof && prof.user)
            prof = prof.user;
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
        let student = await createEntity('/auth/signup', {
            name: studentNames[i],
            image: getImageUrl(i + 300),
            email: studentEmail,
            password: 'studentpassword',
            roles: ['student'],
            isValidated: true,
        }, null);
        if (student && student.user)
            student = student.user;
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
                const lectureSummaries = [
                    'Module 1: Getting Started', 'Module 2: Core Concepts', 'Module 3: Advanced Topics',
                    'Project Work & Review', 'Midterm Exam Prep', 'Final Project Guidelines',
                    'Case Study Analysis', 'Guest Lecture Series'
                ];
                const courseLectures = [];
                for (let j = 0; j < lectureSummaries.length; j++) {
                    const lecture = await createEntity('/lectures/create', {
                        summary: `${course.nameCourse}: ${lectureSummaries[j]}`,
                        description: `Detailed description for ${course.nameCourse} - ${lectureSummaries[j]}.`,
                        finished: j < 4,
                    }, adminAccessToken);
                    if (lecture) {
                        courseLectures.push(lecture);
                        await updateEntity(`/course/${course._id}/add-lecture/${lecture._id}`, {}, adminAccessToken);
                    }
                }
                course.lectures = courseLectures;
            }
        }
    }
    console.log('Course and Lecture creation complete.');
    console.log('Enrolling students and generating activity data...');
    for (const student of students) {
        if (!student)
            continue;
        const numCoursesToEnroll = Math.floor(Math.random() * 4) + 3;
        const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
        const coursesToEnroll = shuffledCourses.slice(0, numCoursesToEnroll);
        for (const course of coursesToEnroll) {
            if (!course)
                continue;
            await updateEntity(`/users/${student._id}/add-course/${course._id}`, {}, adminAccessToken);
            if (course.lectures) {
                for (const lecture of course.lectures) {
                    if (Math.random() > 0.2) {
                        const assessmentValue = Math.floor(Math.random() * 50) + 50;
                        const assessment = await createEntity('/assessments/create', { assessmentValue: assessmentValue, userEmail: student.email }, adminAccessToken);
                        if (assessment) {
                            await updateEntity(`/lectures/${lecture._id}/add-assessment/${assessment._id}`, {}, adminAccessToken);
                            await updateEntity(`/users/${student._id}/add-assessment/${assessment._id}`, {}, adminAccessToken);
                        }
                    }
                    if (Math.random() > 0.6) {
                        const work = await createEntity('/work/create', {
                            filename: `Assignment_${student.name.split(' ')[0]}_${Date.now()}.pdf`,
                            filepath: `/uploads/assignments/Assignment_${student.name.split(' ')[0]}_${Date.now()}.pdf`,
                            owner: student.email,
                        }, adminAccessToken);
                        if (work) {
                            await updateEntity(`/lectures/${lecture._id}/add-work/${work._id}`, {}, adminAccessToken);
                            await updateEntity(`/users/${student._id}/add-work/${work._id}`, {}, adminAccessToken);
                        }
                    }
                    if (Math.random() > 0.1) {
                        const isPresent = Math.random() > 0.2;
                        const attendanceData = {
                            attendance: isPresent,
                            validation: isPresent,
                            owner: student.email,
                        };
                        if (!isPresent) {
                            attendanceData.filename = `Justification_${student.name.split(' ')[0]}.jpg`;
                            attendanceData.filepath = `/uploads/justifications/Justification_${student.name.split(' ')[0]}.jpg`;
                        }
                        const attendance = await createEntity('/attendance/create', attendanceData, adminAccessToken);
                        if (attendance) {
                            await updateEntity(`/users/${student._id}/add-attendance/${attendance._id}`, {}, adminAccessToken);
                        }
                    }
                }
            }
        }
        console.log(`Processed student: ${student.name}`);
    }
    console.log('Database seeding complete!');
}
seedDatabase().catch(console.error);
//# sourceMappingURL=seed.js.map