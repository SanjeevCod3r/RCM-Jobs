import React, { useState } from 'react';
import { IoTrophyOutline, IoBookOutline, IoBulbOutline, IoRocketOutline, IoCheckmarkCircleOutline, IoPlayCircleOutline, IoDownloadOutline, IoShareSocialOutline } from 'react-icons/io5';

const LearningPage = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const modules = [
    {
      id: 0,
      title: "🚀 Career Launchpad",
      icon: IoRocketOutline,
      color: "from-blue-500 to-cyan-500",
      description: "Start your career journey with confidence",
      lessons: [
        { id: 0, title: "Building Your Personal Brand", duration: "15 min", type: "video" },
        { id: 1, title: "Resume Writing Masterclass", duration: "20 min", type: "video" },
        { id: 2, title: "LinkedIn Profile Optimization", duration: "12 min", type: "article" },
        { id: 3, title: "Creating a Portfolio That Stands Out", duration: "18 min", type: "interactive" }
      ]
    },
    {
      id: 1,
      title: "💡 Interview Excellence",
      icon: IoBulbOutline,
      color: "from-purple-500 to-pink-500",
      description: "Master the art of interviewing",
      lessons: [
        { id: 4, title: "Common Interview Questions & Answers", duration: "25 min", type: "video" },
        { id: 5, title: "Body Language & Communication", duration: "15 min", type: "video" },
        { id: 6, title: "Technical Interview Preparation", duration: "30 min", type: "interactive" },
        { id: 7, title: "Salary Negotiation Tactics", duration: "20 min", type: "article" }
      ]
    },
    {
      id: 2,
      title: "📚 Skill Development",
      icon: IoBookOutline,
      color: "from-green-500 to-emerald-500",
      description: "Develop in-demand skills",
      lessons: [
        { id: 8, title: "Digital Marketing Fundamentals", duration: "45 min", type: "course" },
        { id: 9, title: "Project Management Basics", duration: "35 min", type: "course" },
        { id: 10, title: "Data Analysis Introduction", duration: "40 min", type: "interactive" },
        { id: 11, title: "Communication Skills Workshop", duration: "30 min", type: "workshop" }
      ]
    },
    {
      id: 3,
      title: "🏆 Career Growth",
      icon: IoTrophyOutline,
      color: "from-orange-500 to-red-500",
      description: "Accelerate your professional growth",
      lessons: [
        { id: 12, title: "Networking Strategies", duration: "22 min", type: "video" },
        { id: 13, title: "Leadership Fundamentals", duration: "28 min", type: "course" },
        { id: 14, title: "Workplace Success Tips", duration: "18 min", type: "article" },
        { id: 15, title: "Career Path Planning", duration: "25 min", type: "interactive" }
      ]
    }
  ];

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <IoPlayCircleOutline size={16} />;
      case 'article': return <IoBookOutline size={16} />;
      case 'interactive': return <IoBulbOutline size={16} />;
      case 'course': return <IoRocketOutline size={16} />;
      case 'workshop': return <IoTrophyOutline size={16} />;
      default: return <IoBookOutline size={16} />;
    }
  };

  const totalProgress = (completedLessons.length / 16) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              🎮 RCM Learning Academy
            </h1>
            <p className="mb-6 text-lg sm:text-xl text-purple-100 px-4">
              Level up your career with fun, interactive learning modules!
            </p>
            
            {/* Progress Overview */}
            <div className="mx-auto max-w-2xl rounded-2xl bg-white/10 backdrop-blur-sm p-4 sm:p-6">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-base sm:text-lg font-semibold">Your Progress</span>
                <span className="text-base sm:text-lg font-bold">{Math.round(totalProgress)}%</span>
              </div>
              <div className="mb-4 h-3 sm:h-4 overflow-hidden rounded-full bg-white/20">
                <div 
                  className="h-full bg-gradient-to-r from-white to-purple-200 transition-all duration-500"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-purple-100">
                <span>{completedLessons.length} lessons completed</span>
                <span>16 total lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {modules.map((module) => {
              const ModuleIcon = module.icon;
              const moduleProgress = module.lessons.filter(lesson => 
                completedLessons.includes(lesson.id)
              ).length;
              
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeModule === module.id
                      ? 'bg-white shadow-md ring-2 ring-primaryColor text-primaryColor'
                      : 'bg-white/50 text-textGrayColor hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <ModuleIcon size={16} />
                  <span className="hidden xs:inline">{module.title.split(' ')[0]}</span>
                  <span className="text-xs opacity-75">({moduleProgress}/{module.lessons.length})</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-3">
          {/* Modules List - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold text-textDarkColor">Learning Modules</h2>
            <div className="space-y-3 sm:space-y-4">
              {modules.map((module) => {
                const ModuleIcon = module.icon;
                const moduleProgress = module.lessons.filter(lesson => 
                  completedLessons.includes(lesson.id)
                ).length;
                
                return (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full rounded-xl p-3 sm:p-4 text-left transition-all duration-300 ${
                      activeModule === module.id
                        ? 'bg-white shadow-lg ring-2 ring-primaryColor'
                        : 'bg-white/50 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className={`rounded-lg bg-gradient-to-r ${module.color} p-2 sm:p-2 text-white flex-shrink-0`}>
                        <ModuleIcon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-textDarkColor text-sm sm:text-base truncate">{module.title}</h3>
                        <p className="mb-2 text-xs sm:text-sm text-textGrayColor line-clamp-2">{module.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 sm:h-2 overflow-hidden rounded-full bg-gray-200">
                            <div 
                              className="h-full bg-gradient-to-r from-primaryColor to-purple-600 transition-all duration-300"
                              style={{ width: `${(moduleProgress / module.lessons.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-textGrayColor whitespace-nowrap">
                            {moduleProgress}/{module.lessons.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lessons Content - Full Width on Mobile */}
          <div className="w-full lg:col-span-2">
            <div className="rounded-2xl bg-white p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg">
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
                  <div className={`rounded-lg bg-gradient-to-r ${modules[activeModule].color} p-2 sm:p-3 text-white flex-shrink-0`}>
                    {React.createElement(modules[activeModule].icon, { size: 20 })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-textDarkColor">
                      {modules[activeModule].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-textGrayColor mt-1">{modules[activeModule].description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {modules[activeModule].lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  
                  return (
                    <div
                      key={lesson.id}
                      className={`rounded-xl border-2 p-3 sm:p-4 md:p-6 transition-all duration-300 ${
                        isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 hover:border-primaryColor hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <div className={`rounded-lg p-2 flex-shrink-0 ${
                            isCompleted ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                          }`}>
                            {getTypeIcon(lesson.type)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-textDarkColor text-sm sm:text-base">{lesson.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-textGrayColor mt-1">
                              <span>{lesson.duration}</span>
                              <span className="capitalize">{lesson.type}</span>
                              {isCompleted && (
                                <span className="flex items-center gap-1 text-green-600">
                                  <IoCheckmarkCircleOutline size={14} />
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 justify-end">
                          <button className="rounded-lg p-2 text-textGrayColor hover:bg-white hover:text-primaryColor transition-colors">
                            <IoDownloadOutline size={16} />
                          </button>
                          <button className="rounded-lg p-2 text-textGrayColor hover:bg-white hover:text-primaryColor transition-colors">
                            <IoShareSocialOutline size={16} />
                          </button>
                          <button
                            onClick={() => markLessonComplete(lesson.id)}
                            className={`rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                              isCompleted
                                ? 'bg-green-100 text-green-600'
                                : 'bg-primaryColor text-white hover:bg-primaryColor/90'
                            }`}
                          >
                            {isCompleted ? 'Review' : 'Start'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Achievement Section */}
              {totalProgress >= 25 && (
                <div className="mt-6 sm:mt-8 rounded-xl bg-gradient-to-r from-yellow-100 to-orange-100 p-3 sm:p-4 md:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">🏆</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-textDarkColor">Achievement Unlocked!</h3>
                      <p className="text-xs sm:text-sm text-textGrayColor">
                        {totalProgress >= 100 
                          ? "🎉 Master Learner! You've completed all modules!"
                          : totalProgress >= 75 
                          ? "🌟 Expert Learner! You're almost there!"
                          : totalProgress >= 50 
                          ? "⭐ Great Progress! Keep going!"
                          : "👏 Good Start! You're on your way!"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
