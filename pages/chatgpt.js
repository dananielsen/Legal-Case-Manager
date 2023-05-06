import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Checkbox, FormControlLabel, Button } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
}));

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
}));

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login submission here
  };

  return (
    <Root>
      <Form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} />}
          label="Remember me"
        />
        <SubmitButton
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
        >
          Log In
        </SubmitButton>
      </Form>
    </Root>
  );
}

export default LoginPage;
