import { useEffect, useMemo, useState } from 'react';
import { IoArrowForwardOutline, IoCheckmarkCircleOutline, IoRefreshOutline } from 'react-icons/io5';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  hint?: string;
  funFact?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  unlocked: boolean;
}

const LearningPage = () => {
  const [mode, setMode] = useState<'hub' | 'spin' | 'daily' | 'streak'>('hub');
  const [gameState, setGameState] = useState<'menu' | 'question' | 'result'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [dailyCompleted, setDailyCompleted] = useState(false);

  const categories: Category[] = [
    { id: 'resume', name: 'Resume Building', icon: '📝', color: 'from-blue-500 to-cyan-500', description: 'Master the art of resume writing', unlocked: true },
    { id: 'interview', name: 'Interview Skills', icon: '🎯', color: 'from-purple-500 to-pink-500', description: 'Ace your interviews with confidence', unlocked: true },
    { id: 'networking', name: 'Networking', icon: '🤝', color: 'from-green-500 to-emerald-500', description: 'Build professional connections', unlocked: totalPoints >= 50 },
    { id: 'salary', name: 'Salary Negotiation', icon: '💰', color: 'from-orange-500 to-red-500', description: 'Get what you deserve', unlocked: totalPoints >= 100 },
    { id: 'career', name: 'Career Growth', icon: '🚀', color: 'from-indigo-500 to-purple-500', description: 'Advance your career path', unlocked: totalPoints >= 200 },
    { id: 'skills', name: 'Skill Development', icon: '⚡', color: 'from-yellow-500 to-orange-500', description: 'Develop in-demand skills', unlocked: totalPoints >= 150 }
  ];

  const todayKey = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const dailyStorageKey = useMemo(() => `rcm_daily_completed_${todayKey}`, [todayKey]);

  const questions: Question[] = [
    // Resume Building
    { id: 1, category: 'resume', question: 'What is the ideal length for a professional resume?', options: ['1 page', '2-3 pages', '4-5 pages', 'As long as needed'], correct: 0, explanation: 'A 1-page resume is ideal for most professionals - recruiters spend only 6-10 seconds on each resume!', points: 10, difficulty: 'easy', hint: 'Think about how much time recruiters have...', funFact: 'The average recruiter spends only 7 seconds looking at a resume!' },
    { id: 2, category: 'resume', question: 'Which font is most professional for resumes?', options: ['Comic Sans', 'Arial/Calibri', 'Brush Script', 'Times New Roman'], correct: 1, explanation: 'Clean fonts like Arial or Calibri are most professional and easy to read!', points: 10, difficulty: 'easy', hint: 'Think readability and professionalism...', funFact: '65% of recruiters reject resumes due to poor formatting!' },
    { id: 3, category: 'resume', question: 'What should you include in a resume summary?', options: ['Your entire life story', 'Key achievements and skills', 'Your hobbies', 'Your salary expectations'], correct: 1, explanation: 'Focus on key achievements and relevant skills that match the job requirements!', points: 15, difficulty: 'medium', hint: 'What matters most to employers?', funFact: 'Resumes with tailored summaries get 40% more interviews!' },
    
    // Interview Skills
    { id: 4, category: 'interview', question: 'How should you answer "Tell me about yourself"?', options: ['Your childhood story', 'Professional background relevant to job', 'Your personal problems', 'Your salary history'], correct: 1, explanation: 'Focus on professional background relevant to the position - keep it concise and job-focused!', points: 15, difficulty: 'medium', hint: 'Stay professional and job-related...', funFact: 'This is often the most important question in interviews!' },
    { id: 5, category: 'interview', question: 'What is the best way to handle behavioral questions?', options: ['Make up stories', 'Use the STAR method', 'Say "I dont know"', 'Talk about your childhood'], correct: 1, explanation: 'STAR method (Situation, Task, Action, Result) is the most effective approach!', points: 20, difficulty: 'hard', hint: 'Think about a structured approach...', funFact: 'STAR method answers are 50% more effective than random stories!' },
    { id: 6, category: 'interview', question: 'When should you follow up after an interview?', options: ['Immediately', 'Within 24 hours', 'After one week', 'Never'], correct: 1, explanation: 'Following up within 24 hours shows professionalism and continued interest!', points: 10, difficulty: 'easy', hint: 'Balance enthusiasm with professionalism...', funFact: '80% of hires involve some form of follow-up!' },
    
    // Networking
    { id: 7, category: 'networking', question: 'What is the best networking platform for professionals?', options: ['Facebook', 'Instagram', 'LinkedIn', 'TikTok'], correct: 2, explanation: 'LinkedIn is specifically designed for professional networking and career development!', points: 10, difficulty: 'easy', hint: 'Think professional vs. social...', funFact: '85% of recruiters use LinkedIn to find candidates!' },
    { id: 8, category: 'networking', question: 'How should you start a conversation at a networking event?', options: ['Ask for a job immediately', 'Comment on the event or ask about their work', 'Talk about politics', 'Sell them something'], correct: 1, explanation: 'Start with relevant topics about the event or their work - build rapport first!', points: 15, difficulty: 'medium', hint: 'Build relationships before asking for favors...', funFact: '70% of jobs are found through networking!' },
    
    // Salary Negotiation
    { id: 9, category: 'salary', question: 'When is the best time to discuss salary?', options: ['Before the interview', 'During the first interview', 'After you have an offer', 'Never discuss salary'], correct: 2, explanation: 'Wait until you have a job offer to negotiate salary - this gives you leverage!', points: 15, difficulty: 'medium', hint: 'Timing is everything in negotiation...', funFact: 'People who negotiate salary earn $7,000 more on average!' },
    { id: 10, category: 'salary', question: 'What should you research before salary negotiation?', options: ['Company gossip', 'Market rates for your role', 'CEO\'s salary', 'Office rent prices'], correct: 1, explanation: 'Research market rates for your specific role and experience level!', points: 20, difficulty: 'hard', hint: 'Data drives successful negotiations...', funFact: 'Being prepared can increase your salary by 20-30%!' },
    
    // Career Growth
    { id: 11, category: 'career', question: 'How often should you update your skills?', options: ['Never', 'Once a year', 'Continuously', 'Only when required'], correct: 2, explanation: 'Continuous learning is key to career growth in today\'s fast-changing world!', points: 10, difficulty: 'easy', hint: 'Think about the modern workplace...', funFact: 'The half-life of skills is now only 5 years!' },
    { id: 12, category: 'career', question: 'What is most important for career advancement?', options: ['Working 24/7', 'Building relationships and delivering results', 'Changing jobs every 6 months', 'Avoiding all challenges'], correct: 1, explanation: 'Building relationships while delivering consistent results drives career advancement!', points: 15, difficulty: 'medium', hint: 'What creates sustainable success?', funFact: '85% of promotions go to those with strong relationships!' },
    
    // Skill Development
    { id: 13, category: 'skills', question: 'Which skill is most in demand globally?', options: ['Typing', 'Digital literacy', 'Smoking', 'Watching TV'], correct: 1, explanation: 'Digital literacy is essential in today\'s workplace across all industries!', points: 10, difficulty: 'easy', hint: 'Think about what every modern workplace needs...', funFact: '90% of jobs now require digital skills!' },
    { id: 14, category: 'skills', question: 'What is the best way to learn new skills?', options: ['Only reading books', 'Hands-on practice + theory', 'Just watching videos', 'Sleeping on it'], correct: 1, explanation: 'Combining hands-on practice with theoretical knowledge is most effective!', points: 15, difficulty: 'medium', hint: 'How do people learn best?', funFact: 'Practice-based learning is 75% more effective than theory alone!' }
  ];

  const dailyQuestion = useMemo(() => {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % questions.length;
    return questions[index];
  }, [questions]);

  useEffect(() => {
    const newLevel = Math.floor(totalPoints / 100) + 1;
    setLevel(newLevel);
  }, [totalPoints]);

  useEffect(() => {
    setDailyCompleted(localStorage.getItem(dailyStorageKey) === '1');
  }, [dailyStorageKey]);

  const spinWheel = () => {
    setIsSpinning(true);
    
    const spins = 5 + Math.random() * 5;
    const finalRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(finalRotation);
    
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360;
      const segmentAngle = 360 / categories.length;
      const selectedIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % categories.length;
      const selected = categories[selectedIndex];
      
      setSelectedCategory(selected.id);
      setIsSpinning(false);
      loadQuestion(selected.id);
    }, 3000);
  };

  const loadQuestion = (categoryId?: string) => {
    if (mode === 'daily') {
      setCurrentQuestion(dailyQuestion);
      setGameState('question');
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    if (mode === 'streak') {
      const pool = questions;
      const randomQuestion = pool[Math.floor(Math.random() * pool.length)];
      setCurrentQuestion(randomQuestion);
      setGameState('question');
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    const effectiveCategoryId = categoryId || selectedCategory;
    const categoryQuestions = questions.filter((q) => q.category === effectiveCategoryId);
    const unansweredQuestions = categoryQuestions.filter((q) => !answeredQuestions.has(q.id));

    if (unansweredQuestions.length === 0) {
      setGameState('result');
      return;
    }

    const randomQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setGameState('question');
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === currentQuestion!.correct;
    
    if (isCorrect) {
      const points = currentQuestion!.points;
      setScore(score + 1);
      setTotalPoints(totalPoints + points);
      setStreak((prev) => {
        const next = prev + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });
      if (mode === 'spin') {
        setAnsweredQuestions(new Set([...answeredQuestions, currentQuestion!.id]));
      }
      if (mode === 'daily') {
        localStorage.setItem(dailyStorageKey, '1');
        setDailyCompleted(true);
      }
    } else {
      if (mode === 'streak') {
        setGameState('result');
      }
      setStreak(0);
      if (mode === 'daily') {
        localStorage.setItem(dailyStorageKey, '1');
        setDailyCompleted(true);
      }
    }
  };

  const continueGame = () => {
    if (!currentQuestion) return;

    if (mode === 'daily') {
      setMode('hub');
      setGameState('menu');
      setCurrentQuestion(null);
      setSelectedAnswer(null);
      setShowResult(false);
      return;
    }

    if (mode === 'streak') {
      if (selectedAnswer === currentQuestion.correct) {
        loadQuestion();
      } else {
        setMode('hub');
        setGameState('menu');
        setCurrentQuestion(null);
        setSelectedAnswer(null);
        setShowResult(false);
      }
      return;
    }

    if (selectedAnswer === currentQuestion.correct) {
      loadQuestion(selectedCategory);
    } else {
      setGameState('menu');
    }
  };

  const resetGame = () => {
    setMode('hub');
    setGameState('menu');
    setScore(0);
    setStreak(0);
    setSelectedCategory('');
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions(new Set());
  };

  const startSpinMode = () => {
    setMode('spin');
    setGameState('menu');
    setSelectedCategory('');
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const startDailyMode = () => {
    setMode('daily');
    setGameState('menu');
    setSelectedCategory('');
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    loadQuestion();
  };

  const startStreakMode = () => {
    setMode('streak');
    setGameState('menu');
    setSelectedCategory('');
    setScore(0);
    setStreak(0);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    loadQuestion();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl sm:text-3xl">🎮</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold leading-tight">RCM Learning Academy</h1>
                <p className="text-sm sm:text-base text-purple-100">Spin, Learn, and Win!</p>
              </div>
            </div>
            <div className="w-full sm:w-auto">
              <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-4 sm:justify-end">
                <div className="text-center bg-purple-700/30 rounded-lg p-2 sm:bg-transparent sm:p-0">
                  <div className="text-lg sm:text-2xl font-bold">{totalPoints}</div>
                  <div className="text-[10px] sm:text-xs text-purple-100">Points</div>
                </div>
                <div className="text-center bg-purple-700/30 rounded-lg p-2 sm:bg-transparent sm:p-0">
                  <div className="text-lg sm:text-2xl font-bold">Lvl {level}</div>
                  <div className="text-[10px] sm:text-xs text-purple-100">Level</div>
                </div>
                <div className="text-center bg-purple-700/30 rounded-lg p-2 sm:bg-transparent sm:p-0">
                  <div className="text-lg sm:text-2xl font-bold">{streak}🔥</div>
                  <div className="text-[10px] sm:text-xs text-purple-100">Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {mode === 'hub' && (
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10 pt-4">
              <h2 className="text-4xl md:text-5xl font-bold text-textDarkColor mb-3">Game Hub</h2>
              <p className="text-lg md:text-xl text-textGrayColor">Choose a game mode and start learning.</p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              <button
                onClick={startSpinMode}
                className="group rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 text-left shadow-md sm:shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:hover:shadow-2xl active:scale-95 h-full"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-3xl">🎡</div>
                  <div className="text-xs font-bold text-purple-600">POPULAR</div>
                </div>
                <div className="text-xl font-extrabold text-textDarkColor">Spin & Learn</div>
                <div className="mt-2 text-sm text-textGrayColor">Spin the wheel, get a category, answer questions.</div>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-purple-600">
                  Start <IoArrowForwardOutline />
                </div>
              </button>

              <button
                onClick={startDailyMode}
                disabled={dailyCompleted}
                className={`group rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 text-left shadow-md sm:shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:hover:shadow-2xl active:scale-95 h-full ${
                  dailyCompleted ? 'opacity-60 cursor-not-allowed hover:translate-y-0' : ''
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-3xl">📅</div>
                  <div className="text-xs font-bold text-pink-600">DAILY</div>
                </div>
                <div className="text-xl font-extrabold text-textDarkColor">Daily Challenge</div>
                <div className="mt-2 text-sm text-textGrayColor">
                  One question per day. Come back tomorrow for a new one.
                </div>
                <div className="mt-4 text-sm font-bold text-pink-600">
                  {dailyCompleted ? 'Completed today' : 'Play now'}
                </div>
              </button>

              <button
                onClick={startStreakMode}
                className="group rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 text-left shadow-md sm:shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:hover:shadow-2xl active:scale-95 h-full"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-3xl">🔥</div>
                  <div className="text-xs font-bold text-orange-600">FAST</div>
                </div>
                <div className="text-xl font-extrabold text-textDarkColor">Streak Rush</div>
                <div className="mt-2 text-sm text-textGrayColor">Answer continuously until you miss. Beat your best streak!</div>
                <div className="mt-4 text-sm font-bold text-orange-600">Best streak: {bestStreak}</div>
              </button>
            </div>
          </div>
        )}

        {mode === 'spin' && gameState === 'menu' && (
          <div className="min-h-screen flex flex-col">
            <div className="text-center mb-8 pt-8">
              <h2 className="text-4xl md:text-5xl font-bold text-textDarkColor mb-4">Ready to Test Your Knowledge?</h2>
              <p className="text-xl md:text-2xl text-textGrayColor">Spin the wheel and answer questions to earn points!</p>
              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => {
                    setMode('hub');
                    setGameState('menu');
                  }}
                  className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-purple-700 shadow-md ring-1 ring-black/5 hover:bg-purple-50"
                >
                  Back to Game Hub
                </button>
              </div>
            </div>
            
            {/* Cool Spin Wheel */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* Glow effect background */}
                <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse blur-xl"></div>
                
                {/* Main wheel container */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                  {/* Cool wheel */}
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-gray-900 shadow-2xl overflow-hidden bg-white"
                    style={{ 
                      transform: `rotate(${rotation}deg)`, 
                      transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(147,51,234,0.2), inset 0 0 20px rgba(147,51,234,0.1)'
                    }}
                  >
                    {categories.map((category, index) => {
                      const angle = (360 / categories.length) * index;
                      const nextAngle = (360 / categories.length) * (index + 1);
                      return (
                        <div
                          key={category.id}
                          className={`absolute w-full h-full bg-gradient-to-br ${category.color} transition-all duration-300 hover:brightness-110`}
                          style={{
                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`,
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                          }}
                        >
                        </div>
                      );
                    })}
                    
                    {/* Cool center circle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full shadow-inner border-3 border-gray-600 flex items-center justify-center">
                      <div className="text-2xl md:text-3xl">🎮</div>
                    </div>
                  </div>
                  
                  {/* Cool pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 z-20">
                    <div className="relative">
                      <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-red-600 drop-shadow-lg"></div>
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
                    </div>
                  </div>
                  
                  {/* Cool center button */}
                  <button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full font-bold transition-all duration-300 z-10 ${
                      isSpinning 
                        ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white scale-90 shadow-inner' 
                        : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25 active:scale-95'
                    } shadow-lg border-2 border-white/50 backdrop-blur-sm`}
                  >
                    <span className={`text-xs md:text-sm font-black tracking-wider ${isSpinning ? 'animate-pulse' : ''}`}>
                      {isSpinning ? '...' : 'SPIN'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Categories Grid - Below wheel */}
            <div className="pb-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
                {categories.map((category) => (
                  <div key={category.id} className={`rounded-xl p-3 md:p-4 bg-gradient-to-br ${category.color} text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                    <div className="text-2xl md:text-3xl mb-1 md:mb-2">{category.icon}</div>
                    <h3 className="text-xs md:text-sm font-bold">{category.name}</h3>
                    <p className="text-xs opacity-80 hidden md:block">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        
        {gameState === 'question' && currentQuestion && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                    {currentQuestion.difficulty.toUpperCase()}
                  </div>
                  <div className="text-sm text-textGrayColor">
                    {categories.find(c => c.id === currentQuestion.category)?.icon} {categories.find(c => c.id === currentQuestion.category)?.name}
                  </div>
                </div>
                <div className="text-lg font-bold text-primaryColor">
                  {currentQuestion.points} points
                </div>
              </div>

              {/* Question */}
              <h2 className="text-2xl font-bold text-textDarkColor mb-6">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                      showResult
                        ? index === currentQuestion.correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : index === selectedAnswer
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600'
                        : selectedAnswer === index
                        ? 'border-primaryColor bg-purple-50 text-primaryColor'
                        : 'border-gray-200 hover:border-primaryColor hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && index === currentQuestion.correct && (
                        <IoCheckmarkCircleOutline size={20} className="text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Result */}
              {showResult && (
                <div className={`rounded-xl p-4 mb-6 ${
                  selectedAnswer === currentQuestion.correct
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-red-50 border-2 border-red-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {selectedAnswer === currentQuestion.correct ? '✅' : '❌'}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-2 ${
                        selectedAnswer === currentQuestion.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect!'}
                      </h3>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                      {selectedAnswer === currentQuestion.correct && (
                        <div className="mt-2 text-green-700 font-bold">
                          +{currentQuestion.points} points earned!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              {showResult && (
                <div className="flex justify-center">
                  <button
                    onClick={continueGame}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    {selectedAnswer === currentQuestion.correct ? (
                      <>
                        Next Question <IoArrowForwardOutline />
                      </>
                    ) : (
                      <>
                        <IoRefreshOutline /> Try Again
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'result' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {mode === 'streak' ? (
                <>
                  <div className="text-6xl mb-4">🔥</div>
                  <h2 className="text-3xl font-bold text-textDarkColor mb-4">Streak Over!</h2>
                  <p className="text-lg text-textGrayColor mb-6">
                    Nice run. Try again and beat your best streak.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-orange-600">{bestStreak}</div>
                      <div className="text-sm text-gray-600">Best Streak</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-purple-600">{score}</div>
                      <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={startStreakMode}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-white rounded-xl font-bold text-textDarkColor ring-1 ring-black/10 hover:bg-gray-50"
                    >
                      Back to Hub
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-3xl font-bold text-textDarkColor mb-4">Category Complete!</h2>
                  <p className="text-lg text-textGrayColor mb-6">
                    You've completed all questions in this category!
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-purple-600">{score}</div>
                      <div className="text-sm text-gray-600">Correct Answers</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => {
                        setGameState('menu');
                        setCurrentQuestion(null);
                        setSelectedAnswer(null);
                        setShowResult(false);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      Spin Again
                    </button>
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-white rounded-xl font-bold text-textDarkColor ring-1 ring-black/10 hover:bg-gray-50"
                    >
                      Back to Hub
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
