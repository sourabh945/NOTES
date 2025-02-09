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

// submittion of forms and its imports
//
import services from "../internals/auth";

// routing imports
//
import { useNavigate } from "react-router-dom";
import { signupRoute } from "../routes";

// main function
function LoginApp() {
  // routing logic
  //
  const navigate = useNavigate();

  function changeToSignUp() {
    console.log("rerouted to signup");
    navigate(signupRoute);
  }
  //
  // end routing logic

  // credeintal state and error states
  const [creds, setCreds] = useState({ cred: "", password: "" });
  const [error, setError] = useState({ cred: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // this function get the error
  let getError = () => {
    let newErrors = {};
    if (!creds.cred) {
      newErrors.cred = "Please enter the username or email first";
    }
    if (!creds.password) {
      newErrors.password = "Please enter the password first";
    }
    return newErrors;
  };

  // this function handle the submit and also check the error
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!creds.cred || !creds.password || loading) {
      setError(getError());
    } else {
      // here are the response instruction is processed
      const credential = { identifier: creds.cred, password: creds.password };
      services.login(credential).then((response) => {
        if (response === true) {
          navigate("/dashboard");
        } else {
          setMessage(response.message);
          setLoading(false);
        }
      });
    }
  };

  // this the main ui
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mt: 8, p: 3, boxShadow: 2, borderRadius: 2 }}
    >
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Welcome Back!! To Notes
        </Typography>
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter your username or email:
        </Typography>
        <TextField
          name="cred"
          value={creds.cred}
          onChange={handleChange}
          fullWidth
          error={!!error.cred}
          helperText={error.cred}
          required
        />
        <Typography
          variant="h5"
          textAlign="left"
          fontFamily="'Patrick Hand SC' , serif"
        >
          Enter the password:
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
        {message ? (
          <Typography
            variant="h5"
            textAlign="left"
            fontFamily="'Patrick Hand SC' , serif"
          >
            {message}
          </Typography>
        ) : (
          ""
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
        <Typography textAlign="center">Don&apos;t have an accout?</Typography>
        <Button onClick={changeToSignUp} sx={{ border: "solid" }} fullWidth>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default LoginApp;
