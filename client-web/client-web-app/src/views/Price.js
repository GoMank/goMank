import PriceNavbar from '../components/PriceNavbar'
import PriceCard from '../components/PriceCard'
export default function Price() {
    const assetMamank = [
        { name: "Car Wash", title: "Mank Wash", image: "https://i.ibb.co/vkGXsc9/CarWash.jpg", price: "850.000", id: 1 },
        { name: "Engine Wash", title: "Mank Engine", image: "https://i.ibb.co/PYHJT0t/engine-Wash.jpg", price: "500.000", id: 2 },
        { name: "Interior Wash", title: "Mank Interior", image: "https://i.ibb.co/qJMVsqS/interior-Wash.jpg", price: "450.000", id: 3 },
        { name: "Eksterior Wash", title: "Mank Eksterior", image: "https://i.ibb.co/t3tRWTm/eksterior-Wash.jpg", price: "350.000", id: 4 },
        { name: "Window Wash", title: "Mank Window", image: "https://i.ibb.co/Bzb23q4/window-Wash.jpg", price: "235.000", id: 5 },
        { name: "Velg Wash", title: "Mank Velg", image: "https://i.ibb.co/372wDvq/VelgWash.jpg", price: "185.000", id: 6 },
      ];
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
                    {assetMamank.map(asset => 
                        <PriceCard key={asset.id} asset={asset}></PriceCard>
                        ) 
                     } 
                

           
        </div>
                   
                   
                



            </div>



            

        </div>
    )
}