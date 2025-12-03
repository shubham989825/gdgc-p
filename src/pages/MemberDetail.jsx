import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MemberDetail = () => {
    const { id } = useParams();
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/members/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch member details');
                return res.json();
            })
            .then(data => {
                setMember(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;
    if (!member) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Member not found</div>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/members" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
                ← Back to Members
            </Link>

            <div className="glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <img
                    src={member.photo}
                    alt={member.name}
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px', border: '4px solid var(--primary-color)' }}
                />
                <h1 style={{ margin: '10px 0', color: 'var(--text-color)' }}>{member.name}</h1>
                <h2 style={{ color: 'var(--secondary-color)', margin: '5px 0' }}>{member.role}</h2>
                <p style={{ color: 'var(--text-color)', opacity: 0.8, marginBottom: '20px' }}>📍 {member.location}</p>

                <div style={{ margin: '20px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                    {member.skills.map((skill, index) => (
                        <span key={index} style={{
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '1rem'
                        }}>
                            {skill}
                        </span>
                    ))}
                </div>

                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '600px' }}>{member.bio}</p>
            </div>
        </div>
    );
};

export default MemberDetail;
