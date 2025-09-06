import { Badge } from '../../ui/Badge'

interface SkillCategory {
  title: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']
  },
  {
    title: 'Backend', 
    skills: ['Node.js', 'Python', 'Express', 'Flask', 'REST APIs', 'GraphQL']
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'SQLite', 'Prisma']
  },
  {
    title: 'Tools',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Vite', 'Webpack']
  }
]

const EXPERIENCE_HIGHLIGHTS = [
  "Built scalable full-stack applications serving thousands of users with React, Node.js, and PostgreSQL",
  "Developed RESTful APIs and microservices with comprehensive test coverage and documentation", 
  "Implemented CI/CD pipelines and deployed applications to cloud platforms like AWS and Vercel",
  "Collaborated with cross-functional teams using Agile methodologies and version control best practices"
]

export const About = () => {
  return (
    <section 
      className="py-20 px-6 max-w-6xl mx-auto"
      role="region"
      aria-label="About Will Chen - Professional background and skills"
    >
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
        About Me
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Professional Summary */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Professional Summary</h3>
          <p 
            className="text-lg text-gray-600 leading-relaxed max-w-4xl"
            data-testid="professional-summary"
          >
            I'm a passionate software engineer with over 3 years of experience building modern web applications. 
            I specialize in full-stack development using React, TypeScript, and Node.js, with a strong focus on 
            creating clean, maintainable code and exceptional user experiences. I thrive in collaborative 
            environments and enjoy solving complex problems through innovative technical solutions.
          </p>

          {/* Education */}
          <div className="mt-12" data-testid="education-section">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h4>
              <p className="text-gray-600 mt-1">University of California, Berkeley</p>
              <p className="text-sm text-gray-500 mt-2">Graduated Magna Cum Laude • GPA: 3.8/4.0</p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Skills</h3>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="skills-grid"
            aria-label="Technical skills organized by category"
          >
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.title}
                className="bg-white border border-gray-200 rounded-lg p-4"
                data-testid={`skill-category-${category.title.toLowerCase()}`}
              >
                <h4 className="font-semibold text-gray-900 mb-3">{category.title}</h4>
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div key={skill} data-testid={`skill-item-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} role="listitem">
                      <Badge variant="secondary" size="sm">
                        {skill}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Highlights */}
      <div className="mt-16">
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">Experience Highlights</h3>
        <div 
          className="max-w-4xl mx-auto"
          data-testid="experience-highlights"
          aria-label="Professional experience highlights"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPERIENCE_HIGHLIGHTS.map((highlight, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6"
              >
                <p className="text-gray-700 leading-relaxed">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}