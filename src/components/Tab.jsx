import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/Tab.scss';

const propTypes = {
    /** Label for visual display */
    label: PropTypes.node,
    /** Value representing tab to pass with callback function */
    id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
    /** True only if tab is active (intended use implies respective content for tab is visible) */
    active: PropTypes.bool,
    /** Callback function to call when tab is clicked */
    onClickAction: PropTypes.func
}

/** Basic functional Tab component representing a single tab item */
const Tab = ({label, id, active = false, onClickAction}) => {
    let className = 'tab';
    className += active ? ' tab-active' : ' tab-inactive';

    const _onClickAction = () => {
        if (onClickAction && typeof onClickAction === 'function') {
            onClickAction(id);
        }
    };

    return (
        <button 
            className={className}
            onClick={_onClickAction}
        >
            {label}
        </button>
    )
}

Tab.propTypes = propTypes;
export default Tab;