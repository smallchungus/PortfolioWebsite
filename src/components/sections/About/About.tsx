import { Badge } from '../../ui/Badge'

interface SkillCategory {
  title: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL']
  },
  {
    title: 'Backend', 
    skills: ['Spring Boot', 'Node.js', 'PostgreSQL', 'AWS Glue']
  },
  {
    title: 'Frontend',
    skills: ['React', 'Tailwind CSS', 'Tableau']
  },
  {
    title: 'Cloud',
    skills: ['AWS', 'Redshift', 'Athena']
  }
]

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string
}

const EXPERIENCE_HIGHLIGHTS: ExperienceItem[] = [
  {
    title: "Software Engineer Intern",
    company: "TD Securities",
    period: "June 2024 - Aug 2024",
    description: "Built DataMart features for 200+ investment bankers, reducing expense categorization time by 35%"
  },
  {
    title: "Software Engineer Intern", 
    company: "Panasonic",
    period: "July 2023 - April 2024",
    description: "Developed AWS ETL pipelines for USDA cloud spending analytics"
  },
  {
    title: "Research Assistant",
    company: "Rutgers Chlamydia Lab", 
    period: "Aug 2023 - Present",
    description: "Analyzing protein patterns with 89% accuracy using Python ML libraries"
  }
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
            I'm a software engineer pursuing my Master's in Computer Science at Arizona State University 
            (GPA 4.0). Currently working as a Research Assistant at Rutgers, I've built data pipelines 
            that process 5TB of protein data and developed features for investment banking platforms at TD Securities.
          </p>

          {/* Education */}
          <div className="mt-12" data-testid="education-section">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900">Master's in Computer Science</h4>
              <p className="text-gray-600 mt-1">Arizona State University</p>
              <p className="text-sm text-gray-500 mt-2">Current Student • GPA 4.0</p>
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
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">Experience</h3>
        <div 
          className="max-w-4xl mx-auto"
          data-testid="experience-highlights"
          aria-label="Professional experience highlights"
        >
          <div className="space-y-6">
            {EXPERIENCE_HIGHLIGHTS.map((experience, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{experience.title}</h4>
                    <p className="text-gray-700 font-medium">{experience.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{experience.period}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}