import socket from '@/utils/socket';
import { CarrierLocationDataType } from '@/utils/types.ds';
import { useState, useEffect } from 'react';

const useReceiveLocation = () => {
    const [carrierLocation, setCarrierLocation] = useState<CarrierLocationDataType>();

    useEffect(() => {
        const handleReceiveData = (data: CarrierLocationDataType) => {
            setCarrierLocation(data);
        };
        socket.on('receive_data', handleReceiveData);

        return () => {
            socket.off('receive_data', handleReceiveData);
        };
    }, [socket]); 

    return carrierLocation;
};

export default useReceiveLocation;
