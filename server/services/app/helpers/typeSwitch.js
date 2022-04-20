// const obj =[
//     { name: "Car Wash", title: "Mank Wash", image: "https://i.ibb.co/vkGXsc9/CarWash.jpg", price: "850.000", id: 1 },
//     { name: "Engine Wash", title: "Mank Engine", image: "https://i.ibb.co/PYHJT0t/engine-Wash.jpg", price: "500.000", id: 2 },
//     { name: "Interior Wash", title: "Mank Interior", image: "https://i.ibb.co/qJMVsqS/interior-Wash.jpg", price: "450.000", id: 3 },
//     { name: "Eksterior Wash", title: "Mank Eksterior", image: "https://i.ibb.co/t3tRWTm/eksterior-Wash.jpg", price: "350.000", id: 4 },
//     { name: "Window Wash", title: "Mank Window", image: "https://i.ibb.co/Bzb23q4/window-Wash.jpg", price: "235.000", id: 5 },
//     { name: "Velg Wash", title: "Mank Velg", image: "https://i.ibb.co/372wDvq/VelgWash.jpg", price: "185.000", id: 6 },
// ]
const typeSwitch = (idServices) => {
    switch (idServices) {
        case 1:
            
            return {
                serviceName: "Mank Wash",
                servicePrice: 850000,
            }

        case 2:
                
            return {
                serviceName: "Mank Engine",
                servicePrice: 500000,
            }

        case 3:

            return {
                serviceName: "Mank Interior",
                servicePrice: 450000,
            }

        case 4:
            
            return {
                serviceName: `Mank Eksterior`,
                servicePrice: 350000,
            }
    
        case 5:
                    
            return {
                serviceName: `Mank Window`,
                servicePrice: 235000,
            }
    
        case 6:
    
            return {
                serviceName: `Mank Velg`,
                servicePrice: 185000,
            }
    }
}

module.exports = typeSwitch