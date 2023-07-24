/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 정보 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *            application/json:
 *                schema:
 *                   type: array
 *                   items:
 *                      properties:
 *                          name:
 *                             type: String
 *                             example: 홍길동
 *                          email:
 *                             type: String
 *                             example: test@gmail.com
 *                          personal:
 *                             type: String
 *                             example: 001212-1234567
 *                          prefer:
 *                             type: String
 *                             example: https://www.naver.com
 *                          phone:
 *                             type: String
 *                             example: "01012345678"
 *                          og:
 *                             type: object
 *                             example:
 *                              {
 *                                  "title": "네이버",
 *                                  "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요.",
 *                                  "image": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
 *                              }
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원 가입
 *     tags: [User]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                     properties:
 *                         name:
 *                             type: string
 *                             example: 홍길동
 *                         email:
 *                             type: string
 *                             example: test@gmail.com
 *                         personal:
 *                             type: string
 *                             example: 001212-1234567
 *                         prefer:
 *                             type: string
 *                             example: https://www.naver.com
 *                         pwd:
 *                             type: string
 *                             example: 1234
 *                         phone:
 *                             type: string
 *                             example: "01012345678"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *            application/json:
 *                schema:
 *                   type: array
 *                   items:
 *                      properties:
 *                          id:
 *                             type: String
 *                             example: 64b9ec59d881f8c4a8c61e11
 */