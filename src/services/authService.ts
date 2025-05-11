// Utility function to generate a random 6-digit verification code
export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send verification email
export const sendVerificationEmail = async (email: string, code: string): Promise<void> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    console.log('Attempting to send verification email to:', email);

    const response = await fetch('http://localhost:3001/api/auth/send-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Server failed to send verification email');
    }

    console.log('Verification email sent successfully');
  } catch (error) {
    if (error instanceof TypeError || (error as Error).name === 'AbortError') {
      throw new Error('Unable to connect to verification service. Please check if the server is running and try again.');
    }
    throw error instanceof Error ? error : new Error('Failed to send verification email');
  } finally {
    clearTimeout(timeoutId);
  }
};

// Function to validate verification code format
export const isValidVerificationCode = (code: string): boolean => {
  return /^\d{6}$/.test(code);
};