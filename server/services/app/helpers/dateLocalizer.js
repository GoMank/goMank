const localizer = () => {

    const date = new Date();
    const dateString = date.getTime().toString()
    const invNumber = dateString.slice(6)

    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let today = mm + '-' + yyyy;

    let obj = {
        date: today,
        invNumber: invNumber
    }

    return obj;

}

module.exports = localizer;