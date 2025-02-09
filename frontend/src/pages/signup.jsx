// ui imports
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";

// import for submit form
import services from "../internals/auth";

// import for routing
//
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../routes";

// checking for email is valid or not
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Check if the username is alphanumeric
function isValidUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  return usernameRegex.test(username);
}
// check if the name is aplhabetic
function isValidName(name) {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
}
// Check if the password meets complexity requirements
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&#])(?=.{9,})/;
  return passwordRegex.test(password);
}

// main function
function SignUpApp() {
  // create naviagtor and define ChangeToLogin
  //
  const navigate = useNavigate();

  function changeToLogin() {
    console.log("redirecting to login...");
    navigate(loginRoute);
  }

  // initizing States veriable
  const [creds, setCreds] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    username: "",
    name: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // here we handle confim password change
  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (value != creds.password) {
      setConfirmPasswordError("Password it's not matching");
    } else {
      setConfirmPasswordError("");
    }
  };

  // here we handle change in main fields
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "email") {
      setError((prev) => ({
        ...prev,
        email: !isValidEmail(value) ? "Email is not Valid" : "",
      }));
    }
    if (name === "username") {
      setError((prev) => ({
        ...prev,
        username: !isValidUsername(value)
          ? "Username should be alphanumeric"
          : "",
      }));
    }
    if (name === "name") {
      setError((prev) => ({
        ...prev,
        name: !isValidName(value) ? "Name should be alphabetic" : "",
      }));
    }
    if (name === "password") {
      setError((prev) => ({
        ...prev,
        password: !isValidPassword(value)
          ? "Password should be 9 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
          : "",
      }));
    }
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "password") {
      if (confirmPassword === value) {
        setConfirmPasswordError("");
      } else {
        setConfirmPasswordError("Password it's not matching");
      }
    }
  };

  // here we define errors
  const getError = () => {
    let newErrors = {};
    if (!creds.email) {
      newErrors.email = "Please enter the email first";
    }
    if (!creds.username) {
      newErrors.username = "Please enter the username first";
    }
    if (!creds.name) {
      newErrors.name = "Please enter the name first";
    }
    if (!creds.password) {
      newErrors.password = "Please enter the password first";
    }
    return newErrors;
  };

  // here we handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !creds.email ||
      !creds.password ||
      !creds.username ||
      !creds.name ||
      creds.password != confirmPassword ||
      loading
    ) {
      setError(getError());
    } else {
      // here are the response instruction is processed
      const credential = {
        email: creds.email,
        username: creds.username,
        name: creds.name,
        password: creds.password,
      };
      setLoading(true);
      services.register(credential).then((response) => {
        if (response === true) {
          navigate("/dashboard");
        } else {
          setMessage(response.message);
          setLoading(false);
        }
      });
    }
  };

  // this is main ui
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mt: 8, p: 3, boxShadow: 2, borderRadius: 2 }}
    >
      <Typography variant="h5" textAlign="left" fontFamily="'Handlee' , serif">
        Welcome!! To Notes
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter your email:
        </Typography>
        <TextField
          name="email"
          type="email"
          value={creds.email}
          onChange={handleChange}
          fullWidth
          error={!!error.email}
          helperText={error.email}
          required
        />
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter username for account:
        </Typography>
        <TextField
          name="username"
          value={creds.username}
          onChange={handleChange}
          fullWidth
          error={!!error.username}
          helperText={error.username}
          required
        />
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter your name:
        </Typography>
        <TextField
          name="name"
          value={creds.name}
          onChange={handleChange}
          fullWidth
          error={!!error.name}
          helperText={error.name}
          required
        />
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter password for account:
        </Typography>
        <TextField
          name="password"
          value={creds.password}
          onChange={handleChange}
          fullWidth
          error={!!error.password}
          helperText={error.password}
          required
          type="password"
        />
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter password again:
        </Typography>
        <TextField
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          required
          type="password"
        />
        {message ? (
          <Typography
            variant="h5"
            textAlign="left"
            fontFamily="'Patrick Hand SC' , serif"
          >
            {message}
          </Typography>
        ) : (
          " "
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
        <Typography textAlign="center">Already have a account?</Typography>
        <Button
          onClick={changeToLogin}
          sx={{
            border: "solid",
          }}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default SignUpApp;
