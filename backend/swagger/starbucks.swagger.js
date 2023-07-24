/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 스타벅스 메뉴 가져오기
 *     tags: [Starbucks]
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
 *                             example: 64ba3a4ee5348a9916ca0cfc
 *                          img:
 *                             type: String
 *                             example: https://image.starbucks.co.kr/upload/store/skuimg/2022/08/[9200000003763]_20220803131322551.jpg
 *                          name:
 *                             type: String
 *                             example: 딸기 아사이 레모네이트 스타벅스 리프레셔
 */