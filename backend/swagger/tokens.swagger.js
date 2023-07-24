/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 생성 및 휴대폰 문자 전송
 *     tags: [Tokens]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                     properties:
 *                         phone:
 *                             type: string
 *                             example: 010-1234-5678
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *            application/json:
 *                schema:
 *                   type: array
 *                   items:
 *                      properties:
 *                          message:
 *                             type: String
 *                             example: 토큰 생성 완료
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 토큰 인증
 *     tags: [Tokens]
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     required:
 *                     properties:
 *                         phone:
 *                             type: string
 *                             example: 010-1234-5678
 *                         token:
 *                             type: String
 *                             example: 966123
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *            application/json:
 *                schema:
 *                   type: array
 *                   items:
 *                      properties:
 *                          message:
 *                             type: String
 *                             example: True
 */