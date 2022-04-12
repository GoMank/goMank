const localizer = (longdate) => {

    const date = longdate;

    var date_regex = /^\d{2}\/\d{2}\/\d{4}$/ ;
    return date_regex.test(date);

}

console.log(localizer('2022-04-10 09:26:31.372'))