const router = require('express').Router();

const { 
    addComment, 
    removeComment 
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
// NOTE: this endpoint will add a comment to associated pizaa
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// NOTE: this route will allow for deleting the comment itself, and removing its (the comment id) from the pizza's document
router.route('/:pizzaId/:commentId').delete(removeComment);

module.exports = router;