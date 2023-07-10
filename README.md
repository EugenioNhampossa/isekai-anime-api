# ISEKAY

Welcome to the Anime API! This API provides information about animes, including details about animes, genres, authors, studios, and characters. It's a comprehensive resource for developers looking to integrate anime data into their applications or websites.

## Base URL

The base URL for accessing the Anime API is: `https://isekai.onrender.com`

## Endpoints

### 1. `/animes`

This endpoint retrieves information about animes.

#### Request

- Method: `GET`
- URL: `/animes`

##### Parameters

- `perPage` (optional): The maximum number of animes to retrieve per page. Default is 10.
- `page` (optional): The page number of the results. Default is 1.

##### Example

```
GET /animes?limit=10&page=1
```

#### Response

The response will be a JSON object containing an array of anime objects.

##### Example

```json
{
  "data": [
    {
      "id": c7a569d0-fa08-4fcb-9991-ec98669270d6,
      "title": "Attack on Titan",
      "synopsis": "A story about humanity's struggle against giant humanoid creatures known as Titans.",
      "release_year": 2013,
      "rating": 8.9,
      "genres": ["Action", "Drama", "Fantasy"],
      "author": "Hajime Isayama",
      "studio": "Wit Studio",
      "characters": [
        "Eren Yeager",
        "Mikasa Ackerman",
        "Armin Arlert"
      ]
    },
    // Other anime objects...
  ]
}
```

### 2. `/genres`

This endpoint retrieves a list of anime genres.

#### Request

- Method: `GET`
- URL: `/genres`

##### Example

```
GET /genres
```

#### Response

The response will be a JSON object containing an array of genre strings.

##### Example

```json
{
  "data": [
    "Action",
    "Adventure",
    "Comedy",
    // Other genres...
  ]
}
```

### 3. `/authors`

This endpoint retrieves a list of anime authors.

#### Request

- Method: `GET`
- URL: `/authors`

##### Example

```
GET /authors
```

#### Response

The response will be a JSON object containing an array of author strings.

##### Example

```json
{
  "data": [
    "Hajime Isayama",
    "Masashi Kishimoto",
    "Eiichiro Oda",
    // Other authors...
  ]
}
```

### 4. `/studios`

This endpoint retrieves a list of anime studios.

#### Request

- Method: `GET`
- URL: `/studios`

##### Example

```
GET /studios
```

#### Response

The response will be a JSON object containing an array of studio strings.

##### Example

```json
{
  "data": [
    "Wit Studio",
    "Studio Ghibli",
    "Bones",
    // Other studios...
  ]
}
```

### 5. `/characters`

This endpoint retrieves a list of anime characters.

#### Request

- Method: `GET`
- URL: `/characters`

##### Example

```
GET /characters
```

#### Response

The response will be a JSON object containing an array of character strings.

##### Example

```json
{
  "data": [
    "Eren Yeager",
    "Mikasa Ackerman",
    "Naruto Uzumaki",
    // Other characters...
  ]
}
```

## Authentication

The Anime API does not currently require authentication. However, please note that this is subject to change in the future for security reasons.

## Rate Limiting

To ensure fair usage and prevent abuse, the Anime API imposes rate limits. Each endpoint has its own rate limit, which allows a certain number of requests per minute. If the rate limit is exceeded, you will receive a `429 Too Many Requests` response.

## Error Handling

In case of an error, the API will return an appropriate HTTP status code along with an error message in the response body. Please refer to the API documentation or error response for more details.

## Conclusion

We hope you find the Anime API useful for integrating anime data into your projects. If you have any questions or encounter any issues, please don't hesitate to reach out to our support team. Happy coding!
