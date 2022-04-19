const rupiah = (integer) => {
    return integer.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
}

module.exports = rupiah