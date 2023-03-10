const { contentType, collectionValue } = require('../../database/models');
const httpError = require('../utils/httpError');


const addContentTypeToDatabase = async (data) => {
  const existingContentType = await contentType.findAll({
    where: { contentName: data.contentName }
  });

  if (existingContentType.length != 0) {
    throw new httpError('content type alredy exists', 403);
  }
  const response = await contentType.create(data);
  return response;
};

const addInstanceValueToDatabase = async (data) => {
  const existingContentType = await contentType.findAll({
    where: { id: data.contentId }
  });
  if (existingContentType.length === 0) {
    throw new httpError('content type does not exists', 403);
  }
  const existingInstance = await collectionValue.findAll({
    where: { instanceValues: data.instanceValues }
  });

  if (existingInstance.length != 0) {
    throw new httpError('Instance alredy exists', 200);
  }
  const response = await collectionValue.create(data);
  return response;
};

const getAllContentTypeNames = async () => {
  const allContent = await contentType.findAll({
    attributes: ['id', 'contentName', 'contentSchema']
  });
  if (allContent.length === 0) {
    throw new httpError('No content types exist', 200);
  }

  return allContent;
};

const getAllInstances = async (contentId) => {
  const allContent = await collectionValue.findAll({
    attributes: ['id', 'contentId', 'instanceValues'],
    where: { contentId }
  });
  console.log('CAME HERE', allContent);
  // if (allContent.length === 0) {
  //   throw new httpError('No Instance of this content type exist', 404);
  // }

  return allContent;
};

const addFieldToSchema = async (id, newField) => {
  const allContent = await contentType.findOne({
    attributes: ['contentSchema'],
    where: { id }
  });
  const schema = allContent.dataValues.contentSchema;
  schema[newField] = '';
  const response = await contentType.update({ contentSchema: schema }, {
    where: { id }
  });
  updateInstanceValuesWithNewField(id, newField);

  if (!allContent) {
    throw new httpError('No Instance of this content type exist', 404);
  }
  return response;
};

const updateInstanceValuesWithNewField = async (contentId, newField) => {
  const allInstanceData = await getAllInstances(contentId);
  for (const data of allInstanceData) {
    const { instanceValues, id } = data.dataValues;
    instanceValues[newField] = '';
    const response = await collectionValue.update({ instanceValues }, {
      where: { id }
    });
    console.log('1>>:', response);
  }
};


const deleteFieldToSchema = async (id, newField) => {
  const allContent = await contentType.findOne({
    attributes: ['contentSchema'],
    where: { id }
  });
  console.log('CHECK11', allContent);
  const schema = allContent.dataValues.contentSchema;
  console.log('SEC: ', newField);
  delete schema[newField];
  console.log('SEC: ', schema);
  const response = await contentType.update({ contentSchema: schema }, {
    where: { id }
  });
  console.log('WORKING TILL HERE');
  await deleteFieldFromInstanceValues(id, newField);
  console.log('CHECK22', allContent);

  if (!allContent) {
    throw new httpError('No Instance of this content type exist', 200);
  }
  console.log('IMININ: ', allContent);
  return response;
};

const deleteFieldFromInstanceValues = async (contentId, field) => {
  const allInstanceData = await getAllInstances(contentId);
  for (const data of allInstanceData) {
    const { instanceValues, id } = data.dataValues;
    delete instanceValues[field];
    const response = await collectionValue.update({ instanceValues }, {
      where: { id }
    });
    console.log('1>>:', response);
  }
};


const getContentData = async (contentName) => {
  const response = await contentType.findOne({ where: { contentName } });
  console.log('***', 'GOTGOT', response);
  if (!response) {
    throw new httpError('No Content with the given name exist', 404);

  }
  return response;
};

const deleteInstance = async (id) => {
  const response = await collectionValue.destroy({ where: { id } });
  console.log('***', 'GOTGOT', response);
  return response;
};

const editField = async (id, oldField, newField) => {
  console.log('STRAT', id, oldField, newField);
  const allContent = await contentType.findOne({
    attributes: ['contentSchema'],
    where: { id }
  });
  console.log('CHECK11', allContent);
  const schema = allContent.dataValues.contentSchema;
  console.log('SEC: ', newField);
  delete schema[oldField];
  console.log('SEC: ', schema);
  schema[newField] = '';
  const response = await contentType.update({ contentSchema: schema }, {
    where: { id }
  });
  console.log('WORKING TILL HERE');
  await editFieldFromInstanceValues(id, oldField, newField);
  console.log('CHECK22', allContent);

  if (!allContent) {
    throw new httpError('No Instance of this content type exist', 200);
  }
  console.log('IMININ: ', allContent);
  return response;
};


const editFieldFromInstanceValues = async (contentId, oldField, newField) => {
  const allInstanceData = await getAllInstances(contentId);
  for (const data of allInstanceData) {
    const { instanceValues, id } = data.dataValues;
    const value = instanceValues[oldField];
    delete instanceValues[oldField];
    instanceValues[newField] = value;
    const response = await collectionValue.update({ instanceValues }, {
      where: { id }
    });
    console.log('1>>:', response);
  }
};

const updateInstance = async (id, instanceValues) => {
  const response = await collectionValue.update({ instanceValues }, {
    where: { id }
  });
  console.log('1>>:', response);
  return response;
};

const updateContentName = async (id, contentName) => {
  const response = await contentType.update({ contentName }, {
    where: { id }
  });
  return response;
};


module.exports = {
  addContentTypeToDatabase,
  addInstanceValueToDatabase,
  getAllContentTypeNames,
  getAllInstances,
  addFieldToSchema,
  deleteFieldToSchema,
  getContentData,
  deleteInstance,
  editField,
  updateInstance,
  updateContentName
};