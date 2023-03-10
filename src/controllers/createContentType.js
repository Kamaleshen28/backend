const services = require('../services/addContentType');
const httpError = require('../utils/httpError');

const createContentType = async (req, res) => {
  try {

    const data = req.body;
    console.log('1', req.body);
    const result = await services.addContentTypeToDatabase(data);
    res.status(201).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const createInstance = async (req, res) => {
  try {
    const data = req.body;
    console.log('QQ: ', data);
    const result = await services.addInstanceValueToDatabase(data);
    res.status(201).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAllContentTypesData = async (req, res) => {
  try {
    const result = await services.getAllContentTypeNames();
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getAllContentTypesInstanceValue = async (req, res) => {
  try {
    const data = Number(req.params.contentId);
    console.log('PPP', data);
    const result = await services.getAllInstances(data);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const addFieldToContentSchema = async (req, res) => {
  try {
    console.log('KKK', req.body);
    const { contentId, field } = req.body.newFieldName;
    const result = await services.addFieldToSchema(contentId, field);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const deleteFieldToContentSchema = async (req, res) => {
  try {
    const { contentId, field } = req.body;
    const result = await services.deleteFieldToSchema(contentId, field);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getContentDataByName = async (req, res) => {
  try {
    console.log('RERE: ', req.params);
    const { contentName } = req.params;
    const result = await services.getContentData(contentName);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const deleteInstanceById = async (req, res) => {
  try {
    console.log('RERE: ', req.params);
    const { id } = req.params;
    const result = await services.deleteInstance(Number(id));
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const editFieldName = async (req, res) => {
  try {
    console.log('WEWE', req.body);
    const { contentId, oldField, newField } = req.body.newFieldName;
    const result = await services.editField(Number(contentId), oldField, newField);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
const upadteInstanceValueById = async (req, res) => {
  try {
    console.log('WEWE', req.params);
    const { id } = req.params;
    const { instanceValues } = req.body;
    const result = await services.updateInstance(Number(id), instanceValues);
    res.status(200).json({ message: result });
  } catch (error) {
    if (error instanceof httpError) {
      res.status(error.code).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  createContentType,
  createInstance,
  getAllContentTypesData,
  getAllContentTypesInstanceValue,
  addFieldToContentSchema,
  deleteFieldToContentSchema,
  getContentDataByName,
  deleteInstanceById,
  editFieldName,
  upadteInstanceValueById
};