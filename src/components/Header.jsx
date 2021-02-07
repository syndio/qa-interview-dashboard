import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Dropdown from 'components/Dropdown';
import logo from 'assets/syndio-logo.svg';

import 'stylesheets/Header.scss';

const propTypes = {
    /** List of group objects containing label (for visual display) and id */
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ),
    /** ID of active group to show as selected in dropdown menu on initial render */
    activeGroup: PropTypes.string,
    /** Callback function to call when updating active group */
    onUpdateGroup: PropTypes.func
}

/**
 * Functional component representing page Header 
 */
const Header = ({groups = [], activeGroup, onUpdateGroup}) => {
    const history = useHistory();
    const location = useLocation();

    const groupOptions = groups.map(group => {
        return { label: group.label, value: group.id, id: group.id };
    });

    /** Calls onUpdateGroup callback and updates group query param in url with active group id  */
    const _updateGroup = async (selectedValue) => {
        if (onUpdateGroup && typeof onUpdateGroup === 'function') {
            onUpdateGroup(selectedValue);
        }

        history.push(location.pathname + `?group=${selectedValue}`);
    };

    return (
        <div className="header">
            <img className="logo" src={logo} alt="Syndio" />
            <Dropdown
                options={groupOptions}
                defaultSelected={activeGroup}
                onSelectOption={_updateGroup}
                label="CHANGE GROUP"
            />
        </div>
    );
}

Header.propTypes = propTypes;
export default Header;