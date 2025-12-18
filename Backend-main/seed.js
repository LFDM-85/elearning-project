const mongoose = require('mongoose');
const argon2 = require('argon2');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://mongoadmin:secretpassword@localhost:27017/elearning?authSource=admin";

// Define Schemas directly to match the application's structure
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
    attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
});
const Lecture = mongoose.model('Lecture', lectureSchema);

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
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected!');
    } catch (err) {
        console.error('Connection error:', err);
        process.exit(1);
    }

    console.log('Clearing existing data...');
    await Promise.all([
        User.deleteMany({}),
        Course.deleteMany({}),
        Lecture.deleteMany({}),
        Assessment.deleteMany({}),
        Work.deleteMany({}),
        Attendance.deleteMany({})
    ]);

    const professors = [];
    const students = [];
    const courses = [];

    console.log('--- Seeding Admin User ---');
    const adminEmail = 'admin@admin.com';
    const hashedPassword = await argon2.hash('qwertyuiop');
    const admin = new User({
        name: 'Admin User',
        image: getImageUrl('admin'),
        email: adminEmail,
        password: hashedPassword,
        roles: ['admin', 'professor'],
        isValidated: true
    });
    await admin.save();
    professors.push(admin); // Admin is also a professor
    console.log('Admin created.');

    console.log('--- Seeding 5 Professors ---');
    const professorNames = ['Dr. Alice Johnson', 'Prof. Bob Smith', 'Dr. Carol Williams', 'Prof. David Brown', 'Dr. Emily Davis'];
    for (let i = 0; i < professorNames.length; i++) {
        const email = `prof${i + 1}@elearning.com`;
        const prof = new User({
            name: professorNames[i],
            image: getImageUrl(`prof${i}`),
            email: email,
            password: await argon2.hash('professorpassword'),
            roles: ['professor'],
            isValidated: true
        });
        await prof.save();
        professors.push(prof);
    }

    console.log('--- Seeding 20 Students ---');
    const studentNames = [
        'Frank Miller', 'Grace Wilson', 'Harry Moore', 'Ivy Taylor', 'Jack Anderson',
        'Kelly Thomas', 'Leo Jackson', 'Mia White', 'Noah Harris', 'Olivia Martin',
        'Paul Walker', 'Quinn Young', 'Ryan King', 'Sophia Scott', 'Tyler Green',
        'Uma Adams', 'Victor Baker', 'Wendy Gonzalez', 'Xander Nelson', 'Yara Carter'
    ];
    for (let i = 0; i < studentNames.length; i++) {
        const email = `student${i + 1}@elearning.com`;
        const student = new User({
            name: studentNames[i],
            image: getImageUrl(`student${i}`),
            email: email,
            password: await argon2.hash('studentpassword'),
            roles: ['student'],
            isValidated: true
        });
        await student.save();
        students.push(student);
    }

    console.log('--- Seeding Courses & Lectures ---');
    const courseTitles = [
        'Introduction to Web Development', 'Advanced Backend with NestJS', 'Frontend Masterclass with React',
        'Database Management Systems', 'E-learning Best Practices', 'Mobile App Development with Flutter',
        'Cloud Computing with AWS', 'Data Science Fundamentals', 'Cybersecurity Essentials',
        'UI/UX Design Principles'
    ];

    for (let i = 0; i < courseTitles.length; i++) {
        const prof = professors[i % professors.length];
        const course = new Course({
            nameCourse: courseTitles[i],
            open: true,
            user: [prof._id]
        });
        await course.save();
        
        prof.courses.push(course._id);
        await prof.save();

        const lectureSummaries = [
            'Module 1: Getting Started', 'Module 2: Core Concepts', 'Module 3: Advanced Topics',
            'Project Work & Review', 'Midterm Exam Prep'
        ];
        
        for (let j = 0; j < lectureSummaries.length; j++) {
            const lecture = new Lecture({
                summary: `${course.nameCourse}: ${lectureSummaries[j]}`,
                description: `Detailed description for ${course.nameCourse} - ${lectureSummaries[j]}.`,
                finished: j < 3
            });
            await lecture.save();
            course.lecture.push(lecture._id);
        }
        await course.save();
        courses.push(course);
    }

    console.log('--- Enrolling Students & Generating Activity ---');
    for (const student of students) {
        const numCoursesToEnroll = Math.floor(Math.random() * 3) + 3;
        const shuffledCourses = [...courses].sort(() => 0.5 - Math.random());
        const coursesToEnroll = shuffledCourses.slice(0, numCoursesToEnroll);

        for (const course of coursesToEnroll) {
            student.courses.push(course._id);
            course.user.push(student._id);
            await course.save();
            
            const populatedCourse = await Course.findById(course._id).populate('lecture');
            for (const lecture of populatedCourse.lecture) {
                if (Math.random() > 0.3) {
                    const assessment = new Assessment({
                        assessmentValue: Math.floor(Math.random() * 40) + 60,
                        userEmail: student.email
                    });
                    await assessment.save();
                    lecture.assessment.push(assessment._id);
                    student.assessments.push(assessment._id);
                    await lecture.save();
                }

                const isPresent = Math.random() > 0.1;
                const attendance = new Attendance({
                    attendance: isPresent,
                    validation: isPresent,
                    owner: student.email
                });
                await attendance.save();
                lecture.attendance.push(attendance._id);
                student.attendances.push(attendance._id);
                await lecture.save();
            }
        }
        await student.save();
    }

    console.log('Seeding complete successfully!');
    mongoose.connection.close();
}

seedDatabase().catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
});