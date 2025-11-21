import { useState, useMemo } from 'react';
import { DEFAULT_ROLE, DEFAULT_SKILLS } from '../constants/roles';
import { API_BASE } from '../constants/api';
import { useCareerAnalysis } from '../hooks/useCareerAnalysis';
import { useAuth } from '../hooks/useAuth';
import { calculateMatchPercentage } from '../utils/formatters';
import SkillGapCard from './SkillGapCard';
import RoadmapCard from './RoadmapCard';
import NewsCard from './NewsCard';
import CareerInputForm from './CareerInputForm';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [targetRole, setTargetRole] = useState(DEFAULT_ROLE);
  const [skillsInput, setSkillsInput] = useState(DEFAULT_SKILLS);
  const { isLoading, error, skillGap, roadmap, news, analyze: analyzeCareer } = useCareerAnalysis();

  const matchedRatio = useMemo(() => calculateMatchPercentage(skillGap), [skillGap]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    await analyzeCareer(targetRole, skillsInput);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-50">
              Career Readiness Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              Analyze your skill gaps, get a focused learning roadmap, and stay updated with the latest tech news.
            </p>
          </div>
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <div className="hidden text-xs text-slate-500 md:block">
              Backend: <span className="font-mono">{API_BASE}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs">
              <div className="h-7 w-7 flex items-center justify-center rounded-full bg-sky-500 text-slate-950 font-semibold text-xs">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-slate-100 truncate max-w-[120px]">
                  {user?.name || 'User'}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                  {user?.email}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="ml-2 rounded-full border border-slate-600 bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-200 hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex flex-col gap-6">
          <CareerInputForm
            targetRole={targetRole}
            setTargetRole={setTargetRole}
            skillsInput={skillsInput}
            setSkillsInput={setSkillsInput}
            isLoading={isLoading}
            error={error}
            onAnalyze={handleAnalyze}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <SkillGapCard skillGap={skillGap} targetRole={targetRole} matchedRatio={matchedRatio} />
            <RoadmapCard roadmap={roadmap} />
          </div>

          <NewsCard news={news} />
        </main>
      </div>
    </div>
  );
}

