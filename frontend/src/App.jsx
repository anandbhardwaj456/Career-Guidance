import { useAuth } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <AuthForm />;
  }

  return <Dashboard />;
}

export default App;
