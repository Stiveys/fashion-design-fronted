import React, { useState, useEffect } from 'react';
import { isValidVerificationCode } from '../services/authService';

interface VerificationCodeInputProps {
  onSubmit: (code: string) => void;
  onResend: () => void;
  error?: string | null;
}

const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  onSubmit,
  onResend,
  error
}) => {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      intervalId = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [countdown, canResend]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidVerificationCode(code)) {
      onSubmit(code);
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      setCountdown(30);
      setCanResend(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Verify Your Email</h3>
      <p className="text-sm text-gray-600">
        We've sent a verification code to your email address. Please enter it below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value.slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-burgundy-500 focus:ring-burgundy-500"
            maxLength={6}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={!isValidVerificationCode(code)}
          className="w-full bg-burgundy-600 text-white py-2 px-4 rounded-md hover:bg-burgundy-700 transition-colors focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={!canResend}
          className="text-sm text-burgundy-600 hover:text-burgundy-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {canResend
            ? 'Resend Code'
            : `Resend code in ${countdown}s`
          }
        </button>
      </div>
    </div>
  );
};

export default VerificationCodeInput;

