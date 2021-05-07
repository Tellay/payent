const router = require('express').Router();
const Products = require('../../models/product');
const { customAlphabet } = require('nanoid');

router.get('/', async (req, res) => {
    await Products.find({}, function(err, products) {
        if(!products || !products.length) return res.json({ msg: "No products available!" });
        res.json(products);
    });
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    if(isNaN(id)) return res.json({ msg: 'Only numbers!' })
    const Product = await Products.findOne({ id });
    if(!Product) return res.json({ msg: 'Nothing found.' });
    res.json(Product);
});

router.post('/create', async (req, res) => {
    const { title, description, price, discount, imgUrl } = req.body;
    const generateID = customAlphabet('1234567890', 15);
    const createProduct = await Products.create({ id: parseInt(generateID()), title: title, description: description, price: price, discount: discount, imgUrl: imgUrl, createdAt: new Date() })
    res.json(createProduct);
});

router.put('/update', async (req, res) => {
    const { id, title, description, price, discount, imgUrl } = req.body;
    await Products.findOne({ id: id })
    .then(product => {
        if(!product) return res.json({ msg: "No product found." });
        product.title = title;
        product.description = description;
        product.price = price;
        product.discount = discount;
        product.imgUrl = imgUrl;
        product.save();
    });

    res.json({ msg: "Successfully updated!" });
});

router.delete('/delete', async (req, res) => {
    const { id } = req.body;
    const deleting = await Products.deleteOne({ id: id });
    if(!deleting) return res.json({ msg: "No product found." })
    res.json({ msg: 'Successfully deleted!' });
});

module.exports = router;