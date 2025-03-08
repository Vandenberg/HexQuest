import React from 'react';

const DataList = ({ data }) => (
    <div>
        <h2>Data from Database:</h2>
        <table>
            <thead>
                <tr>
                    <th>Character ID</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Profession</th>
                    <th>Race</th>
                    <th>Specialization</th>
                    <th>Current Party</th>
                    <th>Player ID</th>
                    <th>Player Name</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.character_id}>
                        <td>{item.character_id}</td>
                        <td>{item.name}</td>
                        <td>{item.class}</td>
                        <td>{item.profession}</td>
                        <td>{item.race}</td>
                        <td>{item.character_specialization}</td>
                        <td>{item.current_party}</td>
                        <td>{item.player_id}</td>
                        <td>{item.player_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default DataList;