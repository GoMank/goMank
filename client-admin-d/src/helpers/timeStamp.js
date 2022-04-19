// function parseDMY(s) {
//     var b = s.split(/\D/);
//     var d = new Date(b[2], --b[1], b[0]);
//     return d && d.getMonth() === b[1]? d : new Date(NaN);
//   }

function formatDMY(d) {
    // Default to today
    d = new Date(d) || new Date();
    const date = d.getDate()
    const month = d.getMonth() + 1
    const year = d.getFullYear()
    const obj = {
        date,
        month,
        year
    }
    return obj
  }

//   const date = '2022-12-13T17:00:00.000Z'
//   console.log(parseDMY('14/12/2022'))
//   console.log(new Date(date));
//   console.log(formatDMY(new Date(date)));
  
module.exports = formatDMY;