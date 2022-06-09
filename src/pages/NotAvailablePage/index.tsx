import React from 'react';

import './style.scss'

type IProps = {
    bgcolor: string
}

const NotAvailablePage: React.FC<IProps> = ({bgcolor}: IProps) => {

    return (
        <div className='not-available-page' style={{backgroundColor: bgcolor}}>
            <h1>Ця сторінка в розробці</h1>
        </div>
    )
}

export default NotAvailablePage;
