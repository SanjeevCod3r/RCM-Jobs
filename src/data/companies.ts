export interface Company {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  website: string;
  industry: string;
  employeeCount: string;
  location: string;
  founded: number;
  jobs: JobPosting[];
}

export interface JobPosting {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechNova Solutions',
    logo: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/1200x300',
    description: 'Leading technology company specializing in AI and cloud solutions. We empower businesses with innovative software solutions.',
    website: 'https://technova.example.com',
    industry: 'Information Technology',
    employeeCount: '1000-5000',
    location: 'San Francisco, CA',
    founded: 2010,
    jobs: [
      {
        id: 'job1',
        title: 'Senior Frontend Developer',
        type: 'Full-time',
        location: 'Remote',
        salary: '$120,000 - $150,000',
        posted: '2023-10-15',
        description: 'We are looking for an experienced Frontend Developer to join our team.',
        requirements: [
          '5+ years of experience with React',
          'Strong TypeScript skills',
          'Experience with state management (Redux/MobX)',
          'Familiarity with RESTful APIs'
        ],
        responsibilities: [
          'Develop new user-facing features',
          'Build reusable components and front-end libraries',
          'Optimize components for maximum performance',
          'Collaborate with the design team'
        ]
      },
      {
        id: 'job2',
        title: 'DevOps Engineer',
        type: 'Full-time',
        location: 'San Francisco, CA',
        salary: '$130,000 - $160,000',
        posted: '2023-10-10',
        description: 'Join our DevOps team to build and maintain our cloud infrastructure.',
        requirements: [
          'Experience with AWS/GCP',
          'Containerization with Docker and Kubernetes',
          'CI/CD pipeline development',
          'Infrastructure as Code (Terraform)'
        ],
        responsibilities: [
          'Design and implement CI/CD pipelines',
          'Maintain and scale our cloud infrastructure',
          'Automate deployment processes',
          'Ensure system security'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'GreenEarth Energy',
    logo: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/1200x300',
    description: 'Renewable energy company dedicated to creating sustainable energy solutions for a greener future.',
    website: 'https://greenearth.example.com',
    industry: 'Renewable Energy',
    employeeCount: '500-1000',
    location: 'Austin, TX',
    founded: 2015,
    jobs: [
      {
        id: 'job3',
        title: 'Renewable Energy Engineer',
        type: 'Full-time',
        location: 'Austin, TX',
        salary: '$90,000 - $120,000',
        posted: '2023-10-05',
        description: 'Join our engineering team to develop innovative renewable energy solutions.',
        requirements: [
          'Degree in Engineering (Mechanical, Electrical, or related field)',
          'Experience in renewable energy sector',
          'Knowledge of solar/wind energy systems',
          'Project management skills'
        ],
        responsibilities: [
          'Design renewable energy systems',
          'Conduct energy efficiency assessments',
          'Collaborate with cross-functional teams',
          'Prepare technical documentation'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'HealthPlus Medical',
    logo: 'https://via.placeholder.com/100',
    coverImage: 'https://via.placeholder.com/1200x300',
    description: 'Healthcare technology company revolutionizing patient care through innovative medical solutions.',
    website: 'https://healthplus.example.com',
    industry: 'Healthcare',
    employeeCount: '2000-5000',
    location: 'Boston, MA',
    founded: 2008,
    jobs: [
      {
        id: 'job4',
        title: 'Healthcare Data Analyst',
        type: 'Full-time',
        location: 'Remote',
        salary: '$85,000 - $110,000',
        posted: '2023-09-28',
        description: 'Analyze healthcare data to improve patient outcomes and operational efficiency.',
        requirements: [
          'Experience with healthcare data analysis',
          'Proficiency in SQL and Python/R',
          'Knowledge of healthcare regulations (HIPAA)',
          'Strong analytical skills'
        ],
        responsibilities: [
          'Analyze patient and operational data',
          'Generate reports and visualizations',
          'Identify trends and insights',
          'Collaborate with healthcare professionals'
        ]
      }
    ]
  }
];
