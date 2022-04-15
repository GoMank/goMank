import PriceNavbar from '../components/PriceNavbar'
export default function Price() {
    return (
        <div className='px-7 py-7'>

            <div className="bg-white grid grid-cols-1 justify-items-center">


                <div className="flex px-2 py-9 min-w-md">
                    <div >
                        <h1 className=" text-3xl pb-3 mx-4 text-left font-bold text-gray-600">Daftar Harga Layanan GoMank</h1>

                    </div>

                </div>
                {/* <PriceNavbar></PriceNavbar> */}
                <div className='flex flex-row px-4 py-2 justify-center'>
                    <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full h-1/2 " src={require("../smcar-img.jpg")} />
                        <div className="px-6 py-4 text-left">
                            <div className="font-semibold text-xl mb-2">Small Car</div>
                            <p className='text-gray-500 font-semibold'>Estimasi 2 jam</p>
                            <p className="py-3 text-gray-700 text-base font-semibold text-2xl  text-left">
                                Rp 50.000,00
                            </p>
                        </div>
                        
                        

                    </div>
                   
                    <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full h-1/2" src={require("../mdcar-img.jpg")} />
                        <div className="px-6 py-4 text-left">
                            <div className="font-semibold text-xl mb-2">Medium Car</div>
                            <p className='text-gray-500 font-semibold'>Estimasi 3 jam</p>
                            <p className="py-3 text-gray-700 text-base font-semibold text-2xl  text-left">
                                Rp 100.000,00
                            </p>
                        </div>
                        </div>
                        <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
                        <img className="w-full h-1/2" src={require("../lgcar-img.jpg")} />
                        <div className="px-6 py-4 text-left">
                            <div className="font-semibold text-xl mb-2">Large Car</div>
                            <p className='text-gray-500 font-semibold'>Estimasi 4 jam</p>
                            <p className="py-3 text-gray-700 text-base font-semibold text-2xl  text-left">
                                Rp 150.000,00
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