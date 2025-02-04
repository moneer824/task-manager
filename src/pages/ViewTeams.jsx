import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import { TEMPLATE_NAME } from '../services/constant';
import '../style/pages/GroupMembers.scss'
import AddTeams from '../components/AddTeams';
import { Alert, Button } from 'reactstrap';

const imgarr = [1, 2, 3]
function ViewTeams() {
    const { teamMembers, activeTemplate, setActiveTemplate, team, deleteSelectedTeam } = useAuth();
    const { template_type } = useParams();
    const [editTeamForm, setEditTeamForm] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const toggleEditTeamForm = () => {
        if (isOpen) {
            setEditTeamForm(null);
        }
        setIsOpen(!isOpen)
    };

    const handleEditTeam = (squad) => {
        setEditTeamForm(squad);
        toggleEditTeamForm();
    }

    useEffect(() => {
        if (template_type != activeTemplate && TEMPLATE_NAME.includes(template_type)) {
            setActiveTemplate(template_type);
        }
    }, [])

    useEffect(() => {
        console.log('teamMembers', teamMembers);
        console.log('team', team);
    }, [team])

    return (
        <div className='group-members-page common-page'>
            <div className="add-members">
                <h2 className='view-title'>Teams</h2>
                <AddTeams editTeamForm={editTeamForm} toggleEditTeamForm={toggleEditTeamForm} isOpen={isOpen} />
            </div>
            {team.map((squad, index) => (
                <div className="team-details" key={squad._id}>
                    <Alert color="primary" className='squad-details'>
                        <div className='squad-info'>
                            <p className='squad-name'>{squad.name}</p>
                            <div className='btn-container'>
                                <Button size='sm' color="success" onClick={() => handleEditTeam(squad)}>Edit</Button>
                                <Button size='sm' color="danger" onClick={() => deleteSelectedTeam(squad._id)}>Delete Team</Button>
                            </div>
                        </div>
                    </Alert>
                    {/* <p>Admin : Moneer</p> */}
                    <div className='member-container'>
                        {squad.members.map((member, index) => (
                            <div className="member-card" key={member.id}>
                                <img src={`/assets/images/avatar/male/${imgarr[index % imgarr.length]}.png`} alt="" />
                                <div className='member-info'>
                                    <h4 className='member-name'>{member.name}</h4>
                                    <p className='member-email'>{member.email}</p>
                                    <Button size='sm' color="primary">Details</Button>
                                </div>
                            </div>
                        ))}
                        {squad.members.length == 0 && <p>No members added</p>}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ViewTeams