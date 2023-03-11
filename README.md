# backend

A Content Management System(CMS) is an application used to manage different types of web content allowing multiple contributors to create, edit and publish. Content in a CMS is typically stored in a database and displayed in a presentation layer based on a set of templates.

The following are the basic features of a CMS:
Content creation (allows users to easily create and format content)
Content storage (stores content in one place, in a consistent fashion)
Workflow management (assigns privileges and responsibilities based on roles such as authors, editors and admins)
Publishing (organises and pushes content live)

Your task is to implement a barebones version of a CMS.

Features:
User should have the register and login (use auth-service we have already built)
All subsequent API calls from the front-end should be authenticated (use auth-service we have already built)
Create a content type and dynamically update it
Create data for a given content type
Get all data of a given content type

This repo provides APIs for all the above mentioned features.


APIs supported

POST:
1. To create content type 
2. To create data for a given content type

GET:
3. To get all the data of the given content type
4. To get the data about the content type given content name
5. To get all the content types data

PUT
6. To add the field to the schema of the given content type
7. To delete the field to the schema of the given content type
8. To edit the field name of the content type
9. To edit particular data of the given content type
10. To edit the content type name

DELETE:
11. To delete particular data of the given content type


