const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const { UserModel } = require("./models/user");
const { CourseModel } = require("./models/course");
const { LectureModel } = require("./models/lecture");
const { DiscussionModel } = require("./models/discussion");
const { StudentCourseModel } = require("./models/studentcourse");

// Function to hash passwords
const hashPassword = async (password) => {
    const saltRounds = 5; // Number of salt rounds for bcrypt
    return await bcrypt.hash(password, saltRounds);
};

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://localhost:27017/NewDataBase", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected!");

        // Clear existing data
        await UserModel.deleteMany({});
        await CourseModel.deleteMany({});
        await LectureModel.deleteMany({});
        await DiscussionModel.deleteMany({});
        await StudentCourseModel.deleteMany({});
        console.log("Existing data cleared!");

        // Create Courses
        const courses = await CourseModel.insertMany([
            { name: "Full-Stack Development", description: "Learn MERN Stack development.", prerequisites: ["Basic JavaScript"] },
            { name: "Data Science", description: "Introduction to data analysis and ML.", prerequisites: ["Python Basics"] },
            { name: "Cloud Computing", description: "Understanding cloud infrastructure and services.", prerequisites: ["Networking Basics"] },
            { name: "AI and Machine Learning", description: "Deep dive into AI and ML concepts.", prerequisites: ["Data Science"] },
        ]);
        console.log("Courses seeded!");

        // Create Lectures
        const lectures = await LectureModel.insertMany([
            { course: courses[0]._id, title: "MERN Stack Basics", startTime: new Date(), duration: "2 hours", description: "Introduction to MERN stack." },
            { course: courses[1]._id, title: "Data Science Overview", startTime: new Date(), duration: "1.5 hours", description: "Basics of data science." },
            { course: courses[2]._id, title: "Cloud Concepts", startTime: new Date(), duration: "1 hour", description: "Introduction to cloud computing." },
            { course: courses[3]._id, title: "Introduction to AI", startTime: new Date(), duration: "3 hours", description: "Understanding AI basics." },
        ]);
        console.log("Lectures seeded!");

        // Link lectures to courses
        for (let i = 0; i < lectures.length; i++) {
            await CourseModel.updateOne(
                { _id: lectures[i].course },
                { $push: { lectures: lectures[i]._id } }
            );
        }

        // Create Users with Hashed Passwords
        const users = await UserModel.insertMany([
            { email: "admin@example.com", password: await hashPassword("admin123"), role: "Admin", isLoggedIn: false },
            { email: "student1@example.com", password: await hashPassword("student123"), role: "Student", isLoggedIn: false, course: [courses[0]._id, courses[1]._id], isSelected: true },
            { email: "student2@example.com", password: await hashPassword("student123"), role: "Student", isLoggedIn: false, course: [courses[2]._id], isSelected: false },
            { email: "student3@example.com", password: await hashPassword("student123"), role: "Student", isLoggedIn: false, course: [courses[1]._id, courses[3]._id], isSelected: true },
        ]);
        console.log("Users with hashed passwords seeded!");

        // Create Discussions
        const discussions = await DiscussionModel.insertMany([
            { lecture: lectures[0]._id, user: users[1]._id, message: "What is the MERN stack?", timestamp: new Date() },
            { lecture: lectures[1]._id, user: users[2]._id, message: "What are the prerequisites for this course?", timestamp: new Date() },
            { lecture: lectures[3]._id, user: users[3]._id, message: "Can you explain AI basics in more detail?", timestamp: new Date() },
        ]);
        console.log("Discussions seeded!");

        // Create Student-Course Relationships
        const studentCourses = await StudentCourseModel.insertMany([
            { student: users[1]._id, course: [courses[0]._id, courses[1]._id], isSelected: true },
            { student: users[2]._id, course: [courses[2]._id], isSelected: false },
            { student: users[3]._id, course: [courses[1]._id, courses[3]._id], isSelected: true },
        ]);
        console.log("Student-Course relationships seeded!");

        console.log("Database seeding completed!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seeding script
seedDatabase();
