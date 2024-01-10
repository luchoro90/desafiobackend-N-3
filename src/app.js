import express from "express"
import ProductManager from "./components/ProductManager.js"


const app = express()
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();
const readProducts = productos.readProducts()

app.get("/products", async (req, res) => {

    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)

    res.send(productLimit);
})

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productsById = allProducts.find(product => product.id == id)

    if (productsById) {
        res.send(productsById)
        console.log(id)
    }
    else {
        res.status(404).json({ error: `Producto con ID ${id} no encontrado.` });
    }

    res.send(productsById)
    console.log(id)
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por Local Host ${server.address().port}`)
})

server.on("Error.", (Error) => console.log(`Error del servidor ${Error}`))


