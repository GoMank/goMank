
export default function Home() {
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
            <div className="bg-gomank-gray">
            Test

            </div>
            <div className="bg-gomank-yellow">
            Test

            </div>

        </div>
    )
}