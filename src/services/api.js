/**
 * API Service for Spring Boot Backend integration
 * 
 * Endpoints:
 * - POST /auth/register   -> RegisterRequest { username, password, email } => String message
 * - POST /auth/login      -> LoginRequest { username, password } => LoginResponse { token }
 * - GET  /api/users/me    -> Headers: Authorization: Bearer <token> => UserProfileResponse { userId, username, email }
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');

/**
 * Helper to handle HTTP errors and extract meaningful messages from backend ApiErrorResponse
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  let responseData;

  if (contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {
    let errorMessage = 'An unexpected error occurred';

    if (responseData && typeof responseData === 'object' && responseData.message) {
      errorMessage = responseData.message;
    } else if (typeof responseData === 'string' && responseData.trim()) {
      errorMessage = responseData;
    } else if (response.status === 401) {
      errorMessage = 'Invalid username or password';
    } else if (response.status === 413) {
      errorMessage = 'Video file is too large. Please upload a smaller video (maximum 100MB).';
    } else if (response.status === 409) {
      errorMessage = 'User with this username or email already exists';
    } else if (response.status === 400) {
      errorMessage = 'Validation error. Please verify your input details.';
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = responseData;
    throw error;
  }

  return responseData;
}

/**
 * Helper wrapper around fetch with friendly network/connection error messages
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = { ...options.headers };
  // Only default to application/json if the body is not FormData
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    return await handleResponse(response);
  } catch (err) {
    // Check if network failed entirely (server down, CORS blocked, etc.)
    if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
      const networkError = new Error(
        'Unable to reach the server. Please check your network connection and try again.'
      );
      networkError.isNetworkError = true;
      throw networkError;
    }
    throw err;
  }
}

export const api = {
  /**
   * Register a new user
   * @param {{ username: string, email: string, password: string }} data
   * @returns {Promise<string>} response message
   */
  async register({ username, email, password }) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username.trim(),
        email: email.trim(),
        password: password,
      }),
    });
  },

  /**
   * Log in user and obtain JWT token
   * @param {{ username: string, password: string }} data
   * @returns {Promise<{ token: string }>}
   */
  async login({ username, password }) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username.trim(),
        password: password,
      }),
    });
  },

  /**
   * Fetch current authenticated user profile
   * @param {string} token - JWT token
   * @returns {Promise<{ userId: number, username: string, email: string }>}
   */
  async getCurrentUser(token) {
    return request('/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  /**
   * Upload video file and obtain violence detection prediction
   * @param {File|Blob} file - Video file
   * @param {string} token - JWT authentication token
   * @returns {Promise<{ label: string, is_violent: boolean, confidence: number, violence_probability: number }>}
   */
  async predictViolence(file, token) {
    const formData = new FormData();
    formData.append('file', file);

    return request('/predict', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  },

  getBaseUrl() {
    return API_BASE_URL;
  }
};
