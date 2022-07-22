import React, { useState } from "react";
import {
  Paper,
  TextField,
  Typography,
  Container,
  Button,
  InputAdornment,
  InputLabel,
  Input,
  IconButton,
  FormControl,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, signUp, signIn } from "./AuthSlice";
import { useStateContext } from "../../context/StateContext";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const { isSignUp, setIsSignUp } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitchMode = () => {
    setFormData(initialFormState);
    setIsSignUp(!isSignUp);
  };

  const handleSuccess = (res) => {
    const decode = jwt_decode(res.credential);
    dispatch(auth({ ...decode, credential: res.credential }));
    navigate("/");
  };

  const handleError = (error) => {
    console.log(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "12vh" }}>
      <Paper elevation={3} sx={{ px: 10, py: 5 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ p: 1 }}>
            {isSignUp ? "Sign up" : "Sign in"}
          </Typography>
          <Typography variant="Body1">
            {isSignUp ? "Already a user?" : "Doesn't have an account?"}
          </Typography>
          <Typography
            variant="Body1"
            component={Link}
            sx={{ cursor: "pointer", ml: 1 }}
            onClick={handleSwitchMode}
          >
            {isSignUp ? "Log in" : "Sign up"}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            {isSignUp && (
              <>
                <TextField
                  name="firstName"
                  label="First name"
                  type="text"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                />
                <TextField
                  name="lastName"
                  label="Last name"
                  type="text"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                />
              </>
            )}
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="standard"
              fullWidth
              onChange={handleChange}
            />
            {isSignUp && (
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Repeat password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}
          </Box>
          <Box sx={{ textAlign: "center", mt: 3.5 }}>
            <Button type="submit" variant="contained" fullWidth>
              {isSignUp ? "Create Account" : "Sign in"}
            </Button>
          </Box>
          <Divider sx={{ py: 2 }}>Or sign in with</Divider>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              type="icon"
              size="large"
              theme="filled_blue"
              shape="pill"
              width="80%"
              className="google-button"
            />
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
