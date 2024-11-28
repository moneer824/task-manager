import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { TEMPLATE_NAME } from '../services/constant';
import AddMember from '../components/AddMember';
import '../style/pages/GroupMembers.scss'

function GroupMembers() {
    const {teamMembers, activeTemplate, setActiveTemplate} = useAuth();
    const { template_type } = useParams();

    useEffect(() => {
        if (template_type != activeTemplate && TEMPLATE_NAME.includes(template_type)) {
            setActiveTemplate(template_type);
        }
    }, [])

    useEffect(() => {
        console.log('teamMembers',teamMembers);
    }, [teamMembers])
    
  return (
    <div className='group-members-page common-page'>
        <div className="add-members">
            <h2 className='view-title'>Group Members</h2>
            <AddMember />
        </div>
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