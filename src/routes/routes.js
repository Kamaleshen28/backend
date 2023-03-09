const express = require('express');
const router = express.Router();
const controllers = require('../controllers/createContentType');
// const middleware = require('../middlewares/validateJWT');



router.post('/create/contenttype', controllers.createContentType);
router.post('/create/instance', controllers.createInstance);
router.get('/all/contenttype', controllers.getAllContentTypesData);
router.get('/all/contenttype/instances', controllers.getAllContentTypesInstanceValue);
router.put('/upadte/contenttype/schema/add', controllers.addFieldToContentSchema);
router.put('/upadte/contenttype/schema/delete', controllers.deleteFieldToContentSchema);
router.get('/data/content/:contentName', controllers.getContentDataByName);
// router.post('/create/contenttype', middleware.validateJWT, controllers.createContentType);

module.exports = router;