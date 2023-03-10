const services = require('../../src/services/addContentType');
const httpError = require('../../src/utils/httpError');
const { contentType, collectionValue } = require('../../database/models');


describe('Services', () => {
  describe('addContentTypeToDatabase', () => {
    it('should throw error when there is already a content with given name', () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([1]);
      const mockData = {
        data: { contentName: 'mockName' }
      };
      expect(async () => await services.addContentTypeToDatabase(mockData)).rejects.toThrow(new httpError('content type alredy exists', 403));
    });

    it('should return proper response when when there is no content of the given name in db ', async () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([]);
      const mockData = {
        data: { contentName: 'mockName' }
      };
      jest.spyOn(contentType, 'create').mockResolvedValue({ message: 'created' });

      expect(await services.addContentTypeToDatabase(mockData)).toEqual({ message: 'created' });
    });

  });
  describe('addInstanceValueToDatabase', () => {
    it('should throw error when there is no content with given name', () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([]);
      const mockData = {
        contentId: 3
      };
      expect(async () => await services.addInstanceValueToDatabase(mockData)).rejects.toThrow(new httpError('content type does not exists', 403));
    });

    it('should throw error when instance alredy exist ', async () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([1]);
      const mockData = {
        contentId: 3
      };
      jest.spyOn(collectionValue, 'findAll').mockResolvedValue([1]);
      expect(async () => await services.addInstanceValueToDatabase(mockData)).rejects.toThrow(new httpError('Instance alredy exists', 200));
    });
    it('should throw error when instance alredy exist ', async () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([1]);
      const mockData = {
        contentId: 3
      };
      jest.spyOn(collectionValue, 'findAll').mockResolvedValue([]);
      jest.spyOn(collectionValue, 'create').mockResolvedValue({ data: 'mockData' });
      expect(await services.addInstanceValueToDatabase(mockData)).toEqual({ data: 'mockData' });
    });

  });


  describe('getAllContentTypeNames', () => {
    it('should throw error when there is no contenttypes', () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([]);

      expect(async () => await services.getAllContentTypeNames()).rejects.toThrow(new httpError('No content types exist', 200));
    });
    it('should return prorper value when there is content types ', async () => {
      jest.spyOn(contentType, 'findAll').mockResolvedValue([1]);
      expect(await services.getAllContentTypeNames()).toEqual([1]);
    });
  });

  describe('getAllInstances', () => {
    it('should return prorper value when there is instances', async () => {
      const mockResult = [];
      jest.spyOn(collectionValue, 'findAll').mockResolvedValue(mockResult);
      const mockId = 2;
      expect(await services.getAllInstances(mockId)).toEqual(mockResult);
    });

  });
  describe('getContentData', () => {
    it('should get content data', async () => {
      const mockContentName = 'testName';
      jest.spyOn(contentType, 'findOne').mockResolvedValue([1]);
      expect(await services.getContentData(mockContentName)).toEqual([1]);
    });
    it('should delete field from instances', async () => {
      const mockContentName = 'testName';
      jest.spyOn(contentType, 'findOne').mockResolvedValue();
      expect(async () => await services.getContentData(mockContentName)).rejects.toThrow(new httpError('No Content with the given name exist', 404));
    });
  });

  describe('deleteInstance', () => {
    it('should delete instance ', async () => {
      const id = 1;
      jest.spyOn(collectionValue, 'destroy').mockResolvedValue([1]);
      expect(await services.deleteInstance(id)).toEqual([1]);
    });

  });
  describe('updateInstance', () => {
    it('should update instance ', async () => {
      const id = 1;
      const instanceValues = 'mock';
      jest.spyOn(collectionValue, 'update').mockResolvedValue([1]);
      expect(await services.updateInstance(id, instanceValues)).toEqual([1]);
    });
  });

  describe('updateContentName', () => {
    it('should update content name ', async () => {
      const id = 1;
      const contentName = 'mock';
      jest.spyOn(contentType, 'update').mockResolvedValue([1]);
      expect(await services.updateContentName(id, contentName)).toEqual([1]);
    });
  });

  // describe('addFieldToSchema', () => {
  //   it('should return prorper value when there is instances', async () => {
  //     const mockId = 2;
  //     const mockField = 'testField';
  //     const mockResult = ['mockData'];

  //     jest.spyOn(contentType, 'findOne').mockResolvedValue(mockResult);
  //     expect(await services.addFieldToSchema(mockId, mockField)).toEqual(mockResult);
  //   });

  //   it('should throw error when there is no instance', async () => {
  //     const mockId = 2;
  //     const mockField = 'testField';

  //     jest.spyOn(contentType, 'findOne').mockResolvedValue();
  //     jest.spyOn(contentType, 'update').mockResolvedValue();
  //     expect(async () => await services.addFieldToSchema(mockId, mockField)).rejects.toThrow(new httpError('No Instance of this content type exist', 404));

  //   });

  // });













});