const router = require('express').Router();

const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
// NOTE: this endpoint will add a comment to associated pizaa
router
    .route('/:pizzaId')
    .post(addComment);

// /api/comments/<pizzaId>/<commentId>
// NOTE: this route will allow for deleting the comment itself, and removing its (the comment id) from the pizza's document
router
    .route('/:pizzaId/:commentId')
    // we are using put below since we are updating a comment by adding a reply to it
    .put(addReply)
    .delete(removeComment)

// /api/comments/<pizzaId>/<commentId>/<replyId>
// NOTE: this route will allow us to delete a reply. We include both the comment and reply id since we need both in order to delete a reply... in other words, we are saying "Go to this pizza, then look at this particular comment, then delete this one reply."
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);

module.exports = router;