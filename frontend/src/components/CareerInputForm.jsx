import { useState } from 'react';
import SkillInput from './SkillInput';
import SkillSuggestions from './SkillSuggestions';

export default function CareerInputForm({ targetRole, setTargetRole, skillsInput, setSkillsInput, isLoading, error, onAnalyze }) {
  const [showSuggestions, setShowSuggestions] = useState(true);

  return (
    <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950 p-5 shadow-lg shadow-slate-950/60">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-slate-100">Career goal & skills</h2>
        <button
          type="button"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-xs text-slate-400 hover:text-slate-300"
        >
          {showSuggestions ? 'Hide' : 'Show'} suggestions
        </button>
      </div>

      <form onSubmit={onAnalyze} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">Target role</label>
            <select
              value={targetRole}
              onChange={(e) => {
                setTargetRole(e.target.value);
                setShowSuggestions(true);
              }}
              className="rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              <optgroup label="Frontend">
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="UI/UX Developer">UI/UX Developer</option>
              </optgroup>
              <optgroup label="Backend">
                <option value="Backend Developer">Backend Developer (Java)</option>
                <option value="Python Developer">Python Developer</option>
                <option value="Node.js Developer">Node.js Developer</option>
              </optgroup>
              <optgroup label="Full Stack">
                <option value="MERN Stack Developer">MERN Stack Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
              </optgroup>
              <optgroup label="Data">
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Scientist">Data Scientist</option>
              </optgroup>
              <optgroup label="DevOps">
                <option value="DevOps Engineer">DevOps Engineer</option>
              </optgroup>
              <optgroup label="Mobile">
                <option value="React Native Developer">React Native Developer</option>
              </optgroup>
            </select>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Select your target career role to get personalized recommendations
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Your current skills
            </label>
            <SkillInput
              value={skillsInput}
              onChange={setSkillsInput}
              targetRole={targetRole}
              placeholder="Type or paste skills (comma-separated)..."
            />
          </div>
        </div>

        {showSuggestions && targetRole && (
          <SkillSuggestions
            targetRole={targetRole}
            currentSkills={skillsInput}
            onAddSkill={setSkillsInput}
          />
        )}

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-500">
            💡 Tip: You can paste a list of skills or type and select from suggestions
          </p>
          <button
            type="submit"
            disabled={isLoading || !targetRole || !skillsInput.trim()}
            className="h-11 rounded-xl bg-sky-500 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analyzing…</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Analyze My Career Path
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <p className="mt-3 text-xs text-rose-400 bg-rose-950/40 border border-rose-900 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </section>
  );
}

