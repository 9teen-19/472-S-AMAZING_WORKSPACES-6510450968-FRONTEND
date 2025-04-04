import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { UserService } from '../services/userService';
import { User } from '../models/User';
import { IUserLogin, IUserResponse } from '../types/user.types';
import { PasswordField } from '../components/PasswordField';

interface LoginPageProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: IUserLogin) => void; // Assuming `User` is your user model
}

export function LoginPage({ setIsAuthenticated, setUser }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(newValue: string) {
    setPassword(newValue);
  }

  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  async function handleSignIn() {
    let userLogin: IUserLogin = {
      username: username,
      password: password,
    };

    try {
      await UserService.login(userLogin);

      setIsAuthenticated(true);

      setUser(userLogin);
      navigate('/', { state: { userLogin } });
    } catch (err) {
      alert('Login failed: ' + JSON.stringify(err));
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[#CDF3F5] to-[#448386]">
      <div className="flex flex-col items-center w-96 h-120 bg-[#F9F6F2] rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-5xl text-[#323232] mb-1">AWS</h1>
          <h2 className="text-2xl text-[#323232]">Login</h2>
        </div>

        <div className="flex flex-col items-center mb-6 space-y-4">
          <div className="h-[2px] w-full bg-gradient-to-r from-[#CDF3F5] to-[#448386]"></div>

          <TextField
            id="textfield-custom "
            label="Username"
            sx={{ width: 300 }}
            size="small"
            onChange={handleUsernameChange}
            value={username}
          />
          <PasswordField
            label="Password"
            width={300}
            onChange={handlePasswordChange}
            value={password}
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Button
            variant="contained"
            onClick={() => {
              handleSignIn();
            }}
            sx={{
              backgroundColor: '#448386',
              color: 'white',
              width: '300px',
              '&:hover': { backgroundColor: '#9ABCA9' },
            }}
          >
            Sign in
          </Button>
          <div className="flex justify-between w-80">
            <p>You don&apos;t have an account?</p>
            <a href="/register" className="text-[#448386]">
              Create account.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
