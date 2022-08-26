/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      username:
 *         type: string
 *         description: The username of the user
 *      adress:
 *        type: string
 *        description: The adress of the user
 *      email:
 *        type: string
 *        description: The email of the user
 *      password:
 *        type: string
 *        description: The password of the user
 *      roleId:
 *        type: number
 *        description: The role of the user in the system
 *    example:
 *      username: "user1"
 *      adress: "adress1"
 *      email: "user@user.com"
 *      password: "password"
 *      roleId: 1
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      title:
 *        type: string
 *        description: The title of the product
 *      description:
 *        type: string
 *        description: The description of the product
 *      price:
 *        type: number
 *        description: The price of the product
 *      discountPercentage:
 *        type: number
 *        description: The discount percentage of the product
 *      rating:
 *        type: number
 *        description: The rating of the product
 *      stock:
 *         type: number
 *         description: The stock of the product
 *      category:
 *         type: string
 *         description: The category of the product
 *      thumbnail:
 *         type: string
 *         description: The thumbnail of the product
 *    example:
 *      title: "user1"
 *      description: "adress1"
 *      price: 25
 *      discountPercentage: 10
 *      rating: 4
 *      stock: 135
 *      category: "category1"
 *      thumbnail: "asdagew45t3e3sdfgsdfdsfg"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Cart:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *        description: The of the user
 *      items:
 *        type: array
 *        description: The products of the cart *
 *        items:
 *          allOf:
 *           - $ref: '#/components/schemas/Product'
 *      timestamp:
 *        type: date
 *        description: The date of creation of the cart
 *    example:
 *     email: "email@email.com"
 *     items: [{title: "product1", description: "description1", price: 25, discountPercentage: 10, rating: 4, stock: 135, category: "category1", thumbnail: "asdagew45t3e3sdfgsdfdsfg"},{title: "product1", description: "description1", price: 25, discountPercentage: 10, rating: 4, stock: 135, category: "category1", thumbnail: "asdagew45t3e3sdfgsdfdsfg"}]
 *     timestamp: "2020-01-01T00:00:00.000Z"
 */
