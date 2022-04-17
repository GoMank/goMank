const logSwitch = (id, type) => {
    switch (type) {
        case 'Created':
            
            return `Order with ID: ${id} has been created`

        case 'Done':
                
            return `Order with ID: ${id} has been updated to Done`

        case 'Cancelled':

            return `Order with ID: ${id} has been cancelled`
    
        // default:
        //     return 'Type is undefined';
    }
}

module.exports = logSwitch