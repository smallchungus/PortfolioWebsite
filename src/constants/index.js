import { meta, shopify, starbucks, tesla, software, school, battery } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    java,
    sql,
    python
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: sql,
        name: "SQL",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Backend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Backend",
    }
];

export const experiences = [
    {
        title: "Software Engineer",
        company_name: "Stealth Startup",
        icon: software,
        iconBg: "#accbe1",
        date: "April 2024 - Present",
        points: [
            "Developing and maintaining web applications using Python and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products."
        ],
    },
    {
        title: "Research Assistant",
        company_name: "Rutgers University",
        icon: school,
        iconBg: "#fbc3bc",
        date: "June 2023 - Present",
        points: [
            "Processed and aligned Chlamydia fastq files on High Performance Computing cluster, reducing alignment time by 40% using STAR and HTSeq for genomic analysis.",
            "Automated genomic expression analysis on Rutgers Amarel (HPC) using Linux scripts, enhancing data throughput by 60% through multithreaded scripting, file management, and Python-based analysis with NumPy and Pandas.",

        ],
    },
    {
        title: "Software Engineer Intern",
        company_name: "Panasonic",
        icon: battery,
        iconBg: "#b7e4c7",
        date: "June 2023 - April 2024",
        points: [

            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/smallchungus',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/willchenn/',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Jane Street Electronic Trading Bot',
        description: 'Engineered a predictive trading model using Python, XGBoost, and GPU acceleration. Successfully trained and evaluated the model on a large dataset of over 100 million trading records.',
        // link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Servlet-Based Web Application',
        description: 'Designed and implemented a servlet-based web application that enables users to register and login, securely storing the information in a MySQL database hosted on Apache Tomcat.',
        // link: 'https://github.com/adrianhajdin/threads',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Car Finding App',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        // link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Truth Tables Project',
        description: 'Developed a truth tables project in C that generates truth tables for logical expressions. Implemented algorithms to evaluate logical expressions and generate truth values for all possible combinations of inputs.',
        // link: 'https://github.com/adrianhajdin/social_media_app',
    },
    // {
    //     iconUrl: estate,
    //     theme: 'btn-back-black',
    //     name: 'Real-Estate Application',
    //     description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
    //     // link: 'https://github.com/adrianhajdin/projects_realestate',
    // },
    // {
    //     // iconUrl: summiz,
    //     // theme: 'btn-back-yellow',
    //     // name: 'AI Summarizer Application',
    //     // description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
    //     // link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    // }
];