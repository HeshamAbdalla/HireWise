import React, { useState } from 'react';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  CircularProgress,
  Snackbar 
} from '@mui/material';
import Alert from '@mui/material/Alert';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        role: 'learner', // Default role
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      
      navigate('/'); // Redirect to home after signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        role: 'learner',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
      
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={{ padding: 20 }}>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        
        <Button 
          variant="contained" 
          onClick={handleGoogleSignup}
          disabled={loading}
          fullWidth
          style={{ marginBottom: 20 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up with Google'}
        </Button>

        <Typography variant="body1" align="center" gutterBottom>OR</Typography>

        <form onSubmit={handleEmailSignup}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign Up with Email'}
          </Button>
        </form>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}