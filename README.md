How to use:

1. Run the commands below in a terminal:

```
cd backend
uvicorn main:app --reload --port 9000
```

2. run the commands below in an other terminal:

```
cd temp-web
npm ci
npm start
```

3. Visit http://localhost:3000
4. Test all API endpoints on http://localhost:9000/docs

This simple mercari provides basic functions as following:
- List item
- Show items
- Display item images
- Get item by id (API only)
- Search items by keyword in name (API only)
- Delete item (API only)

*# Video upload is also implemented in backend but the simple web is not able to show videos.*

Note that data validation is implemented on both client and server side.
Below are the constraints:
- Item name must be no longer than 32 characters
- Category name must be no longer than 12 characters
- Image must be in jpg or jpeg format
- Video must be in mov format

