import React from 'react';

const HospitalDataSection = ({ hospitalName, facilities, doctors }) => {
    return (
        <div className="mt-16 pb-7">
            <div className="mx-auto items-center text-center pb-4">
                <h2 className='text-2xl font-sans font-bold'><span>{hospitalName} Data</span></h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md border-[#bc181d] border-2">
                    <h3 className="text-lg font-semibold">Facilities</h3>
                    <ul className="list-decimal pl-4 mt-4">
                        {facilities && facilities.length > 0 ? (
                            facilities.map((facility, index) => (
                                <li key={index}>{facility.name}</li>
                            ))
                        ) : (
                            <li>No facilities available</li>
                        )}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-[#bc181d] border-2">
                    <h3 className="text-lg font-semibold">Top Doctors</h3>
                    <ul className="list-decimal pl-4 mt-4">
                        {doctors && doctors.length > 0 ? (
                            doctors.map((doctor, index) => (
                                <li key={index}>{doctor.name} - {doctor.specialty}</li>
                            ))
                        ) : (
                            <li>No Doctors available</li>
                        )}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-[#bc181d] border-2">
                    <h3 className="text-lg font-semibold">Top Specialists</h3>
                    <ul className="list-decimal pl-4 mt-4">
                        {doctors && doctors.length > 0 ? (
                            doctors.map((doctor, index) => (
                                <li key={index}>{doctor.specialty}</li>
                            ))
                        ) : (
                            <li>No Specialists available</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HospitalDataSection;