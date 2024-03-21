import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import ErrorBox from '../../components/ErrorBox';
import { useRegisterMutation } from '../../slices/userApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../slices/authSlice';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    setError('');
    e.preventDefault();
    try {
      const res = await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
    } catch (err) {
      setError(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h3>Register</h3>
      {error && <ErrorBox message={error} />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='firstname'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='my-2 w-100 fs-5'
        >
          Register
        </Button>
      </Form>

      <Link to='/login'>
        {' '}
        <Button
          disabled={isLoading}
          type='submit'
          variant='outline-primary'
          className='my-2 w-100 fs-5'
        >
          Login
        </Button>
      </Link>
    </FormContainer>
  );
};

export default Register;
