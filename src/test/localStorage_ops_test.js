const assert = require('assert');

describe('Workspace Local Storage Operations', () => {
    let _kandoStorage;
    const fallbackData = [{   
                title: 'Fallback Project 1',
                id: 778,
                desc: "This is project one.",
                index: 0
            },
            {
                title: 'Fallback Project 2',
                id: 1038,
                desc: "This is project two.",
                index: 1
        }]
   
    it('can retrieve initial state from local storage', () => {
         _kandoStorage = JSON.stringify([{   
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
        }]);

        const state = JSON.parse(_kandoStorage) || fallbackData;
        assert(state[0].title === 'Project1');
    });

    it('can use fallback data when local storage is empty', () => {
        _kandoStorage = null
        const state = _kandoStorage  || fallbackData;
        assert(state.length > 0);
    });

});