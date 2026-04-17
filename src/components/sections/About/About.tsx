import { Badge } from '../../ui/Badge'
import { Reveal } from '../../ui/Reveal'
import { BulletedDescription } from '../../ui/BulletedDescription'
import { skills, experience, education, heroContent } from '@/content'

export const About = () => {
  // Convert skills object to array format for rendering
  const skillCategories = Object.entries(skills).map(([title, skillList]) => ({
    title,
    skills: skillList
  }))

  return (
    <section
      id="about"
      className="py-20 px-6 max-w-6xl mx-auto"
      role="region"
      aria-label="About Will Chen - Professional background and skills"
    >
      {/* Section Heading */}
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center tracking-tight">
          <span className="text-gray-400 dark:text-gray-600 font-mono font-normal text-xl md:text-2xl mr-3 align-middle">01 /</span>
          About Me
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Professional Summary */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Professional Summary</h3>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl"
            data-testid="professional-summary"
          >
            {heroContent.description}
          </p>

          {/* Education */}
          <div className="mt-12" data-testid="education-section">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-2xl transition-all duration-300">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono">{edu.status} {edu.duration && `• ${edu.duration}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Technical Skills</h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="skills-grid"
            aria-label="Technical skills organized by category"
          >
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                data-testid={`skill-category-${category.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{category.title}</h4>
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
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8 text-center">Experience</h3>
        <div
          className="max-w-4xl mx-auto"
          data-testid="experience-highlights"
          aria-label="Professional experience highlights"
        >
          <div className="space-y-6">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{exp.duration}</span>
                </div>
                <BulletedDescription
                  text={exp.description}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed"
                  labelClassName="text-gray-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
