
export default function Join() {
    return (
        <div>

            <div className="bg-white grid grid-cols-2 justify-items-center">


                <div className="flex items-center px-2 py-9 min-w-md">
                    <div >
                        <h1 className=" text-3xl pb-3 mx-4 text-left font-bold text-gray-600">Join Us!</h1>
                        <p className='text-justify font-semibold py-3 px-3'>Bergabunglah dengan Gomank! Klik dan daftarkan diri anda untuk mulai bekerjasama dengan Gomank, Proses Pendaftaran Mudah dan Cepat!</p>

                        <button className="bg-gomank-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Join Now
                        </button>
                    </div>

                </div>
                <div className="rounded-lg flex items-center px-7 py-7">
                    <img className=" h-3/4" src={require('../employee-img.png')}></img>
                </div>


            </div>



            <div className="bg-gomank-yellow h-6">


            </div>

        </div>
    )
}