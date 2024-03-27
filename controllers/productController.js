const { Product } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, description, price, categoryId } = req.body;
            const { img } = req.files
            let filename = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            const product = await Product.create({ name, description, price, categoryId, img: filename });
            return res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { categoryId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit
        let products;
        if (categoryId) {
            products = await Product.findAndCountAll({where: {categoryId}, limit, offset})
        } else {
            products = await Product.findAndCountAll({limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params;
        const product = await Product.findOne({
            where: {id}
        })
        return res.json(product)
    }
}

module.exports = new ProductController()
