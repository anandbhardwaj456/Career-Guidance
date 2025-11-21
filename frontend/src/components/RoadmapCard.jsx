export default function RoadmapCard({ roadmap }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg shadow-slate-950/60 flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-slate-100">3-phase learning roadmap</h2>
        {roadmap?.summary && (
          <span className="text-[10px] text-slate-500">
            {roadmap.summary.duration}
          </span>
        )}
      </div>
      {roadmap?.phases?.length ? (
        <div className="grid gap-3">
          {roadmap.phases.map((phase, idx) => (
            <div
              key={phase.phase}
              className="rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950 px-3 py-3 text-xs flex flex-col gap-1"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center h-5 w-5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/40">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-slate-50 text-[13px]">{phase.phase}</p>
                </div>
                {phase.estimatedTime && (
                  <span className="text-[9px] text-slate-500">{phase.estimatedTime}</span>
                )}
              </div>
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] text-sky-200 border border-sky-500/40 w-fit mb-1">
                {phase.focus}
              </span>
              <ul className="mt-1 grid grid-cols-1 gap-1.5 text-[11px] text-slate-300">
                {phase.topics.map((t) => (
                  <li key={t} className="flex items-start gap-1.5">
                    <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-sky-400 flex-shrink-0" />
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
              {phase.resources && phase.resources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <p className="text-[10px] text-slate-500 mb-1">Resources:</p>
                  <div className="flex flex-wrap gap-1">
                    {phase.resources.map((resource) => (
                      <span key={resource} className="text-[9px] text-slate-400 bg-slate-800/50 px-1.5 py-0.5 rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {roadmap.totalEstimatedTime && (
            <div className="mt-2 pt-2 border-t border-slate-800 text-center">
              <p className="text-[10px] text-slate-400">
                Total estimated time: <span className="text-sky-300 font-semibold">{roadmap.totalEstimatedTime}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-xs text-slate-500">
          Run an analysis to generate a personalized roadmap for your chosen role.
        </p>
      )}
    </div>
  );
}

