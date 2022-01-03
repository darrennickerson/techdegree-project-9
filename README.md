# Techdegree project 9

<h2 align="center"> Rest API</h2>

### Users

_/api/users_ **GET**
Returns current authenticated user

### Sample response

```
{
  "id": 1,
  "firstName": "Joe",
  "lastName": "Smith",
  "emailAddress": "joe@smith.com"
}
```

_/api/users_ **POST**

All fields are required and a valid email is needed.

#### Sample request

```
{
    "firstName": "Darren",
    "lastName": "Nickerson",
    "emailAddress": "darren@me.com",
    "password": "password"
}
```

### Courses

_/api/courses_ **GET**

Gets all courses.

### Sample Response

```
[
{
    "id": 1,
    "title": "Updated course!",
    "description": "The course description has been updated as well.",
    "estimatedTime": "12 hours",
    "materialsNeeded": "* 1/2 x 3/4 inch parting strip\n* 1 x 2 common pine\n* 1 x 4 common pine\n* 1 x 10 common pine\n* 1/4 inch thick lauan plywood\n* Finishing Nails\n* Sandpaper\n* Wood Glue\n* Wood Filler\n* Minwax Oil Based Polyurethane\n",
    "User": {
      "id": 1,
      "firstName": "Joe",
      "lastName": "Smith",
      "emailAddress": "joe@smith.com"
    }
  },
  {
    ....
  }
]
```
