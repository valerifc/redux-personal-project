// Core
import React from 'react';
import { useSelector } from 'react-redux';

// Instruments
import Styles from './styles.m.css';

const Spinner = () => {
    const isFetching = useSelector((state) => state.ui.get('isFetching'));

    return isFetching ? <div className = { Styles.spinner } /> : null;
};

export default Spinner;
