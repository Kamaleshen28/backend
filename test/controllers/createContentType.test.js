const controllers = require('../../src/controllers/createContentType');
const services = require('../../src/services/addContentType');
const httpError = require('../../src/utils/httpError');

describe('Controllers', () => {
  describe('createContentType', () => {
    it('should return 201 and a message', async () => {
      jest.spyOn(services, 'addContentTypeToDatabase').mockResolvedValue([1]);
      const mockReq = {
        body: {
          contentName: 'ContentType5',
          contentSchema: { 'name': 'goo', 'revenue': '123' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 403 and a message if the content type already exists', async () => {

      jest.spyOn(services, 'addContentTypeToDatabase').mockRejectedValue(new httpError('content type alredy exists', 403));
      const mockReq = {
        body: {
          contentName: 'ContentType5',
          contentSchema: { 'name': 'goo', 'revenue': '123' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(403);
      expect(mockRes.json).toBeCalledWith({ message: 'content type alredy exists' });
    });
    it('should return 500 internal error when there is a db error', async () => {

      jest.spyOn(services, 'addContentTypeToDatabase').mockRejectedValue(new Error('somehting went wrong', 500));
      const mockReq = {
        body: {
          contentName: 'ContentType5',
          contentSchema: { 'name': 'goo', 'revenue': '123' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'somehting went wrong' });
    });
  });

  describe('createInstance', () => {
    it('should return 201 and a message when the instance is created', async () => {
      jest.spyOn(services, 'addInstanceValueToDatabase').mockResolvedValue([1]);
      const mockReq = {
        body: {
          contentId: 99,
          instanceValues: { 'name': 'kamal', 'age': '21' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createInstance(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 403 and a message when the content type is not there', async () => {
      jest.spyOn(services, 'addInstanceValueToDatabase').mockRejectedValue(new httpError('content type does not exists', 403));
      const mockReq = {
        body: {
          contentId: 99,
          instanceValues: { 'name': 'kamal', 'age': '21' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createInstance(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(403);
      expect(mockRes.json).toBeCalledWith({ message: 'content type does not exists' });
    });
    it('should return 200 and a message when the instance already exist', async () => {
      jest.spyOn(services, 'addInstanceValueToDatabase').mockRejectedValue(new httpError('Instance alredy exists', 200));
      const mockReq = {
        body: {
          contentId: 99,
          instanceValues: { 'name': 'kamal', 'age': '21' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createInstance(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'Instance alredy exists' });
    });
    it('should return 500 and a message when error from db', async () => {
      jest.spyOn(services, 'addInstanceValueToDatabase').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        body: {
          contentId: 99,
          instanceValues: { 'name': 'kamal', 'age': '21' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.createInstance(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });
  });

  describe('getAllContentTypesData', () => {
    it('should return 200 and a message when data is fetched', async () => {
      jest.spyOn(services, 'getAllContentTypeNames').mockResolvedValue([]);
      const mockReq = {
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getAllContentTypesData(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [] });
    });
    it('should return 200 and a message when no content types exist', async () => {
      jest.spyOn(services, 'getAllContentTypeNames').mockRejectedValue(new httpError('No content types exist', 200));
      const mockReq = {
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getAllContentTypesData(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'No content types exist' });
    });
    it('should return 500 and a message when there is internal db error', async () => {
      jest.spyOn(services, 'getAllContentTypeNames').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        body: {
          contentId: 99,
          instanceValues: { 'name': 'kamal', 'age': '21' }
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getAllContentTypesData(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });


  describe('getAllContentTypesInstanceValue', () => {
    it('should return 200 and a message when data is fetched', async () => {
      jest.spyOn(services, 'getAllInstances').mockResolvedValue([{ id: 1, contentName: 2, instanceValues: {} }]);
      const mockReq = {
        params: { contentId: 4 }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getAllContentTypesInstanceValue(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [{ id: 1, contentName: 2, instanceValues: {} }] });
    });
    it('should return 404 and a message when no instance of this content type exist', async () => {
      jest.spyOn(services, 'getAllInstances').mockRejectedValue(new httpError('No Instance of this content type exist', 404));
      const mockReq = {
        params: { contentId: 4 }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getAllContentTypesInstanceValue(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'No Instance of this content type exist' });
    });
    it('should return 500 and a message when there is internal db error', async () => {
      jest.spyOn(services, 'getAllInstances').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        params: { contentId: 4 }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getAllContentTypesInstanceValue(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });

  describe('addFieldToContentSchema', () => {
    it('should return 200 and a message when data is fetched', async () => {
      jest.spyOn(services, 'addFieldToSchema').mockResolvedValue([1]);
      const mockReq = {
        body: { newFieldName: { contentId: 1, field: 'newWorth' } }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addFieldToContentSchema(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 404 and a message when no instance of this content type exist', async () => {
      jest.spyOn(services, 'addFieldToSchema').mockRejectedValue(new httpError('No Instance of this content type exist', 404));
      const mockReq = {
        body: { newFieldName: { contentId: 1, field: 'newWorth' } }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addFieldToContentSchema(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'No Instance of this content type exist' });
    });
    it('should return 500 and a message when there is internal db error', async () => {
      jest.spyOn(services, 'addFieldToSchema').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        body: { newFieldName: { contentId: 1, field: 'newWorth' } }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addFieldToContentSchema(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });

  describe('deleteFieldToContentSchema', () => {
    it('should return 200 and a message when data is fetched', async () => {
      jest.spyOn(services, 'deleteFieldToSchema').mockResolvedValue([1]);
      const mockReq = {
        body: { contentId: 1, field: 'newWorth' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.deleteFieldToContentSchema(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 404 and a message when no instance of this content type exist', async () => {
      jest.spyOn(services, 'deleteFieldToSchema').mockRejectedValue(new httpError('No Instance of this content type exist', 200));
      const mockReq = {
        body: { contentId: 1, field: 'newWorth' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.deleteFieldToContentSchema(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'No Instance of this content type exist' });
    });
    it('should return 500 and a message when there is internal db error', async () => {
      jest.spyOn(services, 'deleteFieldToSchema').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        body: { contentId: 1, field: 'newWorth' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.deleteFieldToContentSchema(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });

  describe('getContentDataByName', () => {
    it('should return 200 and a message when data is fetched', async () => {
      jest.spyOn(services, 'getContentData').mockResolvedValue([1]);
      const mockReq = {
        params: { contentName: 'mockName' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getContentDataByName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 404 and a message when no instance of this content type exist', async () => {
      jest.spyOn(services, 'getContentData').mockRejectedValue(new httpError('No Instance of this content type exist', 200));
      const mockReq = {
        params: { contentName: 'mockName' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getContentDataByName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'No Instance of this content type exist' });
    });
    it('should return 500 and a message when there is internal db error', async () => {
      jest.spyOn(services, 'getContentData').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        params: { contentName: 'mockName' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getContentDataByName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });
  describe('deleteInstanceById', () => {
    it('should return 200 with a message when data is deleted', async () => {
      jest.spyOn(services, 'deleteInstance').mockResolvedValue([1]);
      const mockReq = {
        params: { id: 20 }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.deleteInstanceById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });

    it('should return 500 and a message when there is internal db error', async () => {
      jest.spyOn(services, 'deleteInstance').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        params: { id: 20 }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.deleteInstanceById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });

  describe('editFieldName', () => {
    it('should return 200 with a message when data is edited', async () => {
      jest.spyOn(services, 'editField').mockResolvedValue([1]);
      const mockReq = {
        body: { newFieldName: { contentId: '1', oldField: 'rank', newField: 'rating' } }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.editFieldName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });

    it('should return 200 and a message when there is No Instance of the content', async () => {
      jest.spyOn(services, 'editField').mockRejectedValue(new httpError('No Instance of this content type exist', 200));
      const mockReq = {
        body: { newFieldName: { contentId: '1', oldField: 'rank', newField: 'rating' } }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.editFieldName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'No Instance of this content type exist' });
    });
    it('should return 500 and a message when there is db error', async () => {
      jest.spyOn(services, 'editField').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        body: { newFieldName: { contentId: '1', oldField: 'rank', newField: 'rating' } }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.editFieldName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });
  describe('upadteInstanceValueById', () => {
    it('should return 200 with a message when data is updated', async () => {
      jest.spyOn(services, 'updateInstance').mockResolvedValue([1]);
      const mockReq = {
        params: { id: 2 },
        body: { instanceValues: {} }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.upadteInstanceValueById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 500 and a message when there is db error', async () => {
      jest.spyOn(services, 'updateInstance').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        params: { id: 2 },
        body: { instanceValues: {} }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.upadteInstanceValueById(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });
  describe('updateContentTypeName', () => {
    it('should return 200 with a message when data is updated', async () => {
      jest.spyOn(services, 'updateContentName').mockResolvedValue([1]);
      const mockReq = {
        body: { id: 2, contentName: 'mockName' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateContentTypeName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: [1] });
    });
    it('should return 500 and a message when there is db error', async () => {
      jest.spyOn(services, 'updateContentName').mockRejectedValue(new Error('something went wrong', 500));
      const mockReq = {
        body: { id: 2, contentName: 'mockName' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateContentTypeName(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'something went wrong' });
    });

  });





















});