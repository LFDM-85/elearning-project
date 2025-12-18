const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DATABASE_URL = "mongodb://mongoadmin:secretpassword@elearning-mongo:27017/elearning?authSource=admin";

// Define Schemas directly to avoid dependency issues with NestJS decorators
const userSchema = new mongoose.Schema({
    name: String,
    image: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: [String],
    isValidated: Boolean,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
    assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    attendances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
});
const User = mongoose.model('Users', userSchema);

const courseSchema = new mongoose.Schema({
    nameCourse: String,
    open: Boolean,
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    lecture: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }]
});
const Course = mongoose.model('Course', courseSchema);

const lectureSchema = new mongoose.Schema({
    summary: String,
    description: String,
    finished: Boolean,
    assessment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    work: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
    attendance: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }
});
const Lecture = mongoose.model('Lecture', new mongoose.Schema({
    summary: String,
    description: String,
    finished: Boolean,
    assessment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' }],
    work: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
}));

const assessmentSchema = new mongoose.Schema({
    assessmentValue: Number,
    userEmail: String
});
const Assessment = mongoose.model('Assessment', assessmentSchema);

const workSchema = new mongoose.Schema({
    filename: String,
    filepath: String,
    owner: String
});
const Work = mongoose.model('Work', workSchema);

const attendanceSchema = new mongoose.Schema({
    attendance: Boolean,
    validation: Boolean,
    filename: String,
    filepath: String,
    owner: String
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

const getImageUrl = (seed) => `https://picsum.photos/seed/${seed}/200/200`;

async function seedDatabase() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(DATABASE_URL);
    console.log('Connected!');

    console.log('--- Seeding Admin User ---');
    // 1. Create Admin
    const adminEmail = 'admin@admin.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
        const hashedPassword = await bcrypt.hash('qwertyuiop', 10);
        admin = new User({
            name: 'Admin User',
            image: getImageUrl(100),
            email: adminEmail,
            password: hashedPassword,
            roles: ['admin', 'professor'],
            isValidated: true
        });
        await admin.save();
        console.log('Admin created.');
    } else {
        console.log('Admin already exists.');
    }

    const professors = [];
    const students = [];
    const courses = [];

    console.log('--- Seeding Professors ---');
    // 2. Professors
    const professorNames = ['Dr. Alice Johnson', 'Prof. Bob Smith', 'Dr. Carol Williams', 'Prof. David Brown', 'Dr. Emily Davis'];
    for (let i = 0; i < professorNames.length; i++) {
        const email = `prof${i + 1}@elearning.com`;
        let prof = await User.findOne({ email });
        if (!prof) {
            prof = new User({
                name: professorNames[i],
                image: getImageUrl(i + 200),
                email: email,
                password: await bcrypt.hash('professorpassword', 10),
                roles: ['professor'],
                isValidated: true
            });
            await prof.save();
        }
        professors.push(prof);
    }
    console.log('Professors created/loaded.');

    console.log('--- Seeding Students ---');
    // 3. Students
    const studentNames = [
        'Frank Miller', 'Grace Wilson', 'Harry Moore', 'Ivy Taylor', 'Jack Anderson',
        'Kelly Thomas', 'Leo Jackson', 'Mia White', 'Noah Harris', 'Olivia Martin',
        'Paul Walker', 'Quinn Young', 'Ryan King', 'Sophia Scott', 'Tyler Green',
        'Uma Adams', 'Victor Baker', 'Wendy Gonzalez', 'Xander Nelson', 'Yara Carter',
        'Zoe Perez', 'Adam Davis', 'Bella Evans', 'Caleb Garcia', 'Diana Hall',
        'Ethan King', 'Fiona Lewis', 'George Moore', 'Hannah Green', 'Ian Clark'
    ];
    for (let i = 0; i < studentNames.length; i++) {
        const email = `student${i + 1}@elearning.com`;
        let student = await User.findOne({ email });
        if (!student) {
            student = new User({
                name: studentNames[i],
                image: getImageUrl(i + 300),
                email: email,
                password: await bcrypt.hash('studentpassword', 10),
                roles: ['student'],
                isValidated: true
            });
            await student.save();
        }
        students.push(student);
    }
    console.log('Students created/loaded.');

    console.log('--- Seeding Courses & Lectures ---');
    // 4. Courses & Lectures
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
        let course = await Course.findOne({ nameCourse: courseTitles[i] });
        
        if (!course) {
            course = new Course({
                nameCourse: courseTitles[i],
                open: true,
                user: [prof._id] // Assign professor
            });
            await course.save();
            
            // Add Course to Professor
            prof.courses.push(course._id);
            await prof.save();

            // Create Lectures
            const lectureSummaries = [
                'Module 1: Getting Started', 'Module 2: Core Concepts', 'Module 3: Advanced Topics',
                'Project Work & Review', 'Midterm Exam Prep', 'Final Project Guidelines',
                'Case Study Analysis', 'Guest Lecture Series'
            ];
            
            for (let j = 0; j < lectureSummaries.length; j++) {
                const lecture = new Lecture({
                    summary: `${course.nameCourse}: ${lectureSummaries[j]}`,
                    description: `Detailed description for ${course.nameCourse} - ${lectureSummaries[j]}.`,
                    finished: j < 4
                });
                await lecture.save();
                
                course.lecture.push(lecture._id);
            }
            await course.save();
        }
        courses.push(course);
    }
    console.log('Courses and Lectures created/loaded.');

    console.log('--- Enrolling Students & Generating Activity ---');
    // 5. Enroll Students & Activity
    for (const student of students) {
        // Skip if student already has courses (simple check to avoid double seeding complexity)
        if (student.courses.length > 0) {
            console.log(`Skipping student ${student.name} as already enrolled in courses.`);
            continue;
        }

        const numCoursesToEnroll = Math.floor(Math.random() * 4) + 3;
        const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
        const coursesToEnroll = shuffledCourses.slice(0, numCoursesToEnroll);

        for (const course of coursesToEnroll) {
            // Enroll
            student.courses.push(course._id);
            
            // Populate lectures to get IDs
            const populatedCourse = await Course.findById(course._id).populate('lecture');
            
            for (const lecture of populatedCourse.lecture) {
                // Assessment
                if (Math.random() > 0.2) {
                    const assessment = new Assessment({
                        assessmentValue: Math.floor(Math.random() * 50) + 50,
                        userEmail: student.email
                    });
                    await assessment.save();
                    
                    lecture.assessment.push(assessment._id);
                    student.assessments.push(assessment._id);
                    await lecture.save();
                }

                // Work
                if (Math.random() > 0.6) {
                    const work = new Work({
                        filename: `Assignment_${Date.now()}.pdf`,
                        filepath: `/uploads/assignments/dummy.pdf`,
                        owner: student.email
                    });
                    await work.save();

                    lecture.work.push(work._id);
                    student.works.push(work._id);
                    await lecture.save();
                }

                // Attendance
                if (Math.random() > 0.1) {
                    const isPresent = Math.random() > 0.2;
                    const attendance = new Attendance({
                        attendance: isPresent,
                        validation: isPresent,
                        owner: student.email,
                        filename: isPresent ? null : 'justification.jpg',
                        filepath: isPresent ? null : '/uploads/justification.jpg'
                    });
                    await attendance.save();

                    lecture.attendance.push(attendance._id); // Assuming array
                    student.attendances.push(attendance._id);
                    await lecture.save();
                }
            }
        }
        await student.save();
        console.log(`Enrolled & updated student: ${student.name}`);
    }

    console.log('Seeding complete.');
    mongoose.connection.close();
}

seedDatabase().catch(err => {
    console.error(err);
    mongoose.connection.close();
});