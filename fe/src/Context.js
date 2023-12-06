import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const Context = createContext();

const getBlocks = () => {
    const blocks = [];
    for (let day = 0; day < 7; day++) {
        const col = [];
        for (let time = 0; time < 30; time++) {
            col.push([]);
        }
        blocks.push(col);
    }

    return blocks;
}

function ContextProvider({ children }) {
    const [teams, setTeams] = useState([]);
    const [ensembles, setEnsembles] = useState([]);

    const getTeamList = async () => {
        const { data } = await axios.get('http://localhost:8000/teams');
		const teamsData = data.map((team) => ({
            name: team.name,
            id: team._id
        }))
        setTeams(teamsData);
		return teamsData;
    }

    const getEnsembles = async (teamsData) => {
        const { data } = await axios.get('http://localhost:8000/ensembles');
        const blocks = getBlocks();

        data.forEach((ensemble) => {
            for (let hour = ensemble.startTime; hour <= ensemble.endTime; hour++) {
                blocks[ensemble.day][hour].push({
                    id: ensemble._id,
                    teamId: ensemble.teamId,
                    teamName: hour === ensemble.startTime ? ensemble.teamName : '',
                    isExternal: ensemble.room === '외부',
                    isOneTime: ensemble.type === '일회성',
                    due: ensemble.due,
                    teamcoloridx: teamsData.map(team => team.id).indexOf(ensemble.teamId)
                });
            }
        });
        console.log(blocks)
        setEnsembles(blocks);
    };

	const init = async () => {
        const teamsData = await getTeamList();
		getEnsembles(teamsData);
	}

    return (
        <Context.Provider value={{ teams, setTeams, ensembles, setEnsembles, getTeamList, getEnsembles, init }}>
            {children}
        </Context.Provider>
    )
}

function useCustomContext() {
    return useContext(Context);
}

export { ContextProvider, useCustomContext };