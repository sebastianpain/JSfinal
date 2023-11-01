

const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



const getProducts = async () => {
    const response = await fetch("js/data.json");
    const data = await response.json();

    data.forEach((product) => {
        let content = document.createElement("div");
        content.className= "card";
        content.innerHTML = `    
        <img src= "${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">${product.precio} $</p>
        `;
        
        shopContent.append(content);
        
        let comprar = document.createElement("button")
        comprar.innerText = "comprar";
        comprar.className= "comprar";
        
        content.append(comprar);
        
        comprar.addEventListener("click", 
        async() => {
             
            Swal.fire(
                
                'sumaste un producto al carrito',
                'para continuar hacer click en OK',
                'success'
                
            )
            const repeat = carrito.some((repeatProduct) => repeatProduct.id===product.id);
            
           
           
            if(repeat) {
            carrito.map((prod) => {
            if (prod.id === product.id) {
            prod.cantidad++;
            }
        });
            } else {
                carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
            
        
            console.log(carrito);
            console.log(carrito.lenght);
            carritoCounter();
            saveLocal();
        }
        });
        });
    };
getProducts();


const saveLocal = () => {
localStorage.setItem("carrito",JSON.stringify(carrito));
};

const finalizePurchase = () => {
    Swal.fire('Tu compra fue realizada con exito');
    'Compra finalizada',
        'Gracias por tu compra. El total es $X', // Replace X with the actual total price.
        'success'
    
}

window.addEventListener("beforeunload", () => {

carrito=[];
saveLocal();
carritoCounter();
// Add an event listener for the "beforeunload" event
    // Clear the cart and update it in local storage when the page is refreshed
  
    
    // Define a function to clear and update the cart counter
    const carritoCounter = () => {
        cantidadCarrito.style.display = "block";
        cantidadCarrito.innerText = carrito.length;
    };
});