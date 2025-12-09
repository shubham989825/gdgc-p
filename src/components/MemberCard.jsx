import React from 'react';
import { Link } from 'react-router-dom';

const MemberCard = ({ member }) => {
  return (
    <div className="glass member-card" style={{ padding: '20px', textAlign: 'center', transition: 'transform 0.3s' }}>
      <img
        src={member.photo}
        alt={member.name}
        style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '15px', border: '3px solid var(--primary-color)' }}
      />
      <h3 style={{ margin: '10px 0', color: 'var(--text-color)' }}>{member.name}</h3>
      <p style={{ color: 'var(--secondary-color)', fontWeight: 'bold', margin: '5px 0' }}>{member.role}</p>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.8 }}>{member.location}</p>

      <div style={{ margin: '15px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '5px' }}>
        {Array.isArray(member.skills) ? (
          member.skills.map((skill, index) => (
            <span key={index} style={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '0.8rem'
            }}>
              {skill}
            </span>
          ))
        ) : (
          <span style={{ color: 'var(--text-color)' }}>{member.skills || '—'}</span>
        )}
      </div>

      <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '15px' }}>&quot;{member.bio}&quot;</p>

      <Link to={`/members/${member.id}`} style={{
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: 'var(--accent-color)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        View Profile
      </Link>
    </div>
  );
};

export default MemberCard;
