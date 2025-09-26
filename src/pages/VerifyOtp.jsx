import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  // Array of refs for the input fields
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input when component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // If a digit was entered and there is a next input, focus it
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // On backspace, clear current field and focus previous field
    if (e.key === 'Backspace') {
      if (index > 0 && !otp[index]) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      
      // Focus the last input
      inputRefs.current[5].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits of the verification code');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      if (otpValue === '123456') { // Demo valid OTP
        navigate('/dashboard');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }, 1000);
  };

  const handleResend = () => {
    // Simulate resending OTP
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Reset OTP fields
      setOtp(['', '', '', '', '', '']);
      // Focus the first input
      inputRefs.current[0].focus();
      // Show success message (could be implemented with a toast or another state)
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the 6-digit code sent to {email || "your email"}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} onPaste={handlePaste}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Verification code
            </label>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                  required
                />
              ))}
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Confirm'}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive a code?{' '}
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="font-medium text-black hover:text-gray-800 focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}