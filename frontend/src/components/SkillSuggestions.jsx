import { getSuggestedSkills, ADDITIONAL_SKILLS } from '../utils/skillHelpers';
import { parseSkills, formatSkills } from '../utils/skillHelpers';

export default function SkillSuggestions({ targetRole, currentSkills, onAddSkill }) {
  const coreSkills = getSuggestedSkills(targetRole);
  const additionalSkills = ADDITIONAL_SKILLS[targetRole] || [];
  const parsedCurrent = parseSkills(currentSkills);

  const handleQuickAdd = (skill) => {
    if (!parsedCurrent.includes(skill)) {
      const newSkills = [...parsedCurrent, skill];
      onAddSkill(formatSkills(newSkills));
    }
  };

  const handleAddAllCore = () => {
    const newSkills = [...parsedCurrent, ...coreSkills.filter(s => !parsedCurrent.includes(s))];
    onAddSkill(formatSkills(newSkills));
  };

  if (!targetRole) return null;

  const missingCoreSkills = coreSkills.filter(s => !parsedCurrent.includes(s));
  const availableAdditional = additionalSkills.filter(s => !parsedCurrent.includes(s)).slice(0, 6);

  return (
    <div className="mt-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-300">Quick Add Skills</h3>
        {missingCoreSkills.length > 0 && (
          <button
            type="button"
            onClick={handleAddAllCore}
            className="text-[10px] text-sky-400 hover:text-sky-300 font-medium"
          >
            Add All Core ({missingCoreSkills.length})
          </button>
        )}
      </div>

      {missingCoreSkills.length > 0 && (
        <div className="mb-2">
          <p className="text-[10px] text-slate-500 mb-1.5">Core Skills:</p>
          <div className="flex flex-wrap gap-1.5">
            {missingCoreSkills.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => handleQuickAdd(skill)}
                className="px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] hover:bg-emerald-500/30 transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableAdditional.length > 0 && (
        <div>
          <p className="text-[10px] text-slate-500 mb-1.5">Additional Skills:</p>
          <div className="flex flex-wrap gap-1.5">
            {availableAdditional.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => handleQuickAdd(skill)}
                className="px-2 py-1 rounded-lg bg-slate-700/50 border border-slate-600 text-slate-300 text-[11px] hover:bg-slate-700 transition-colors"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {missingCoreSkills.length === 0 && availableAdditional.length === 0 && (
        <p className="text-[10px] text-slate-500 text-center py-1">
          All suggested skills have been added!
        </p>
      )}
    </div>
  );
}

