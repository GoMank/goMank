import PriceNavbar from '../components/PriceNavbar'
import PriceCard from '../components/PriceCard'
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
                
                    <PriceCard></PriceCard>
                   
                



            </div>



            <div className="bg-gomank-yellow h-6">


            </div>

        </div>
    )
}