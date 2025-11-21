export default function SkillGapCard({ skillGap, targetRole, matchedRatio }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/60 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-100">Skill gap overview</h2>
        <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-400">
          {targetRole}
        </span>
      </div>

      <div className="mt-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
          <span>Match with core skills</span>
          <span className="font-semibold">{matchedRatio}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500 transition-all duration-500 flex items-center justify-end pr-1"
            style={{ width: `${matchedRatio}%` }}
          >
            {matchedRatio > 10 && (
              <span className="text-[8px] text-slate-900 font-bold">{matchedRatio}%</span>
            )}
          </div>
        </div>
        {skillGap?.matchPercentage !== undefined && (
          <p className="text-[10px] text-slate-500 mt-1">
            {skillGap.matchedSkills?.length || 0} of {skillGap.totalRequired || 0} core skills matched
          </p>
        )}
      </div>

      <div className="space-y-3 mt-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-semibold text-emerald-300/90 tracking-wide uppercase">
              Matched skills
            </h3>
            {skillGap?.matchedSkills?.length > 0 && (
              <span className="text-[10px] text-emerald-400">
                {skillGap.matchedSkills.length} of {skillGap.totalRequired}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGap?.matchedSkills?.length ? (
              skillGap.matchedSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-200 font-medium"
                >
                  <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {s}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-[11px] italic">Run an analysis to see matches.</span>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[11px] font-semibold text-amber-300/90 tracking-wide uppercase">
              Missing skills
            </h3>
            {skillGap?.missingSkills?.length > 0 && (
              <span className="text-[10px] text-amber-400">
                {skillGap.missingSkills.length} to learn
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillGap?.missingSkills?.length ? (
              skillGap.missingSkills.map((s, idx) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-100 font-medium"
                >
                  <span className="text-amber-400 font-bold text-[10px]">#{idx + 1}</span>
                  {s}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-[11px] italic">Missing skills will appear here.</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 rounded-xl bg-slate-900/80 border border-slate-800 px-3 py-2 text-[11px] text-slate-300">
        <h3 className="mb-1 font-semibold text-slate-100 text-xs">Recommendation</h3>
        <p>{skillGap?.recommendations || 'Submit your profile to receive tailored learning recommendations.'}</p>
      </div>

      {skillGap?.learningOrder?.length > 0 && (
        <div className="mt-1">
          <h3 className="mb-1 text-[11px] font-semibold text-sky-300/90 tracking-wide uppercase">
            Suggested learning order
          </h3>
          <ol className="space-y-1 text-[11px] text-slate-200 list-decimal list-inside">
            {skillGap.learningOrder.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

