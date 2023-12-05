import React from 'react';
import { Oval } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <div style={{'display': 'flex', 'justifyContent': 'center', 'padding': '25px'}}>
            <Oval
                height={100}
                width={100}
                color="#FFB30E"
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#9E9E9E"
                strokeWidth={3}
                strokeWidthSecondary={2}
            />
        </div>
    );
};

export default Spinner;