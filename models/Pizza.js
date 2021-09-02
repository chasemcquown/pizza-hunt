const { Schema, model } = require('mongoose');

// the following imported function will format the dat for us so we have a cleaner display date on teh front end
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
    {
      pizzaName: {
        type: String,
        required: true,
        trim: true
      },
      createdBy: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // the following code will format the date via the dateFormat function in the utils folder. This will format the date before it gets sent to the front end.
        get: (createdAtVal) => dateFormat(createdAtVal)
      },
      size: {
        type: String,
        required: true,
        // NOTE: enum option stands for enumerable, a popular term in web development that refers to a set of data that can be iterated over—much like using the for...in loop to iterate through an object.
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
      },
      toppings: [],
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ]
    },
    // you MUST include toJSON if you wish to use virtuals AND getters. NOTE: we set id to false because this is a virtual that Mongoose returns, and we don’t need it
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

// get total count of comments and replies on retrieval... this is a virtual, which worls like any other function. In this case, it will allow us to find the comment count for a pizza recipe
PizzaSchema.virtual('commentCount').get(function() {
    // see 18.3.4 in modules for explanation of code below
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;