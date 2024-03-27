const Router = require('express');
const router = new Router();
const categoryRouter = require('./categoryRoutes');
const productRouter = require('./productRoutes');
const userRouter = require('./userRoutes');

router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/user', userRouter)

module.exports = router;