import { useState, useRef, useEffect, useMemo } from 'react';
import { parseSkills, formatSkills, getAllSuggestedSkills } from '../utils/skillHelpers';

export default function SkillInput({ value, onChange, targetRole, placeholder = "Enter skills..." }) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const skills = useMemo(() => parseSkills(value), [value]);
  const suggestions = useMemo(() => {
    if (!inputValue.trim() || !targetRole) return [];
    const allSuggestions = getAllSuggestedSkills(targetRole);
    const lowerInput = inputValue.toLowerCase().trim();
    return allSuggestions
      .filter(skill => 
        skill.toLowerCase().includes(lowerInput) && 
        !skills.includes(skill)
      )
      .slice(0, 8);
  }, [inputValue, targetRole, skills]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(newValue.trim().length > 0);
    setSelectedIndex(-1);
  };

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      onChange(formatSkills(newSkills));
      setInputValue('');
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter(s => s !== skillToRemove);
    onChange(formatSkills(newSkills));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      removeSkill(skills[skills.length - 1]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      addSkill(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedSkills = parseSkills(pastedText);
    const newSkills = [...skills, ...pastedSkills.filter(s => !skills.includes(s))];
    onChange(formatSkills(newSkills));
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 p-2 min-h-[44px] rounded-xl border border-slate-700 bg-slate-900/80 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
        {skills.map((skill, idx) => (
          <span
            key={`${skill}-${idx}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-200 text-xs font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:bg-sky-500/30 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${skill}`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={() => setShowSuggestions(inputValue.trim().length > 0)}
          placeholder={skills.length === 0 ? placeholder : "Add more skills..."}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-slate-50 placeholder:text-slate-500"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto rounded-xl border border-slate-700 bg-slate-900 shadow-xl"
        >
          {suggestions.map((suggestion, idx) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addSkill(suggestion)}
              className={`w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 transition-colors ${
                idx === selectedIndex ? 'bg-slate-800' : ''
              } ${idx === 0 ? 'rounded-t-xl' : ''} ${idx === suggestions.length - 1 ? 'rounded-b-xl' : ''}`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <p className="mt-1 text-[10px] text-slate-500">
          {skills.length} skill{skills.length !== 1 ? 's' : ''} added • Press Enter to add, Backspace to remove
        </p>
      )}
    </div>
  );
}

