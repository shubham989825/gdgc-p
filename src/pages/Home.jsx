import { useState, useEffect } from 'react';
import MemberCard from '../components/MemberCard';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetch('http://localhost:5000/members')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch members');
        return res.json();
      })
      .then(data => {
        setMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = members;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(lowerTerm) ||
        m.bio.toLowerCase().includes(lowerTerm)
      );
    }

    if (roleFilter) {
      result = result.filter(m => m.role === roleFilter);
    }

    setFilteredMembers(result);
  }, [searchTerm, roleFilter, members]);

  // Extract unique roles for filter
  const roles = [...new Set(members.map(m => m.role))];

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading members...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>GDGC Members</h1>
        <button onClick={toggleTheme} className="glass" style={{ padding: '10px 20px', cursor: 'pointer', color: 'var(--text-color)' }}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <div className="glass" style={{ padding: '20px', marginBottom: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by name or bio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            minWidth: '200px'
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            minWidth: '150px'
          }}
        >
          <option value="">All Roles</option>
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px'
      }}>
        {filteredMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No members found matching your criteria.</p>
      )}
    </div>
  );
};

export default Home;
