const assert = require('assert');

describe('Workspace actions', () => {
    //set mock initial state for testing
    const oldState = [
        {   
            title: 'Project1',
            id: 78678,
            desc: "This is project one.",
            index: 0
        },
        {
            title: 'Project2',
            id: 1029238,
            desc: "This is project two.",
            index: 1
        }
    ];

    it('can add a project to a workspace without mutating previous workspace state', () => {
        const newProject = [{
            title: 'Project3',
            id: 23234,
            desc: "This is project three.",
            index: 2
        }];
        const newState = oldState.concat(newProject);
        assert(newState.length === 3); //test if new project was added on to state array
        assert(oldState.length === 2); //test if old state was not affected by addition (new state was created without mutation)
    });

    it('can clear all projects from a workspace without mutating previous workspace state', () => {
        const newState = [];
        assert(newState.length === 0);
        assert(oldState.length === 2);
    });

    it('can delete a project from a workspace by id when user drags this component to another workspace', () => {
        //we will be 'dragging' the second project out of our oldState
        const incomingProjectId = oldState[1].id;
        const newState = oldState.slice();
        newState.splice(newState.indexOf(newState.find(project => project.id === incomingProjectId)), 1);
        assert(newState.length === 1);
        assert(oldState.length === 2);
    });

    it('can update a project from a workspace without mutating previous workspace state', () => {
        const incomingProject = {
            title: 'Project2',
            id: 1029238,
            desc: "Updated Project 2.",
            index: 1
        };
        const newState = oldState.slice();
        newState.splice(newState.indexOf(newState.find(project => project.id === incomingProject.id)), 1, incomingProject); //replace old project with new project
        assert(newState[1].desc === 'Updated Project 2.');
        assert(oldState[1].desc === 'This is project two.');
    });

    it('can rearrange projects within a workspace', () => {
        const incomingIndices = {sourceIndex: 0, targetIndex: 1};
        const newState = oldState.slice();
        const sourceProject = newState[incomingIndices.sourceIndex];
        const targetProject = newState[incomingIndices.targetIndex];
        //switch indexes
        let temp = sourceProject.index;
        sourceProject.index = targetProject.index;
        targetProject.index = temp;
        //reveal new indexes in state
        newState.splice(incomingIndices.sourceIndex, 1, targetProject);
        newState.splice(incomingIndices.targetIndex, 1, sourceProject);
        assert(newState[0].title === 'Project2' && oldState[0].title === 'Project1');
        assert(newState[1].title === 'Project1' && oldState[1].title === 'Project2');

    });
});