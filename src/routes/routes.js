const express = require('express');
const router = express.Router();
const controllers = require('../controllers/createContentType');
const middleware = require('../middlewares/validateJWT');



// router.post('/create/contenttype', controllers.createContentType);
// router.post('/create/instance', controllers.createInstance);
// router.post('/create/instance', controllers.createInstance);
// router.get('/all/contenttype', controllers.getAllContentTypesData);
// router.get('/all/contenttype/instances/:contentId', controllers.getAllContentTypesInstanceValue);
// router.put('/upadte/contenttype/schema/add', controllers.addFieldToContentSchema);
// router.put('/upadte/contenttype/schema/delete', controllers.deleteFieldToContentSchema);
// router.get('/data/content/:contentName', controllers.getContentDataByName);
// router.delete('/delete/instance/:id', controllers.deleteInstanceById);
// router.put('/upadte/contenttype/schema/name', controllers.editFieldName);
// router.put('/upadte/instance/:id', controllers.upadteInstanceValueById);
// router.post('/create/contenttype', middleware.validateJWT, controllers.createContentType);

// router.post('/create/instance', controllers.createInstance);
router.post('/create/instance', middleware.validateJWT, controllers.createInstance);
router.get('/all/contenttype', middleware.validateJWT, controllers.getAllContentTypesData);
router.get('/all/contenttype/instances/:contentId', middleware.validateJWT, controllers.getAllContentTypesInstanceValue);
router.put('/upadte/contenttype/schema/add', middleware.validateJWT, controllers.addFieldToContentSchema);

router.put('/upadte/contenttype/schema/delete', middleware.validateJWT, controllers.deleteFieldToContentSchema);
router.get('/data/content/:contentName', middleware.validateJWT, controllers.getContentDataByName);
router.delete('/delete/instance/:id', middleware.validateJWT, controllers.deleteInstanceById);
router.put('/upadte/contenttype/schema/name', middleware.validateJWT, controllers.editFieldName);
router.put('/upadte/instance/:id', middleware.validateJWT, controllers.upadteInstanceValueById);
router.post('/create/contenttype', middleware.validateJWT, controllers.createContentType);

module.exports = router;