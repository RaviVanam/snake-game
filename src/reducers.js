export function gridReducer(grid, action) {
    switch (action.type) {
        case 'moved': {
            return [
                // ...tasks,
                // {
                // id: action.id,
                // text: action.text,
                // done: false,
                // },
            ];
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
