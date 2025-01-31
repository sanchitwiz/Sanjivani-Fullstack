import React from 'react';

const BedSection = ({ bedsTaken, bedsAvailable, updateBedsTaken }) => {
    return (
        <div className="p-6">
            <div className="bg-white text-black p-2 rounded-lg">
                <h3 className="text-lg font-semibold">No. of Beds Available</h3>
                <p>Taken: {bedsTaken}</p>
                <p>Available: {bedsAvailable - bedsTaken}</p>
                <div className="mt-3">
                    <button onClick={() => updateBedsTaken(1)} className="bg-red-700 text-white px-2 py-1 rounded">
                        Increase Taken Beds
                    </button>
                    <button onClick={() => updateBedsTaken(-1)} className="bg-red-700 text-white px-2 py-1 rounded mt-1">
                        Decrease Taken Beds
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BedSection;