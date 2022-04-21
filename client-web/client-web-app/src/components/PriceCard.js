
export default function PriceCard({asset}) {

    return (
        
        <div className="max-w-sm   rounded overflow-hidden mx-2 my-2 rounded-lg shadow-lg">
        <img className="w-full h-1/2 " src={asset.image} />
        <div className="px-6 py-4 text-left">
            <div className="font-semibold text-xl mb-2">{asset.name}</div>
            <p className='text-gray-500 font-semibold'>Estimasi 2 jam</p>
            <p className="py-3 text-gray-700 text-base font-semibold text-2xl  text-left">
                Rp {asset.price}
            </p>
        </div>



    </div>

    )

}