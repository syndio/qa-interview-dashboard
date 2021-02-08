import React from 'react';
import PropTypes from 'prop-types';

import 'stylesheets/DemographicStats.scss';

const propTypes = {
    /** Key representing demographic category */
    id: PropTypes.oneOf([ 'payEquityGap', 'employeeComparison', 'budget' ]),
    /** Label to display on card */
    label: PropTypes.string.isRequired,
    /** Flexible data object containing demographic statistics */
    data: PropTypes.object.isRequired,
}

/** Functional Component that displays demographic statistics in a card */
const DemographicStats = ({id, label, data = {}}) => {
    let statistic = null;

    switch(id) {
        case 'payEquityGap':
            const minority = data.minority || {};
            const majority = data.majority || {};
            statistic = <p>{minority.label} earn <strong>{minority.value}</strong> for every <strong>{majority.value}</strong> earned by comparable {majority.label}</p>;
            break;
        case 'employeeComparison':
            statistic = <p>{data.label} make up <strong>{data.value}</strong> of employees</p>;
            break;
        case 'budget':
            statistic = <p><strong>{data.value}</strong> minimum recommended buget to reduce pay equity gap</p>;
            break;
        default:
            //None
    }
    
    return (
        <div className="demographicStats" id={id}>
            <label>{label}</label>
            { statistic }
        </div>
    );
}

DemographicStats.propTypes = propTypes;
export default DemographicStats;