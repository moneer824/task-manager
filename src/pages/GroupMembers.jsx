import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';

function GroupMembers() {
    const {teamMembers} = useAuth();
    useEffect(() => {
        console.log('teamMembers',teamMembers);
    }, [teamMembers])
    
  return (
    <div className='group-members-page common-page'>
        <h2 className='view-title'>Group Members</h2>
        <div className="members-container">
            {teamMembers.map((member, index) => (
                <div className="member-card" key={member.id}>
                    <img src={`/assets/images/avatar/male/${index + 1}.png`} alt="" />
                    <h4 className='my-2'>{member.name}</h4>
                    <p>{member.email}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default GroupMembers