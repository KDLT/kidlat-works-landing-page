// represents a single form field's state
type FieldState = {
  value: string;
  isValid: boolean;
};

// complete application state
type AppState = {
  name: FieldState;
  email: FieldState;
  mobile: FieldState;
  previousStep: string;
  currentStep: string;
  errorMessage: string;
  datetime: string;
};

// validated user data ready for submission to backend
type ValidUser = {
  name: string;
  email: string;
  mobile: string;
  creationTime: string;
};

// API response from backend subscription endpoint
type SubscriptionResponse = {
  message: string;
};

// API error response structure
type ApiError = {
  error: string;
  message?: string;
};
