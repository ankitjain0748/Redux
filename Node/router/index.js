const router=require("express").Router();

const controller =require('../controller/user')


router.post('/signup', controller.singup)

router.post('/login', controller.Login)
router.get('/list', controller.list)

router.post('/record', controller.data)

router.get('/listdata', controller.listdata)
router.put('/updateid/:id', controller.update)

router.delete('/deleteid/:id', controller.Delete)




module.exports =router;