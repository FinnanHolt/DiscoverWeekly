import React from 'react';
import { connect } from 'react-redux';

const SongTable = ({ songs }) => {
  return (
    <div>
      <table>
        <tbody>
          {songs.map(song => (
            <tr key={song.id}>
              <td>{song.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(null, null)(SongTable);
