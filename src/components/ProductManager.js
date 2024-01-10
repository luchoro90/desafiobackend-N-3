import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = [];
    };

    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {

        ProductManager.id++;

        let newProduct = {

            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id,
        }

        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };

    readProducts = async () => {

        let respuesta = await fs.readFile(this.patch, "utf-8");
        return JSON.parse(respuesta)
    };

    getProducts = async () => {

        let respuesta2 = await this.readProducts();
        return console.log(respuesta2);
    };

    getProductsById = async (id) => {

        let respuesta3 = await this.readProducts();

        if (!respuesta3.find((product) => product.id == id)) {

            console.log("PRODUCTO NO ENCONTRADO")
        } else {
            console.log(respuesta3.find((product) => product.id == id));
        }

    };

    updateProducts = async ({ id, ...producto }) => {

        await this.deleteProductsById(id);
        let productOLD = await this.readProducts();
        let productsMODIF = [{ ...producto, id }, ...productOLD];
        await fs.writeFile(this.patch, JSON.stringify(productsMODIF));
    };

    deleteProductsById = async (id) => {

        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter((products) => products.id != id);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("PRODUCTO ELIMINADO");
    };

}

// //TESTING DESAFIO 3 

// const productos = new ProductManager()


// //AÑADIR PRODUCTOS
// productos.addProduct("reel Beast", "4 rulemanes manija izq o der", 1200, "imagenREEL", "cod 1", 15);
// productos.addProduct("caña de pescar", "2 tramos total de 1,80m", 800, "imagenCAÑA", "cod 2", 25);
// productos.addProduct("caña de pescar Fish", "1 tramo de 2.10", 12320, "imagenCañaFish", "cod 3", 24);
// productos.addProduct("reel Kawana", "6 rulemanes con carretel fino", "33450", "imagenReel", "cod 4", 10);
// productos.addProduct("Carpa camuflada", "Carpa para 4 personas", 50000, "imagenCarpa", "cod 5", 12);
// productos.addProduct("Tanza Multifilamento", "500 metros marca Berkley", 33000, "imagenMulti", "cod 6", 40);
// productos.addProduct("Termo Sifon", "2.5 litros de acero inoxidable", 32000, "imagenTermo", "cod 7", 32);
// productos.addProduct("Botella Stanley", "1 litro varios colores", 12000, "imagenBotella", "cod 8", 23);
// productos.addProduct("Conservadora Yesi", "34 litros varios colores", 40500, "imagenConservadora", "cod 9", 25);
// productos.addProduct("Pistola Co2", "calibre 4.5 + 3 garrafas de Co2", 97000, "imagenPistola", "cod 10", 10);



// OBTENER PRODUCTOS
// productos.getProducts()


// OBTENER PRODUCTOS POR ID
// productos.getProductsById(4)


// ELIMINAR PRODUCTO POR ID
// productos.deleteProductsById(3)

// //ACTUALIZAR PRODUCTO POR ID
// productos.updateProducts({
// title:'Titulo3',
// description:'Descripton3',
// price:'3240',
// image:'Image3',
// code:'cod 3',
// stock:'15',
// id:'3',
// })

