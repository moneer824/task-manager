import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { useAuth } from '../context/AuthContext';

function MemberMultiselect({selectedOptions, setSelectedOptions}) {
    const [MemberOptions, setMemberOptions] = useState([]);
    const {users, currentUser} = useAuth();

    const handleOptionChange = (val) => {
        setSelectedOptions(val);
    };

    useEffect(() => {
        setMemberOptions(users.map((user) => ({label: user.name, value: user._id})));
        if (currentUser && !selectedOptions.find((option) => option.value === currentUser.id)) {
            setSelectedOptions([...selectedOptions, {label: currentUser.name, value: currentUser.id}]);
        }
    }, [users]);
  return (
    <div>
        <Select
            value={selectedOptions}
            isMulti
            name="colors"
            options={MemberOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(e) => handleOptionChange(e)}
        />
    </div>
  )
}

export default MemberMultiselect