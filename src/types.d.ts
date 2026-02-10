/** the format of the object returned by Validate.field() method */
type ValidationResult = {
  value: string;
  isValid: boolean;
  errorMessage: string;
};

/** validated user data ready for submission to backend */
type ValidUser = {
  name: string;
  email: string;
  mobile: string;
  creationTime: string;
};

/** API response from backend subscription endpoint */
type SubscriptionResponse = {
  message: string;
};

/** API error response structure */
type ErrorInfo = {
  type: string;
  message: string;
};
