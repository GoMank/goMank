
export default function Price() {
    return (
        <div>
            <div className="bg-gradient-to-r from-gomank-blue flex  flex-row">
                <div className="px-3 py-9 ">
                    <h1 className="text-3xl font-bold text-white">Cuci dan Servis Mobil Lebih Praktis</h1>
                    <p className="text-white font-semibold pt-8">
                        Kini cuci dan Servis mobil cukup tunggu di rumah saja, jasa cuci dan servis kami siap membersihkan dan memperbaiki mobil Anda, kapanpun
                    </p>
                </div>
                <div className="py-2 px-2">
                    <img className="rounded-lg" src={require("../landing-img.jpg")}></img>
                </div>

            </div>
            <div className="bg-white grid grid-cols-1 justify-items-center">
                <div className="px-64 py-9 min-w-md">
                    <h1 className="text-3xl px-10  mx-4 font-bold text-gray-900">Sekarang cuci mobil di rumah lebih mudah dengan layanan dari GoMank</h1>

                </div>
                <div className="">
                    <img src={require('../side-img.jpg')}></img>
                </div>
                <div className="grid text-xl grid-cols-3 gap-6 mb-9">
                    <div className="text-left px-10 text-gomank-blue flex  items-center font-semibold">
                       <BsClockHistory className='mx-2'></BsClockHistory> Cepat Tanpa Repot Antri
                    </div>
                    <div className="text-left px-10 text-gomank-blue font-semibold flex items-center">
                        <BsFillCalendar2WeekFill className='mx-2'></BsFillCalendar2WeekFill>Bebas Atur Jadwal
                    </div>
                    <div className="text-left px-10 text-gomank-blue font-semibold flex items-center">
                       <FaUserCheck className='mx-2'></FaUserCheck> Staff Profesional
                    </div>
                    <div className="text-left px-10 text-gomank-blue font-semibold items center flex">
                       <BsAlarmFill className='mx-2'></BsAlarmFill>Cuci Kapanpun
                    </div>
                    <div className="text-left px-10 text-gomank-blue font-semibold flex items-center">
                       <BsShieldCheck className='mx-2'></BsShieldCheck>Keamanan Terjaga
                    </div>
                    <div className="text-left px-10 flex items-center text-gomank-blue font-semibold">
                     <BsDropletHalf className='mx-2'></BsDropletHalf> Sampo & Sabun Mobil Premium
                    </div>
                    
                    
                </div>

            </div>
            <div className="bg-gomank-white ">

                <div className="px-64 py-9 ">
                    <h1 className="text-3xl px-10  mx-4 font-bold text-gray-900">Pilihan Paket Lengkap, Atur Jadwal dan Pesan Sekarang!</h1>

                </div>
                <div className="grid grid-cols-3 gap-3 px-32 py-10 justify-items-center">
                    <div className="max-w-sm  rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full " src={require("../car-img.jpg")} />
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2">Cuci Mobil</div>
                            <p className="text-gray-700 text-base font-semibold  hover:text-blue-600 text-gomank-blue text-left">
                                <a href="#">Lihat detail</a>
                            </p>
                        </div>

                    </div>
                    <div className="max-w-sm  rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full " src={require("../interior-img.jpg")} />
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2">Salon Mobil Interior</div>
                            <p className="text-gray-700 text-base font-semibold  hover:text-blue-600 text-gomank-blue text-left">
                                <a href="#">Lihat detail</a>
                            </p>
                        </div>

                    </div>
                    <div className="max-w-sm  rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full " src={require("../exterior-img.jpg")} />
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2">Salon Mobil Eksterior</div>
                            <p className="text-gray-700 text-base font-semibold  hover:text-blue-600 text-gomank-blue text-left">
                                <a href="#">Lihat detail</a>
                            </p>
                        </div>

                    </div>
                    <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full " src={require("../glass-img.jpg")} />
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2">Salon Mobil Kaca</div>
                            <p className="text-gray-700 text-base font-semibold  hover:text-blue-600 text-gomank-blue text-left">
                                <a href="#">Lihat detail</a>
                            </p>
                        </div>

                    </div>
                    <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full " src={require("../engine-img.jpg")} />
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2">Salon Mobil Mesin</div>
                            <p className="text-gray-700 text-base font-semibold  hover:text-blue-600 text-gomank-blue text-left">
                                <a href="#">Lihat detail</a>
                            </p>
                        </div>

                    </div>
                    <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full " src={require("../wheel-img.jpg")} />
                        <div className="px-6 py-4">
                            <div className="font-semibold text-xl mb-2">Salon Mobil Ban & Velg</div>
                            <p className="text-gray-700 text-base font-semibold  hover:text-blue-600 text-gomank-blue text-left">
                                <a href="#">Lihat detail</a>
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="bg-gomank-yellow h-6">
                

            </div>

        </div>
    )
}