import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/members');
    }, 3000); // 3 seconds splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-logo glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
        <span style={{ fontSize: '3rem' }}>🚀</span>
      </div>
      <h1 className="splash-text animate-fade-in">GDGC Members</h1>
    </div>
  );
};

export default SplashScreen;
