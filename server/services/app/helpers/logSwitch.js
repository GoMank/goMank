const logSwitch = (id, type) => {
    switch (type) {
        case 'Created':
            
            return `Order with ID: ${id} has been created`

        case 'Done':
                
            return `Order with ID: ${id} has been updated to Done`

        case 'Cancelled':

            return `Order with ID: ${id} has been cancelled`
    
<<<<<<< HEAD
        default:
            return 'Type is undefined';
=======
        // default:
        //     return 'Type is undefined';
>>>>>>> a26c0e223773b9418c96674b01ace49ff6f4bcae
    }
}

module.exports = logSwitch