const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Review = require('../../models/Review');
require('dotenv').config();

const user = async userId => {
    try{
        const user = await User.findById(userId);
                return { 
                    ...user._doc, 
                    _id: user.id
                };
    }catch(err){
        throw err;
    }
}

const review = async username => {
    try{
        const review = await Review.findOne({username: username});
        return {
            ...review._doc,
            _id: review.id
        };
    }catch(err){
        throw err;
    }
}

module.exports = {
    users: async () => {
        try{
            const users = await User.find()
            return users.map(user => {
                return {
                    ...user._doc, 
                    _id: user.id};
            })
        }catch(err){
            throw err
        }
        
    },
    reviews: async () => {
        try{
            const reviews = await Review.find()
                return reviews.map(review => {
                    return {
                        ...review._doc,
                        _id: review.id
                    };
                });
        }catch(err){
            throw err;
        }
    },
    createUser: async args => {
            try{
            const existingUser =  await User.findOne({email: args.userInput.email})
                if(existingUser){
                    throw new Error("Email exists already.")
                }

            const userTwo = await User.findOne({username: args.userInput.username})
                if(userTwo){
                    throw new Error("Username exists already.")
                }
            
            if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(args.userInput.email) == false){
                throw new Error("Email not valid");
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            
            const finalUser = new User({
                username: args.userInput.username,
                email: args.userInput.email,
                password: hashedPassword,
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName
            });
            const result = await finalUser.save();
            
            return {...result._doc, password: null, _id: result.id}
        }catch(err){
            throw err;
        }
        
        
    },
    createReview: async (args, req) => {
        const review = new Review({
            username: args.reviewInput.username,
            movieId: args.reviewInput.movieId,
            rating: args.reviewInput.rating,
            comment: args.reviewInput.comment
        });
        try{
            const result = await review.save();
            return{
                ...result._doc,
                _id: result.id
            }
        }catch(err){
            throw err;
        }
    },
    login: async ({username, password}) => {
        const gottenUser = await User.findOne({username: username});
        if(!gottenUser){
            throw new Error('Username does not exist')
        }
        const isPassword = await bcrypt.compare(password, gottenUser.password);
        if(!isPassword){
            throw new Error('Password not correct');
        }
        const token = jwt.sign({userId: gottenUser.id, username: gottenUser.username}, `${process.env.SECRET_KEY}`,{
            expiresIn: '1h'
        });

        return {userId: gottenUser.id, token: token, tkExp: 1, username: gottenUser.username}

    },
    userById: async ({id}) => {
        try{
            const user = await User.findById(id);
                return { 
                    ...user._doc, 
                    _id: user.id
                };
        }catch(err){
            throw err;
        }
    },
    userByUsername: async ({username}) => {
        try{
            const user = await User.findOne({username: username});
            return { 
                ...user._doc, 
                _id: user.id
            };
        }catch(err){
            throw err;
        }
    },
    editReview: async ({username, movieId, rating, comment}) => {
        try{
            const result = await Review.findOneAndUpdate({username: username, movieId: movieId}, { rating: rating, comment: comment})
            return{
                ...result._doc,
                _id: result.id
            }

        }catch(err){
            throw err;
        }
    },
    reviewByUsernameAndMovie: async ({username, movieId}) => {
        try{
            const review = await Review.findOne({username: username, movieId: movieId});
            return {
                ...review._doc,
                _id: review.id
            };
        }catch(err){
            throw err;
        }
    },
    reviewsByMovie: async({movieId}) => {
        try{
            const reviews = await Review.find({movieId: movieId});
            return reviews.map(review => {
                return {
                    ...review._doc,
                    _id: review.id
                };
            });
        }catch(err){
            throw err;
        }
    },
    deleteReview: async({username, movieId}) => {
        try{
            let bool = false;
            const deleted = await Review.deleteOne({username: username, movieId: movieId});
            if(deleted.deletedCount == "1"){
                bool = true
            };
            return bool;
        }catch(err){
            throw err;
        }
    },
    deleteUser: async ({username}) => {
        try{
            let bool = false;
            const deleted = await User.deleteOne({username: username});
            if(deleted.deletedCount == "1"){
                bool = true;
            };
            return bool;
        }catch(err){
            throw err;
        }
    },
    deleteReviews: async ({username}) => {
        try{
            let bool = false;
            const deleted = await Review.deleteMany({username: username});
            if(deleted != "0"){
                bool = true
            }
            return bool
        }catch(err){
            throw err;
        }
    }
    

}