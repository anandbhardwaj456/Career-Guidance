import { useState, useEffect, useRef } from 'react';
import { authAPI } from '../services/api';
import { validateEmail } from '../utils/emailValidator';

/**
 * Custom hook for email validation and availability checking
 * @param {string} email - Email to check
 * @param {boolean} enabled - Whether to check availability
 * @returns {Object} Email validation state
 */
export const useEmailCheck = (email, enabled = true) => {
  const [emailState, setEmailState] = useState({
    isValid: false,
    isAvailable: null,
    isChecking: false,
    error: null,
    suggestions: [],
  });

  const debounceTimer = useRef(null);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Reset state if email is empty
    if (!email || !email.trim()) {
      setEmailState({
        isValid: false,
        isAvailable: null,
        isChecking: false,
        error: null,
        suggestions: [],
      });
      return;
    }

    // Validate email format
    const validation = validateEmail(email);
    
    if (!validation.valid) {
      setEmailState({
        isValid: false,
        isAvailable: null,
        isChecking: false,
        error: validation.error,
        suggestions: validation.suggestions || [],
      });
      return;
    }

    // Email format is valid
    setEmailState(prev => ({
      ...prev,
      isValid: true,
      error: null,
      suggestions: validation.suggestions || [],
    }));

    // Check availability only if enabled and email is valid
    if (enabled && validation.valid) {
      setEmailState(prev => ({ ...prev, isChecking: true }));

      // Debounce the API call
      debounceTimer.current = setTimeout(async () => {
        try {
          const response = await authAPI.checkEmailAvailability(email);
          
          if (response.success) {
            setEmailState(prev => ({
              ...prev,
              isAvailable: response.data.available,
              isChecking: false,
              error: response.data.available ? null : response.data.message,
            }));
          }
        } catch (error) {
          // Don't show error for network issues during typing
          setEmailState(prev => ({
            ...prev,
            isChecking: false,
            // Only set error if it's a clear availability issue
            error: error.response?.data?.error || null,
          }));
        }
      }, 500); // 500ms debounce
    }

    // Cleanup
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [email, enabled]);

  return emailState;
};

