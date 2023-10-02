import React from 'react';
import { Audio } from 'react-loader-spinner';
import PropTypes from 'prop-types'; // Импортируем PropTypes для валидации props

const Spinner = ({ text = 'Loading', height = 80, width = 80, ariaLabel = 'dna-loading', wrapperStyle = {}, wrapperClass = '' }) => {
    return (
        <div className={`spinner-container ${wrapperClass}`}>
            <h2>{text}</h2>
            <Audio
                visible={true}
                height={height}
                width={width}
                ariaLabel={ariaLabel}
                wrapperStyle={wrapperStyle}
            />
        </div>
    );
};

Spinner.propTypes = {
    text: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    ariaLabel: PropTypes.string,
    wrapperStyle: PropTypes.object,
    wrapperClass: PropTypes.string,
};

export default Spinner;
