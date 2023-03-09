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
    const data = req.body.contentId;
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
    const { contentId, field } = req.body;
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

module.exports = {
  createContentType,
  createInstance,
  getAllContentTypesData,
  getAllContentTypesInstanceValue,
  addFieldToContentSchema,
  deleteFieldToContentSchema,
  getContentDataByName
};