import Navbar from '../../components/common/Navbar';
import RegisterForm from '../../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="py-12">
        <RegisterForm 
          onSwitchToLogin={() => window.location.href = '/login'}
        />
      </div>
    </div>
  );
};

export default Register;