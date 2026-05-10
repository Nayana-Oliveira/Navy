import express from 'express';

import postitController from './controller/postitController.js';
import postController from './controller/postController.js'
import reviewController from './controller/reviewController.js'
import adminController from './controller/adminController.js'

export default function adicionarRotas(api) {
  api.use('/public/storage/postits', express.static('public/storage/postits'));
  api.use('/public/storage/posts', express.static('public/storage/posts'));
  api.use('/public/storage/profile', express.static('public/storage/profile'));
  api.use('/public/storage/reviews', express.static('public/storage/reviews'));

  api.use(postitController);
  api.use(postController);
  api.use(reviewController);
  api.use(adminController);
}